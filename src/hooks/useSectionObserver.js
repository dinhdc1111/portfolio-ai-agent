import { useEffect } from 'react'
import usePortfolioStore from '../store/usePortfolioStore'

/**
 * Tracks which section is currently visible in the viewport
 * and updates the active section in global state.
 */
export const useSectionObserver = (sectionIds) => {
  const setActiveSection = usePortfolioStore((s) => s.setActiveSection)

  useEffect(() => {
    const observers = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.5 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sectionIds, setActiveSection])
}
