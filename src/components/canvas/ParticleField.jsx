import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const STAR_COUNT = 3000

// Vertex shader — adds subtle twinkling via time-offset noise per star
const vertexShader = /* glsl */ `
  attribute float aSpeed;
  attribute float aOffset;
  uniform float uTime;
  varying float vAlpha;

  void main() {
    vAlpha = 0.4 + 0.6 * abs(sin(uTime * aSpeed + aOffset));
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = (1.8 + vAlpha * 0.8) * (300.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
  }
`

const fragmentShader = /* glsl */ `
  varying float vAlpha;

  void main() {
    // Circular soft disc
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = vAlpha * (1.0 - smoothstep(0.3, 0.5, d));
    gl_FragColor = vec4(0.8, 0.88, 1.0, alpha);
  }
`

const StarField = () => {
  const pointsRef = useRef()

  const { positions, speeds, offsets } = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3)
    const spd = new Float32Array(STAR_COUNT)
    const off = new Float32Array(STAR_COUNT)

    for (let i = 0; i < STAR_COUNT; i++) {
      // Distribute on a large sphere shell so stars are all around
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 40 + Math.random() * 60

      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      spd[i] = 0.3 + Math.random() * 1.2
      off[i] = Math.random() * Math.PI * 2
    }
    return { positions: pos, speeds: spd, offsets: off }
  }, [])

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.008
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} count={STAR_COUNT} />
        <bufferAttribute attach="attributes-aSpeed"   array={speeds}    itemSize={1} count={STAR_COUNT} />
        <bufferAttribute attach="attributes-aOffset"  array={offsets}   itemSize={1} count={STAR_COUNT} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default StarField
