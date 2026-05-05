/* MobileCarousel — reusable mobile-only swipe carousel
   Renders only at ≤breakpoint via internal CSS gating. Callers render their
   desktop layout alongside; existing 720px media queries hide it on mobile.

   Props:
     items        — array of { num, title, body } (or anything, if renderItem given)
     renderItem   — (item, i) => ReactNode. Optional; defaults to the num/title/body card.
     autoMs       — auto-advance interval. Default 10000.
     breakpoint   — px. Default 720 (matches site mobile breakpoint).
     ariaLabel    — region label for a11y.
*/

const { useState: useStateMC, useEffect: useEffectMC, useRef: useRefMC, useCallback: useCallbackMC, useId: useIdMC } = React;

const MC_AUTO_MS = 10000;

function useMCAutoAdvance({ index, onAdvance, durationMs }) {
  const [progress, setProgress] = useStateMC(0);
  const startRef = useRefMC(0);
  const rafRef = useRefMC(0);
  const reduced = useRefMC(false);

  useEffectMC(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffectMC(() => {
    setProgress(0);
    if (reduced.current) return;
    startRef.current = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - startRef.current) / durationMs);
      setProgress(t);
      if (t >= 1) onAdvance();
      else rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [index, durationMs, onAdvance]);

  return progress;
}

function defaultMCRenderItem(item) {
  return (
    <div style={{
      padding: '32px 24px 28px',
      border: '1px solid var(--line)',
      borderRadius: 12,
      background: 'var(--bg)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ marginBottom: 28 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)' }}>{item.num}</span>
      </div>
      <h3 style={{
        fontFamily: 'var(--display)',
        fontWeight: 'var(--display-weight, 700)',
        letterSpacing: 'var(--display-tracking, -0.025em)',
        fontSize: 28,
        lineHeight: 1.05,
        marginBottom: 14,
        textWrap: 'balance',
      }}>{item.title}</h3>
      <p style={{ fontSize: 15.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>{item.body}</p>
    </div>
  );
}

function MobileCarousel({
  items,
  renderItem = defaultMCRenderItem,
  autoMs = MC_AUTO_MS,
  breakpoint = 720,
  ariaLabel,
}) {
  const [index, setIndex] = useStateMC(0);
  const advance = useCallbackMC(() => setIndex(i => (i + 1) % items.length), [items.length]);
  const progress = useMCAutoAdvance({ index, onAdvance: advance, durationMs: autoMs });

  const next = () => setIndex((index + 1) % items.length);
  const prev = () => setIndex((index - 1 + items.length) % items.length);

  const t = useT();
  const scrollerRef = useRefMC(null);
  const programmaticRef = useRefMC(false);
  const debounceRef = useRefMC(0);
  const uid = useIdMC().replace(/:/g, '');

  useEffectMC(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const slide = el.children[index];
    if (!slide) return;
    programmaticRef.current = true;
    el.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
    const tid = setTimeout(() => { programmaticRef.current = false; }, 600);
    return () => clearTimeout(tid);
  }, [index]);

  const onScroll = () => {
    if (programmaticRef.current) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const newIdx = Math.round(el.scrollLeft / w);
      if (newIdx !== index) setIndex(newIdx);
    }, 120);
  };

  return (
    <div className={`mc-root mc-${uid}`} role="region" aria-label={ariaLabel}>
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="mc-scroller"
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          marginLeft: 'calc(50% - 50vw)',
          marginRight: 'calc(50% - 50vw)',
          width: '100vw',
          paddingLeft: 22,
          paddingRight: 22,
          paddingBottom: 4,
          gap: 12,
        }}
      >
        {items.map((it, i) => (
          <div key={i} style={{ flex: '0 0 calc(100vw - 44px)', scrollSnapAlign: 'center' }}>
            {renderItem(it, i)}
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        alignItems: 'center',
        gap: 16,
        marginTop: 20,
      }}>
        {/* morph: gray dots → active bar with progress → black past dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 8 }}>
          {items.map((_, i) => {
            const isActive = i === index;
            const isPast = i < index;
            return (
              <div key={i} style={{
                flex: isActive ? 1 : '0 0 8px',
                height: 8,
                width: isActive ? undefined : 8,
                borderRadius: 999,
                background: isPast ? 'var(--ink)' : 'var(--line)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'flex 0.5s cubic-bezier(0.65, 0, 0.35, 1), background 0.4s',
              }}>
                {isActive && (
                  <div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0,
                    width: `${progress * 100}%`,
                    background: 'var(--ink)',
                    borderRadius: 999,
                  }}/>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={prev} aria-label={t('carousel.prev')} className="mc-btn-sq">‹</button>
          <button onClick={next} aria-label={t('carousel.next')} className="mc-btn-sq">›</button>
        </div>
      </div>

      <style>{`
        .mc-root { display: none; }
        @media (max-width: ${breakpoint}px) { .mc-root { display: block; } }
        .mc-scroller::-webkit-scrollbar { display: none; }
        .mc-btn-sq {
          width: 36px; height: 36px;
          border: 1px solid var(--line);
          background: transparent; color: var(--ink);
          font-size: 22px; line-height: 1; padding: 0;
          border-radius: 6px; cursor: pointer;
          font-family: var(--display);
          transition: border-color .2s, background .2s;
        }
        .mc-btn-sq:active { background: var(--ink); color: var(--bg); border-color: var(--ink); }
      `}</style>
    </div>
  );
}

window.MobileCarousel = MobileCarousel;
