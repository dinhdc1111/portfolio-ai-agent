import { SectionWrapper, SectionHeader } from '../ui'

const About = () => {
  return (
    <SectionWrapper id="about">
      <SectionHeader
        eyebrow="Introduction"
        title="About Me"
        subtitle="I build fast, accessible, and beautiful web experiences."
      />

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Bio */}
        <div className="space-y-5 text-gray-300 leading-relaxed">
          <p>
            I'm a software engineer with a love for blending 3D graphics and
            modern web technologies. I specialize in React, Three.js, and
            Node.js to deliver immersive digital products.
          </p>
          <p>
            When I'm not coding, you'll find me exploring generative art,
            contributing to open-source, or experimenting with new rendering
            techniques.
          </p>
          <p>
            I'm currently open to freelance projects and full-time
            opportunities. Let's build something great together!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6">
          {[
            { label: 'Years Experience', value: '4+' },
            { label: 'Projects Shipped', value: '30+' },
            { label: 'Happy Clients', value: '20+' },
            { label: 'Coffee Cups', value: '∞' },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors"
            >
              <p className="text-4xl font-black text-purple-400">{value}</p>
              <p className="text-sm text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default About
