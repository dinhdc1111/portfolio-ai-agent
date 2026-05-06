import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_PATH = '/models/Astronaut.glb'

// Random interval between waves (seconds)
function randWaveDelay() {
  return 8 + Math.random() * 7  // 8 – 15 s
}

const Astronaut = ({ position = [0, 0, 0], scale = 1 }) => {
  const groupRef = useRef()
  const { camera } = useThree()

  const { scene, animations } = useGLTF(MODEL_PATH)
  const { actions, mixer } = useAnimations(animations, groupRef)

  // Phase state: 'idle' | 'waving'
  const stateRef = useRef({ phase: 'idle', nextWaveAt: null })

  // Boot: play idle loop
  useEffect(() => {
    if (!actions?.idle) return
    actions.idle.reset().setLoop(THREE.LoopRepeat, Infinity).play()
    return () => Object.values(actions).forEach(a => a?.stop())
  }, [actions])

  // Wave finished → crossfade back to idle, schedule next wave
  useEffect(() => {
    if (!mixer || !actions?.wave) return
    const onFinished = ({ action }) => {
      if (action !== actions.wave) return
      const idle = actions.idle
      if (idle) {
        idle.reset().setLoop(THREE.LoopRepeat, Infinity)
        action.crossFadeTo(idle, 0.5, false)
        idle.play()
      }
      stateRef.current.phase = 'idle'
      stateRef.current.nextWaveAt = null   // will be set in useFrame on next tick
    }
    mixer.addEventListener('finished', onFinished)
    return () => mixer.removeEventListener('finished', onFinished)
  }, [mixer, actions])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    const s = stateRef.current

    // Initialise first wave timer once clock is running
    if (s.nextWaveAt === null && s.phase === 'idle') {
      s.nextWaveAt = t + randWaveDelay()
    }

    // Trigger wave when timer expires
    if (s.phase === 'idle' && s.nextWaveAt !== null && t >= s.nextWaveAt) {
      const wave = actions?.wave
      const idle = actions?.idle
      if (wave && idle) {
        s.phase = 'waving'
        wave.reset().setLoop(THREE.LoopOnce, 1)
        wave.clampWhenFinished = false
        idle.crossFadeTo(wave, 0.4, false)
        wave.play()
      }
    }

    // ── Face camera (Y-axis only, smooth lerp) ─────────────────
    const dx = camera.position.x - position[0]
    const dz = camera.position.z - position[2]
    const targetY = Math.atan2(dx, dz)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      0.04
    )

    // ── Organic zero-gravity float ──────────────────────────────
    // Primary vertical bob
    groupRef.current.position.y =
      position[1]
      + Math.sin(t * 0.55) * 0.14          // slow main bob
      + Math.sin(t * 1.45 + 0.9) * 0.028  // fast micro-oscillation

    // Subtle depth drift (forward/back)
    groupRef.current.position.z =
      position[2] + Math.sin(t * 0.40) * 0.08

    // Gentle attitude tilts (no Y — that's the face-camera axis)
    groupRef.current.rotation.z = Math.sin(t * 0.47) * 0.045
    groupRef.current.rotation.x = Math.sin(t * 0.33) * 0.025
  })

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]} scale={scale} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(MODEL_PATH)

export default Astronaut