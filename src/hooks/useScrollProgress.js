import { useEffect, useRef } from 'react'

/**
 * useScrollProgress
 *
 * Tracks page scroll position as a 0→1 value.
 * Returns a ref (not state) so the value is readable every frame
 * inside useFrame without triggering React re-renders.
 *
 * @returns {React.RefObject<number>}
 */
export const useScrollProgress = () => {
  const progress = useRef(0)

  useEffect(() => {
    const update = () => {
      const scrollTop  = window.scrollY
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight
      progress.current = docHeight > 0 ? scrollTop / docHeight : 0
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return progress
}
