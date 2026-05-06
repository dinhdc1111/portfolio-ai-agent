import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import { useModelAnimation } from '../../hooks/useModelAnimation'

/**
 * HeroSphere — the featured 3D object on the hero section.
 *
 * Animation layers (all driven by useModelAnimation):
 *  • Floating   — gentle sine-wave bob on the Y axis
 *  • Rotation   — slow continuous Y-axis spin (frame-rate independent)
 *  • Mouse tilt — mesh tilts toward the cursor with lerp-based lag
 *
 * MeshDistortMaterial from drei adds a live vertex-shader distortion on top,
 * making the sphere feel organic and alive without any extra geometry updates.
 */
const HeroSphere = () => {
  const { meshRef } = useModelAnimation({
    floatAmplitude: 0.12,  // ±0.12 world units vertical travel
    floatFrequency: 1.0,   // one full bob per second
    rotateSpeed: 0.3,      // slow, meditative spin
    maxTilt: 0.2,          // max ~11° tilt toward cursor
    tiltLerp: 0.04,        // smooth, slightly laggy follow
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color="#915EFF"
        attach="material"
        distort={0.35}
        speed={1.8}
        roughness={0.05}
        metalness={0.9}
        envMapIntensity={1.2}
      />
    </Sphere>
  )
}

export default HeroSphere

