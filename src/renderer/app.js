const api = window.mossy;

/* ------------------------------------------------------------------ */
/* Material icons                                                      */
/* ------------------------------------------------------------------ */

const ICONS = {
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  layers: 'M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z',
  person: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  settings: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
  play: 'M8 5v14l11-7z',
  download: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
  refresh: 'M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z',
  search: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  close: 'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  expandMore: 'M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z',
  light: 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z',
  dark: 'M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z',
  folder: 'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z',
  terminal: 'M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H4V8h16v10zm-2-1h-6v-2h6v2zM7.5 17l-1.41-1.41L8.67 13l-2.58-2.59L7.5 9l4 4-4 4z',
  delete: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
  copy: 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
  open: 'M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z',
  check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  checkCircle: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  error: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
  add: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  chevronRight: 'M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
  arrowForward: 'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z',
};

function icon(name, size = 20) {
  return `<svg class="icon" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><path d="${ICONS[name] || ICONS.check}"/></svg>`;
}

/* ------------------------------------------------------------------ */
/* 常量                                                                */
/* ------------------------------------------------------------------ */

const VIEW_TITLES = { home: '主页', versions: '版本', accounts: '账号', settings: '设置' };

const PHASE_LABELS = {
  core: '下载核心',
  metadata: '获取元数据',
  downloads: '下载文件',
  extract: '解压原生库',
  loader: '安装模组加载器',
  loader_install: '运行加载器安装器',
  authlib: '下载 authlib-injector',
};

const LOADERS = [
  { value: '', label: '原版' },
  { value: 'fabric', label: 'Fabric' },
  { value: 'quilt', label: 'Quilt' },
  { value: 'forge', label: 'Forge' },
  { value: 'neoforge', label: 'NeoForge' },
];

const SOURCES = [
  { value: 'auto', label: '自动（官方 → BMCLAPI）', short: '自动' },
  { value: 'official', label: 'Mojang 官方', short: '官方' },
  { value: 'bmclapi', label: 'BMCLAPI 镜像', short: 'BMCLAPI' },
];

const TYPE_FILTERS = [
  { value: 'release', label: '正式版' },
  { value: 'snapshot', label: '快照' },
  { value: 'old', label: '旧版' },
  { value: 'all', label: '全部' },
];

const TYPE_LABELS = {
  release: '正式版',
  snapshot: '快照',
  old_beta: '旧版 Beta',
  old_alpha: '旧版 Alpha',
};

function playerPartDefinitions(variant) {
  const armWidth = variant === 'slim' ? 3 : 4;
  const armOffset = 4 + armWidth / 2;

  return [
    { name: 'head', w: 8, h: 8, d: 8, x: 0, y: 4, z: 0 },
    { name: 'body', w: 8, h: 12, d: 4, x: 0, y: 14, z: 0 },
    { name: 'rightArm', w: armWidth, h: 12, d: 4, x: -armOffset, y: 14, z: 0 },
    { name: 'leftArm', w: armWidth, h: 12, d: 4, x: armOffset, y: 14, z: 0 },
    { name: 'rightLeg', w: 4, h: 12, d: 4, x: -2, y: 26, z: 0 },
    { name: 'leftLeg', w: 4, h: 12, d: 4, x: 2, y: 26, z: 0 },
  ];
}

// The skin's "right" texture is the character's right side, which sits at -x
// when the character faces the viewer.
const FACE_CLASS = {
  front: 'front',
  back: 'back',
  right: 'left',
  left: 'right',
  top: 'top',
  bottom: 'bottom',
};

const STATUS_LABELS = {
  idle: '未启动',
  starting: '正在启动…',
  downloading: '下载核心…',
  ready: '已就绪',
  busy: '执行中',
  error: '核心异常',
  exited: '已退出',
  stopped: '已停止',
};

const THEME_LABELS = { system: '跟随系统', light: '浅色', dark: '深色' };

/* ------------------------------------------------------------------ */
/* 状态                                                                */
/* ------------------------------------------------------------------ */

const state = {
  settings: null,
  paths: null,
  status: { state: 'idle' },
  view: 'home',

  installed: [],
  versions: [],
  versionsLoaded: false,
  versionsLoading: false,
  versionsError: null,
  accounts: { accounts: [], msa: null },
  java: [],
  skins: {},
  skinLoading: new Set(),

  busy: false,
  progress: null,
  actionLabel: '',
  coreDownload: null,
  logs: [],

  deviceModal: null,
  profileModal: null,
  externalPending: null,
  profiles: [],

  connectedPid: null,
  versionTab: 'installed',
  versionQuery: '',
  versionType: 'release',
  loader: '',
  sourceOverride: '',

  selectedVersion: '',
  authMode: 'offline',
  offlineName: 'Player',
  externalAccount: '',

  theme: 'system',
  resolvedTheme: 'light',

  modelRotX: -6,
  modelRotY: -24,
};

const darkMedia = window.matchMedia('(prefers-color-scheme: dark)');
let searchTimer = null;
let profileWaiter = null;
let activeSelectMenu = null;

/* ------------------------------------------------------------------ */
/* 工具                                                                */
/* ------------------------------------------------------------------ */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[char]));

function statusLabel(value) {
  return STATUS_LABELS[value] || value || '未知';
}

function effectiveGameDir() {
  return state.status.gameDir || state.settings?.gameDir || '';
}

function sourceShort(value) {
  return SOURCES.find((source) => source.value === value)?.short || '自动';
}

function loaderLabel(value) {
  return LOADERS.find((loader) => loader.value === value)?.label || '原版';
}

function versionKind(id) {
  if (/^fabric-loader/i.test(id)) return 'Fabric';
  if (/^quilt-loader/i.test(id)) return 'Quilt';
  if (/neoforge/i.test(id)) return 'NeoForge';
  if (/forge/i.test(id)) return 'Forge';
  return '原版';
}

function versionBadge(id) {
  const text = String(id ?? '');
  const numeric = text.match(/^\d+(?:\.\d+)?/);
  if (numeric) return numeric[0];
  if (/^fabric-loader/i.test(text)) return 'FB';
  if (/^quilt-loader/i.test(text)) return 'QT';
  if (/neoforge/i.test(text)) return 'NF';
  if (/forge/i.test(text)) return 'FG';
  return text.slice(0, 4) || 'MC';
}

function formatBytes(value) {
  const bytes = Number(value) || 0;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

async function call(command, params) {
  try {
    return await api.request(command, params);
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

function accountInfo() {
  const msa = state.accounts?.msa;
  const externals = state.accounts?.accounts || [];
  const external = externals.find((account) => account.identifier === state.externalAccount);

  if (state.authMode === 'msa') {
    return { name: msa?.username || '未登录', kind: 'Microsoft 账户', msa, external, avatar: state.authMode };
  }
  if (state.authMode === 'external') {
    return { name: external?.name || '未选择', kind: '外置账户', msa, external, avatar: state.authMode };
  }
  return { name: state.offlineName || 'Player', kind: '离线账户', msa, external, avatar: 'offline' };
}

/* ------------------------------------------------------------------ */
/* 皮肤头像                                                            */
/* ------------------------------------------------------------------ */

function normalizeUuid(value) {
  return String(value || '').replace(/[^0-9a-f]/gi, '').toLowerCase();
}

function msaSkinKey(msa) {
  const uuid = normalizeUuid(msa?.uuid);
  return uuid ? `mojang:${uuid}` : '';
}

function externalSkinKey(account) {
  const uuid = normalizeUuid(account?.uuid);
  if (uuid) return `ext:${uuid}`;
  return account?.identifier ? `ext:${account.identifier}` : '';
}

function profileSkinKey(profile) {
  const uuid = normalizeUuid(profile?.id || '');
  return uuid ? `profile:${uuid}` : '';
}

function findProfileSkin(uuid) {
  const normalized = normalizeUuid(uuid);
  if (!normalized) return null;
  const skin = state.skins[`profile:${normalized}`];
  return skin?.faces ? skin : null;
}

const HEAD_SIZE_CLASS = { sm: 'head-sm', md: 'head-md', lg: 'head-lg', xl: 'head-xl' };
const AVATAR_SIZE_CLASS = { sm: 'avatar-sm', md: '', lg: 'avatar-lg', xl: 'avatar-xl' };

function headMarkup(skin, size, label) {
  const faces = Object.entries(skin.faces || {}).map(([direction, url]) =>
    `<span class="head-face ${FACE_CLASS[direction] || direction}" style="background-image:url('${url}')"></span>`).join('');

  const hat = skin.hatFaces
    ? Object.entries(skin.hatFaces).map(([direction, url]) =>
      `<span class="head-face ${FACE_CLASS[direction] || direction} hat" style="background-image:url('${url}')"></span>`).join('')
    : '';

  return `<span class="head ${HEAD_SIZE_CLASS[size] || 'head-md'}" role="img" aria-label="${escapeHtml(label || '玩家头像')}">
    <span class="head-scene"><span class="head-cube">${faces}${hat}</span></span>
  </span>`;
}

function avatarMarkup({ name, kind = 'offline', size = 'md', skinKey = '' }) {
  const skin = skinKey ? state.skins[skinKey] : null;
  if (skin?.faces) return headMarkup(skin, size, name);

  const classes = ['avatar', AVATAR_SIZE_CLASS[size] || '', kind].filter(Boolean).join(' ');
  return `<span class="${classes}">${escapeHtml((String(name || '?')[0] || '?').toUpperCase())}</span>`;
}

function hydrateSkins() {
  const msa = state.accounts?.msa;
  const requests = [];
  let changed = false;

  if (msa?.uuid) {
    const key = msaSkinKey(msa);
    if (key) requests.push({ key, uuid: msa.uuid, apiUrl: null });
  }

  for (const account of state.accounts?.accounts || []) {
    if (!account?.uuid) continue;
    const key = externalSkinKey(account);
    if (!key || state.skins[key] !== undefined) continue;

    // Reuse the skin fetched for this profile in the role picker so the
    // account avatar appears immediately after login.
    const profileSkin = findProfileSkin(account.uuid);
    if (profileSkin) {
      state.skins[key] = profileSkin;
      changed = true;
      continue;
    }

    requests.push({ key, uuid: account.uuid, apiUrl: account.api_url });
  }

  const missing = requests.filter(({ key }) => key
    && state.skins[key] === undefined
    && !state.skinLoading.has(key));

  if (!missing.length) {
    if (changed) refreshAvatars();
    return Promise.resolve();
  }

  for (const { key } of missing) state.skinLoading.add(key);

  return Promise.all(missing.map(async (request) => {
    try {
      const result = await api.getSkin({ uuid: request.uuid, apiUrl: request.apiUrl });
      return { key: request.key, result: result?.ok && result.faces ? result : null };
    } catch {
      return { key: request.key, result: null };
    }
  })).then((results) => {
    for (const { key, result } of results) {
      state.skinLoading.delete(key);
      state.skins[key] = result;
      if (result) changed = true;
    }
    if (changed) refreshAvatars();
  });
}

function refreshAvatars() {
  if (state.view === 'home') renderHome();
  if (state.view === 'accounts') renderAccounts();
}

/* ------------------------------------------------------------------ */
/* 下拉菜单                                                            */
/* ------------------------------------------------------------------ */

function syncSelectTrigger(select) {
  const trigger = select?._m3Trigger;
  if (!trigger) return;
  const value = trigger.querySelector('.m3-select-value');
  if (value) value.textContent = select.options[select.selectedIndex]?.text || '';
}

function closeSelectMenu() {
  const active = activeSelectMenu;
  if (!active) return;

  activeSelectMenu = null;
  active.trigger.setAttribute('aria-expanded', 'false');
  active.menu.remove();
  document.removeEventListener('pointerdown', active.onPointerDown, true);
  document.removeEventListener('keydown', active.onKeyDown);
  window.removeEventListener('resize', active.onResize);
  document.removeEventListener('scroll', active.onScroll, true);
}

function openSelectMenu(select, trigger) {
  closeSelectMenu();

  const menu = document.createElement('div');
  menu.className = 'm3-select-menu';
  menu.setAttribute('role', 'listbox');

  Array.from(select.options).forEach((option, index) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'm3-menu-item';
    item.setAttribute('role', 'option');
    item.dataset.index = String(index);
    item.disabled = option.disabled;

    const selected = index === select.selectedIndex;
    if (selected) item.classList.add('is-selected');
    item.setAttribute('aria-selected', selected ? 'true' : 'false');

    const label = document.createElement('span');
    label.className = 'm3-menu-label';
    label.textContent = option.text;
    label.title = option.text;
    item.append(label);

    if (selected) {
      const check = document.createElement('span');
      check.className = 'm3-menu-check';
      check.innerHTML = icon('check', 18);
      item.append(check);
    }

    item.addEventListener('click', () => {
      select.selectedIndex = index;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      syncSelectTrigger(select);
      closeSelectMenu();
      if (trigger.isConnected) trigger.focus({ preventScroll: true });
    });

    menu.append(item);
  });

  document.body.append(menu);
  trigger.setAttribute('aria-expanded', 'true');

  const rect = trigger.getBoundingClientRect();
  const width = Math.min(Math.max(rect.width, 220), 460);
  menu.style.width = `${width}px`;

  const menuHeight = menu.getBoundingClientRect().height;
  const margin = 8;
  const left = Math.max(margin, Math.min(rect.left, window.innerWidth - width - margin));
  const below = rect.bottom + 6;
  const above = rect.top - menuHeight - 6;
  const openUp = below + menuHeight > window.innerHeight - margin && above > margin;

  menu.style.left = `${left}px`;
  menu.style.top = `${Math.max(margin, openUp ? above : below)}px`;

  requestAnimationFrame(() => {
    const selectedItem = menu.querySelector('.m3-menu-item.is-selected')
      || menu.querySelector('.m3-menu-item:not([disabled])');
    selectedItem?.focus();
  });

  const onPointerDown = (event) => {
    if (!menu.contains(event.target) && !trigger.contains(event.target)) {
      closeSelectMenu();
    }
  };

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeSelectMenu();
      if (trigger.isConnected) trigger.focus({ preventScroll: true });
      return;
    }
    if (event.key === 'Tab') {
      closeSelectMenu();
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const items = Array.from(menu.querySelectorAll('.m3-menu-item:not([disabled])'));
      if (!items.length) return;
      const current = items.indexOf(document.activeElement);
      let next;
      if (event.key === 'ArrowDown') next = current < 0 ? 0 : (current + 1) % items.length;
      else next = current < 0 ? items.length - 1 : (current - 1 + items.length) % items.length;
      items[next].focus();
    }
  };

  const onResize = () => closeSelectMenu();
  const onScroll = (event) => {
    if (menu.contains(event.target)) return;
    closeSelectMenu();
  };

  document.addEventListener('pointerdown', onPointerDown, true);
  document.addEventListener('keydown', onKeyDown);
  window.addEventListener('resize', onResize);
  document.addEventListener('scroll', onScroll, true);

  activeSelectMenu = { select, trigger, menu, onPointerDown, onKeyDown, onResize, onScroll };
}

function enhanceSelects(root = document) {
  root.querySelectorAll('select').forEach((select) => {
    if (select.dataset.m3Enhanced === '1') return;
    select.dataset.m3Enhanced = '1';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'm3-select-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');

    if (select.classList.contains('field-input')) trigger.classList.add('field-input');
    else if (select.closest('.hero-version-field')) trigger.classList.add('hero-select');
    else if (select.closest('.select-chip')) trigger.classList.add('chip-select');
    else trigger.classList.add('plain-select');

    const value = document.createElement('span');
    value.className = 'm3-select-value';
    value.textContent = select.options[select.selectedIndex]?.text || '';
    trigger.append(value);

    select.classList.add('m3-select-native');
    select.tabIndex = -1;
    select.setAttribute('aria-hidden', 'true');
    select.insertAdjacentElement('afterend', trigger);
    select._m3Trigger = trigger;

    const toggle = (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (activeSelectMenu?.select === select) closeSelectMenu();
      else openSelectMenu(select, trigger);
    };

    trigger.addEventListener('click', toggle);
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        openSelectMenu(select, trigger);
      }
    });

    const container = select.closest('.select-chip, .field-select, .hero-version-field');
    container?.addEventListener('click', (event) => {
      if (event.target.closest('.m3-select-trigger')) return;
      toggle(event);
    });
  });
}

/* ------------------------------------------------------------------ */
/* 主题                                                                */
/* ------------------------------------------------------------------ */

function applyTheme() {
  const mode = state.theme || 'system';
  const resolved = mode === 'system'
    ? (darkMedia.matches ? 'dark' : 'light')
    : mode;

  state.resolvedTheme = resolved;
  document.documentElement.dataset.theme = resolved;

  const button = $('#theme-toggle');
  if (button) {
    button.innerHTML = icon(resolved === 'dark' ? 'light' : 'dark', 22);
    button.title = resolved === 'dark' ? '切换到浅色模式' : '切换到深色模式';
  }

  updateThemeSegmented();
}

function setTheme(mode) {
  state.theme = mode;
  try {
    localStorage.setItem('mossy.theme', mode);
  } catch {
    // ignore
  }
  applyTheme();
}

function themeButtonsHtml() {
  return ['system', 'light', 'dark'].map((mode) => `
    <button data-theme-mode="${mode}" class="${state.theme === mode ? 'is-active' : ''}">
      ${state.theme === mode ? icon('check', 18) : ''}${THEME_LABELS[mode]}
    </button>`).join('');
}

function updateThemeSegmented() {
  const segmented = $('#theme-mode');
  if (segmented) segmented.innerHTML = themeButtonsHtml();
}

darkMedia.addEventListener('change', () => {
  if (state.theme === 'system') applyTheme();
});

/* ------------------------------------------------------------------ */
/* 偏好                                                                */
/* ------------------------------------------------------------------ */

function loadPrefs() {
  const get = (key, fallback) => {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  };

  state.selectedVersion = get('mossy.selectedVersion', '');
  state.authMode = get('mossy.authMode', 'offline');
  state.offlineName = get('mossy.offlineName', 'Player');
  state.externalAccount = get('mossy.externalAccount', '');
  state.versionTab = get('mossy.versionTab', 'installed') === 'remote' ? 'remote' : 'installed';
  state.theme = get('mossy.theme', 'system');

  if (!['offline', 'msa', 'external'].includes(state.authMode)) state.authMode = 'offline';
  if (!['system', 'light', 'dark'].includes(state.theme)) state.theme = 'system';
}

