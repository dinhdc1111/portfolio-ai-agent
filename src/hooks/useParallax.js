import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Reused vector — allocated once
const _offset = new THREE.Vector2()

/**
 * useMouseParallax
 *
 * Tracks normalised mouse position and returns a ref containing
 * the current { x, y } parallax offset (range roughly -1 to 1).
 *
 * Applying the offset to a THREE.Group position as an additive
 * nudge (multiplied by a small factor) creates a depth-parallax
 * effect where near objects move more than far ones.
 *
 * @returns {React.RefObject<{x: number, y: number}>}
 */
export const useMouseParallax = () => {
  const parallax = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      // Normalise to -1..1 relative to viewport center
      parallax.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2
      parallax.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return parallax
}
