import electron from 'electron';

const { nativeImage } = electron;

const MOJANG_PROFILE = 'https://sessionserver.mojang.com/session/minecraft/profile';
const USER_AGENT = 'MossyLauncher/1.0 (+https://github.com/HuanMeng-official/LauncherCore)';
const SUCCESS_TTL = 15 * 60 * 1000;
const FAILURE_TTL = 5 * 60 * 1000;
const MAX_SKIN_BYTES = 2 * 1024 * 1024;

// Standard 64x64 skin layout, in 8x8 units.
const HEAD_FACES = {
  top: [8, 0],
  bottom: [16, 0],
  right: [0, 8],
  front: [8, 8],
  left: [16, 8],
  back: [24, 8],
};

const HAT_FACES = {
  top: [40, 0],
  bottom: [48, 0],
  right: [32, 8],
  front: [40, 8],
  left: [48, 8],
  back: [56, 8],
};

// Body part UV rectangles in 64x64 layout units: [x, y, width, height].
const MODEL_PARTS = {
  body: {
    base: {
      right: [16, 20, 4, 12],
      front: [20, 20, 8, 12],
      left: [28, 20, 4, 12],
      back: [32, 20, 8, 12],
      top: [20, 16, 8, 4],
      bottom: [28, 16, 8, 4],
    },
    overlay: {
      right: [16, 36, 4, 12],
      front: [20, 36, 8, 12],
      left: [28, 36, 4, 12],
      back: [32, 36, 8, 12],
      top: [20, 32, 8, 4],
      bottom: [28, 32, 8, 4],
    },
  },
  rightLeg: {
    base: {
      right: [0, 20, 4, 12],
      front: [4, 20, 4, 12],
      left: [8, 20, 4, 12],
      back: [12, 20, 4, 12],
      top: [4, 16, 4, 4],
      bottom: [8, 16, 4, 4],
    },
    overlay: {
      right: [0, 36, 4, 12],
      front: [4, 36, 4, 12],
      left: [8, 36, 4, 12],
      back: [12, 36, 4, 12],
      top: [4, 32, 4, 4],
      bottom: [8, 32, 4, 4],
    },
  },
  leftLeg: {
    base: {
      right: [16, 52, 4, 12],
      front: [20, 52, 4, 12],
      left: [24, 52, 4, 12],
      back: [28, 52, 4, 12],
      top: [20, 48, 4, 4],
      bottom: [24, 48, 4, 4],
    },
    overlay: {
      right: [0, 52, 4, 12],
      front: [4, 52, 4, 12],
      left: [8, 52, 4, 12],
      back: [12, 52, 4, 12],
      top: [4, 48, 4, 4],
      bottom: [8, 48, 4, 4],
    },
  },
};

function armRects(baseX, rowY, width) {
  return {
    right: [baseX, rowY, 4, 12],
    front: [baseX + 4, rowY, width, 12],
    left: [baseX + 4 + width, rowY, 4, 12],
    back: [baseX + 8 + width, rowY, width, 12],
    top: [baseX + 4, rowY - 4, width, 4],
    bottom: [baseX + 4 + width, rowY - 4, width, 4],
  };
}

function cropRegion(image, scale, [x, y, width, height]) {
  const cropped = image.crop({
    x: Math.round(x * scale),
    y: Math.round(y * scale),
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  });
  return cropped.isEmpty() ? null : cropped.toDataURL();
}

function cropFaceMap(image, scale, faces) {
  const result = {};
  for (const [direction, [x, y]] of Object.entries(faces)) {
    const dataUrl = cropRegion(image, scale, [x, y, 8, 8]);
    if (!dataUrl) return null;
    result[direction] = dataUrl;
  }
  return result;
}

function cropPartFaces(image, scale, faces) {
  const result = {};
  for (const [direction, rect] of Object.entries(faces)) {
    const dataUrl = cropRegion(image, scale, rect);
    if (!dataUrl) return null;
    result[direction] = dataUrl;
  }
  return Object.keys(result).length === 6 ? result : null;
}

function normalizeUuid(value) {
  const hex = String(value || '').replace(/[^0-9a-f]/gi, '').toLowerCase();
  return /^[0-9a-f]{32}$/.test(hex) ? hex : null;
}

function profileUrl(base, uuid) {
  return base
    ? `${base}/sessionserver/session/minecraft/profile/${uuid}`
    : `${MOJANG_PROFILE}/${uuid}`;
}

async function fetchJson(url, timeout) {
  const response = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
    signal: AbortSignal.timeout(timeout),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function fetchBuffer(url, timeout, maxBytes) {
  const response = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
    redirect: 'follow',
    signal: AbortSignal.timeout(timeout),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const declared = Number(response.headers.get('content-length') || 0);
  if (declared > maxBytes) throw new Error('皮肤文件过大');

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.byteLength > maxBytes) throw new Error('皮肤文件过大');
  return buffer;
}

/**
 * Resolves public skin textures for Microsoft and Yggdrasil accounts.
 * Profile lookups happen in the main process (no CORS) and are cached.
 */
export class SkinService {
  constructor() {
    this.cache = new Map();
    this.inFlight = new Map();
    this.resolvedBases = new Map();
  }

