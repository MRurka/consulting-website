/* ROI Calculator — section + multi-step flow
 * Data-driven so new verticals/paths drop in without UI changes.
 * Auto Repair · Path A is fully wired; other paths show a "Coming soon" gate.
 */

const { useState: useStateC, useEffect: useEffectC, useMemo: useMemoC, useRef: useRefC } = React;

/* =================================================================
   ICONS — tiny line glyphs per vertical (1.5px stroke, 24x24)
   ================================================================= */
const VerticalIcon = ({ kind, size = 24 }) => {
  const s = { width: size, height: size, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (kind) {
    case 'auto':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M3 14l1.5-4.5a2 2 0 0 1 1.9-1.4h11.2a2 2 0 0 1 1.9 1.4L21 14" />
          <rect x="3" y="14" width="18" height="4.5" rx="1" />
          <circle cx="7" cy="18.5" r="1.2" />
          <circle cx="17" cy="18.5" r="1.2" />
        </svg>
      );
    case 'lodge':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M3 21V11l9-6 9 6v10" />
          <path d="M3 21h18" />
          <path d="M9 21v-6h6v6" />
          <path d="M12 5v-2" />
        </svg>
      );
    case 'urn':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M8 7h8" />
          <path d="M7 7c0 5 1 8 2 11h6c1-3 2-6 2-11" />
          <path d="M9 4h6v3H9z" />
          <path d="M5 21h14" />
        </svg>
      );
    case 'leaf':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M5 19c0-8 5-14 14-14 0 9-5 14-14 14z" />
          <path d="M5 19c4-4 7-7 14-14" />
        </svg>
      );
    default:
      return null;
  }
};

/* =================================================================
   DATA MODEL
   ================================================================= */
const VERTICALS = [
  {
    id: 'auto',
    name: 'Auto Repair',
    icon: 'auto',
    monogram: 'AR',
    hook: 'How much deferred work and phone tag is costing you per year.',
    paths: [
      {
        id: 'A',
        active: true,
        title: 'Recover deferred work',
        short: 'Deferred work',
        teaser: '$150K–$200K typically left on the table',
        context: "How much revenue is sitting in declined work and idle bays, and what a structured follow-up could recover.",
        headline: 'Deferred work',
        sub: 'Most shops leave $150K–$200K on the table',
        fields: [
          { id: 'revenue', label: 'Annual shop revenue', kind: 'dollar', default: 800000, min: 200000, max: 5000000, step: 25000, format: 'k' },
          { id: 'techs', label: 'Number of technicians', kind: 'count', default: 4, min: 1, max: 20, step: 1 },
          { id: 'deferredRate', label: 'Jobs with deferred work noted', kind: 'pct', default: 30, notches: [10, 20, 30, 40, 50, 60] },
          { id: 'followupRate', label: 'Deferred work currently followed up on', kind: 'pct', default: 10, notches: [0, 5, 10, 20, 35, 50] },
        ],
        compute: (v) => {
          // Deferred recovery: revenue × deferred_rate × (0.15 - current_followup) × recovery_band
          const gap = Math.max(0, 0.15 - v.followupRate / 100);
          const deferredLow = v.revenue * (v.deferredRate / 100) * gap * 0.40;
          const deferredHigh = v.revenue * (v.deferredRate / 100) * gap * 0.65;
          return {
            primary: { low: Math.round(deferredLow), high: Math.round(deferredHigh) },
            primaryLabel: 'Recoverable annual revenue from deferred work',
            narrative: (lo, hi) =>
              `Your shop likely has ${lo}–${hi} in recoverable annual revenue from deferred work follow-up.`,
          };
        },
      },
      { id: 'B', active: false, title: 'Google discovery', short: 'Google reviews', teaser: '+5–9% clicks per 0.3 ★ bump', headline: 'Google discovery', sub: '+5–9% clicks per 0.3 ★ bump' },
      { id: 'C', active: false, title: 'Recurring revenue', short: 'Recurring revenue', teaser: '$50K–$150K/yr in plans & fleet', headline: 'Recurring revenue', sub: '$50K–$150K/yr in plans & fleet' },
    ],
  },
  {
    id: 'lodge',
    name: 'Fishing & Hunting Lodges',
    icon: 'lodge',
    monogram: 'FL',
    hook: 'See how much revenue your off-season and chaotic bookings are leaving behind.',
    paths: [
      { id: 'A', active: false, title: 'Booking chaos', short: 'Booking chaos', teaser: 'Errors at $3.5K each' },
      { id: 'B', active: false, title: 'Repeat guests', short: 'Repeat guests', teaser: '60–80% base, no system' },
      { id: 'C', active: false, title: 'Off-season revenue', short: 'Off-season', teaser: '6 idle months, full infrastructure' },
    ],
  },
  {
    id: 'funeral',
    name: 'Funeral Homes',
    icon: 'urn',
    monogram: 'FH',
    hook: "Canada's cremation rate is 77%. See what that's costing you — and where the margin is hiding.",
    paths: [
      { id: 'A', active: false, title: 'Pre-need pipeline', short: 'Pre-need', teaser: '77% cremation rate → pre-need is the lever' },
      { id: 'B', active: false, title: 'Case coordination', short: 'Coordination', teaser: '12+ hrs/case in admin' },
      { id: 'C', active: false, title: 'Online discovery', short: 'Online', teaser: 'Chosen at 11pm, on mobile' },
    ],
  },
  {
    id: 'grower',
    name: 'Wholesale Plant Growers',
    icon: 'leaf',
    monogram: 'WG',
    hook: 'See what overproduction waste and manual orders are costing your operation.',
    paths: [
      { id: 'A', active: false, title: 'Overproduction', short: 'Overproduction', teaser: '10–15% write-downs/year' },
      { id: 'B', active: false, title: 'Order intake', short: 'Order intake', teaser: '12–16 wk peak, manual entry' },
      { id: 'C', active: false, title: 'Working capital', short: 'Capital', teaser: '$400–600K standing crop' },
    ],
  },
];

