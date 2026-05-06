import { create } from 'zustand'

const usePortfolioStore = create((set) => ({
  activeSection: 'home',
  isLoading: true,
  isMobileMenuOpen: false,

  setActiveSection: (section) => set({ activeSection: section }),
  setIsLoading: (value) => set({ isLoading: value }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}))

export default usePortfolioStore