function savePrefs() {
  try {
    localStorage.setItem('mossy.selectedVersion', state.selectedVersion);
    localStorage.setItem('mossy.authMode', state.authMode);
    localStorage.setItem('mossy.offlineName', state.offlineName);
    localStorage.setItem('mossy.externalAccount', state.externalAccount);
    localStorage.setItem('mossy.versionTab', state.versionTab);
  } catch {
    // localStorage may be unavailable; preferences are non-critical.
  }
}

/* ------------------------------------------------------------------ */
/* 启动                                                                */
/* ------------------------------------------------------------------ */

init();

async function init() {
  bindShell();

  try {
    const boot = await api.getSettings();
    state.settings = boot.settings;
    state.paths = boot.paths;
    state.sourceOverride = boot.settings.downloadSource;
    if (boot.paths?.platform) document.body.dataset.platform = boot.paths.platform;
  } catch (err) {
    addLog('error', `读取设置失败：${err.message}`);
    toast(`读取设置失败：${err.message}`, 'error');
  }

  loadPrefs();
  applyTheme();

  try {
    state.status = await api.getStatus();
  } catch {
    state.status = { state: 'idle' };
  }

  renderAll();
  addLog('info', 'MossyLauncher 已启动');

  api.onStatus(handleStatus);
  api.onEvent(handleEvent);
  api.onDiagnostic((line) => addLog('diag', line));
  api.onDownloadProgress(handleCoreDownload);

  startCore();
}

async function startCore() {
  try {
    state.status = await api.startCore();
    renderStatus();
  } catch (err) {
    addLog('error', `核心启动失败：${err.message}`);
    toast(`核心启动失败：${err.message}`, 'error');
    renderStatus();
  }
}

function bindShell() {
  $('#nav')?.addEventListener('click', (event) => {
    const item = event.target.closest('[data-view]');
    if (item) setView(item.dataset.view);
  });

  $('#theme-toggle')?.addEventListener('click', () => {
    setTheme(state.resolvedTheme === 'dark' ? 'light' : 'dark');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeProfileModal();
  });
}

function setView(view) {
  if (!VIEW_TITLES[view]) return;
  state.view = view;

  $$('.view').forEach((section) => {
    section.classList.toggle('is-active', section.id === `view-${view}`);
  });
  $$('.rail-item').forEach((item) => {
    item.classList.toggle('is-active', item.dataset.view === view);
  });

  if (view === 'accounts') {
    refreshAccounts().then(() => {
      if (state.view === 'accounts') renderAccounts();
    });
  }

  if (view === 'versions') {
    if (state.versionTab === 'remote' && !state.versionsLoaded && !state.versionsLoading) {
      loadVersions();
    } else {
      renderVersions();
    }
  }
}

/* ------------------------------------------------------------------ */
/* 核心事件                                                            */
/* ------------------------------------------------------------------ */

function handleStatus(status) {
  const previous = state.status;
  state.status = status;

  if (status.state === 'downloading') {
    state.progress = {
      phase: 'core',
      current: state.coreDownload?.received || 0,
      total: state.coreDownload?.total || 0,
      message: '下载启动器核心',
    };
  } else if (state.progress?.phase === 'core') {
    state.progress = null;
    state.coreDownload = null;
  }

  if (status.state === 'ready' && status.pid && status.pid !== state.connectedPid) {
    state.connectedPid = status.pid;
    onCoreReady();
  }

  if (['exited', 'error', 'stopped'].includes(status.state)) {
    state.connectedPid = null;
  }

  if (status.state === 'error' && status.error && previous.state !== 'error') {
    addLog('error', status.error);
    toast(status.error, 'error');
  }

  if (status.state === 'exited' && previous.state !== 'exited') {
    addLog('warn', '核心进程已退出');
    toast('核心进程已退出，可在设置中重启', 'warn');
  }

  renderStatus();
}

function handleEvent(event) {
  switch (event.type) {
    case 'log':
      addLog(event.level === 'warn' ? 'warn' : 'info', event.message || '');
      break;
    case 'progress':
      state.progress = event;
      updateProgressUI();
      break;
    case 'device_code':
      showDeviceCode(event);
      break;
    case 'profiles':
      state.profiles = Array.isArray(event.profiles) ? event.profiles : [];
      profileWaiter?.(true);
      break;
    default:
      // 协议要求客户端忽略未知事件，方便未来扩展。
      break;
  }
}

function handleCoreDownload(progress) {
  state.coreDownload = progress;
  if (state.status.state === 'downloading') {
    state.progress = {
      phase: 'core',
      current: progress.received || 0,
      total: progress.total || 0,
      message: '下载启动器核心',
    };
    updateProgressUI();
  }
}

async function onCoreReady() {
  addLog('info', `核心已就绪 · mclc ${state.status.version || '?'} · 协议 ${state.status.protocol ?? '?'}`);
  if (state.status.protocol !== 1) {
    toast('核心协议版本不是 1，界面可能不完全兼容', 'warn');
  }

  await Promise.allSettled([refreshInstalled(), refreshAccounts(), refreshJava()]);
  renderAll();
}

/* ------------------------------------------------------------------ */
/* 数据刷新                                                            */
/* ------------------------------------------------------------------ */

async function refreshInstalled() {
  const result = await call('installed.list');
  if (!result.ok) {
    addLog('warn', `读取已安装版本失败：${result.error}`);
    return;
  }
  state.installed = (result.data?.versions || [])
    .map((version) => version.id)
    .filter(Boolean);

  if (!state.installed.includes(state.selectedVersion)) {
    state.selectedVersion = state.installed[0] || '';
    savePrefs();
  }
}

async function refreshAccounts() {
  const result = await call('accounts.list');
  if (!result.ok) {
    addLog('warn', `读取账号失败：${result.error}`);
    return;
  }
  state.accounts = {
    accounts: Array.isArray(result.data?.accounts) ? result.data.accounts : [],
    msa: result.data?.msa || null,
  };

  const list = state.accounts.accounts;
  if (!list.some((account) => account.identifier === state.externalAccount)) {
    state.externalAccount = list[0]?.identifier || '';
    savePrefs();
  }

  hydrateSkins();
}

async function refreshJava() {
  const result = await call('java.list');
  if (!result.ok) {
    addLog('warn', `检测 Java 失败：${result.error}`);
    return;
  }
  state.java = Array.isArray(result.data?.runtimes) ? result.data.runtimes : [];
}

/* ------------------------------------------------------------------ */
/* 通用请求包装                                                        */
/* ------------------------------------------------------------------ */

async function runAction(label, run) {
  if (state.busy) {
    toast('已有操作正在进行，请稍候', 'warn');
    return { ok: false, error: '已有操作正在进行' };
  }

  state.busy = true;
  state.actionLabel = label;
  state.progress = null;
  addLog('info', `▶ ${label}`);
  updateProgressUI();

  try {
    const result = await run();
    if (result.ok) {
      addLog('info', `✓ ${label}`);
    } else {
      addLog('error', `✗ ${label}：${result.error}`);
    }
    return result;
  } catch (err) {
    addLog('error', `✗ ${label}：${err.message}`);
    return { ok: false, error: err.message };
  } finally {
    state.busy = false;
    state.actionLabel = '';
    state.progress = null;
    closeDeviceModal();
    updateProgressUI();
  }
}

/* ------------------------------------------------------------------ */
/* 主页                                                                */
/* ------------------------------------------------------------------ */

function partFaceMarkup(faces, w, h, d) {
  const face = (direction, fw, fh, className) => {
    const url = faces?.[direction];
    if (!url) return '';
    return `<span class="part-face ${className}" style="--fw:${fw};--fh:${fh};background-image:url('${url}')"></span>`;
  };

  return [
    face('front', w, h, FACE_CLASS.front),
    face('back', w, h, FACE_CLASS.back),
    face('right', d, h, FACE_CLASS.right),
    face('left', d, h, FACE_CLASS.left),
    face('top', w, d, FACE_CLASS.top),
    face('bottom', w, d, FACE_CLASS.bottom),
  ].join('');
}

function playerPartMarkup(def, part, overlay = false) {
  const faces = overlay ? part?.overlay : part?.faces;
  if (!faces) return '';

  const w = def.w + (overlay ? 0.2 : 0);
  const h = def.h + (overlay ? 0.2 : 0);
  const d = def.d + (overlay ? 0.2 : 0);

  return `<div class="player-part${overlay ? ' part-overlay' : ''}"
    style="--w:${w};--h:${h};--d:${d};--x:${def.x};--y:${def.y};--z:${def.z}">
    ${partFaceMarkup(faces, w, h, d)}
  </div>`;
}

function playerModelMarkup(skin) {
  const parts = skin?.model?.parts;
  if (!parts) {
    return emptyState('person', '暂无角色预览', '登录一个带皮肤的账号后，这里会显示可旋转的角色模型。');
  }

  const definitions = playerPartDefinitions(skin.model.variant || skin.variant);

  return `
    <div class="player-scene" id="player-scene"
      style="--rx:${state.modelRotX}deg;--ry:${state.modelRotY}deg">
      <div class="player-ground"></div>
      <div class="player">
        ${definitions.map((def) => playerPartMarkup(def, parts[def.name])).join('')}
        ${definitions.map((def) => playerPartMarkup(def, parts[def.name], true)).join('')}
      </div>
    </div>`;
}

