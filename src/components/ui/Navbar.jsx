import { useState } from 'react'
import { NAV_LINKS } from '../../utils/constants'
import usePortfolioStore from '../../store/usePortfolioStore'

const SignalBars = () => (
  <span className='flex items-end gap-[2px] h-4'>
    {[3, 5, 7, 9].map((h, i) => (
      <span
        key={i}
        className='w-[3px] rounded-sm bg-[var(--signal)] opacity-80'
        style={{ height: h + 'px' }}
      />
    ))}
  </span>
)

const Navbar = () => {
  const { activeSection, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } =
    usePortfolioStore()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    closeMobileMenu()
  }

  return (
    <nav
      className='fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 md:px-12'
      style={{ borderBottom: '1px solid rgba(0,255,178,0.12)', backdropFilter: 'blur(12px)', background: 'rgba(3,1,10,0.6)' }}
    >
      {/* Left: status indicator */}
      <div className='flex items-center gap-3'>
        <span
          className='w-2 h-2 rounded-full bg-[var(--signal)]'
          style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
        />
        <span className='data-readout hidden sm:inline'>LIVE</span>
        <span className='data-readout hidden sm:inline'>TX-09</span>
        <SignalBars />
      </div>

      {/* Desktop nav */}
      <ul className='hidden md:flex items-center gap-6'>
        {NAV_LINKS.map((link) => (
          <li key={link.id}>
            <button
              onClick={() => scrollTo(link.id)}
              className='group flex flex-col items-end leading-tight cursor-pointer bg-transparent border-none p-0'
            >
              <span
                className='data-readout text-[9px] opacity-50 group-hover:opacity-100 group-hover:text-[var(--signal)] transition-colors'
              >
                {link.tx}
              </span>
              <span
                className={'text-sm font-medium transition-colors ' + (activeSection === link.id ? 'text-[var(--signal)] signal-glow' : 'text-white/70 group-hover:text-white')}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {link.label}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className='md:hidden flex flex-col gap-1 cursor-pointer bg-transparent border-none p-1'
        onClick={toggleMobileMenu}
        aria-label='Toggle menu'
        aria-expanded={isMobileMenuOpen}
      >
        {[0,1,2].map((i) => (
          <span key={i} className='block w-5 h-px bg-[var(--signal)]' />
        ))}
      </button>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <div
          className='absolute top-full inset-x-0 flex flex-col gap-1 p-4 md:hidden'
          style={{ background: 'rgba(3,1,10,0.95)', borderBottom: '1px solid rgba(0,255,178,0.12)' }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className='flex justify-between items-center px-3 py-3 text-left cursor-pointer bg-transparent border-none w-full'
            >
              <span className='data-readout text-[var(--signal)]'>{link.tx}</span>
              <span style={{ fontFamily: 'var(--font-display)', color: 'var(--white)' }}>{link.label}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar