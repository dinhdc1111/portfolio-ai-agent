import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Camera path control points — one per portfolio section.
 * Tune these to frame each section's 3D content optimally.
 *
 * Section index → camera position:
 *   0  home     – medium shot, astronaut + satellite in frame
 *   1  about    – push in, tilt toward satellite interior
 *   2  projects – pan right, debris field area
 *   3  skills   – rise up, birds-eye perspective
 *   4  contact  – pull very close, facing astronaut helmet
 */
const CAMERA_POSITIONS = [
  new THREE.Vector3(0,    0.2,  5.5),   // 0 – hero
  new THREE.Vector3(-1.5, 0.5,  4.0),   // 1 – about
  new THREE.Vector3( 3.5, 0.0,  4.5),   // 2 – projects
  new THREE.Vector3(-0.5, 2.8,  4.0),   // 3 – skills
  new THREE.Vector3( 0.2, 0.6,  2.8),   // 4 – contact
]

const CAMERA_TARGETS = [
  new THREE.Vector3( 0.8,  0.3, 0),   // look at astronaut+satellite
  new THREE.Vector3( 1.2,  0.2, -0.5), // satellite interior
  new THREE.Vector3( 4.0,  0.0, -1),   // debris right
  new THREE.Vector3( 0.5,  0.3,  0),   // center below
  new THREE.Vector3( 0.2,  0.6,  0),   // helmet close-up
]

// CatmullRom splines through the key positions
const positionCurve = new THREE.CatmullRomCurve3(CAMERA_POSITIONS, false, 'catmullrom', 0.5)
const targetCurve   = new THREE.CatmullRomCurve3(CAMERA_TARGETS,   false, 'catmullrom', 0.5)

// Scratch vectors — reused every frame, no allocation
const _camPos    = new THREE.Vector3()
const _camTarget = new THREE.Vector3()
const _lookAt    = new THREE.Matrix4()
const _quat      = new THREE.Quaternion()

/**
 * useScrollCamera — story-driven camera that follows a Catmull-Rom
 * spline based on the page scroll position.
 *
 * Must be called inside a component that is a child of <Canvas>.
 *
 * @param {React.RefObject<number>} scrollProgressRef – ref holding 0→1 progress
 */
export const useScrollCamera = (scrollProgressRef) => {
  const { camera } = useThree()

  // Smoothed internal progress (spring-like with lerp)
  const smoothProgress = useRef(0)

  useFrame(() => {
    const raw = scrollProgressRef.current ?? 0

    // Smooth the scroll progress (adjust 0.06 for more/less lag)
    smoothProgress.current = THREE.MathUtils.lerp(
      smoothProgress.current,
      raw,
      0.06
    )

    const t = THREE.MathUtils.clamp(smoothProgress.current, 0, 1)

    // Sample both curves at current t
    positionCurve.getPoint(t, _camPos)
    targetCurve.getPoint(t, _camTarget)

    // Apply position
    camera.position.copy(_camPos)

    // Rotate camera to look at target via quaternion slerp
    _lookAt.lookAt(_camPos, _camTarget, camera.up)
    _quat.setFromRotationMatrix(_lookAt)
    camera.quaternion.slerp(_quat, 0.08)
  })
}

/**
 * ScrollCameraDriver — R3F component wrapper around the hook.
 * Place this inside <Canvas> with your scene content.
 */
const ScrollCameraDriver = ({ scrollProgressRef }) => {
  useScrollCamera(scrollProgressRef)
  return null
}

export default ScrollCameraDriver