function renderHome() {
  const root = $('#view-home');
  if (!root) return;

  const installed = state.installed || [];
  const { name: authName, kind: accountKind, msa, external, avatar } = accountInfo();
  const displayName = state.authMode === 'msa' && !msa ? '玩家' : authName;
  const skinKey = state.authMode === 'msa'
    ? msaSkinKey(msa)
    : state.authMode === 'external'
      ? externalSkinKey(external)
      : '';
  const previewSkin = skinKey ? state.skins[skinKey] : null;

  if (installed.length && !installed.includes(state.selectedVersion)) {
    state.selectedVersion = installed[0];
    savePrefs();
  }
  if (!installed.length) state.selectedVersion = '';

  const versionOptions = installed.length
    ? installed.map((id) => `<option value="${escapeHtml(id)}" ${id === state.selectedVersion ? 'selected' : ''}>${escapeHtml(id)}</option>`).join('')
    : '<option value="">尚无已安装版本</option>';

  root.innerHTML = `
    <div class="home-grid">
      <section class="hero">
        <div class="hero-copy">
          <h2 id="home-greeting">欢迎回来，<br><em>${escapeHtml(displayName)}</em></h2>
          <div class="hero-controls">
            <label class="hero-version-field">
              <span>游戏版本</span>
              <select id="home-version">${versionOptions}</select>
              <span class="field-chevron">${icon('expandMore')}</span>
            </label>
            <button class="fab" id="home-play" data-action>
              ${icon('play', 24)}
              <span class="play-label">开始游戏</span>
            </button>
          </div>
        </div>
        <div class="hero-art" aria-hidden="true">
          <span class="blob blob-1"></span>
          <span class="blob blob-2"></span>
          <span class="blob blob-3"></span>
          <span class="hero-leaf">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M20 4C12 4 5.5 8.2 5.5 15.2c0 2.4 1.2 4.1 3.1 4.8C12.7 21 20 16.7 20 4Z" fill="currentColor"/>
              <path d="M4 21c1.6-5.1 4.9-8.9 9.4-11.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity=".4"/>
            </svg>
          </span>
          <span class="hero-dot d1"></span>
          <span class="hero-dot d2"></span>
          <span class="hero-dot d3"></span>
        </div>
      </section>

      <div class="home-side">
        <section class="card account-card">
          <div class="card-header">
            <span class="card-title">当前账户</span>
            <span class="assist-chip">${escapeHtml(accountKind)}</span>
          </div>
          <div class="account-row">
            ${avatarMarkup({ name: authName, kind: avatar, size: 'lg', skinKey })}
            <div class="account-meta">
              <strong>${escapeHtml(authName)}</strong>
              <small>${
                state.authMode === 'msa'
                  ? escapeHtml(msa?.uuid || 'Microsoft 账户')
                  : state.authMode === 'external'
                    ? escapeHtml(external?.server_name || external?.api_url || '外置账号')
                    : '本地离线档案'
              }</small>
            </div>
          </div>
          <button class="btn tonal block" id="home-manage-accounts">${icon('person')} 管理账号</button>
        </section>

        <section class="card model-card">
          <div class="card-header">
            <span class="card-title">角色预览</span>
          </div>
          ${playerModelMarkup(previewSkin)}
        </section>
      </div>
    </div>
  `;

  bindHomeEvents();
  updateActionAvailability();
  enhanceSelects(root);
}

function bindHomeEvents() {
  $('#home-version')?.addEventListener('change', (event) => {
    state.selectedVersion = event.target.value;
    savePrefs();
  });

  $('#home-play')?.addEventListener('click', () => {
    if (!state.selectedVersion) {
      state.versionTab = 'remote';
      savePrefs();
      setView('versions');
      renderVersions();
      if (!state.versionsLoaded) loadVersions();
      return;
    }
    launchSelected();
  });

  $('#home-manage-accounts')?.addEventListener('click', () => setView('accounts'));

  const scene = $('#player-scene');
  if (scene) {
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const applyRotation = () => {
      scene.style.setProperty('--rx', `${state.modelRotX}deg`);
      scene.style.setProperty('--ry', `${state.modelRotY}deg`);
    };

    scene.addEventListener('pointerdown', (event) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      scene.classList.add('is-dragging');
      scene.setPointerCapture(event.pointerId);
    });

    scene.addEventListener('pointermove', (event) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      state.modelRotY += dx * 0.45;
      state.modelRotX = Math.max(-28, Math.min(36, state.modelRotX + dy * 0.25));
      applyRotation();
    });

    const stopDrag = (event) => {
      if (!dragging) return;
      dragging = false;
      scene.classList.remove('is-dragging');
      try {
        scene.releasePointerCapture(event.pointerId);
      } catch {
        // ignore
      }
    };

    scene.addEventListener('pointerup', stopDrag);
    scene.addEventListener('pointercancel', stopDrag);
    scene.addEventListener('dblclick', () => {
      state.modelRotX = -6;
      state.modelRotY = -24;
      applyRotation();
    });
  }
}

async function launchSelected() {
  const version = state.selectedVersion;
  if (!version) return;

  if (state.status.state !== 'ready') {
    toast('启动器核心尚未就绪', 'warn');
    return;
  }

  const params = { version };

  if (state.authMode === 'msa') {
    if (!state.accounts.msa) {
      toast('请先登录 Microsoft 账号', 'warn');
      setView('accounts');
      return;
    }
    params.auth = 'msa';
  } else if (state.authMode === 'external') {
    const account = (state.accounts.accounts || []).find((item) => item.identifier === state.externalAccount);
    if (!account) {
      toast('请先登录外置账号', 'warn');
      setView('accounts');
      return;
    }
    params.auth = 'external';
    params.username = account.identifier;
    params.api_url = account.api_url;
  } else {
    params.auth = 'offline';
    params.username = (state.offlineName || 'Player').trim() || 'Player';
  }

  if (state.settings?.jvmArgs?.trim()) params.jvm_args = state.settings.jvmArgs.trim();
  if (state.settings?.runtime?.trim()) params.runtime = state.settings.runtime.trim();

  const result = await runAction(`启动 ${version}`, () => api.request('launch', params));
  if (result.ok) {
    toast(`${version} 已启动。游戏日志在 logs/latest.log`, 'success');
  } else {
    toast(`启动失败：${result.error}`, 'error');
  }
}

/* ------------------------------------------------------------------ */
/* 版本页                                                              */
/* ------------------------------------------------------------------ */

function renderVersions() {
  const root = $('#view-versions');
  if (!root) return;

  const isRemote = state.versionTab === 'remote';
  const loaderOptions = LOADERS.map((loader) => `<option value="${loader.value}" ${state.loader === loader.value ? 'selected' : ''}>${loader.label}</option>`).join('');
  const sourceOptions = SOURCES.map((source) => `<option value="${source.value}" ${state.sourceOverride === source.value ? 'selected' : ''}>${source.short}</option>`).join('');
  const typeChips = TYPE_FILTERS.map((filter) => `
    <button class="chip ${state.versionType === filter.value ? 'is-selected' : ''}" data-type="${filter.value}">
      ${state.versionType === filter.value ? icon('check', 16) : ''}${filter.label}
    </button>`).join('');

  root.innerHTML = `
    <div class="page-head">
      <div>
        <h2 class="page-title">版本</h2>
        <p class="page-sub">安装原版或模组加载器，安装完成后即可从主页启动。</p>
      </div>
      <div class="segmented" id="version-tabs">
        <button data-tab="installed" class="${isRemote ? '' : 'is-active'}">
          ${isRemote ? '' : icon('check', 18)}已安装 <span class="seg-badge">${state.installed.length}</span>
        </button>
        <button data-tab="remote" class="${isRemote ? 'is-active' : ''}">
          ${isRemote ? icon('check', 18) : ''}远程版本
        </button>
      </div>
    </div>

    ${isRemote ? `
      <div class="search-row">
        <label class="search-bar">
          ${icon('search')}
          <input id="version-search" value="${escapeHtml(state.versionQuery)}" placeholder="搜索版本，例如 1.21" spellcheck="false" aria-label="搜索版本">
        </label>
        <button class="icon-button" id="refresh-versions" data-action title="刷新版本列表" aria-label="刷新版本列表">${icon('refresh')}</button>
      </div>
      <div class="filter-row">
        <div class="chip-row" id="version-type-chips">${typeChips}</div>
        <span class="filter-spacer"></span>
        <label class="select-chip">
          <span>加载器</span>
          <span class="select-wrap">
            <select id="loader-select" aria-label="模组加载器">${loaderOptions}</select>
            ${icon('expandMore', 16)}
          </span>
        </label>
        <label class="select-chip">
          <span>下载源</span>
          <span class="select-wrap">
            <select id="source-select" aria-label="下载源">${sourceOptions}</select>
            ${icon('expandMore', 16)}
          </span>
        </label>
      </div>
    ` : `
      <div class="filter-row">
        <button class="btn outlined" id="refresh-versions" data-action>${icon('refresh')} 刷新</button>
        <button class="btn text" id="go-remote" data-action>浏览远程版本 ${icon('arrowForward')}</button>
      </div>
    `}

    <div class="list-card" id="version-list">${isRemote ? remoteListHtml() : installedListHtml()}</div>
  `;

  bindVersionEvents();
  updateActionAvailability();
  enhanceSelects(root);
}

