window.__ModuleLoader__.load({
  id: '@cendo91/dsh-session-telemetry',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const NS = '@cendo91/dsh-session-telemetry';

    const EN = {
      title: 'Session telemetry',
      session: 'Current session',
      turns: 'turns',
      steps: 'steps',
      tokens: 'Token usage',
      input: 'input',
      cacheRead: 'cache read',
      cacheWrite: 'cache write',
      output: 'output',
      cacheHit: '{percent}% cached',
      cacheHitRate: 'Cache hit',
      total: 'Total',
      context: 'Context used',
      used: 'used',
      contextUsed: 'Occupancy',
      system: 'system',
      tools: 'tools',
      messages: 'messages',
      llm: 'model',
      toolTime: 'tools',
      ttft: 'First token',
      speedLabel: 'Speed',
      speed: '{value} tok/s',
      durationZero: '0s',
      durationSeconds: '{seconds}s',
      durationMinutes: '{minutes}m {seconds}s',
      durationHours: '{hours}h {minutes}m',
      noData: 'No data yet',
      noBreakdown: 'Breakdown unavailable',
      ariaTime: 'Model time {llm}; tool time {tool}',
      ariaTokens: '{total} tokens total: {input} input, {cache} cached, {output} output',
      ariaContext: '{percent}% of context used, {used} of {window} tokens',
    };

    const ZH = {
      title: '会话遥测',
      session: '当前会话',
      turns: '轮',
      steps: '步',
      tokens: 'Token用量',
      input: '输入',
      cacheRead: '缓存读',
      cacheWrite: '缓存写',
      output: '输出',
      cacheHit: '缓存 {percent}%',
      cacheHitRate: '缓存命中',
      total: '总计',
      context: '上下文已用',
      used: '已用',
      contextUsed: '占用',
      system: '系统',
      tools: '工具',
      messages: '消息',
      llm: '模型',
      toolTime: '工具',
      ttft: '首 token',
      speedLabel: '速度',
      speed: '{value} tok/s',
      durationZero: '0 秒',
      durationSeconds: '{seconds} 秒',
      durationMinutes: '{minutes} 分 {seconds} 秒',
      durationHours: '{hours} 小时 {minutes} 分',
      noData: '暂无数据',
      noBreakdown: '暂无构成数据',
      ariaTime: '模型耗时 {llm}；工具耗时 {tool}',
      ariaTokens: '共 {total} Token：输入 {input}，缓存 {cache}，输出 {output}',
      ariaContext: '上下文已用 {percent}%，{used} / {window} Token',
    };

    const CSS = `
.stele-root {
  --stele-blue: #2d6bff;
  --stele-red: #ff4d5e;
  --stele-yellow: #f5b700;
  --stele-green: #2fbf71;
  --stele-orange: #ff8a3d;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  width: var(--dsh-composer-card-max-width, 720px);
  max-width: 100%;
  min-width: 0;
  flex: 1 1 auto;
  padding: 4px 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 18px;
  font-variant-numeric: tabular-nums;
  container-type: inline-size;
  container-name: stele;
}
.stele-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1 1 0;
  min-width: 0;
  padding: 0 12px;
}
.stele-cell:first-child { padding-left: 2px; }
.stele-cell:last-child { padding-right: 2px; }
.stele-cell + .stele-cell { border-left: 1px solid var(--dsw-alias-border-l2); }
.stele-head {
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
  color: var(--dsw-alias-label-tertiary);
  font-size: 11px;
  line-height: 16px;
  letter-spacing: .02em;
  white-space: nowrap;
}
.stele-live {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex: none;
  background: var(--dsw-alias-label-tertiary);
}
.stele-live[data-running="true"] {
  background: var(--stele-green);
  animation: stele-pulse 1.8s ease-out infinite;
}
@keyframes stele-pulse {
  0% { box-shadow: 0 0 0 0 var(--stele-green); }
  70% { box-shadow: 0 0 0 5px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}
.stele-counts {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  height: 30px;
  white-space: nowrap;
  color: var(--dsw-alias-label-primary);
}
.stele-count {
  font-size: 17px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: -.01em;
}
.stele-unit {
  color: var(--dsw-alias-label-tertiary);
  font-size: 11px;
  line-height: 20px;
}
.stele-dot {
  color: var(--dsw-alias-border-l2);
  padding: 0 1px;
}
.stele-tokens-value {
  display: flex;
  align-items: center;
  height: 30px;
  color: var(--dsw-alias-label-primary);
  font-size: 17px;
  line-height: 20px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.stele-track {
  display: flex;
  width: 100%;
  height: 6px;
  border-radius: 999px;
  overflow: hidden;
  background: var(--dsw-alias-border-l1);
}
.stele-seg {
  height: 100%;
  min-width: 2px;
}
.stele-fill--input, .stele-fill--llm, .stele-fill--context {
  background: var(--stele-blue);
}
.stele-fill--cache, .stele-fill--tool, .stele-fill--messages {
  background: var(--stele-green);
}
.stele-fill--write, .stele-fill--tools {
  background: var(--stele-orange);
}
.stele-fill--system {
  background: var(--stele-yellow);
}
.stele-fill--output {
  background: var(--stele-red);
}
.stele-sub {
  color: var(--dsw-alias-label-tertiary);
  font-size: 10px;
  line-height: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.stele-context-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
  height: 30px;
}
.stele-ring {
  width: 30px;
  height: 30px;
  flex: none;
}
.stele-ring-track {
  fill: none;
  stroke: var(--dsw-alias-border-l1);
  stroke-width: 4;
}
.stele-ring-fill {
  fill: none;
  stroke: var(--stele-blue);
  stroke-width: 4;
  stroke-linecap: round;
  transition: stroke-dasharray .25s ease;
}
.stele-context[data-tone="warn"] .stele-ring-fill {
  stroke: var(--stele-yellow);
}
.stele-context[data-tone="danger"] .stele-ring-fill {
  stroke: var(--stele-red);
}
.stele-ring-text {
  fill: var(--dsw-alias-label-primary);
  font-size: 10.5px;
  font-weight: 600;
  font-family: inherit;
}
.stele-context-figures {
  flex: 1 1 auto;
  min-width: 0;
  color: var(--dsw-alias-label-primary);
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.stele-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 2px 8px;
  min-width: 0;
  color: var(--dsw-alias-label-tertiary);
  font-size: 10px;
  line-height: 14px;
}
.stele-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  white-space: nowrap;
}
.stele-swatch {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex: none;
}
.stele-detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4px 8px;
  margin: 2px 0 0;
  padding: 0;
}
.stele-detail {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px;
  min-width: 0;
}
.stele-detail dt {
  color: var(--dsw-alias-label-tertiary);
  font-size: 9px;
  line-height: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.stele-detail dd {
  margin: 0;
  color: var(--dsw-alias-label-primary);
  font-size: 10px;
  line-height: 14px;
  font-weight: 600;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.stele-root .stele-sub,
.stele-root .stele-legend {
  display: none;
}
html[data-session-telemetry] [data-composer-stat="activity"],
html[data-session-telemetry] [data-composer-stat="usage"] {
  display: none !important;
}
html[data-session-telemetry] div:has(> .stele-root) span:has(button[aria-haspopup="dialog"][aria-label*="%"]) {
  display: none !important;
}
html[data-session-telemetry] .GRgSLq_dock > span:has(button[aria-haspopup="dialog"][aria-label*="%"]) {
  display: none !important;
}
@container stele (max-width: 560px) {
  .stele-cell {
    flex: 1 1 100%;
    padding: 6px 0;
  }
  .stele-cell:first-child { padding-top: 0; }
  .stele-cell:last-child { padding-bottom: 0; }
  .stele-cell + .stele-cell {
    border-left: 0;
    border-top: 1px solid var(--dsw-alias-border-l2);
  }
}
@container stele (max-width: 380px) {
  .stele-detail-grid { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .stele-live[data-running="true"] { animation: none; }
}
`;

    function numberText(value) {
      return typeof value === 'number' && Number.isFinite(value)
        ? Math.round(value).toLocaleString()
        : '—';
    }

    function compact(value) {
      if (typeof value !== 'number' || !Number.isFinite(value)) return '—';
      const scaled = (candidate) => {
        const rounded = Math.round(candidate * 10) / 10;
        return rounded.toFixed(1).replace(/\.0$/, '');
      };
      if (Math.abs(value) >= 1e9) return `${scaled(value / 1e9)}B`;
      if (Math.abs(value) >= 1e6) return `${scaled(value / 1e6)}M`;
      if (Math.abs(value) >= 1e3) return `${scaled(value / 1e3)}K`;
      return String(Math.round(value));
    }

    function duration(ms, t) {
      if (typeof ms !== 'number' || !Number.isFinite(ms) || ms <= 0) return t('durationZero');
      const seconds = ms / 1000;
      if (seconds < 60) return t('durationSeconds', { seconds: compact(seconds) });
      const whole = Math.round(seconds);
      if (whole < 3600) {
        return t('durationMinutes', { minutes: Math.floor(whole / 60), seconds: whole % 60 });
      }
      return t('durationHours', {
        hours: Math.floor(whole / 3600),
        minutes: Math.floor((whole % 3600) / 60),
      });
    }

    function speedText(value) {
      if (!Number.isFinite(value)) return '—';
      return value >= 100 ? String(Math.round(value)) : String(Math.round(value * 10) / 10);
    }

    function percentage(part, total) {
      return total > 0 ? (part / total) * 100 : 0;
    }

    function Segments({ parts }) {
      return parts.map((part) => h('span', {
        key: part.key,
        className: `stele-seg stele-fill--${part.key}`,
        style: { width: `${part.width}%` },
        title: part.title,
      }));
    }

    function DetailGrid({ rows }) {
      return h('dl', { className: 'stele-detail-grid' },
        rows.filter((row) => row.value !== undefined).map((row) => h('div', {
          key: row.key,
          className: 'stele-detail',
        },
          h('dt', null, row.label),
          h('dd', { title: row.title ?? row.value }, row.value))));
    }

    function Ring({ percent, available }) {
      const radius = 15.5;
      const circumference = 2 * Math.PI * radius;
      return h('svg', {
        className: 'stele-ring',
        viewBox: '0 0 40 40',
        'aria-hidden': true,
      },
        h('circle', {
          className: 'stele-ring-track',
          cx: 20,
          cy: 20,
          r: radius,
        }),
        h('circle', {
          className: 'stele-ring-fill',
          cx: 20,
          cy: 20,
          r: radius,
          strokeDasharray: `${available ? circumference * percent / 100 : 0} ${circumference}`,
          transform: 'rotate(-90 20 20)',
        }),
        h('text', {
          className: 'stele-ring-text',
          x: 20,
          y: 23.5,
          'text-anchor': 'middle',
        }, available ? `${percent}%` : '—'));
    }

    function TelemetryView({ t: translate, stats, usage, pressure, breakdown, running }) {
      const t = typeof translate === 'function' ? translate : (key) => key;
      const hasUsage = usage != null;
      const uncachedInput = hasUsage ? usage.uncachedInputTokens : 0;
      const cacheRead = hasUsage ? usage.cacheReadTokens : 0;
      const cacheWrite = hasUsage ? usage.cacheWriteTokens : 0;
      const output = hasUsage ? usage.outputTokens : 0;
      const billedInput = uncachedInput + cacheRead + cacheWrite;
      const tokenTotal = billedInput + output;
      const cacheHit = billedInput > 0 ? Math.round(cacheRead / billedInput * 1000) / 10 : null;

      const used = pressure != null
        ? (pressure.projectedTokens !== undefined ? pressure.projectedTokens : pressure.pressureTokens)
        : undefined;
      const contextWindow = pressure != null ? pressure.contextWindow : undefined;
      const contextKnown = typeof used === 'number'
        && Number.isFinite(used)
        && typeof contextWindow === 'number'
        && Number.isFinite(contextWindow)
        && contextWindow > 0;
      const contextPercent = contextKnown
        ? Math.max(0, Math.min(100, Math.round(used / contextWindow * 100)))
        : 0;
      const contextTone = contextPercent >= 85 ? 'danger' : contextPercent >= 60 ? 'warn' : 'ok';

      const turns = stats != null ? stats.turns : 0;
      const steps = stats != null ? stats.steps : 0;
      const llmMs = stats != null ? stats.llmMs : 0;
      const toolMs = stats != null ? stats.toolMs : 0;
      const totalMs = llmMs + toolMs;
      const tokensPerSecond = stats != null && stats.decodeMs > 0
        ? stats.decodeTokens / (stats.decodeMs / 1000)
        : null;
      const hasStats = turns > 0 || steps > 0;
      const hasTokens = tokenTotal > 0;
      const firstTokenMs = stats != null && stats.ttftSteps > 0
        ? stats.ttftMs / stats.ttftSteps
        : null;

      const sessionDetails = [
        { key: 'model', label: t('llm'), value: duration(llmMs, t) },
        { key: 'tools', label: t('toolTime'), value: duration(toolMs, t) },
        { key: 'ttft', label: t('ttft'), value: firstTokenMs !== null ? duration(firstTokenMs, t) : '—' },
        {
          key: 'speed',
          label: t('speedLabel'),
          value: tokensPerSecond !== null ? t('speed', { value: speedText(tokensPerSecond) }) : '—',
        },
      ];

      const tokenDetails = [
        { key: 'input', label: t('input'), value: numberText(uncachedInput) },
        { key: 'cacheRead', label: t('cacheRead'), value: numberText(cacheRead) },
        { key: 'cacheWrite', label: t('cacheWrite'), value: numberText(cacheWrite) },
        { key: 'output', label: t('output'), value: numberText(output) },
        {
          key: 'cacheHit',
          label: t('cacheHitRate'),
          value: cacheHit !== null ? `${cacheHit}%` : '—',
        },
        { key: 'total', label: t('total'), value: numberText(tokenTotal) },
      ];

      const contextDetails = [
        {
          key: 'system',
          label: t('system'),
          value: breakdown != null ? numberText(breakdown.systemTokens) : '—',
        },
        {
          key: 'tools',
          label: t('tools'),
          value: breakdown != null ? numberText(breakdown.toolsTokens) : '—',
        },
        {
          key: 'messages',
          label: t('messages'),
          value: breakdown != null ? numberText(breakdown.messageTokens) : '—',
        },
        {
          key: 'used',
          label: t('contextUsed'),
          value: contextKnown ? `${compact(used)} / ${compact(contextWindow)}` : '—',
          title: contextKnown ? `${numberText(used)} / ${numberText(contextWindow)}` : undefined,
        },
      ];

      if (!hasStats && !hasTokens && !contextKnown) return null;

      const timeParts = totalMs > 0
        ? [
          { key: 'llm', value: llmMs, label: t('llm') },
          { key: 'tool', value: toolMs, label: t('toolTime') },
        ].filter((part) => part.value > 0).map((part) => ({
          ...part,
          width: percentage(part.value, totalMs),
          title: `${part.label} ${duration(part.value, t)}`,
        }))
        : [];

      const tokenParts = tokenTotal > 0
        ? [
          { key: 'input', value: uncachedInput, label: t('input') },
          { key: 'cache', value: cacheRead, label: t('cacheRead') },
          { key: 'write', value: cacheWrite, label: t('cacheWrite') },
          { key: 'output', value: output, label: t('output') },
        ].filter((part) => part.value > 0).map((part) => ({
          ...part,
          width: percentage(part.value, tokenTotal),
          title: `${part.label} ${numberText(part.value)}`,
        }))
        : [];

      const breakdownTotal = breakdown != null
        ? breakdown.systemTokens + breakdown.toolsTokens + breakdown.messageTokens
        : 0;
      const contextParts = contextKnown
        ? breakdownTotal > 0
          ? [
            { key: 'system', value: breakdown.systemTokens, label: t('system') },
            { key: 'tools', value: breakdown.toolsTokens, label: t('tools') },
            { key: 'messages', value: breakdown.messageTokens, label: t('messages') },
          ].filter((part) => part.value > 0).map((part) => ({
            ...part,
            width: contextPercent * part.value / breakdownTotal,
            title: `${part.label} ${numberText(part.value)}`,
          }))
          : [{
            key: 'context',
            value: used,
            width: contextPercent,
            title: `${t('used')} ${numberText(used)}`,
          }]
        : [];

      const timeSub = [
        `${t('llm')} ${duration(llmMs, t)}`,
        `${t('toolTime')} ${duration(toolMs, t)}`,
        tokensPerSecond !== null ? t('speed', { value: speedText(tokensPerSecond) }) : null,
      ].filter(Boolean).join(' · ');

      const tokenSub = [
        `${t('input')} ${compact(billedInput)}`,
        cacheHit !== null ? t('cacheHit', { percent: cacheHit }) : null,
        `${t('output')} ${compact(output)}`,
      ].filter(Boolean).join(' · ');

      const contextFigures = contextKnown
        ? `${compact(used)} / ${compact(contextWindow)}`
        : t('noData');

      const legend = contextKnown && breakdownTotal > 0
        ? [
          { key: 'system', value: breakdown.systemTokens, label: t('system') },
          { key: 'tools', value: breakdown.toolsTokens, label: t('tools') },
          { key: 'messages', value: breakdown.messageTokens, label: t('messages') },
        ].filter((part) => part.value > 0)
        : [];

      return h('div', {
        className: 'stele-root',
        role: 'group',
        'aria-label': t('title'),
      },
        h('div', { className: 'stele-cell stele-session' },
          h('div', { className: 'stele-head' },
            h('span', {
              className: 'stele-live',
              'data-running': running ? 'true' : 'false',
              'aria-hidden': true,
            }),
            h('span', null, t('session'))),
          h('div', { className: 'stele-counts' },
            h('span', { className: 'stele-count' }, String(turns)),
            h('span', { className: 'stele-unit' }, t('turns')),
            h('span', { className: 'stele-dot' }, '·'),
            h('span', { className: 'stele-count' }, String(steps)),
            h('span', { className: 'stele-unit' }, t('steps'))),
          h('div', {
            className: 'stele-track',
            role: 'img',
            title: timeSub,
            'aria-label': t('ariaTime', {
              llm: duration(llmMs, t),
              tool: duration(toolMs, t),
            }),
          }, h(Segments, { parts: timeParts })),
          h('div', { className: 'stele-sub', title: timeSub }, timeSub),
          h(DetailGrid, { rows: sessionDetails })),
        h('div', { className: 'stele-cell stele-tokens' },
          h('div', { className: 'stele-head' },
            h('span', null, t('tokens'))),
          h('div', { className: 'stele-tokens-value', title: numberText(tokenTotal) }, compact(tokenTotal)),
          h('div', {
            className: 'stele-track',
            role: 'img',
            title: tokenSub,
            'aria-label': t('ariaTokens', {
              total: numberText(tokenTotal),
              input: numberText(billedInput),
              cache: numberText(cacheRead),
              output: numberText(output),
            }),
          }, h(Segments, { parts: tokenParts })),
          h('div', { className: 'stele-sub', title: tokenSub }, tokenSub),
          h(DetailGrid, { rows: tokenDetails })),
        h('div', {
          className: 'stele-cell stele-context',
          'data-tone': contextTone,
        },
          h('div', { className: 'stele-head' },
            h('span', null, t('context'))),
          h('div', { className: 'stele-context-summary' },
            h('div', {
              className: 'stele-context-figures',
              title: contextFigures,
            }, contextFigures),
            h(Ring, { percent: contextPercent, available: contextKnown })),
          h('div', {
            className: 'stele-track',
            role: 'img',
            title: legend.length > 0
              ? legend.map((part) => `${part.label} ${compact(part.value)}`).join(' · ')
              : contextFigures,
            'aria-label': contextKnown
              ? t('ariaContext', {
                percent: contextPercent,
                used: numberText(used),
                window: numberText(contextWindow),
              })
              : t('noData'),
          }, h(Segments, { parts: contextParts })),
          legend.length > 0
            ? h('div', { className: 'stele-legend' },
              legend.map((part) => h('span', {
                key: part.key,
                className: 'stele-legend-item',
                title: numberText(part.value),
              },
                h('span', { className: `stele-swatch stele-fill--${part.key}`, 'aria-hidden': true }),
                `${part.label} ${compact(part.value)}`)))
            : h('div', { className: 'stele-sub' },
              contextKnown ? t('noBreakdown') : t('noData')),
          h(DetailGrid, { rows: contextDetails })));
    }

    function DockTelemetry({ t: translate, useProjection, useSession }) {
      const t = typeof translate === 'function' ? translate : (key) => key;
      const stats = useProjection('sessionStats');
      const usage = useProjection('tokenUsage');
      const pressure = useProjection('contextPressure');
      const breakdown = useProjection('contextBreakdown');
      const running = useSession((state) => state.running) === true;
      return h(TelemetryView, {
        t,
        stats,
        usage,
        pressure,
        breakdown,
        running,
      });
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(
          () => ctx.locale.register(NS, { en: EN, zh: ZH }),
          'session-telemetry: dictionaries',
        );
        ctx.effect(() => {
          if (typeof document === 'undefined') return undefined;
          const tag = document.createElement('style');
          tag.dataset.plugin = NS;
          tag.dataset.pluginCss = `${NS}/telemetry.css`;
          tag.textContent = CSS;
          document.head.appendChild(tag);
          return () => tag.remove();
        }, 'session-telemetry: styles');
        ctx.effect(() => {
          if (typeof document === 'undefined') return undefined;
          const root = document.documentElement;
          root.dataset.sessionTelemetry = 'true';
          return () => {
            delete root.dataset.sessionTelemetry;
          };
        }, 'session-telemetry: hide shipped context meter');
        ctx.slots.inject('conversation.composer.dock', () => ctx.slots.register({
          name: 'conversation.composer.dock',
          id: 'session-telemetry',
          order: 0,
          locale: NS,
        }, DockTelemetry));
      },
    };
  },
});
