import { useEffect, useRef } from 'react'
import { PROJECTS } from '../../utils/constants'

const ProjectCard = ({ project }) => (
  <article
    className="relative p-6 rounded-sm border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-[var(--signal)]/40 transition-colors duration-300"
  >
    {/* HUD corners */}
    <span className="hud-corner hud-corner--tl" />
    <span className="hud-corner hud-corner--br" />

    {/* Coordinate tag */}
    <p className="data-readout text-[var(--signal)] mb-3">{project.coord}</p>

    <h3
      className="text-xl font-bold mb-3"
      style={{ fontFamily: 'var(--font-display)', color: 'var(--white)' }}
    >
      {project.title}
    </h3>

    <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--white)', opacity: 0.7 }}>
      {project.description}
    </p>

    {/* Tags */}
    <div className="flex flex-wrap gap-2 mb-6">
      {project.tags.map((tag) => (
        <span
          key={tag}
          className="px-2 py-0.5 text-xs rounded-sm border border-[var(--signal)]/30"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--signal)' }}
        >
          {tag}
        </span>
      ))}
    </div>

    {/* Links */}
    <div className="flex gap-4 pointer-events-auto">
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="data-readout hover:text-[var(--signal)] transition-colors"
      >
        [ GITHUB ]
      </a>
      <a
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        className="data-readout hover:text-[var(--signal)] transition-colors"
      >
        [ LIVE ]
      </a>
    </div>
  </article>
)

const Projects = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && el.classList.add('in-view'),
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-animate relative min-h-screen flex flex-col justify-center px-6 py-20 md:px-16 lg:px-28"
    >
      <span className="hud-corner hud-corner--tr" />
      <span className="hud-corner hud-corner--bl" />

      <div className="mb-10">
        <p className="data-readout text-[var(--signal)] mb-2">── RECOVERED ARTIFACTS ──</p>
        <h2
          className="text-4xl md:text-5xl font-bold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--white)' }}
        >
          Projects
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pointer-events-none">
        {PROJECTS.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </section>
  )
}

export default Projects