function bindVersionEvents() {
  $('#version-tabs')?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-tab]');
    if (!button) return;
    state.versionTab = button.dataset.tab === 'remote' ? 'remote' : 'installed';
    savePrefs();
    renderVersions();
    if (state.versionTab === 'remote' && !state.versionsLoaded && !state.versionsLoading) {
      loadVersions();
    }
  });

  $('#go-remote')?.addEventListener('click', () => {
    state.versionTab = 'remote';
    savePrefs();
    renderVersions();
    if (!state.versionsLoaded) loadVersions();
  });

  $('#refresh-versions')?.addEventListener('click', () => {
    if (state.versionTab === 'remote') {
      loadVersions({ force: true });
    } else {
      refreshInstalled().then(() => {
        renderVersions();
        renderHome();
        toast('已刷新已安装版本', 'success');
      });
    }
  });

  $('#version-type-chips')?.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-type]');
    if (!chip) return;
    state.versionType = chip.dataset.type;
    renderVersions();
  });

  $('#version-search')?.addEventListener('input', (event) => {
    state.versionQuery = event.target.value;
    if (searchTimer) clearTimeout(searchTimer);
    searchTimer = setTimeout(renderVersionListOnly, 120);
  });

  $('#loader-select')?.addEventListener('change', (event) => {
    state.loader = event.target.value;
    renderVersionListOnly();
  });

  $('#source-select')?.addEventListener('change', (event) => {
    state.sourceOverride = event.target.value;
    renderVersionListOnly();
  });

  $('#version-list')?.addEventListener('click', (event) => {
    const installButton = event.target.closest('[data-install]');
    if (installButton) {
      installVersion(installButton.dataset.install);
      return;
    }

    const launchButton = event.target.closest('[data-launch]');
    if (launchButton) {
      state.selectedVersion = launchButton.dataset.launch;
      savePrefs();
      launchSelected();
      return;
    }

    const defaultButton = event.target.closest('[data-default]');
    if (defaultButton) {
      state.selectedVersion = defaultButton.dataset.default;
      savePrefs();
      renderVersions();
      renderHome();
      toast(`默认版本已切换为 ${state.selectedVersion}`, 'success');
      return;
    }

    if (event.target.closest('[data-go-remote]')) {
      state.versionTab = 'remote';
      savePrefs();
      renderVersions();
      if (!state.versionsLoaded) loadVersions();
      return;
    }

    if (event.target.closest('#retry-versions')) {
      loadVersions({ force: true });
    }
  });
}

function renderVersionListOnly() {
  const list = $('#version-list');
  if (!list) return;
  list.innerHTML = state.versionTab === 'remote' ? remoteListHtml() : installedListHtml();
}

function emptyState(iconName, title, body, actionHtml = '') {
  return `
    <div class="empty">
      <span class="empty-icon">${icon(iconName, 26)}</span>
      <strong>${escapeHtml(title)}</strong>
      <span>${escapeHtml(body)}</span>
      ${actionHtml}
    </div>`;
}

function installedListHtml() {
  if (!state.installed.length) {
    return emptyState(
      'layers',
      '还没有安装版本',
      '去远程版本列表挑一个 Minecraft 版本吧。',
      '<button class="btn tonal" data-go-remote data-action>浏览远程版本</button>',
    );
  }

  return state.installed.map((id) => `
    <div class="version-row">
      <span class="version-avatar">${escapeHtml(versionBadge(id))}</span>
      <div class="v-info">
        <strong>${escapeHtml(id)}</strong>
        <small>已安装到当前游戏目录${id === state.selectedVersion ? ' · 默认' : ''}</small>
      </div>
      <span class="assist-chip">${escapeHtml(versionKind(id))}</span>
      <div class="v-actions">
        <button class="btn text" data-default="${escapeHtml(id)}">设为默认</button>
        <button class="btn filled" data-launch="${escapeHtml(id)}" data-action>${icon('play', 18)}启动</button>
      </div>
    </div>
  `).join('');
}

function remoteListHtml() {
  if (state.versionsLoading) {
    return '<div class="loading"><span class="spinner"></span>正在获取版本清单…</div>';
  }

  if (state.versionsError) {
    return emptyState(
      'error',
      '获取版本清单失败',
      state.versionsError,
      '<button class="btn tonal" id="retry-versions" data-action>重试</button>',
    );
  }

  if (!state.versionsLoaded) {
    return emptyState(
      'download',
      '还没有加载远程版本',
      '需要联网从 Mojang 获取版本清单。',
      '<button class="btn tonal" id="retry-versions" data-action>加载版本清单</button>',
    );
  }

  const filtered = filteredVersions();
  if (!filtered.length) {
    return emptyState('search', '没有匹配的版本', '试试其他关键词或版本类型。');
  }

  const installedSet = new Set(state.installed);
  const rows = filtered.map((version) => {
    const installed = installedSet.has(version.id);
    return `
      <div class="version-row">
        <span class="version-avatar ${escapeHtml(version.type || '')}">${escapeHtml(versionBadge(version.id))}</span>
        <div class="v-info">
          <strong>${escapeHtml(version.id)}</strong>
          <small>${escapeHtml(TYPE_LABELS[version.type] || version.type || '未知类型')}${installed ? ' · 已安装' : ''}</small>
        </div>
        <span class="assist-chip">${escapeHtml(loaderLabel(state.loader))}</span>
        <div class="v-actions">
          ${installed ? `<button class="btn text" data-launch="${escapeHtml(version.id)}" data-action>启动</button>` : ''}
          <button class="btn ${installed ? 'outlined' : 'filled'}" data-install="${escapeHtml(version.id)}" data-action>${installed ? '重装' : '安装'}</button>
        </div>
      </div>`;
  }).join('');

  const total = filteredVersions(true).length;
  const note = total > filtered.length
    ? `<div class="list-note">匹配 ${total} 个版本，当前显示前 ${filtered.length} 个，输入关键词可继续缩小范围。</div>`
    : '';

  return rows + note;
}

function filteredVersions(ignoreCap = false) {
  const query = state.versionQuery.trim().toLowerCase();
  let list = state.versions;

  if (state.versionType === 'old') {
    list = list.filter((version) => version.type === 'old_beta' || version.type === 'old_alpha');
  } else if (state.versionType !== 'all') {
    list = list.filter((version) => version.type === state.versionType);
  }

  if (query) {
    list = list.filter((version) => String(version.id).toLowerCase().includes(query));
  }

  return ignoreCap ? list : list.slice(0, 300);
}

async function loadVersions({ force = false } = {}) {
  if (state.versionsLoading) return;
  if (state.versionsLoaded && !force) return;

  state.versionsLoading = true;
  state.versionsError = null;
  renderVersions();

  const result = await call('versions.list');

  state.versionsLoading = false;
  if (result.ok) {
    state.versions = Array.isArray(result.data?.versions) ? result.data.versions : [];
    state.versionsLoaded = true;
  } else {
    state.versionsError = result.error;
  }

  if (state.view === 'versions') renderVersions();
}

async function installVersion(version) {
  const loader = state.loader;
  const params = { version };
  if (loader) params.loader = loader;
  if (state.sourceOverride) params.download_source = state.sourceOverride;

  const label = `安装 ${version}${loader ? ` · ${loaderLabel(loader)}` : ''}`;
  const result = await runAction(label, () => api.request('install', params));

  if (!result.ok) {
    toast(`安装失败：${result.error}`, 'error');
    return;
  }

  state.selectedVersion = result.data?.version_id || version;
  state.versionTab = 'installed';
  savePrefs();

  await refreshInstalled();
  renderAll();
  toast(`安装完成：${state.selectedVersion}`, 'success');
}

/* ------------------------------------------------------------------ */
/* 账号页                                                              */
/* ------------------------------------------------------------------ */

