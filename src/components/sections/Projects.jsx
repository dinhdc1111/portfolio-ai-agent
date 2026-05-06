import { PROJECTS } from '../../utils/constants'
import { SectionWrapper, SectionHeader } from '../ui'

const ProjectCard = ({ title, description, tags, github, live }) => (
  <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all hover:-translate-y-1">
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />

    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>

    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30"
        >
          {tag}
        </span>
      ))}
    </div>

    <div className="flex gap-4 relative z-10">
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-400 hover:text-white transition-colors underline underline-offset-2"
      >
        GitHub ↗
      </a>
      <a
        href={live}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-2"
      >
        Live Demo ↗
      </a>
    </div>
  </div>
)

const Projects = () => {
  return (
    <SectionWrapper id="projects">
      <SectionHeader
        eyebrow="My Work"
        title="Projects"
        subtitle="A selection of things I've built and shipped."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </SectionWrapper>
  )
}

export default Projects
