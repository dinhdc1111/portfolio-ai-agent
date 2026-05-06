import { NAV_LINKS } from '../../utils/constants'
import usePortfolioStore from '../../store/usePortfolioStore'

const Navbar = () => {
  const { activeSection, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } =
    usePortfolioStore()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    closeMobileMenu()
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="text-white font-bold text-xl tracking-wide hover:text-purple-400 transition-colors"
        >
          Portfolio<span className="text-purple-400">.</span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === id
                    ? 'text-purple-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col gap-1.5 p-2 group"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform origin-center ${
              isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform origin-center ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <ul className="md:hidden flex flex-col bg-black/90 px-6 pb-4">
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`w-full text-left py-3 text-sm font-medium border-b border-white/10 transition-colors ${
                  activeSection === id ? 'text-purple-400' : 'text-gray-300'
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default Navbar
