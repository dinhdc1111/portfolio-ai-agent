import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Procedural communication satellite built from primitive geometry.
 *
 * Structure:
 *   body      – main rectangular box
 *   solarL/R  – thin panel arrays on each side
 *   antenna   – cone + cylinder mast
 *   dish      – ring + cone dish
 *   blinker   – point light that blinks on 3-second interval
 */
const Satellite = ({ position = [1.8, 0.3, -1.5] }) => {
  const groupRef   = useRef()
  const blinkRef   = useRef()
  const blinkState = useRef({ on: true, timer: 0 })

  useFrame((_, delta) => {
    if (!groupRef.current) return

    // Slow passive drift + wobble
    const t = performance.now() / 1000
    groupRef.current.rotation.x = Math.sin(t * 0.18) * 0.04
    groupRef.current.rotation.z = Math.sin(t * 0.24) * 0.03

    // Antenna blink every ~3 seconds
    if (blinkRef.current) {
      blinkState.current.timer += delta
      if (blinkState.current.timer > 3.0) {
        blinkState.current.on = !blinkState.current.on
        blinkState.current.timer = 0
      }
      blinkRef.current.intensity = blinkState.current.on ? 1.2 : 0
    }
  })

  const bodyMat   = { color: '#90a4ae', roughness: 0.4, metalness: 0.6 }
  const panelMat  = { color: '#0d1b2a', roughness: 0.2, metalness: 0.8 }
  const cellMat   = { color: '#1565c0', roughness: 0.3, metalness: 0.5,
                      emissive: '#0a47a9', emissiveIntensity: 0.2 }

  return (
    <group ref={groupRef} position={position}>

      {/* ── Main body ─────────────────────────────────── */}
      <mesh>
        <boxGeometry args={[0.6, 0.45, 0.4]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>

      {/* Gold foil patches */}
      <mesh position={[0, 0, 0.205]}>
        <boxGeometry args={[0.5, 0.35, 0.01]} />
        <meshStandardMaterial color="#c8941e" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* ── Solar panels (2 wings) ────────────────────── */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.9, 0, 0]}>
          {/* Panel frame */}
          <mesh>
            <boxGeometry args={[0.55, 0.4, 0.015]} />
            <meshStandardMaterial {...panelMat} />
          </mesh>
          {/* Solar cells grid (2×3) */}
          {[[-0.14, 0.1], [0, 0.1], [0.14, 0.1],
            [-0.14,-0.1], [0,-0.1], [0.14,-0.1]].map(([cx, cy], i) => (
            <mesh key={i} position={[cx, cy, 0.009]}>
              <boxGeometry args={[0.1, 0.14, 0.001]} />
              <meshStandardMaterial {...cellMat} />
            </mesh>
          ))}
          {/* Arm connecting panel to body */}
          <mesh position={[side * -0.28, 0, 0]}>
            <boxGeometry args={[0.04, 0.04, 0.04]} />
            <meshStandardMaterial color="#607d8b" roughness={0.5} metalness={0.5} />
          </mesh>
        </group>
      ))}

      {/* ── Antenna mast ──────────────────────────────── */}
      <group position={[0, 0.36, 0]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.3, 8]} />
          <meshStandardMaterial color="#9e9e9e" roughness={0.3} metalness={0.9} />
        </mesh>
        {/* Blinking tip */}
        <mesh position={[0, 0.32, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial
            color="#ff3b3b"
            emissive="#ff3b3b"
            emissiveIntensity={1.5}
          />
        </mesh>
        <pointLight
          ref={blinkRef}
          color="#ff3b3b"
          intensity={1.2}
          distance={1.2}
          decay={2}
          position={[0, 0.32, 0]}
        />
      </group>

      {/* ── Dish antenna ──────────────────────────────── */}
      <group position={[-0.28, 0.24, 0.1]} rotation={[0.4, -0.3, 0]}>
        <mesh position={[0, 0, 0]}>
          <coneGeometry args={[0.18, 0.12, 16, 1, true]} />
          <meshStandardMaterial
            color="#90a4ae"
            roughness={0.3}
            metalness={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Dish arm */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.2, 6]} />
          <meshStandardMaterial color="#9e9e9e" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

    </group>
  )
}

export default Satellite
