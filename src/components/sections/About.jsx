import { useEffect, useRef } from 'react'
import { TIMELINE } from '../../utils/constants'

// Mission start date (for day counter)
const MISSION_START = new Date('2020-03-01')
const missionDay = () =>
  Math.floor((Date.now() - MISSION_START.getTime()) / 86_400_000)

const About = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && el.classList.add('in-view'),
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-animate relative min-h-screen flex flex-col justify-center px-6 py-20 md:px-16 lg:px-28"
    >
      {/* HUD corners */}
      <span className="hud-corner hud-corner--tl" />
      <span className="hud-corner hud-corner--br" />

      {/* Header */}
      <div className="mb-10">
        <p className="data-readout text-[var(--signal)] mb-2">── MISSION LOG ──</p>
        <h2
          className="text-4xl md:text-5xl font-bold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--white)' }}
        >
          About
        </h2>
        <p className="data-readout mt-1 opacity-60">Day {missionDay()} in orbit</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Bio */}
        <div>
          <p
            className="text-base md:text-lg leading-relaxed mb-6"
            style={{ color: 'var(--white)', opacity: 0.8 }}
          >
            I design and build immersive web interfaces—systems where code and creativity 
            converge into something that feels alive. With a background in physics and a 
            passion for real-time graphics, I specialise in React Three Fiber, generative 
            visuals, and high-performance frontend engineering.
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--white)', opacity: 0.65 }}
          >
            When not pushing pixels, I'm studying orbital mechanics, contributing to 
            open-source 3D libraries, or recording lo-fi tracks at 3 am.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { value: '47+', label: 'Projects' },
              { value: '5+',  label: 'Years' },
              { value: '12k', label: 'Commits' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p
                  className="text-3xl font-bold signal-glow"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--signal)' }}
                >
                  {s.value}
                </p>
                <p className="data-readout mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <p className="data-readout mb-6 text-[var(--signal)]">── CAREER TIMELINE ──</p>
          <ul className="relative border-l border-[var(--signal)] border-opacity-30 pl-6 space-y-8">
            {TIMELINE.map((item, i) => (
              <li key={i} className="relative">
                {/* Timeline dot */}
                <span
                  className="absolute -left-[27px] top-1 w-3 h-3 rounded-full border-2 border-[var(--signal)] bg-[var(--void)]"
                />
                <p className="data-readout text-[var(--signal)] mb-1">{item.year}</p>
                <p
                  className="font-semibold"
                  style={{ color: 'var(--white)', fontFamily: 'var(--font-display)' }}
                >
                  {item.role}
                </p>
                <p className="data-readout opacity-60">{item.place}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About
