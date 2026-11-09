# DSH Session Telemetry — agent instructions

DeepSeek Harness Web UI plugin. This directory is the repository root.

- Current release: **1.0.0**
- Tested DSH: **0.2.2-rc.1**
- npm: `@cendo91/dsh-session-telemetry`
- GitHub: `cendo91/dsh-session-telemetry`

## Read first

- [`docs/handoff.md`](docs/handoff.md) — architecture, integration points, release checklist.
- [`CHANGELOG.md`](CHANGELOG.md) — release history.

## Files

```text
index.js          Host half: no-op bundle entry
client.js         Browser half: composer dock telemetry card, projections, styles
cordis.patch.yml  Bundle patch that inserts the plugin row
locale/en.json    Plugin display metadata (English)
locale/zh.json    Plugin display metadata (Chinese)
icon.svg          Plugin icon
README.md         User-facing install/usage/compatibility
CHANGELOG.md      Release history
docs/handoff.md   Detailed developer handoff
```

## Commands

```powershell
npm run check          # node --check index.js && node --check client.js
npm run pack:check     # npm pack --dry-run
```

Release (only when the user asks):

```powershell
npm version patch --no-git-tag-version
git add -A
git commit -m "chore: release X.Y.Z"
npm publish --access public
git tag vX.Y.Z
git push origin main
git push origin vX.Y.Z
```

## Rules

- The npm package and a local-path install share the bundle row id
  `session-telemetry`; install only one at a time.
- Host changes (`index.js`, patch, locale metadata) need a DSH restart;
  client changes (`client.js`) need a page refresh.
- Ask before publishing, pushing tags, or removing the installed bundle.
- Never commit tokens, `.npmrc`, session data, or local paths.
- Keep `README.md` and `CHANGELOG.md` current.
