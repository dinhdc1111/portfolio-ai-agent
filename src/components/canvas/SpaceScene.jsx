import { Suspense, useCallback, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Preload,
  PerformanceMonitor,
  PerspectiveCamera,
  Environment,
  AdaptiveDpr,
  AdaptiveEvents,
} from '@react-three/drei'
import * as THREE from 'three'

import StarField    from './ParticleField'   // upgraded StarField lives here
import GasPlanet    from './GasPlanet'
import Astronaut    from './Astronaut'
import Satellite    from './Satellite'
import DebrisField  from './DebrisField'
import CanvasLoader from './CanvasLoader'
import ScrollCameraDriver from '../../hooks/useScrollCamera'
import { useMouseParallax } from '../../hooks/useParallax'

// ── Parallax wrapper — nudges scene based on mouse position ────
const ParallaxScene = ({ children, scrollProgressRef }) => {
  const parallax   = useMouseParallax()
  const groupRef   = useRef()

  useFrame(() => {
    if (!groupRef.current) return
    // Additive offset on top of the scroll-driven camera
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      parallax.current.x * 0.12,
      0.03
    )
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      parallax.current.y * 0.08,
      0.03
    )
  })

  return (
    <>
      {/* Camera driver — must be a child of Canvas */}
      <ScrollCameraDriver scrollProgressRef={scrollProgressRef} />

      {/* Env + Performance helpers */}
      <Environment preset="night" environmentIntensity={0.3} background={false} />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      {/* Global dim ambient */}
      <ambientLight intensity={0.04} />

      {/* Distant sun — harsh side light */}
      <directionalLight
        position={[15, 8, -10]}
        intensity={3.5}
        color="#fff5e0"
      />

      {/* Parallax group — contains scene objects */}
      <group ref={groupRef}>
        {/* Starfield — not in parallax group so stars don't shift */}
        {children}
      </group>
    </>
  )
}

// ── Scene content ──────────────────────────────────────────────
const SceneContent = ({ scrollProgressRef }) => (
  <ParallaxScene scrollProgressRef={scrollProgressRef}>
    {/* Stars fill the full sphere — fixed relative to camera path */}
    <StarField />

    {/* Background gas planet */}
    <GasPlanet position={[14, -3, -22]} radius={5.5} />

    {/* Second smaller moon-like body */}
    <GasPlanet position={[-18, 6, -30]} radius={2.5} />

    {/* Debris cloud near projects section */}
    <DebrisField position={[4, 0.3, -0.5]} />

    {/* Hero objects — astronaut + satellite */}
    <Astronaut position={[0.6, -1.1, 0]} />
    <Satellite position={[2.2, 0.2, -1.2]} />
  </ParallaxScene>
)

// ── Main exported canvas ───────────────────────────────────────
const SpaceScene = ({ scrollProgressRef }) => {
  const [dprFloor, setDprFloor] = useState(1)
  const onDecline = useCallback(() => setDprFloor(0.75), [])
  const onIncline  = useCallback(() => setDprFloor(1),    [])

  return (
    <Canvas
      frameloop="always"
      dpr={[dprFloor, 2]}
      gl={{
        antialias: false,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false,
        outputColorSpace: 'srgb',
      }}
      shadows={false}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      {/* Default perspective camera — scroll hook will override each frame */}
      <PerspectiveCamera makeDefault position={[0, 0.2, 5.5]} fov={50} near={0.05} far={300} />

      <PerformanceMonitor factor={1} onDecline={onDecline} onIncline={onIncline}>
        <Suspense fallback={<CanvasLoader />}>
          <SceneContent scrollProgressRef={scrollProgressRef} />
        </Suspense>
      </PerformanceMonitor>

      <Preload all />
    </Canvas>
  )
}

export default SpaceScene
