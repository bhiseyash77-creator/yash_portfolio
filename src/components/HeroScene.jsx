import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Points, PointMaterial } from '@react-three/drei'
import { mouse, Logo, useIsMobile } from './ui'
import { TECH } from '../data/tech'

const ORBIT = ['java', 'springboot', 'react', 'kafka', 'docker', 'aws', 'mysql', 'github']
const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Particles({ count }) {
  const ref = useRef()
  const pos = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) { const r = 4 + Math.random() * 9, th = Math.random() * 6.283, ph = Math.acos(2 * Math.random() - 1); a.set([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph) - 3], i * 3) }
    return a
  }, [count])
  useFrame((s, d) => {
    if (!ref.current) return
    if (!reduced) ref.current.rotation.y += d * 0.02
    ref.current.position.x += (mouse.x * 0.6 - ref.current.position.x) * 0.03
    ref.current.position.y += (-mouse.y * 0.4 - ref.current.position.y) * 0.03
  })
  return <Points ref={ref} positions={pos} stride={3}><PointMaterial transparent color="#67e8f9" size={0.035} sizeAttenuation depthWrite={false} opacity={0.75} /></Points>
}

function Orbit({ radius, mobile, children }) {
  const g = useRef()
  useFrame((s, d) => {
    if (!g.current) return
    if (!reduced) g.current.rotation.y += d * 0.18
    g.current.rotation.x += ((-mouse.y * 0.25 + 0.25) - g.current.rotation.x) * 0.05
    g.current.rotation.z += ((mouse.x * 0.12) - g.current.rotation.z) * 0.05
  })
  return (
    <group ref={g}>
      {ORBIT.map((id, i) => {
        const a = (i / ORBIT.length) * Math.PI * 2
        return (
          <group key={id} position={[Math.cos(a) * radius, Math.sin(i * 1.7) * 0.5, Math.sin(a) * radius]}>
            <Html center zIndexRange={[100, 0]} distanceFactor={mobile ? 7 : 9}>
              <div title={TECH[id].name} className="glass glow-border rounded-2xl p-3 sm:p-3.5 select-none"><Logo id={id} size={mobile ? 22 : 30} /></div>
            </Html>
          </group>
        )
      })}
      {children}
    </group>
  )
}

export default function HeroScene({ photo }) {
  const mobile = useIsMobile()
  return (
    <Canvas dpr={[1, mobile ? 1.5 : 2]} camera={{ position: [0, 0, 9], fov: 50 }} gl={{ antialias: !mobile, powerPreference: 'high-performance' }}>
      <Particles count={mobile ? 500 : 1400} />
      <Orbit radius={mobile ? 2.9 : 3.7} mobile={mobile} />
      <Html center zIndexRange={[50, 50]}>{photo}</Html>
    </Canvas>
  )
}