/* =================================================================
   FORMATTERS
   ================================================================= */
const fmtDollar = (n) => {
  if (n == null || isNaN(n)) return '$0';
  if (n >= 1000000) return `$${(n / 1000000).toFixed(n >= 10000000 ? 0 : 1)}M`;
  if (n >= 1000) return `$${Math.round(n / 1000)}K`;
  return `$${Math.round(n)}`;
};
const fmtDollarFull = (n) => {
  if (n == null || isNaN(n)) return '$0';
  return '$' + Math.round(n).toLocaleString('en-US');
};
const fmtPct = (n) => `${Math.round(n)}%`;
const fmtCount = (n) => Math.round(n).toLocaleString('en-US');

/* =================================================================
   SLIDER — notched & continuous variants share this primitive
   ================================================================= */
function CalcSlider({ field, value, onChange, isDefault }) {
  const isNotched = !!field.notches;
  const min = isNotched ? field.notches[0] : field.min;
  const max = isNotched ? field.notches[field.notches.length - 1] : field.max;
  const step = isNotched ? null : field.step;
  const defaultVal = field.default;

  const display = useMemoC(() => {
    if (field.kind === 'pct') return fmtPct(value);
    if (field.kind === 'dollar') return fmtDollar(value);
    return fmtCount(value);
  }, [value, field.kind]);

  const pct = ((value - min) / (max - min)) * 100;
  const defaultPct = ((defaultVal - min) / (max - min)) * 100;

  // Snap-tolerance for default mark: 4% of the range
  const snapTolerance = (max - min) * 0.04;

  const handleInput = (e) => {
    const raw = parseFloat(e.target.value);
    if (isNotched) {
      // notched sliders: snap to nearest notch
      let nearest = field.notches[0];
      let bestD = Math.abs(raw - nearest);
      for (const n of field.notches) {
        const d = Math.abs(raw - n);
        if (d < bestD) { bestD = d; nearest = n; }
      }
      onChange(nearest);
    } else {
      // continuous: snap to default if close
      if (Math.abs(raw - defaultVal) < snapTolerance) {
        onChange(defaultVal);
      } else {
        onChange(raw);
      }
    }
  };

  // Default-mark notch position (only for continuous sliders, since notched
  // sliders already include the default among their notches)
  const showDefaultMark = !isNotched && defaultVal != null;

  return (
    <div className="calc-field">
      <div className="calc-field__head">
        <label className="calc-field__label">{field.label}</label>
        <div className="calc-field__value-wrap">
          <span className="calc-field__value">{display}</span>
          <span className={`calc-field__avg-tag ${isDefault ? 'is-on' : ''}`}>Industry average</span>
        </div>
      </div>
      <div className="calc-slider-wrap">
        <div className="calc-slider-track">
          <div className="calc-slider-fill" style={{ width: `${pct}%` }} />
          {isNotched && field.notches.map((n) => {
            const np = ((n - min) / (max - min)) * 100;
            return <span key={n} className="calc-notch" style={{ left: `${np}%` }} />;
          })}
          {showDefaultMark && (
            <span
              className={`calc-default-mark ${isDefault ? 'is-on' : ''}`}
              style={{ left: `${defaultPct}%` }}
              title="Industry average"
            />
          )}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step || 'any'}
          value={value}
          onChange={handleInput}
          className="calc-slider-input"
          aria-label={field.label}
        />
      </div>
    </div>
  );
}

