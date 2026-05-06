import { useEffect, useRef } from 'react'

const Hero = () => {
  const sectionRef = useRef(null)

  // Section entrance animation
  useEffect(() => {
    const el = sectionRef.current
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add('in-view'),
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="section-animate relative flex flex-col justify-between min-h-screen px-6 py-8 md:px-12 md:py-10 pointer-events-none select-none"
    >
      {/* ── Top status bar ─────────────────────────────────── */}
      <header className="flex items-center gap-4">
        <span className="data-readout flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full bg-[var(--signal)]"
            style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
          />
          LIVE
        </span>
        <span className="data-readout">TX-09</span>
        <span className="data-readout text-[var(--signal)]">◉ SIGNAL ACQUIRED</span>
        <span className="ml-auto data-readout opacity-60">47.2°N · 122.4°W</span>
      </header>

      {/* ── HUD corner decorations ─────────────────────────── */}
      <span className="hud-corner hud-corner--tl" />
      <span className="hud-corner hud-corner--tr" />
      <span className="hud-corner hud-corner--bl" />
      <span className="hud-corner hud-corner--br" />

      {/* ── Centre content ─────────────────────────────────── */}
      <div className="flex flex-col items-center text-center gap-6 my-auto pt-16">
        <p className="data-readout tracking-[0.3em] text-[var(--signal)]">
          LAST&nbsp;TRANSMISSION
        </p>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--white)' }}
        >
          Alex&nbsp;Chen
        </h1>

        <p
          className="text-lg md:text-2xl font-medium tracking-widest"
          style={{ color: 'var(--data)' }}
        >
          Interface&nbsp;Engineer&nbsp;&amp;&nbsp;Creative&nbsp;Developer
        </p>

        <p
          className="max-w-md text-sm md:text-base leading-relaxed opacity-70"
          style={{ color: 'var(--white)', fontFamily: 'var(--font-mono)' }}
        >
          Building immersive digital experiences from the edge of the known stack.
        </p>
      </div>

      {/* ── Bottom CTA ─────────────────────────────────────── */}
      <footer className="flex flex-col items-center gap-3 pb-4">
        <span
          className="data-readout text-[var(--signal)]"
          style={{ animation: 'blink 2s step-end infinite' }}
        >
          ↓ BEGIN TRANSMISSION
        </span>
        <span className="data-readout opacity-40">scroll to explore</span>
      </footer>
    </section>
  )
}

export default Hero