function renderAccounts() {
  const root = $('#view-accounts');
  if (!root) return;

  const msa = state.accounts?.msa;
  const accounts = state.accounts?.accounts || [];
  const msaName = msa?.username || '尚未登录';

  root.innerHTML = `
    <div class="page-head">
      <div>
        <h2 class="page-title">账号</h2>
        <p class="page-sub">凭据由 LauncherCore 管理，同一系统用户下的所有实例共享。</p>
      </div>
    </div>

    <div class="accounts-grid">
      <div class="card-column">
      <section class="card">
        <div class="card-header">
          <span class="card-title">Microsoft 账号</span>
          <span class="badge ${state.authMode === 'msa' ? 'primary' : ''}">${state.authMode === 'msa' ? '启动账号' : '正版登录'}</span>
        </div>
        <div class="account-hero">
          ${avatarMarkup({ name: msaName, kind: 'msa', size: 'xl', skinKey: msaSkinKey(msa) })}
          <div style="min-width:0">
            <h3>${escapeHtml(msaName)}</h3>
            <p>${escapeHtml(msa?.uuid || '登录后自动刷新令牌')}</p>
          </div>
        </div>
        ${msa ? `
          <div class="section-actions">
            <button class="btn ${state.authMode === 'msa' ? 'tonal' : 'filled'}" id="use-msa">
              ${icon('check')} ${state.authMode === 'msa' ? '当前启动账号' : '使用此账号启动'}
            </button>
            <button class="btn outlined" id="msa-login" data-action>${icon('person')} 重新登录</button>
          </div>
        ` : `
          <button class="btn filled block" id="msa-login" data-action>
            ${icon('person')} 使用 Microsoft 登录
          </button>
        `}
        <p class="support">登录后会显示一个微软设备码，在浏览器中完成授权即可。</p>
      </section>

      <section class="card">
        <div class="card-header">
          <span class="card-title">离线账户</span>
          <span class="badge ${state.authMode === 'offline' ? 'primary' : ''}">${state.authMode === 'offline' ? '启动账号' : '本地'}</span>
        </div>
        <label class="field">
          <input class="field-input" id="offline-username" maxlength="16" value="${escapeHtml(state.offlineName)}" placeholder=" " autocomplete="off">
          <span class="field-label">离线用户名</span>
        </label>
        <div class="section-actions">
          <button class="btn ${state.authMode === 'offline' ? 'tonal' : 'filled'}" id="use-offline">
            ${icon('check')} ${state.authMode === 'offline' ? '当前启动账号' : '使用离线账户启动'}
          </button>
        </div>
        <p class="support">离线模式按用户名生成标准离线 UUID，不需要联网。</p>
      </section>
      </div>

      <div class="card-column">
      <section class="card">
        <div class="card-header">
          <span class="card-title">外置账号</span>
          <span class="badge ${state.authMode === 'external' ? 'primary' : 'tertiary'}">${state.authMode === 'external' ? '启动账号' : 'authlib-injector'}</span>
        </div>

        ${accounts.length ? `<div class="account-list">${accounts.map((account) => {
          const active = state.authMode === 'external' && account.identifier === state.externalAccount;
          return `
            <button class="account-item ${active ? 'is-selected' : ''}" data-external="${escapeHtml(account.identifier)}">
              ${avatarMarkup({ name: account.name || account.identifier, kind: 'external', skinKey: externalSkinKey(account) })}
              <span class="account-item-text">
                <strong>${escapeHtml(account.name || account.identifier)}</strong>
                <small>${escapeHtml(account.server_name || account.api_url)} · ${escapeHtml(account.identifier)}</small>
              </span>
              ${active ? icon('check', 20) : icon('chevronRight', 20)}
            </button>`;
        }).join('')}</div>`
          : emptyState('person', '还没有外置账号', '在下方填写服务器信息即可登录。', '')}

        <div class="form-grid">
          <label class="field">
            <input class="field-input" id="ext-identifier" placeholder=" " autocomplete="username">
            <span class="field-label">邮箱 / 用户名</span>
          </label>
          <label class="field">
            <input class="field-input" id="ext-password" type="password" placeholder=" " autocomplete="current-password">
            <span class="field-label">密码</span>
          </label>
          <label class="field">
            <input class="field-input" id="ext-api" placeholder=" ">
            <span class="field-label">API 地址</span>
          </label>
        </div>
        <div class="form-actions">
          <button class="btn filled" id="ext-login" data-action>${icon('add')} 登录 / 添加账号</button>
        </div>
        <p class="support">密码只通过 JSON 协议发送，不会写入磁盘或日志。账号有多个角色时会弹出选择框。点击账号即可设为启动账号。</p>
      </section>
      </div>
    </div>
  `;

  bindAccountEvents();
  updateActionAvailability();
}

function bindAccountEvents() {
  $('#msa-login')?.addEventListener('click', startMsaLogin);

  $('#use-msa')?.addEventListener('click', () => {
    if (!state.accounts?.msa) return;
    state.authMode = 'msa';
    savePrefs();
    renderAccounts();
    renderHome();
    toast('已切换为 Microsoft 账号启动', 'success');
  });

  $('#use-offline')?.addEventListener('click', () => {
    const input = $('#offline-username');
    state.offlineName = (input?.value || '').trim() || 'Player';
    state.authMode = 'offline';
    savePrefs();
    renderAccounts();
    renderHome();
    toast('已切换为离线账户启动', 'success');
  });

  $('#offline-username')?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') $('#use-offline')?.click();
  });

  $('#ext-login')?.addEventListener('click', () => {
    const identifier = $('#ext-identifier')?.value.trim();
    const password = $('#ext-password')?.value || '';
    const apiUrl = $('#ext-api')?.value.trim();

    if (!identifier) {
      toast('请填写邮箱或用户名', 'warn');
      return;
    }
    if (!password) {
      toast('请填写密码', 'warn');
      return;
    }
    if (!/^https?:\/\//i.test(apiUrl)) {
      toast('请填写以 http(s):// 开头的 API 地址', 'warn');
      return;
    }

    state.profiles = [];
    submitExternalLogin({ identifier, password, api_url: apiUrl });
  });

  $$('[data-external]').forEach((node) => {
    node.addEventListener('click', () => {
      state.externalAccount = node.dataset.external;
      state.authMode = 'external';
      savePrefs();
      renderAccounts();
      renderHome();
      toast('已切换外置账号', 'success');
    });
  });
}

async function startMsaLogin() {
  if (state.busy) {
    toast('已有操作正在进行，请稍候', 'warn');
    return;
  }

  state.profiles = [];
  const result = await runAction('登录 Microsoft 账号', () => api.request('login'));

  if (result.ok) {
    state.authMode = 'msa';
    savePrefs();
    await refreshAccounts();
    renderAll();
    toast(`已登录：${result.data?.username || 'Microsoft 账号'}`, 'success');
  } else {
    toast(`登录失败：${result.error}`, 'error');
  }
}

function waitForProfiles(timeout = 800) {
  if (state.profiles.length) return Promise.resolve(true);

  return new Promise((resolve) => {
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (profileWaiter === finish) profileWaiter = null;
      resolve(value);
    };
    const timer = setTimeout(() => finish(false), timeout);
    profileWaiter = finish;
  });
}

async function submitExternalLogin(pending, profile) {
  const params = {
    identifier: pending.identifier,
    password: pending.password,
    api_url: pending.api_url,
  };
  if (profile) params.profile = profile;

  state.profiles = [];
  state.externalPending = pending;
  const result = await runAction(
    profile ? '选择角色并登录外置账号' : '登录外置账号',
    () => api.request('external_login', params),
  );

  if (result.ok) {
    state.externalPending = null;
    state.externalAccount = pending.identifier;
    state.authMode = 'external';
    savePrefs();

    const loggedUuid = normalizeUuid(result.data?.uuid);
    if (loggedUuid) {
      const accountKey = externalSkinKey({ uuid: loggedUuid });
      delete state.skins[accountKey];
      delete state.skins[`profile:${loggedUuid}`];

      try {
        const skin = await Promise.race([
          api.getSkin({
            uuid: loggedUuid,
            apiUrl: result.data?.api_url,
            force: true,
          }),
          new Promise((resolve) => setTimeout(() => resolve(null), 4000)),
        ]);
        if (skin?.ok && skin.faces) {
          state.skins[`profile:${loggedUuid}`] = skin;
          state.skins[accountKey] = skin;
        }
      } catch {
        // hydrateSkins will retry and fall back to the letter avatar.
      }
    }

    await refreshAccounts();
    closeProfileModal();
    renderAll();
    toast(`外置账号已登录：${result.data?.name || pending.identifier}`, 'success');
    return;
  }

  if (/profile selection required/i.test(result.error || '')) {
    const ready = await waitForProfiles(800);
    if (ready && state.profiles.length) {
      state.externalPending = pending;
      showProfilePicker(state.profiles);
      return;
    }
  }

  state.externalPending = null;
  toast(`外置登录失败：${result.error}`, 'error');
}

function profileOptionsInner(profiles) {
  return profiles.map((profile) => `
    <button class="profile-option" data-profile-id="${escapeHtml(profile.id || profile.name)}">
      ${avatarMarkup({ name: profile.name || profile.id, kind: 'external', size: 'md', skinKey: profileSkinKey(profile) })}
      <span>
        <strong>${escapeHtml(profile.name || profile.id)}</strong>
        <small>${escapeHtml(profile.id || '')}</small>
      </span>
    </button>`).join('');
}

async function hydrateProfileSkins(profiles, apiUrl, modal) {
  const requests = profiles.map((profile) => ({
    key: profileSkinKey(profile),
    uuid: profile.id,
  })).filter((request) => request.key
    && request.uuid
    && state.skins[request.key] === undefined
    && !state.skinLoading.has(request.key));

  if (!requests.length) return;

  for (const request of requests) state.skinLoading.add(request.key);

  await Promise.all(requests.map(async (request) => {
    try {
      const result = await api.getSkin({ uuid: request.uuid, apiUrl: apiUrl || null });
      state.skins[request.key] = result?.ok && result.faces ? result : null;
    } catch {
      state.skins[request.key] = null;
    }
    state.skinLoading.delete(request.key);
  }));

  const list = modal.root.querySelector('.profile-list');
  if (list) list.innerHTML = profileOptionsInner(profiles);

  // If an account with this profile is already listed, reuse the fetched skin.
  hydrateSkins();
}

function showProfilePicker(profiles) {
  closeProfileModal();

  const apiUrl = state.externalPending?.api_url || '';
  const modal = openModal({
    title: '选择角色',
    subtitle: '该外置账号下有多个角色，请选择要使用的角色。',
    body: `<div class="profile-list">${profileOptionsInner(profiles)}</div>`,
    width: 420,
    onClose: () => {
      if (state.profileModal === modal) state.profileModal = null;
    },
  });

  state.profileModal = modal;

  modal.root.querySelector('.profile-list')?.addEventListener('click', (event) => {
    const option = event.target.closest('[data-profile-id]');
    if (!option) return;
    const pending = state.externalPending;
    modal.close();
    state.profileModal = null;
    if (pending) submitExternalLogin(pending, option.dataset.profileId);
  });

  hydrateProfileSkins(profiles, apiUrl, modal);
}

