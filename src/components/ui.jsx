import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { TECH } from '../data/tech'

export const mouse = { x: 0, y: 0 } // normalised -1..1, shared with the 3D scene
if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1
  }, { passive: true })
}

export const useIsMobile = () => {
  const [m, setM] = useState(typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => { const f = () => setM(window.innerWidth < 768); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f) }, [])
  return m
}

export function Logo({ id, size = 28, glow = true }) {
  const t = TECH[id]; if (!t) return null
  const { Icon } = t
  return <span style={{ color: t.color, fontSize: size, filter: glow ? `drop-shadow(0 0 8px ${t.color}88)` : undefined }} className="inline-flex" aria-label={t.name} role="img"><Icon /></span>
}

export function Tilt({ children, className = '', max = 10 }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 })
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 })
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * max)
  }
  const reset = () => { rx.set(0); ry.set(0) }
  return (
    <div style={{ perspective: 1000 }} className={className}>
      <motion.div onPointerMove={onMove} onPointerLeave={reset} style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} className="h-full">{children}</motion.div>
    </div>
  )
}

export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  return (
    <motion.div ref={ref} style={{ x, y, display: 'inline-block' }}
      onPointerMove={(e) => { const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * strength); y.set((e.clientY - r.top - r.height / 2) * strength) }}
      onPointerLeave={() => { x.set(0); y.set(0) }}>{children}</motion.div>
  )
}

export function Btn({ href, children, primary, onClick, type }) {
  const cls = `glass glow-border rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-2 ${primary ? 'bg-gradient-to-r from-cyan-400/30 to-blue-500/30 text-white shadow-[0_0_30px_-5px_#22d3ee88]' : 'text-slate-200'}`
  return <Magnetic>{href ? <a href={href} onClick={onClick} className={cls} {...(href.endsWith('.pdf') ? { download: true } : {})}>{children}</a> : <button type={type} onClick={onClick} className={cls}>{children}</button>}</Magnetic>
}

export function CursorGlow() {
  const x = useMotionValue(-500), y = useMotionValue(-500)
  const bg = useTransform([x, y], ([a, b]) => `radial-gradient(500px circle at ${a}px ${b}px, rgba(34,211,238,.09), transparent 60%)`)
  useEffect(() => { const f = (e) => { x.set(e.clientX); y.set(e.clientY) }; window.addEventListener('pointermove', f); return () => window.removeEventListener('pointermove', f) }, [x, y])
  return <motion.div aria-hidden style={{ background: bg }} className="pointer-events-none fixed inset-0 z-[1]" />
}

export function Heading({ title, sub }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }} className="mb-14">
      <h2 className="section-title">{title}</h2>{sub && <p className="section-sub">{sub}</p>}
    </motion.div>
  )
}
