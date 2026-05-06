import { useEffect, useRef } from 'react'
import { SKILLS } from '../../utils/constants'

const polar = (angleDeg, level, radius, cx, cy) => {
  const r   = (level / 100) * radius
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

const CHART_SIZE = 320
const CENTER     = CHART_SIZE / 2
const MAX_RADIUS = CENTER - 24
const RINGS      = [25, 50, 75, 100]

const StarChart = () => {
  const points   = SKILLS.map((s) => polar(s.angle, s.level, MAX_RADIUS, CENTER, CENTER))
  const polyline = points.map((p) => p.x + ',' + p.y).join(' ')
  const axes     = SKILLS.map((s) => polar(s.angle, 100, MAX_RADIUS, CENTER, CENTER))

  return (
    <svg width={CHART_SIZE} height={CHART_SIZE} viewBox={'0 0 ' + CHART_SIZE + ' ' + CHART_SIZE} aria-label='Skills radar chart' className='mx-auto'>
      {RINGS.map((r) => (
        <circle key={r} cx={CENTER} cy={CENTER} r={(r / 100) * MAX_RADIUS} fill='none' stroke='rgba(0,255,178,0.1)' strokeWidth='1' />
      ))}
      {axes.map((ax, i) => (
        <line key={i} x1={CENTER} y1={CENTER} x2={ax.x} y2={ax.y} stroke='rgba(0,255,178,0.15)' strokeWidth='1' />
      ))}
      <polygon points={polyline} fill='rgba(0,255,178,0.07)' stroke='rgba(0,255,178,0.5)' strokeWidth='1.5' strokeLinejoin='round' />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r='4' fill='var(--signal)' />
          <circle cx={p.x} cy={p.y} r='7' fill='none' stroke='var(--signal)' strokeWidth='0.8' opacity='0.4' />
        </g>
      ))}
      {SKILLS.map((s, i) => {
        const lp = polar(s.angle, 115, MAX_RADIUS, CENTER, CENTER)
        return (
          <text key={i} x={lp.x} y={lp.y} textAnchor='middle' dominantBaseline='middle' fontSize='9' fontFamily='var(--font-mono)' fill='rgba(240,244,255,0.7)' letterSpacing='0.04em'>
            {s.name.toUpperCase()}
          </text>
        )
      })}
      <text x={CENTER} y={CENTER} textAnchor='middle' dominantBaseline='middle' fontSize='8' fontFamily='var(--font-mono)' fill='rgba(0,255,178,0.5)' letterSpacing='0.12em'>SYSTEMS</text>
    </svg>
  )
}

const Skills = () => {
  const sectionRef = useRef(null)
  useEffect(() => {
    const el = sectionRef.current
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && el.classList.add('in-view'), { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id='skills' ref={sectionRef} className='section-animate relative min-h-screen flex flex-col justify-center px-6 py-20 md:px-16 lg:px-28'>
      <span className='hud-corner hud-corner--tl' />
      <span className='hud-corner hud-corner--br' />
      <div className='mb-10'>
        <p className='data-readout text-[var(--signal)] mb-2'>── SYSTEMS ONLINE ──</p>
        <h2 className='text-4xl md:text-5xl font-bold' style={{ fontFamily: 'var(--font-display)', color: 'var(--white)' }}>Skills</h2>
      </div>
      <div className='flex flex-col lg:flex-row items-center gap-12'>
        <div className='flex-shrink-0'><StarChart /></div>
        <ul className='flex-1 space-y-4 w-full max-w-md'>
          {SKILLS.map((s) => (
            <li key={s.name}>
              <div className='flex justify-between mb-1'>
                <span className='text-sm font-medium' style={{ fontFamily: 'var(--font-mono)', color: 'var(--white)' }}>{s.name}</span>
                <span className='data-readout text-[var(--signal)]'>{s.level}%</span>
              </div>
              <div className='h-px w-full bg-white/10 relative overflow-hidden'>
                <div className='absolute inset-y-0 left-0 bg-[var(--signal)] opacity-70' style={{ width: s.level + '%' }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Skills