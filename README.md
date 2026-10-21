<div align="center">
  <img src="assets/logo.png" width="96" alt="MossyLauncher logo">
</div>

# MossyLauncher

**A Material Design 3 desktop launcher for Minecraft, powered by [LauncherCore](https://github.com/HuanMeng-official/LauncherCore).**

[简体中文](README/README.zh_CN.md) · [MIT License](LICENSE)

MossyLauncher is the Electron front end for LauncherCore. It runs `mclc json` as a managed sidecar process and talks to it over newline-delimited JSON (NDJSON), so account sign-in, version installation, downloads, and game launches happen outside the renderer.

## Features

- **Home** — shows the active account and default version. Pick any installed version and launch the game.
- **Versions** — browse installed and remote versions, search and filter releases, snapshots, and legacy builds. Install vanilla Minecraft or Fabric, Quilt, Forge, and NeoForge, with a download source for each install.
- **Accounts** — Microsoft device-code sign-in, Yggdrasil / authlib-injector external accounts, multiple role selection, and local offline accounts. Choose which account to launch with.
- **Skins** — looks up public textures by UUID from Mojang or the external authentication server, crops all six faces plus the overlay layer in the main process, and renders 3D heads and a full-body preview. Both slim and classic models are supported; drag to rotate and double-click to reset.
- **Core management** — finds a local `mclc`, downloads the latest LauncherCore release when needed, verifies the SHA-256 digest published with the release, and restarts automatically when relevant settings change.
- **Settings** — game directory, core binary, download source, Java runtime, JVM arguments, appearance, and core maintenance.
- **Material 3 UI** — light, dark, and system themes, a navigation rail, custom select menus, a transient progress pill, snackbars, and dialogs.

## Requirements

- Windows 10 or 11. Linux and macOS code paths exist in the shell but have not been tested.
- Node.js 22+ with npm to run from source.
- A Java runtime. Installed runtimes are detected automatically, and a custom `java` path can be configured.
- Internet access for the initial core download, remote version metadata, Microsoft sign-in, and skin lookups.

## Getting started

```bash
npm install
npm start
```

On first launch MossyLauncher resolves the core in this order:

1. The `mclc` path configured in Settings
2. A bundled `resources/bin/mclc[.exe]` in packaged builds
3. `bin/mclc[.exe]` in the app/project directory
4. The cached `<userData>/bin/mclc[.exe]`
5. The latest GitHub Release, if auto-download is enabled

Then:

1. Open **Versions → Remote versions**, choose a Minecraft version and an optional mod loader, and install it.
2. Open **Accounts** and sign in with Microsoft, add an authlib-injector account, or use an offline username.
3. Return to **Home**, select the installed version, and press **Play**.

### `ELECTRON_RUN_AS_NODE`

If the environment sets `ELECTRON_RUN_AS_NODE=1`, Electron starts as plain Node.js and no window appears. Remove the variable for the launch:

```bash
# bash / zsh / Git Bash
env -u ELECTRON_RUN_AS_NODE npm start
```

```powershell
# PowerShell
Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
npm start
```

## Using MossyLauncher

| Page | What you can do |
| --- | --- |
| **Home** | See the current account, choose from installed versions, preview the character, and launch the game. |
| **Versions** | Switch between installed and remote versions, install or reinstall a version, set the default version, and launch directly. |
| **Accounts** | Sign in with Microsoft, add and select external accounts, or configure an offline account. The selected account is used for the next launch. |
| **Settings** | Change paths and runtime options, switch the theme, restart the core, or clear the cached core binary. |

Microsoft sign-in uses a device code: MossyLauncher displays the code, and you complete authorization in your browser. External accounts with more than one role open a role picker before sign-in finishes. Passwords are sent only to the local core process and are not written to app settings or logs.

## Configuration

| Option | Default | Description |
| --- | --- | --- |
| Game folder | `<userData>/game` | Where `versions`, `libraries`, and `assets` are stored. Changing it restarts the core. |
| Launcher core | Auto | Optional path to `mclc` / `mclc.exe`. Leave empty for automatic resolution. |
| Auto-download core | On | Download the latest LauncherCore release when no local binary is found. |
| Download source | Auto | Follows the official source and falls back to BMCLAPI. Can also be fixed to official or BMCLAPI. |
| Java runtime | Auto-detect | Choose a detected runtime or enter a custom `java` executable path. |
| JVM arguments | `-Xmx4G -XX:+UseG1GC` | Default arguments passed to the game JVM. Values are split on whitespace; quotes are not supported. |
| Theme | Follow system | Light, dark, or follow the operating system. |

On Windows, `<userData>` is `%APPDATA%\MossyLauncher`. Settings are saved to `<userData>/settings.json`, the default game folder is `<userData>/game`, and a downloaded core is cached in `<userData>/bin`. The exact data directory is shown in **Settings**.

Account credentials are managed by LauncherCore and shared by instances running under the same OS user. The Electron UI keeps its own preferences (theme, selected account, selected version) locally.

### Core compatibility

MossyLauncher checks whether the selected core supports `--game-dir`. Modern cores receive the game folder explicitly. Older cores run with that folder as their working directory and keep Minecraft data under `<gameFolder>/.minecraft`; Settings shows the effective path when this fallback is active.

## How it works

```text
┌──────────────────────┐
│ Renderer (sandboxed) │
│ HTML / CSS / ES      │
└──────────┬───────────┘
           │ window.mossy
┌──────────▼───────────┐         stdio / NDJSON        ┌────────────────┐
│ Electron main        │ ───────────────────────────> │ mclc json      │
│ CoreManager, skins   │ <─────────────────────────── │ LauncherCore   │
└──────────────────────┘                              └────────────────┘
```

- **Renderer** — plain HTML, CSS, and ES modules. There is no framework or bundler.
- **Preload** — exposes a narrow `window.mossy` API through `contextBridge`; context isolation and the sandbox are enabled.
- **CoreManager** — owns the sidecar lifecycle, serializes requests (the protocol allows one in flight at a time), performs the ready handshake, routes results and errors by request ID, and re-emits `log`, `progress`, `device_code`, and `profiles` events.
- **SkinService** — resolves profiles and downloads skin images in the main process where there is no CORS restriction, decodes the texture property, crops head and body faces, and returns render-ready images plus the slim/classic model variant.
- **IPC** — exposes only allowlisted core commands and validated dialog/shell helpers. External links open in the system browser; in-app navigation is blocked.

## Project structure

```text
.
├── assets/
│   ├── icon.ico              # Application icon
│   └── logo.png              # Rail logo
├── bin/                      # Optional local mclc binary
├── src/
│   ├── main.js               # Electron main process, windows, IPC
│   ├── preload.cjs           # contextBridge API
│   ├── core/
│   │   ├── core-manager.js   # Sidecar, NDJSON queue, core download
│   │   ├── settings.js       # settings.json store
│   │   └── skins.js          # Skin profile lookup, cropping, cache
│   └── renderer/
│       ├── index.html        # App shell
│       ├── app.js            # Views, state, skins, custom controls
│       ├── styles.css        # Material 3 tokens and components
│       └── theme-init.js     # Theme applied before first paint
├── README/
│   └── README.zh_CN.md       # Chinese documentation
├── package.json
└── LICENSE
```

## Troubleshooting

- **The app starts but no window appears.** Unset `ELECTRON_RUN_AS_NODE` and try again; see the note above.
- **The launcher core will not start.** Set the `mclc` path explicitly, enable auto-download, or use **Settings → Clear cache** to download a fresh core.
- **Remote versions fail to load.** Check network access and try the BMCLAPI download source.
- **Microsoft sign-in expires before it finishes.** Start sign-in again and complete the device-code flow in the browser.
- **No skin or 3D preview appears.** The account must expose public profile textures. External servers must provide an authlib-injector-compatible Yggdrasil profile endpoint. Sign in again to force a fresh lookup.
- **An older core ignores the selected game folder.** Update the core; legacy cores only support `<gameFolder>/.minecraft`.

## Development notes

There is no build step: `npm start` launches Electron and the renderer is loaded directly. Source changes require restarting the app; the UI does not hot-reload. No packaging configuration is included in this repository yet. When distributing, configure the executable icon with your chosen packager and include `assets/` and the resolved core binary.

## License

Released under the [MIT License](LICENSE).

Minecraft is a trademark of Mojang Studios. MossyLauncher is not affiliated with or endorsed by Mojang Studios or Microsoft.
