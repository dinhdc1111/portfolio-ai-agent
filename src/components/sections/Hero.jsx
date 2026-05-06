import { lazy, Suspense } from 'react'

const HeroCanvas = lazy(() =>
  import('../canvas/HeroCanvas').then((m) => ({ default: m.default }))
)

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
        <div className="flex flex-col gap-4 max-w-xl">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-purple-500" />
            <div className="w-32 h-0.5 bg-gradient-to-r from-purple-500 to-transparent" />
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
            Hi, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Alex
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            A passionate full-stack developer crafting interactive digital
            experiences with code and creativity.
          </p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() =>
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors"
            >
              View My Work
            </button>
            <button
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-6 py-3 rounded-full border border-purple-400 text-purple-400 hover:bg-purple-400/10 font-semibold transition-colors"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-gray-400 flex justify-center pt-1">
          <div className="w-1 h-2 rounded-full bg-gray-400 animate-bounce" />
        </div>
      </button>
    </section>
  )
}

export default Hero
