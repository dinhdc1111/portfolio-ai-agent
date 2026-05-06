import { Suspense, useCallback, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload, PerformanceMonitor } from '@react-three/drei'
import Scene from './Scene'
import HeroSphere from './HeroSphere'
import ParticleField from './ParticleField'
import CanvasLoader from './CanvasLoader'

/**
 * HeroCanvas — production-ready full-viewport R3F canvas.
 *
 * Architecture
 * ─────────────
 * <Canvas>                    outer WebGL context, responsive via CSS
 *   <PerformanceMonitor>      dynamically degrades/upgrades quality
 *     <Suspense>              shows CanvasLoader while assets stream in
 *       <Scene>               camera + HDRI env + OrbitControls + perf helpers
 *         <ParticleField />   background geometry
 *         <HeroSphere />      featured 3D object
 *   <Preload all />           eagerly fetches all declared assets
 *
 * Performance strategy
 * ─────────────────────
 * - `frameloop="always"` required because OrbitControls autoRotates every frame.
 *   Switch to "demand" if you remove autoRotate.
 * - `dpr={[1, 2]}` caps pixel ratio on retina screens.
 * - AdaptiveDpr (inside Scene) halves the DPR while the camera is moving.
 * - PerformanceMonitor degrades DPR floor if FPS drops below threshold.
 * - `gl.powerPreference="high-performance"` requests the discrete GPU on
 *   multi-GPU systems (laptops).
 * - `gl.antialias={false}` — cheap MSAA is off; post-process AA can be added later.
 */

const HeroCanvas = () => {
  // PerformanceMonitor tracks FPS; this drives a DPR floor adjustment.
  const [dprFloor, setDprFloor] = useState(1)

  const onDecline = useCallback(() => setDprFloor(0.75), [])
  const onIncline = useCallback(() => setDprFloor(1), [])

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true" // decorative canvas — exclude from accessibility tree
    >
      <Canvas
        // ── Rendering ──────────────────────────────────────────
        frameloop="always"
        /*
         * dpr clamps the device pixel ratio between [floor, 2].
         * AdaptiveDpr (inside Scene) dynamically moves within this range.
         */
        dpr={[dprFloor, 2]}
        /*
         * gl options are passed directly to the WebGLRenderer constructor.
         *   antialias: false  → skip MSAA (expensive); add SMAA in post if needed.
         *   powerPreference   → request discrete GPU on dual-GPU machines.
         *   preserveDrawingBuffer: false → better perf (only enable for screenshots).
         */
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
          // Tone mapping is handled inside Scene via Environment; keep sRGB output.
          outputColorSpace: 'srgb',
        }}
        // ── Shadows ────────────────────────────────────────────
        shadows={false} // enable + set type if you add shadow-casting lights
        // ── Style ──────────────────────────────────────────────
        style={{ width: '100%', height: '100%', display: 'block' }}
        // ── Event config ───────────────────────────────────────
        // eventSource on window so pointer.x/y updates even when the cursor
        // is outside the canvas bounds — required for the mouse-tilt effect.
        eventSource={window}
        eventPrefix="client"
      >
        {/* Dynamic quality scaling — declines DPR if FPS < 50 */}
        <PerformanceMonitor
          factor={1}
          onDecline={onDecline}
          onIncline={onIncline}
        >
          <Suspense fallback={<CanvasLoader />}>
            <Scene
              cameraPosition={[0, 0, 4]}
              fov={50}
              near={0.1}
              far={200}
              envPreset="city"
              envIntensity={0.6}
              // autoRotate is OFF — the sphere self-rotates via useModelAnimation
              autoRotate={false}
              enableZoom={false}
              enablePan={false}
            >
              <ParticleField />
              <HeroSphere />
            </Scene>
          </Suspense>
        </PerformanceMonitor>

        {/* Preload all declared assets (textures, HDRIs, GLTFs) before render */}
        <Preload all />
      </Canvas>
    </div>
  )
}

export default HeroCanvas