  async get({ uuid, apiUrl, force = false } = {}) {
    const normalized = normalizeUuid(uuid);
    if (!normalized) return { ok: false, error: '无效的账号 UUID' };

    let base = null;
    if (apiUrl) {
      try {
        const url = new URL(String(apiUrl));
        if (url.protocol !== 'https:' && url.protocol !== 'http:') {
          return { ok: false, error: '无效的 Yggdrasil API 地址' };
        }
        base = url.toString().replace(/\/+$/, '');
      } catch {
        return { ok: false, error: '无效的 Yggdrasil API 地址' };
      }
    }

    const key = `${base || 'mojang'}:${normalized}`;
    const cached = this.cache.get(key);
    if (!force && cached && cached.expires > Date.now()) return cached.value;
    if (this.inFlight.has(key)) return this.inFlight.get(key);

    const task = this.resolveSkin(normalized, base)
      .catch((err) => ({ ok: false, error: err.message || '获取皮肤失败' }))
      .then((value) => {
        this.cache.set(key, {
          value,
          expires: Date.now() + (value.ok ? SUCCESS_TTL : FAILURE_TTL),
        });
        return value;
      })
      .finally(() => this.inFlight.delete(key));

    this.inFlight.set(key, task);
    return task;
  }

  async resolveBase(apiUrl) {
    if (this.resolvedBases.has(apiUrl)) return this.resolvedBases.get(apiUrl);

    let resolved = apiUrl;
    try {
      const response = await fetch(apiUrl, {
        headers: { 'User-Agent': USER_AGENT },
        redirect: 'follow',
        signal: AbortSignal.timeout(6000),
      });
      const location = response.headers.get('x-authlib-injector-api-location');
      if (location) {
        resolved = new URL(location, response.url || apiUrl).toString().replace(/\/+$/, '');
      }
    } catch {
      // Keep the provided URL as a fallback.
    }

    this.resolvedBases.set(apiUrl, resolved);
    return resolved;
  }

  async resolveSkin(uuid, apiBase) {
    let base = apiBase;
    let profile;

    try {
      profile = await fetchJson(profileUrl(base, uuid), 8000);
    } catch (err) {
      if (!base) throw err;
      const resolved = await this.resolveBase(base);
      if (!resolved || resolved === base) throw err;
      base = resolved;
      profile = await fetchJson(profileUrl(base, uuid), 8000);
    }

    const textures = (profile.properties || []).find((property) => property.name === 'textures');
    if (!textures?.value) return { ok: false, error: '账号没有公开的皮肤数据' };

    let decoded;
    try {
      decoded = JSON.parse(Buffer.from(textures.value, 'base64').toString('utf8'));
    } catch {
      return { ok: false, error: '无法解析皮肤数据' };
    }

    const skinTexture = decoded?.textures?.SKIN || decoded?.textures?.skin;
    const skinUrl = skinTexture?.url;
    if (!skinUrl) return { ok: false, error: '账号没有皮肤纹理' };
    const slim = skinTexture?.metadata?.model === 'slim';

    let resolvedUrl;
    try {
      resolvedUrl = new URL(skinUrl, base ? `${base}/` : profileUrl(null, uuid));
    } catch {
      return { ok: false, error: '无效的皮肤纹理地址' };
    }
    if (resolvedUrl.protocol !== 'https:' && resolvedUrl.protocol !== 'http:') {
      return { ok: false, error: '不支持的皮肤纹理协议' };
    }

    const buffer = await fetchBuffer(resolvedUrl.toString(), 10_000, MAX_SKIN_BYTES);
    const image = nativeImage.createFromBuffer(buffer);
    if (image.isEmpty()) return { ok: false, error: '无法解析皮肤图片' };

    const { width, height } = image.getSize();
    if (width < 64 || height < 32) {
      return { ok: false, error: '皮肤尺寸不受支持' };
    }

    // Standard skin layout: one 8x8 unit is width / 64.
    const scale = width / 64;
    const modern = height >= 64 * scale;

    const faces = cropFaceMap(image, scale, HEAD_FACES);
    if (!faces) return { ok: false, error: '无法提取皮肤头部' };

    const hatFaces = modern ? cropFaceMap(image, scale, HAT_FACES) : null;

    const parts = { head: { faces, overlay: hatFaces } };
    const armWidth = modern && slim ? 3 : 4;
    const definitions = {
      ...MODEL_PARTS,
      rightArm: {
        base: armRects(40, 20, armWidth),
        overlay: armRects(40, 36, armWidth),
      },
      leftArm: {
        base: armRects(32, 52, armWidth),
        overlay: armRects(48, 52, armWidth),
      },
    };
    const partNames = modern
      ? Object.keys(definitions)
      : ['body', 'rightArm', 'rightLeg'];

    for (const name of partNames) {
      const definition = definitions[name];
      const partFaces = cropPartFaces(image, scale, definition.base);
      if (!partFaces) return { ok: false, error: '无法提取完整皮肤模型' };
      parts[name] = {
        faces: partFaces,
        overlay: modern ? cropPartFaces(image, scale, definition.overlay) : null,
      };
    }

    if (!modern) {
      parts.leftArm = parts.rightArm;
      parts.leftLeg = parts.rightLeg;
    }

    return {
      ok: true,
      faces,
      hatFaces,
      model: { parts, variant: armWidth === 3 ? 'slim' : 'classic' },
      variant: armWidth === 3 ? 'slim' : 'classic',
      face: faces.front,
      hat: hatFaces?.front || null,
    };
  }
}
