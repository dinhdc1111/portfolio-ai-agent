import { useRef, Suspense, lazy } from 'react'
import { Navbar } from '../components/ui'
import { Hero, About, Projects, Skills, Contact } from '../components/sections'
import { useSectionObserver } from '../hooks/useSectionObserver'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { NAV_LINKS } from '../utils/constants'

// Lazy-load the heavy Three.js SpaceScene to keep the main chunk small
const SpaceScene = lazy(() => import('../components/canvas/SpaceScene'))

const sectionIds = NAV_LINKS.map((l) => l.id)

const Home = () => {
  useSectionObserver(sectionIds)
  const scrollProgressRef = useScrollProgress()

  return (
    <div style={{ background: 'var(--void)', color: 'var(--white)', minHeight: '100vh' }}>
      {/* Fixed full-screen 3D canvas — persists across all sections */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
        aria-hidden='true'
      >
        <Suspense fallback={null}>
          <SpaceScene scrollProgressRef={scrollProgressRef} />
        </Suspense>
      </div>

      {/* Scrollable HTML layer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />

        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>

        <footer
          className='border-t py-6 text-center'
          style={{ borderColor: 'rgba(0,255,178,0.12)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(240,244,255,0.35)' }}
        >
          <span>END OF TRANSMISSION &mdash; &copy; {new Date().getFullYear()} Alex Chen</span>
        </footer>
      </div>
    </div>
  )
}

export default Home