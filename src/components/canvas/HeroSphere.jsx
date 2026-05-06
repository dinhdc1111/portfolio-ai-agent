import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'

const HeroSphere = () => {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color="#915EFF"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.8}
      />
    </Sphere>
  )
}

export default HeroSphere
