<div align="center">
  <img src="../assets/logo.png" width="96" alt="MossyLauncher Logo">
</div>

# MossyLauncher

**基于 [LauncherCore](https://github.com/HuanMeng-official/LauncherCore) 的 Minecraft 桌面启动器，使用 Material Design 3 设计。**

[English](../README.md) · [MIT 许可证](../LICENSE)

MossyLauncher 是 LauncherCore 的 Electron 前端。它把 `mclc json` 作为常驻子进程运行，通过按行分隔的 JSON（NDJSON）与其通信，让账号登录、版本安装、文件下载和游戏启动都在渲染进程之外进行。

## 特性

- **主页** — 显示当前账号和默认版本，可选择任意已安装版本并一键启动。
- **版本** — 浏览已安装版本和远程版本，支持搜索并筛选正式版、快照和旧版；可安装原版或 Fabric、Quilt、Forge、NeoForge，每次安装可单独选择下载源。
- **账号** — 支持 Microsoft 设备码登录、Yggdrasil / authlib-injector 外置账号、多角色选择和本地离线账号，并可随时切换启动账号。
- **皮肤** — 按账号 UUID 从 Mojang 或外置认证服务器获取公开皮肤纹理，在主进程中裁出六个面及帽子图层，并渲染 3D 头像和全身预览。支持 slim 与 classic 模型，可拖动旋转、双击复位。
- **核心管理** — 自动查找本地 `mclc`，缺失时下载最新 LauncherCore 版本，并校验版本附带的 SHA-256 摘要；相关设置变化后会自动重启核心。
- **设置** — 游戏目录、核心路径、下载源、Java 运行时、JVM 参数、外观和核心维护。
- **Material 3 界面** — 支持浅色、深色和跟随系统主题，以及导航栏、自定义下拉菜单、临时进度浮条、Snackbar 和对话框。

## 环境要求

- Windows 10 或 11。应用外壳包含 Linux 和 macOS 分支，但尚未在这些平台上测试。
- Node.js 22+ 及 npm（从源码运行）。
- Java 运行时。应用会自动检测已安装的 Java，也可手动指定路径。
- 首次下载核心、获取远程版本列表、Microsoft 登录和查询皮肤时需要联网。

## 快速开始

```bash
npm install
npm start
```

首次启动时，MossyLauncher 会按以下顺序查找核心：

1. 设置中指定的 `mclc` 路径
2. 打包版本中的 `resources/bin/mclc[.exe]`
3. 应用或项目目录下的 `bin/mclc[.exe]`
4. 用户数据目录中缓存的 `<userData>/bin/mclc[.exe]`
5. 启用自动下载时，从 GitHub Releases 获取最新版本

随后：

1. 打开 **版本 → 远程版本**，选择 Minecraft 版本和可选的模组加载器并安装。
2. 打开 **账号**，使用 Microsoft 登录、添加 authlib-injector 外置账号，或使用离线用户名。
3. 回到 **主页**，选择已安装版本，点击 **启动游戏**。

### `ELECTRON_RUN_AS_NODE`

如果运行环境中设置了 `ELECTRON_RUN_AS_NODE=1`，Electron 会以纯 Node.js 模式启动，窗口不会出现。请先在启动前移除该变量：

```bash
# bash / zsh / Git Bash
env -u ELECTRON_RUN_AS_NODE npm start
```

```powershell
# PowerShell
Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
npm start
```

## 使用说明

| 页面 | 功能 |
| --- | --- |
| **主页** | 查看当前账号、选择已安装版本、预览角色，并启动游戏。 |
| **版本** | 在已安装版本和远程版本之间切换，安装或重装版本、设置默认版本，也可以直接启动。 |
| **账号** | Microsoft 登录、添加并选择外置账号，或配置离线账号。下次启动会使用当前选中的账号。 |
| **设置** | 修改路径和运行参数、切换主题、重启核心，或清除已缓存的核心文件。 |

Microsoft 登录使用设备码：MossyLauncher 显示验证码，在浏览器中完成授权即可。外置账号有多个角色时，登录完成前会弹出角色选择框。密码只会发送给本地核心进程，不会写入应用设置或日志。

## 配置

| 选项 | 默认值 | 说明 |
| --- | --- | --- |
| 游戏目录 | `<userData>/game` | 存放 `versions`、`libraries` 和 `assets`。切换目录会重启核心。 |
| 启动器核心 | 自动 | 可指定 `mclc` / `mclc.exe` 路径；留空则自动查找。 |
| 自动下载核心 | 开启 | 找不到本地核心时，从 GitHub Releases 下载最新版本。 |
| 下载源 | 自动 | 优先官方源，失败后回退到 BMCLAPI；也可固定为官方或 BMCLAPI。 |
| Java 运行时 | 自动检测 | 选择已检测到的运行时，或填写自定义 `java` 可执行文件路径。 |
| JVM 参数 | `-Xmx4G -XX:+UseG1GC` | 传给游戏 JVM 的默认参数。按空白字符切分，不支持引号。 |
| 主题 | 跟随系统 | 浅色、深色或跟随操作系统。 |

在 Windows 上，`<userData>` 为 `%APPDATA%\MossyLauncher`。设置保存在 `<userData>/settings.json`，默认游戏目录为 `<userData>/game`，下载的核心缓存在 `<userData>/bin`。具体数据目录会显示在 **设置** 页中。

账号凭据由 LauncherCore 管理，同一系统用户下的多个实例共享。Electron 界面只在本地保存自己的偏好（主题、当前账号、当前版本等）。

### 核心兼容性

MossyLauncher 会检测所选核心是否支持 `--game-dir`。新版核心会直接收到游戏目录；旧版核心以该目录作为工作目录，并把 Minecraft 数据放在 `<游戏目录>/.minecraft`。触发此回退时，设置页会显示实际使用的路径。

## 工作原理

```text
┌──────────────────────┐
│ 渲染进程（已沙箱）   │
│ HTML / CSS / ES      │
└──────────┬───────────┘
           │ window.mossy
┌──────────▼───────────┐         stdio / NDJSON        ┌────────────────┐
│ Electron 主进程      │ ───────────────────────────> │ mclc json      │
│ CoreManager、皮肤    │ <─────────────────────────── │ LauncherCore   │
└──────────────────────┘                              └────────────────┘
```

- **渲染进程** — 使用原生 HTML、CSS 和 ES 模块，没有框架或打包器。
- **预加载脚本** — 通过 `contextBridge` 暴露范围受限的 `window.mossy` API；已启用上下文隔离和沙箱。
- **CoreManager** — 管理子进程生命周期，串行发送请求（协议同一时间只允许一个请求在途），完成 ready 握手，按请求 ID 分发结果和错误，并转发 `log`、`progress`、`device_code` 和 `profiles` 事件。
- **SkinService** — 在主进程中获取角色档案和皮肤图片（不受 CORS 限制），解析纹理属性，裁剪头部和身体各面，并返回可直接渲染的图片和 slim/classic 模型类型。
- **IPC** — 只开放白名单内的核心命令，以及经过校验的对话框和系统 Shell 接口。外链交给系统浏览器打开，应用内导航会被拦截。

## 项目结构

```text
.
├── assets/
│   ├── icon.ico              # 应用图标
│   └── logo.png              # 导航栏 Logo
├── bin/                      # 可选的本地 mclc 二进制
├── src/
│   ├── main.js               # Electron 主进程、窗口与 IPC
│   ├── preload.cjs           # contextBridge 接口
│   ├── core/
│   │   ├── core-manager.js   # 子进程、NDJSON 队列、核心下载
│   │   ├── settings.js       # settings.json 读写
│   │   └── skins.js          # 皮肤档案查询、裁剪与缓存
│   └── renderer/
│       ├── index.html        # 应用外壳
│       ├── app.js            # 视图、状态、皮肤与自定义控件
│       ├── styles.css        # Material 3 令牌与组件
│       └── theme-init.js     # 首帧前应用主题
├── README/
│   └── README.zh_CN.md       # 中文文档
├── package.json
└── LICENSE
```

## 常见问题

- **应用启动了但没有窗口。** 移除 `ELECTRON_RUN_AS_NODE` 环境变量后重试，见上文说明。
- **启动器核心无法启动。** 在设置中明确指定 `mclc` 路径、启用自动下载，或使用 **设置 → 清除缓存** 重新下载核心。
- **远程版本列表加载失败。** 检查网络连接，并尝试切换为 BMCLAPI 下载源。
- **Microsoft 登录还没完成就过期了。** 重新发起登录，并在浏览器中及时完成设备码流程。
- **没有显示皮肤或 3D 预览。** 账号必须提供公开的角色皮肤纹理；外置服务器需要提供兼容 authlib-injector 的 Yggdrasil 角色接口。重新登录可强制刷新查询。
- **旧版核心没有使用所选游戏目录。** 请更新核心；旧版核心仅支持 `<游戏目录>/.minecraft`。

## 开发说明

项目没有构建步骤：`npm start` 会直接启动 Electron 并加载渲染层。修改源码后需要重启应用，界面不会热重载。仓库目前不包含打包配置；分发时请使用你选择的打包工具配置可执行文件图标，并包含 `assets/` 和实际使用的核心文件。

## 许可证

本项目以 [MIT 许可证](../LICENSE) 发布。

Minecraft 是 Mojang Studios 的商标。MossyLauncher 与 Mojang Studios 或 Microsoft 没有隶属或背书关系。