function closeProfileModal() {
  if (state.profileModal) {
    state.profileModal.close();
    state.profileModal = null;
  }
}

/* ------------------------------------------------------------------ */
/* 设置页                                                              */
/* ------------------------------------------------------------------ */

function javaOptions(current) {
  const options = ['<option value="">自动选择（推荐）</option>'];

  for (const runtime of state.java) {
    options.push(
      `<option value="${escapeHtml(runtime.path)}" ${runtime.path === current ? 'selected' : ''}>Java ${escapeHtml(runtime.major ?? '?')} · ${escapeHtml(runtime.path)}</option>`,
    );
  }

  if (current && !state.java.some((runtime) => runtime.path === current)) {
    options.push(`<option value="${escapeHtml(current)}" selected>${escapeHtml(current)}</option>`);
  }

  return options.join('');
}

function renderSettings() {
  const root = $('#view-settings');
  if (!root) return;

  const settings = state.settings;
  if (!settings) {
    root.innerHTML = '<div class="loading"><span class="spinner"></span>正在读取设置…</div>';
    return;
  }

  const status = state.status;
  const sourceOptions = SOURCES.map((source) => `<option value="${source.value}" ${settings.downloadSource === source.value ? 'selected' : ''}>${source.label}</option>`).join('');
  const legacyGameDir = status.gameDirMode === 'cwd' && status.gameDir
    ? `<small>当前核心不支持 --game-dir，游戏文件实际位于 <span class="mono">${escapeHtml(status.gameDir)}</span>。</small>`
    : '';

  root.innerHTML = `
    <div class="page-head">
      <div>
        <h2 class="page-title">设置</h2>
        <p class="page-sub">修改核心路径、游戏目录和 Java 后，核心会自动重启并套用新配置。</p>
      </div>
      <button class="btn filled" id="save-settings">${icon('check')} 保存设置</button>
    </div>

    <div class="settings-grid">
      <div class="card-column">
      <section class="card">
        <div class="card-header"><span class="card-title">游戏目录</span><span class="badge">Minecraft</span></div>
        <div class="field-row">
          <label class="field">
            <input class="field-input" id="set-game-dir" value="${escapeHtml(settings.gameDir)}" placeholder=" " spellcheck="false">
            <span class="field-label">游戏文件夹</span>
          </label>
          <button class="btn outlined" id="browse-game-dir">选择</button>
        </div>
        <p class="card-sub">versions、libraries 与 assets 会存放在这里。切换目录会重启核心。${legacyGameDir}</p>
        <div class="section-actions">
          <button class="btn text" id="open-game-dir">${icon('folder')} 打开目录</button>
          <button class="btn text" id="open-logs">${icon('terminal')} 打开日志</button>
        </div>
      </section>

      <section class="card">
        <div class="card-header"><span class="card-title">下载与 Java</span><span class="badge">运行参数</span></div>
        <label class="field field-select">
          <select class="field-input" id="set-source">${sourceOptions}</select>
          <span class="field-label is-static">下载源</span>
          <span class="field-chevron">${icon('expandMore')}</span>
        </label>
        <label class="field field-select">
          <select class="field-input" id="set-runtime-select">${javaOptions(settings.runtime)}</select>
          <span class="field-label is-static">Java 运行时</span>
          <span class="field-chevron">${icon('expandMore')}</span>
        </label>
        <div class="field-row">
          <label class="field">
            <input class="field-input" id="set-runtime-path" value="${escapeHtml(settings.runtime)}" placeholder=" " spellcheck="false">
            <span class="field-label">自定义 java 路径（留空自动检测）</span>
          </label>
          <button class="btn outlined" id="browse-java">选择</button>
        </div>
        <label class="field">
          <input class="field-input" id="set-jvm" value="${escapeHtml(settings.jvmArgs)}" placeholder=" " spellcheck="false">
          <span class="field-label">默认 JVM 参数</span>
        </label>
        <p class="card-sub">已检测到 ${state.java.length} 个 Java 运行时。JVM 参数按空白字符切分，不支持引号。</p>
      </section>
      </div>

      <div class="card-column">
      <section class="card">
        <div class="card-header"><span class="card-title">启动器核心</span><span class="badge">LauncherCore</span></div>
        <div class="field-row">
          <label class="field">
            <input class="field-input" id="set-binary" value="${escapeHtml(settings.binaryPath)}" placeholder=" " spellcheck="false">
            <span class="field-label">mclc 可执行文件（留空自动）</span>
          </label>
          <button class="btn outlined" id="browse-binary">选择</button>
        </div>
        <label class="switch-row">
          <span class="switch-copy">
            <strong>自动下载核心</strong>
            <small>找不到时从 GitHub Releases 下载最新版本，并校验 SHA-256。</small>
          </span>
          <input type="checkbox" class="switch-input" id="set-autodownload" ${settings.autoDownloadCore ? 'checked' : ''}>
          <span class="switch-track"></span>
        </label>
        <div class="core-info">
          <div class="core-line"><span>状态</span><b>${escapeHtml(statusLabel(status.state))}</b></div>
          <div class="core-line"><span>版本</span><b>${escapeHtml(status.version || '—')}</b></div>
          <div class="core-line"><span>协议</span><b>${escapeHtml(status.protocol ?? '—')}</b></div>
          <div class="core-line"><span>可执行文件</span><b title="${escapeHtml(status.binaryPath || '')}">${escapeHtml(status.binaryPath || '—')}</b></div>
        </div>
        <div class="section-actions">
          <button class="btn outlined" id="restart-core">${icon('refresh')} 重启核心</button>
          <button class="btn danger" id="clear-core">${icon('delete')} 清除缓存</button>
        </div>
      </section>

      <section class="card">
        <div class="card-header"><span class="card-title">外观</span><span class="badge">Material 3</span></div>
        <div class="segmented theme-segmented" id="theme-mode">${themeButtonsHtml()}</div>
        <p class="theme-note">跟随系统会读取操作系统的浅色 / 深色设置。主题偏好保存在本机。</p>
        <div class="divider"></div>
        <div class="core-info">
          <div class="core-line"><span>应用</span><b>MossyLauncher</b></div>
          <div class="core-line"><span>核心</span><b>LauncherCore ${escapeHtml(status.version || '')}</b></div>
          <div class="core-line"><span>协议版本</span><b>${escapeHtml(status.protocol ?? '—')}</b></div>
          <div class="core-line"><span>数据目录</span><b title="${escapeHtml(state.paths?.userData || '')}">${escapeHtml(state.paths?.userData || '—')}</b></div>
        </div>
      </section>
      </div>
    </div>
  `;

  bindSettingsEvents();
  updateActionAvailability();
  enhanceSelects(root);
}

function bindSettingsEvents() {
  const executableFilters = state.paths?.platform === 'win32'
    ? [{ name: '可执行文件', extensions: ['exe'] }, { name: '所有文件', extensions: ['*'] }]
    : [{ name: '所有文件', extensions: ['*'] }];

  $('#browse-game-dir')?.addEventListener('click', async () => {
    try {
      const directory = await api.chooseDirectory();
      if (directory) $('#set-game-dir').value = directory;
    } catch (err) {
      toast(`选择目录失败：${err.message}`, 'error');
    }
  });

  $('#browse-binary')?.addEventListener('click', async () => {
    try {
      const file = await api.chooseFile({ filters: executableFilters });
      if (file) $('#set-binary').value = file;
    } catch (err) {
      toast(`选择文件失败：${err.message}`, 'error');
    }
  });

  $('#browse-java')?.addEventListener('click', async () => {
    try {
      const file = await api.chooseFile({ filters: executableFilters });
      if (!file) return;
      $('#set-runtime-path').value = file;
      const select = $('#set-runtime-select');
      if (select) {
        select.value = '';
        syncSelectTrigger(select);
      }
    } catch (err) {
      toast(`选择 Java 失败：${err.message}`, 'error');
    }
  });

  $('#set-runtime-select')?.addEventListener('change', (event) => {
    $('#set-runtime-path').value = event.target.value;
  });

  $('#theme-mode')?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-theme-mode]');
    if (button) setTheme(button.dataset.themeMode);
  });

  $('#save-settings')?.addEventListener('click', saveSettings);

  $('#open-game-dir')?.addEventListener('click', () => {
    const directory = effectiveGameDir() || $('#set-game-dir')?.value.trim();
    if (directory) openFolder(directory);
  });

  $('#open-logs')?.addEventListener('click', () => {
    const directory = effectiveGameDir() || $('#set-game-dir')?.value.trim();
    if (directory) openFolder(`${directory}/logs`);
  });

  $('#restart-core')?.addEventListener('click', restartCore);

  $('#clear-core')?.addEventListener('click', () => {
    confirmAction({
      title: '重新下载启动器核心',
      message: '这会删除已缓存的核心二进制，然后从 GitHub Releases 重新下载。正在进行中的操作会被中断。',
      confirmText: '删除并重新下载',
      onConfirm: clearCoreCache,
    });
  });
}

