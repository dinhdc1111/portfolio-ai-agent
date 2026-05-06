import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Reusable vectors — allocated once, never re-created per frame.
const _pointer = new THREE.Vector2()
const _target = new THREE.Euler()

/**
 * useModelAnimation
 *
 * Combines three independent animations on a single mesh ref:
 *
 *  1. Floating — sinusoidal Y translation with configurable amplitude/frequency.
 *  2. Slow rotation — continuous Y-axis spin, configurable speed.
 *  3. Mouse tilt — the mesh tilts slightly toward the cursor; uses a
 *     lerp-based lag so the motion feels physical. Mouse influence is
 *     read from R3F's `pointer` (normalised -1..1) and mapped to a
 *     configurable max tilt angle.
 *
 * All three effects run inside a single `useFrame` callback (one RAF per
 * frame, no extra subscriptions).
 *
 * @param {object} options
 * @param {number} [options.floatAmplitude=0.15]  – peak Y offset in world units
 * @param {number} [options.floatFrequency=1.2]   – oscillations per second
 * @param {number} [options.rotateSpeed=0.4]       – radians per second (Y axis)
 * @param {number} [options.maxTilt=0.25]          – max tilt angle in radians
 * @param {number} [options.tiltLerp=0.05]         – interpolation factor (0–1)
 *
 * @returns {{ meshRef: React.RefObject<THREE.Mesh> }}
 */
export const useModelAnimation = ({
  floatAmplitude = 0.15,
  floatFrequency = 1.2,
  rotateSpeed = 0.4,
  maxTilt = 0.25,
  tiltLerp = 0.05,
} = {}) => {
  const meshRef = useRef()
  const { pointer } = useThree()

  useFrame(({ clock }, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    const t = clock.getElapsedTime()

    // 1. Floating — smooth sine wave on Y
    mesh.position.y = Math.sin(t * floatFrequency) * floatAmplitude

    // 2. Slow rotation — frame-rate independent via delta
    mesh.rotation.y += delta * rotateSpeed

    // 3. Mouse tilt — map normalised pointer to target Euler angles, then lerp
    //    pointer.x  →  tilt around Y (look left/right)
    //    pointer.y  →  tilt around X (look up/down), inverted for natural feel
    _target.x = -pointer.y * maxTilt
    _target.z = pointer.x * maxTilt * 0.5 // subtle roll for extra depth

    mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, _target.x, tiltLerp)
    mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, _target.z, tiltLerp)
  })

  return { meshRef }
}
