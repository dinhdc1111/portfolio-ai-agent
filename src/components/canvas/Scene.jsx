import { useRef, useCallback } from 'react'
import {
  PerspectiveCamera,
  Environment,
  OrbitControls,
  AdaptiveDpr,
  AdaptiveEvents,
} from '@react-three/drei'

/**
 * Scene — core R3F scene graph.
 *
 * Provides:
 *  - PerspectiveCamera (makeDefault) — replaces Canvas's default camera so
 *    other components can reference it with useThree().camera.
 *  - Environment (HDRI preset) — image-based lighting that affects all
 *    physically-based materials automatically.
 *  - OrbitControls — pointer-driven camera interaction with sensible limits.
 *  - AdaptiveDpr — lowers device pixel ratio while the camera is moving,
 *    restoring it once idle (free performance win on retina displays).
 *  - AdaptiveEvents — detaches raycaster events when the canvas is off-screen.
 *
 * @param {object}  props
 * @param {React.ReactNode} props.children     – scene content
 * @param {[number,number,number]} [props.cameraPosition=[0,0,4]]
 * @param {number}  [props.fov=50]
 * @param {number}  [props.near=0.1]
 * @param {number}  [props.far=200]
 * @param {string}  [props.envPreset='city']   – drei Environment preset name
 * @param {number}  [props.envIntensity=0.8]
 * @param {boolean} [props.autoRotate=false]
 * @param {number}  [props.autoRotateSpeed=0.5]
 * @param {boolean} [props.enableZoom=true]
 * @param {boolean} [props.enablePan=false]
 * @param {number}  [props.minPolarAngle=Math.PI/4]
 * @param {number}  [props.maxPolarAngle=Math.PI*(3/4)]
 */
const Scene = ({
  children,
  cameraPosition = [0, 0, 4],
  fov = 50,
  near = 0.1,
  far = 200,
  envPreset = 'city',
  envIntensity = 0.8,
  autoRotate = false,
  autoRotateSpeed = 0.5,
  enableZoom = true,
  enablePan = false,
  minPolarAngle = Math.PI / 4,
  maxPolarAngle = (Math.PI * 3) / 4,
}) => {
  const controlsRef = useRef()

  // Pause autoRotate when the user grabs the scene; resume on release.
  const handleStart = useCallback(() => {
    if (controlsRef.current) controlsRef.current.autoRotate = false
  }, [])

  const handleEnd = useCallback(() => {
    if (controlsRef.current) controlsRef.current.autoRotate = autoRotate
  }, [autoRotate])

  return (
    <>
      {/* ── Camera ─────────────────────────────────────────────── */}
      <PerspectiveCamera
        makeDefault
        position={cameraPosition}
        fov={fov}
        near={near}
        far={far}
      />

      {/* ── Environment / HDRI ────────────────────────────────── */}
      {/*
        `background={false}` keeps the scene bg transparent so CSS can
        show through (e.g. the dark #050816 portfolio background).
        Raise envIntensity for brighter reflections.
      */}
      <Environment
        preset={envPreset}
        environmentIntensity={envIntensity}
        background={false}
      />

      {/* ── Controls ──────────────────────────────────────────── */}
      <OrbitControls
        ref={controlsRef}
        makeDefault
        autoRotate={autoRotate}
        autoRotateSpeed={autoRotateSpeed}
        enableZoom={enableZoom}
        enablePan={enablePan}
        minPolarAngle={minPolarAngle}
        maxPolarAngle={maxPolarAngle}
        // Damp for a smooth, physical feel
        enableDamping
        dampingFactor={0.05}
        onStart={handleStart}
        onEnd={handleEnd}
      />

      {/* ── Performance helpers ───────────────────────────────── */}
      {/*
        AdaptiveDpr: during camera motion → DPR drops to 1 (or floor).
        After motion stops → DPR climbs back to the Canvas's dpr cap.
      */}
      <AdaptiveDpr pixelated />

      {/*
        AdaptiveEvents: pointer events (raycasting) are disconnected when
        the canvas element is not intersecting the viewport.
      */}
      <AdaptiveEvents />

      {/* ── Scene content ─────────────────────────────────────── */}
      {children}
    </>
  )
}

export default Scene
