# Developer handoff

## What this plugin is

`@cendo91/dsh-session-telemetry` adds a borderless telemetry strip below the
DSH composer. It is a client-only Web UI plugin with a no-op Host half.

## Integration points

- Host row: `session-telemetry` in `cordis.patch.yml`; package
  `@cendo91/dsh-session-telemetry`.
- The patch also inserts `@deepseek-ai/dsh-session-stats` as
  `session-telemetry-stats` so `sessionStats` is available even if the shipped
  row is disabled.
- Client slot: `conversation.composer.dock`, registration id
  `session-telemetry`, order 0.
- Standard props used: `useProjection`, `useSession`, locale `t`.
- Projections: `sessionStats`, `tokenUsage`, `contextPressure`,
  `contextBreakdown`.

## Hiding shipped duplicates

The shipped stats and token pills remain registered but are hidden by CSS:

```css
html[data-session-telemetry] [data-composer-stat="activity"],
html[data-session-telemetry] [data-composer-stat="usage"] { display: none !important; }
```

The shipped context ring is hidden with a narrow selector anchored to the
composer dock and the context button's percent-bearing aria label. The
`data-session-telemetry` attribute is set by a client effect and removed on
unload.

A future DSH composer redesign may change the dock structure or class hash; the
data-attribute rules for the pills are stable, the context-ring selector is the
fragile part.

## Layout

- `.stele-root` fills the composer width up to
  `--dsh-composer-card-max-width` (fallback 720px), with no outer border or
  background.
- Three sections separated by divider lines; stacked below 560px through a
  container query; detail grid becomes one column below 380px.
- Summary rows are 30px high so all three progress bars share a baseline.
- Context ring sits at the right of its summary row.

## Palette

Accent palette: `#2d6bff`, `#ff4d5e`, `#f5b700`, `#2fbf71`, `#ff8a3d`.
Text, dividers, and surfaces use `--dsw-alias-*` theme tokens.

## Before release

```powershell
npm run check
npm pack --dry-run
```

Then bump the version in `package.json` and `CHANGELOG.md`, commit, publish,
tag, and push. Do not commit tokens, `.npmrc`, local paths, or session data.

## Local installation state

The development bundle was originally installed as `@local/session-telemetry`
from this directory. The public package name is
`@cendo91/dsh-session-telemetry`; the old local link must be removed before
installing the renamed bundle to avoid two registrations with the same id.
