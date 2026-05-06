import { Navbar } from '../components/ui'
import { Hero, About, Projects, Skills, Contact } from '../components/sections'
import { useSectionObserver } from '../hooks/useSectionObserver'
import { NAV_LINKS } from '../utils/constants'

const sectionIds = NAV_LINKS.map((l) => l.id)

const Home = () => {
  useSectionObserver(sectionIds)

  return (
    <div className="relative bg-[#050816] min-h-screen">
      <Navbar />
      <main>
        <Hero />
        {/* Gradient divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <About />
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <Projects />
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <Skills />
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <Contact />
      </main>
      <footer className="text-center py-8 text-gray-600 text-sm border-t border-white/5">
        © {new Date().getFullYear()} Portfolio. Built with React & Three.js.
      </footer>
    </div>
  )
}

export default Home
