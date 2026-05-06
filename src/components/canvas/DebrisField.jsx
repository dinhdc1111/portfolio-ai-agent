import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// 6 debris pieces drift slowly through space
const DEBRIS_COUNT = 6

const DebrisField = ({ position = [0, 0, 0] }) => {
  const groupRef = useRef()

  const items = useMemo(() =>
    Array.from({ length: DEBRIS_COUNT }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      ],
      rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      speed: 0.1 + Math.random() * 0.3,
      axis: new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5,
      ).normalize(),
      scale: 0.04 + Math.random() * 0.1,
    })), [])

  const refs = useRef(items.map(() => null))

  useFrame((_, delta) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return
      mesh.rotateOnAxis(items[i].axis, delta * items[i].speed)
    })
  })

  return (
    <group ref={groupRef} position={position}>
      {items.map((item, i) => (
        <mesh
          key={i}
          ref={(el) => (refs.current[i] = el)}
          position={item.pos}
          rotation={item.rot}
          scale={item.scale}
        >
          {/* Alternating box / octahedron shapes */}
          {i % 2 === 0
            ? <boxGeometry args={[1, 0.3, 0.8]} />
            : <octahedronGeometry args={[1, 0]} />
          }
          <meshStandardMaterial
            color="#4a5568"
            roughness={0.8}
            metalness={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}

export default DebrisField
