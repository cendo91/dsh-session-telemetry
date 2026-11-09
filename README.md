# Session telemetry

A small DSH Web UI plugin that renders a detailed telemetry card below the
composer, in `conversation.composer.dock`. It follows the active conversation
and summarises:

- **Current session** — whole-session turn and step counts, model/tool time,
  first-token latency, and decode speed.
- **Token usage** — cumulative uncached input, cache read, cache write, output,
  total, and cache-hit rate.
- **Context used** — a ring gauge for context occupancy, used/capacity figures,
  and a system/tools/messages composition bar.

When the plugin is active it replaces the shipped `activity` and `usage` pills
and hides the shipped context-occupancy ring, so the same figures are not shown
twice.

## Data sources

The card uses the composer dock's standard `useProjection` and `useSession`
props:

| Projection | Source | Used for |
| --- | --- | --- |
| `sessionStats` | `@deepseek-ai/dsh-session-stats` (inserted by this bundle) | turns, steps, LLM/tool time, decode speed |
| `tokenUsage` | `@deepseek-ai/dsh-token-meter` | input, cache, output tokens |
| `contextPressure` | `@deepseek-ai/dsh-token-meter` | context occupancy and capacity |
| `contextBreakdown` | `@deepseek-ai/dsh-token-meter` | system/tools/messages composition |

No new projection, tool, prompt section, model input, network request, or
session event is added. The plugin writes no DOM outside its own React tree.

## Presentation

- Uses only `--dsw-alias-*` theme tokens for surfaces, text, and borders.
- Localised through the Client locale service in English and Simplified
  Chinese; metadata is exported in `locale/en.json` and `locale/zh.json`.
- Bars and rings are inline SVG/CSS, not images or canvas.
- Accent colors use blue, red, yellow, green, and orange.
- The card shows detailed readings: model/tool time, first-token latency, output
  speed, uncached input, cache read/write, output, total, cache-hit rate, context
  occupancy, and the system/tools/messages composition.
- The outer border is omitted; sections are separated by divider lines.
- The context ring sits at the right of its section, and all three section bars
  share one baseline.
- The card fills the available composer width (up to
  `--dsh-composer-card-max-width`) and stacks its three sections below 560px.
- Respects `prefers-reduced-motion` for the running indicator.

## Install

Requirements: DeepSeek Harness 0.2.x with the Web UI. No build step or runtime
dependencies.

Open **Settings → Plugins → Add** and use one of:

```text
# npm
@cendo91/dsh-session-telemetry@1.0.0

# GitHub
github:cendo91/dsh-session-telemetry#v1.0.0

# local checkout (absolute path)
C:\path\to\session-telemetry
```

Refresh the page after installation. The bundle patch inserts the
`sessionStats` host projection and the Client plugin row.

## Limits

- The card follows the composer's current Session. Without a Session it renders
  nothing.
- Context occupancy appears only after the provider reports usage and the route
  reports a context window.
- `contextBreakdown` is the token meter's heuristic composition; it is an
  approximation and does not sum to provider-billed pressure.
- The context figure clamps the ring at 100% while the numeric numerator can
  exceed the capacity.
- Hiding the shipped context ring uses a narrowly scoped DOM/CSS compatibility
  rule; a future DSH composer redesign may require updating that selector.

---

## 中文说明

一个 DSH Web UI 插件，在输入框下方展示当前会话的详细遥测条：

- **当前会话**：轮次、步数、模型/工具耗时、首 token 延迟、输出速度
- **Token用量**：输入、缓存读、缓存写、输出、总计、缓存命中率
- **上下文已用**：占用环、已用/容量、系统/工具/消息构成
- 自适应宽度，窄屏自动纵向堆叠
- 启用时隐藏 DSH 自带的会话统计、Token 用量和上下文占用环，避免重复
- 五色强调色，中英文界面

安装：打开 **设置 → 插件 → 添加**，填入：

```text
@cendo91/dsh-session-telemetry@1.0.0
```

或使用 GitHub 地址 `github:cendo91/dsh-session-telemetry#v1.0.0`。安装后刷新页面。
