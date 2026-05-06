import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Hook that rotates a mesh continuously on Y and X axes.
 * @param {object} options
 * @param {number} [options.speedY=0.5] - Rotation speed on Y axis
 * @param {number} [options.speedX=0.2] - Rotation speed on X axis
 * @returns {{ meshRef: React.RefObject }}
 */
export const useRotation = ({ speedY = 0.5, speedX = 0.2 } = {}) => {
  const meshRef = useRef()

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * speedY
      meshRef.current.rotation.x += delta * speedX
    }
  })

  return { meshRef }
}
