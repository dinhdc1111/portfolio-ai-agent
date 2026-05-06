import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal   = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;

  // Simple hash for procedural bands
  float hash(float n) { return fract(sin(n) * 43758.5453); }

  void main() {
    // Latitude bands
    float lat  = vPosition.y * 1.4 + uTime * 0.015;
    float band = smoothstep(0.0, 1.0, abs(sin(lat * 3.14)));

    // Base color: deep purple → teal gradient
    vec3 colorA = vec3(0.08, 0.04, 0.22); // nebula purple
    vec3 colorB = vec3(0.02, 0.14, 0.28); // deep teal
    vec3 base   = mix(colorA, colorB, band);

    // Fresnel rim glow — warm cyan
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.5);
    vec3  rim     = vec3(0.0, 0.85, 0.85) * fresnel * 1.4;

    // Directional light (sun) from upper right
    vec3  lightDir = normalize(vec3(1.2, 0.8, 0.5));
    float diff     = max(dot(vNormal, lightDir), 0.0);
    vec3  lit      = base * (0.12 + diff * 0.88);

    gl_FragColor = vec4(lit + rim, 1.0);
  }
`

const GasPlanet = ({ position = [12, -4, -18], radius = 5 }) => {
  const meshRef = useRef()
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.012
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.FrontSide}
      />
    </mesh>
  )
}

export default GasPlanet