/* =================================================================
   COUNT-UP NUMBER — animates to target, used for output
   ================================================================= */
function CountUp({ value, format, duration = 600 }) {
  const [shown, setShown] = useStateC(value);
  const fromRef = useRefC(value);
  const startRef = useRefC(0);
  const rafRef = useRefC(0);
  useEffectC(() => {
    cancelAnimationFrame(rafRef.current);
    const from = fromRef.current;
    const to = value;
    startRef.current = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const cur = from + (to - from) * eased;
      setShown(cur);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, duration]);
  return <>{format(shown)}</>;
}

/* =================================================================
   STEP 1 — VERTICAL PICKER
   ================================================================= */
function VerticalPicker({ verticals, onPick, density }) {
  // density: 'grid' (default, gapped cards), 'list', 'compact'
  if (density === 'list') {
    return (
      <div className="calc-vert-list">
        {verticals.map((v, i) => (
          <button key={v.id} className="calc-vert-row" onClick={() => onPick(v)}>
            <span className="calc-vert-row__num">{String(i + 1).padStart(2, '0')}</span>
            <span className="calc-vert-row__icon"><VerticalIcon kind={v.icon} size={28}/></span>
            <span className="calc-vert-row__body">
              <span className="calc-vert-row__name">{v.name}</span>
              <span className="calc-vert-row__hook">{v.hook}</span>
            </span>
            <span className="calc-vert-row__arr">→</span>
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="calc-vert-grid calc-vert-grid--gapped">
      {verticals.map((v) => (
        <button key={v.id} className="calc-vert-tile" onClick={() => onPick(v)}>
          <span className="calc-vert-tile__icon"><VerticalIcon kind={v.icon} size={26}/></span>
          <span className="calc-vert-tile__name">{v.name}</span>
          <span className="calc-vert-tile__hook">{v.hook}</span>
          <span className="calc-vert-tile__arr">→</span>
        </button>
      ))}
    </div>
  );
}

/* =================================================================
   GOAL ROW — appears at top of flow page; lets user switch path
   ================================================================= */
function GoalRow({ vertical, currentPathId, onPick }) {
  return (
    <div className="calc-goals-wrap">
      <div className="calc-goals-label">Your goal</div>
      <div className="calc-goals">
        {vertical.paths.map((p) => {
          const active = p.id === currentPathId;
          return (
            <button
              key={p.id}
              className={`calc-goal ${active ? 'is-active' : ''} ${!p.active ? 'is-disabled' : ''}`}
              onClick={() => p.active && !active && onPick(p)}
              disabled={!p.active}
              aria-pressed={active}
            >
              <span className="calc-goal__head">{p.headline || p.short || p.title}</span>
              <span className="calc-goal__sub">{p.sub || p.teaser}</span>
              {!p.active && <span className="calc-goal__soon">Soon</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =================================================================
   STEP 2 — PATH PICKER (legacy, no longer used in flow but kept for completeness)
   ================================================================= */
function PathPicker({ vertical, onPick, onBack }) {
  return (
    <div className="calc-paths">
      {vertical.paths.map((p, i) => (
        <button
          key={p.id}
          className={`calc-path ${p.active ? '' : 'calc-path--disabled'}`}
          onClick={() => p.active && onPick(p)}
          disabled={!p.active}
        >
          <span className="calc-path__num">{String.fromCharCode(65 + i)}</span>
          <span className="calc-path__body">
            <span className="calc-path__title">{p.title}</span>
            <span className="calc-path__teaser">{p.teaser}</span>
          </span>
          <span className="calc-path__arr">{p.active ? '→' : 'Soon'}</span>
        </button>
      ))}
    </div>
  );
}

/* =================================================================
   STEP 3 + 4 — INPUTS + LIVE OUTPUT (combined)
   ================================================================= */
function PathFlow({ vertical, path, onPathSwitch, onTalk, layout }) {
  const initial = useMemoC(() => Object.fromEntries(path.fields.map(f => [f.id, f.default])), [path]);
  const [values, setValues] = useStateC(initial);
  useEffectC(() => { setValues(initial); }, [initial]);

  const result = useMemoC(() => path.compute(values), [path, values]);

  const setField = (id, v) => setValues(prev => ({ ...prev, [id]: v }));
  const isDefault = (f) => values[f.id] === f.default;
  const allDefault = path.fields.every(isDefault);

  // Goal row appears at top of every layout
  const goalRow = onPathSwitch ? <GoalRow vertical={vertical} currentPathId={path.id} onPick={onPathSwitch}/> : null;

  // Layout-specific structure
  if (layout === 'split') {
    return (
      <div className="calc-flow calc-flow--split">
        <div className="calc-flow__form">
          {goalRow}
          <div className="calc-flow__context">{path.context}</div>
          <div className="calc-flow__fields">
            {path.fields.map(f => (
              <CalcSlider key={f.id} field={f} value={values[f.id]} onChange={v => setField(f.id, v)} isDefault={isDefault(f)} />
            ))}
          </div>
        </div>
        <aside className="calc-flow__output calc-flow__output--sticky">
          <OutputPanel result={result} onTalk={onTalk} variant="full" allDefault={allDefault} />
        </aside>
      </div>
    );
  }

  if (layout === 'stacked') {
    return (
      <div className="calc-flow calc-flow--stacked">
        {goalRow}
        <div className="calc-flow__context">{path.context}</div>
        <div className="calc-flow__output-top">
          <OutputPanel result={result} onTalk={onTalk} variant="banner" allDefault={allDefault} />
        </div>
        <div className="calc-flow__fields">
          {path.fields.map(f => (
            <CalcSlider key={f.id} field={f} value={values[f.id]} onChange={v => setField(f.id, v)} isDefault={isDefault(f)} />
          ))}
        </div>
        <div className="calc-flow__output-bottom">
          <OutputPanel result={result} onTalk={onTalk} variant="full" allDefault={allDefault} />
        </div>
      </div>
    );
  }

  if (layout === 'spec') {
    return (
      <div className="calc-flow calc-flow--spec">
        {goalRow}
        <div className="calc-flow__context calc-flow__context--spec">{path.context}</div>
        <div className="calc-spec">
          <table className="calc-spec__table">
            <tbody>
              {path.fields.map((f, i) => (
                <tr key={f.id}>
                  <td className="calc-spec__num">{String(i + 1).padStart(2, '0')}</td>
                  <td className="calc-spec__field">
                    <CalcSlider field={f} value={values[f.id]} onChange={v => setField(f.id, v)} isDefault={isDefault(f)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <OutputPanel result={result} onTalk={onTalk} variant="spec" allDefault={allDefault} />
        </div>
      </div>
    );
  }

  // default: 'inline' — output anchored at top, fields below
  return (
    <div className="calc-flow calc-flow--inline">
      {goalRow}
      <div className="calc-flow__output-top">
        <OutputPanel result={result} onTalk={onTalk} variant="hero" allDefault={allDefault} />
      </div>
      <div className="calc-flow__context">{path.context}</div>
      <div className="calc-flow__fields calc-flow__fields--two-col">
        {path.fields.map(f => (
          <CalcSlider key={f.id} field={f} value={values[f.id]} onChange={v => setField(f.id, v)} isDefault={isDefault(f)} />
        ))}
      </div>
    </div>
  );
}

/* =================================================================
   OUTPUT PANEL — variants used by different layouts
   ================================================================= */
function OutputPanel({ result, onTalk, variant, allDefault }) {
  if (variant === 'banner') {
    return (
      <div className="calc-out calc-out--banner">
        <div className="calc-out__eyebrow">{result.primaryLabel}</div>
        <div className="calc-out__range">
          <CountUp value={result.primary.low} format={fmtDollar}/> <span className="calc-out__dash">—</span> <CountUp value={result.primary.high} format={fmtDollar}/>
        </div>
      </div>
    );
  }
  if (variant === 'spec') {
    return (
      <div className="calc-out calc-out--spec">
        <div className="calc-out__row">
          <span>{result.primaryLabel}</span>
          <span className="calc-out__mono"><CountUp value={result.primary.low} format={fmtDollarFull}/> – <CountUp value={result.primary.high} format={fmtDollarFull}/></span>
        </div>
        <div className="calc-out__cta-row">
          <span className="calc-out__caveat">Estimate based on industry benchmarks. Your operation will vary.</span>
          <button className="btn btn--primary" onClick={onTalk}>Get a number for your business <span className="arr">→</span></button>
        </div>
      </div>
    );
  }
  if (variant === 'hero') {
    return (
      <div className="calc-out calc-out--hero">
        <div className="calc-out__eyebrow">{result.primaryLabel}</div>
        <div className="calc-out__big">
          <CountUp value={result.primary.low} format={fmtDollar}/>
          <span className="calc-out__sep"> — </span>
          <CountUp value={result.primary.high} format={fmtDollar}/>
        </div>
      </div>
    );
  }
  // 'full' — sidebar / bottom panel
  return (
    <div className="calc-out calc-out--full">
      <div className="calc-out__eyebrow">{result.primaryLabel}</div>
      <div className="calc-out__big">
        <CountUp value={result.primary.low} format={fmtDollar}/>
        <span className="calc-out__sep"> — </span>
        <CountUp value={result.primary.high} format={fmtDollar}/>
      </div>
      <div className="calc-out__divider"/>
      <p className="calc-out__caveat">
        Estimate based on industry benchmarks. Your actual results depend on your specific operation.
      </p>
      <button className="btn btn--primary calc-out__cta" onClick={onTalk}>
        Get a number for your business <span className="arr">→</span>
      </button>
    </div>
  );
}

/* =================================================================
   SECTION SHELL
   ================================================================= */
function CalculatorSection({ tweaks, onTalk }) {
  const layout = tweaks.calcLayout || 'inline'; // inline | split | stacked | spec
  const aesthetic = tweaks.calcAesthetic || 'cream-on-green';
  const verticalDisplay = layout === 'spec' ? 'list' : 'grid';

  const [step, setStep] = useStateC(0); // 0 = pick vertical, 2 = flow
  const [vertical, setVertical] = useStateC(null);
  const [path, setPath] = useStateC(null);

  // Reset on layout/aesthetic changes for cleaner exploration
  useEffectC(() => { setStep(0); setVertical(null); setPath(null); }, [layout, aesthetic]);

  const goVertical = (v) => {
    // Pick the first active path automatically; user can switch via goal-row
    const firstActive = v.paths.find(p => p.active) || v.paths[0];
    setVertical(v);
    setPath(firstActive);
    setStep(2);
  };
  const switchPath = (p) => { setPath(p); };
  const reset = () => { setStep(0); setVertical(null); setPath(null); };

  return (
    <section id="calculator" data-calc-aesthetic={aesthetic} data-calc-layout={layout} style={{ padding: 0, margin: '0 0 110px' }}>
      <div className="wrap">
        <div className="calc-shell reveal">
          {/* Header — title only, no breadcrumbs */}
          <div className="calc-shell__head">
            <div>
              <div className="eyebrow calc-shell__eyebrow">(04) See what's possible</div>
              <h2 className="h-section calc-shell__title">
                How much are you<br/>leaving on the table?
              </h2>
            </div>
          </div>

          {/* Body — animated step transitions */}
          <div className="calc-shell__body">
            {step === 0 && (
              <div className="calc-step calc-step--in">
                <div className="calc-substep-prompt">Pick your industry.</div>
                <VerticalPicker verticals={VERTICALS} onPick={goVertical} density={verticalDisplay}/>
              </div>
            )}
            {step === 2 && vertical && path && (
              <div className="calc-step calc-step--in">
                <div className="calc-substep-head">
                  <button className="calc-back" onClick={reset}>← Back</button>
                  <span className="calc-substep-vert">
                    <VerticalIcon kind={vertical.icon} size={16}/>
                    <span>{vertical.name}</span>
                  </span>
                </div>
                <PathFlow vertical={vertical} path={path} onPathSwitch={switchPath} onTalk={onTalk} layout={layout}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CalculatorSection });