async function saveSettings() {
  const gameDir = $('#set-game-dir')?.value.trim();
  const runtime = $('#set-runtime-path')?.value.trim() || '';
  const button = $('#save-settings');

  if (!gameDir) {
    toast('游戏目录不能为空', 'warn');
    return;
  }

  const patch = {
    gameDir,
    binaryPath: $('#set-binary')?.value.trim() || '',
    autoDownloadCore: Boolean($('#set-autodownload')?.checked),
    downloadSource: $('#set-source')?.value || 'auto',
    runtime,
    jvmArgs: $('#set-jvm')?.value.trim() || '',
  };

  if (button) {
    button.disabled = true;
    button.innerHTML = `${icon('refresh')} 保存中…`;
  }

  try {
    const result = await api.setSettings(patch);
    state.settings = result.settings;
    state.sourceOverride = result.settings.downloadSource;

    if (result.restartError) {
      toast(`设置已保存，但核心启动失败：${result.restartError}`, 'error');
    } else if (result.restarted) {
      toast('设置已保存，核心已重启', 'success');
    } else {
      toast('设置已保存', 'success');
    }

    await refreshInstalled();
    renderAll();
  } catch (err) {
    toast(`保存失败：${err.message}`, 'error');
    if (button?.isConnected) {
      button.disabled = false;
      button.innerHTML = `${icon('check')} 保存设置`;
    }
  }
}

async function restartCore() {
  toast('正在重启核心…');
  try {
    await api.restartCore();
    toast('核心已重启', 'success');
  } catch (err) {
    toast(`重启失败：${err.message}`, 'error');
  }
}

async function clearCoreCache() {
  toast('正在删除缓存并重新下载核心…');
  try {
    await api.clearCoreCache();
    toast('核心已重新下载并启动', 'success');
  } catch (err) {
    toast(`重新下载失败：${err.message}`, 'error');
  }
}

async function openFolder(target) {
  try {
    await api.openPath(target);
  } catch (err) {
    toast(`无法打开目录：${err.message}`, 'error');
  }
}

/* ------------------------------------------------------------------ */
/* 设备码                                                              */
/* ------------------------------------------------------------------ */

function showDeviceCode(event) {
  closeDeviceModal();

  const uri = event.verification_uri || '';
  const deadline = Date.now() + (Number(event.expires_in) || 0) * 1000;
  let timer = null;

  const modal = openModal({
    title: '登录 Microsoft 账号',
    subtitle: '在浏览器中打开链接，并输入下面的设备码。',
    width: 470,
    body: `
      <div class="device-code">${escapeHtml(event.user_code || '--------')}</div>
      <div class="code-actions">
        <button class="btn outlined" id="copy-device-code">${icon('copy')} 复制代码</button>
        ${uri ? `<button class="btn filled" id="open-device-uri">${icon('open')} 打开登录页面</button>` : ''}
      </div>
      ${event.message ? `<p class="dialog-note">${escapeHtml(event.message)}</p>` : ''}
      <p class="dialog-note" id="device-countdown"></p>
      <p class="dialog-note">关闭这个窗口不会中断登录，完成后会弹出提示。</p>
    `,
    onClose: () => {
      if (timer) clearInterval(timer);
      if (state.deviceModal === modal) state.deviceModal = null;
    },
  });

  state.deviceModal = modal;

  const tick = () => {
    const node = modal.root.querySelector('#device-countdown');
    if (!node) return;
    const left = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
    node.textContent = left > 0
      ? `设备码将在 ${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')} 后过期`
      : '设备码已过期，请关闭窗口后重新点击登录。';
  };
  tick();
  timer = setInterval(tick, 1000);

  modal.root.querySelector('#copy-device-code')?.addEventListener('click', async () => {
    await copyText(event.user_code || '');
    toast('设备码已复制', 'success');
  });

  modal.root.querySelector('#open-device-uri')?.addEventListener('click', () => {
    api.openExternal(uri).catch((err) => toast(`无法打开链接：${err.message}`, 'error'));
  });
}

function closeDeviceModal() {
  if (state.deviceModal) {
    state.deviceModal.close();
    state.deviceModal = null;
  }
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    // fall through
  }

  const area = document.createElement('textarea');
  area.value = text;
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.append(area);
  area.select();
  document.execCommand('copy');
  area.remove();
}

/* ------------------------------------------------------------------ */
/* 模态框                                                              */
/* ------------------------------------------------------------------ */

function openModal({ title, subtitle = '', body = '', actions = '', width = 480, dismissible = true, onClose = null }) {
  const root = $('#modal-root');
  const scrim = document.createElement('div');
  scrim.className = 'modal-scrim';

  scrim.innerHTML = `
    <div class="dialog-wrap" style="max-width:${Number(width) || 480}px">
      <div class="dialog" role="dialog" aria-modal="true">
        ${dismissible ? `<button class="icon-button dialog-close" data-modal-close aria-label="关闭">${icon('close')}</button>` : ''}
        <h3 class="dialog-title">${escapeHtml(title)}</h3>
        ${subtitle ? `<p class="dialog-support">${escapeHtml(subtitle)}</p>` : ''}
        <div class="dialog-body">${body}</div>
        ${actions ? `<div class="dialog-actions">${actions}</div>` : ''}
      </div>
    </div>
  `;

  root.append(scrim);
  requestAnimationFrame(() => scrim.classList.add('show'));

  let closed = false;

  const close = () => {
    if (closed) return;
    closed = true;
    document.removeEventListener('keydown', onKey);
    scrim.classList.remove('show');
    setTimeout(() => scrim.remove(), 200);
    onClose?.();
  };

  const onKey = (event) => {
    if (event.key === 'Escape' && dismissible) close();
  };

  document.addEventListener('keydown', onKey);
  scrim.addEventListener('click', (event) => {
    if (event.target === scrim && dismissible) close();
  });
  scrim.querySelector('[data-modal-close]')?.addEventListener('click', close);

  return { root: scrim, close };
}

function confirmAction({ title, message, confirmText = '确认', type = 'danger', onConfirm }) {
  const modal = openModal({
    title,
    body: `<p class="dialog-note" style="font-size:14px;line-height:20px">${escapeHtml(message)}</p>`,
    width: 440,
    actions: `
      <button class="btn text" data-cancel>取消</button>
      <button class="btn ${type === 'danger' ? 'danger' : 'filled'}" data-confirm>${escapeHtml(confirmText)}</button>
    `,
  });

  modal.root.querySelector('[data-cancel]')?.addEventListener('click', () => modal.close());
  modal.root.querySelector('[data-confirm]')?.addEventListener('click', async () => {
    modal.close();
    await onConfirm();
  });
}

/* ------------------------------------------------------------------ */
/* 状态 / 进度                                                         */
/* ------------------------------------------------------------------ */

function renderStatus() {
  updateProgressUI();
}

function updateProgressUI() {
  const pill = $('#progress-pill');
  if (!pill) return;

  const progress = state.progress;
  const busy = state.busy || ['starting', 'downloading'].includes(state.status.state);

  if (!progress && !busy) {
    pill.hidden = true;
    updateActionAvailability();
    return;
  }

  pill.hidden = false;

  const phase = $('#progress-phase');
  const counts = $('#progress-counts');
  const track = $('#progress-track');
  const fill = $('#progress-fill');

  if (progress) {
    const total = Number(progress.total) || 0;
    const current = Number(progress.current) || 0;
    const hasTotal = total > 0;

    track?.classList.toggle('indeterminate', !hasTotal);
    if (fill) fill.style.width = hasTotal ? `${Math.min(100, (current / total) * 100)}%` : '0%';

    if (phase) phase.textContent = PHASE_LABELS[progress.phase] || progress.phase || '处理中';
    if (counts) {
      counts.textContent = progress.phase === 'core'
        ? (hasTotal ? `${formatBytes(current)} / ${formatBytes(total)}` : (progress.message || ''))
        : (hasTotal ? `${current} / ${total}` : (progress.message || ''));
    }
  } else {
    track?.classList.add('indeterminate');
    if (fill) fill.style.width = '0%';
    if (phase) {
      phase.textContent = state.actionLabel
        || (state.status.state === 'downloading' ? '下载核心' : '启动核心');
    }
    if (counts) counts.textContent = '';
  }

  updateActionAvailability();
}

function updateActionAvailability() {
  const usable = state.status.state === 'ready' && !state.busy;
  document.body.classList.toggle('is-busy', !usable);

  const play = $('#home-play');
  if (play) {
    play.disabled = Boolean(state.selectedVersion) && !usable;
    const label = play.querySelector('.play-label');
    if (label) {
      label.textContent = state.busy
        ? '执行中…'
        : state.selectedVersion
          ? '开始游戏'
          : '先去安装版本';
    }
  }
}

function addLog(level, message) {
  const text = String(message ?? '').trim();
  if (!text) return;

  state.logs.push({ level, message: text, time: new Date() });
  if (state.logs.length > 400) state.logs.shift();
}

function toast(message, type = 'info', timeout = 4200) {
  const root = $('#toast-root');
  if (!root) return;

  const element = document.createElement('div');
  element.className = `snackbar ${type}`;
  element.innerHTML = `${icon(type === 'error' ? 'error' : 'checkCircle', 20)}<span></span>`;
  element.querySelector('span').textContent = message;
  root.append(element);

  setTimeout(() => {
    element.style.transition = 'opacity .18s ease, transform .18s ease';
    element.style.opacity = '0';
    element.style.transform = 'translateY(8px)';
    setTimeout(() => element.remove(), 220);
  }, timeout);
}

/* ------------------------------------------------------------------ */
/* 汇总渲染                                                            */
/* ------------------------------------------------------------------ */

function renderAll() {
  renderHome();
  renderVersions();
  renderAccounts();
  renderSettings();
  renderStatus();
  updateThemeSegmented();
}
