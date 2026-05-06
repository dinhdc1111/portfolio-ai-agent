import { SKILLS } from '../../utils/constants'
import { SectionWrapper, SectionHeader } from '../ui'

const SkillBar = ({ name, level }) => (
  <div>
    <div className="flex justify-between mb-1.5">
      <span className="text-sm font-medium text-gray-300">{name}</span>
      <span className="text-sm text-purple-400">{level}%</span>
    </div>
    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-700"
        style={{ width: `${level}%` }}
      />
    </div>
  </div>
)

const Skills = () => {
  return (
    <SectionWrapper id="skills">
      <SectionHeader
        eyebrow="What I Know"
        title="Skills"
        subtitle="Technologies and tools I work with regularly."
      />

      <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
        {SKILLS.map((skill) => (
          <SkillBar key={skill.name} {...skill} />
        ))}
      </div>
    </SectionWrapper>
  )
}

export default Skills
