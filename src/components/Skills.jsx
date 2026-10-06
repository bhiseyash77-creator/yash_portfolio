import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { TECH, GROUPS } from '../data/tech'
import { Logo, Heading } from './ui'

export default function Skills() {
  const [active, setActive] = useState(null)
  const [lines, setLines] = useState([])
  const wrap = useRef(null)
  const refs = useRef({})
  const rx = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 })
  const ry = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 })

  const hover = useCallback((id) => {
    setActive(id)
    if (!id || !wrap.current) return setLines([])
    const base = wrap.current.getBoundingClientRect()
    const c = (k) => { const el = refs.current[k]; if (!el) return null; const r = el.getBoundingClientRect(); return [r.left - base.left + r.width / 2, r.top - base.top + r.height / 2] }
    const from = c(id)
    setLines(from ? TECH[id].rel.map((k) => ({ k, a: from, b: c(k), color: TECH[k].color })).filter((l) => l.b) : [])
  }, [])

  const t = active && TECH[active]
  const related = t ? new Set([active, ...t.rel]) : null

  return (
    <section id="skills" className="section">
      <Heading title="Technology universe" sub="Hover any logo to pull it forward and light up the tools it works with." />
      <div ref={wrap} className="relative" onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 6); rx.set(-((e.clientY - r.top) / r.height - 0.5) * 4)
      }} onPointerLeave={() => { rx.set(0); ry.set(0); hover(null) }}>
        <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible">
          {lines.map((l) => (
            <motion.line key={active + l.k} x1={l.a[0]} y1={l.a[1]} x2={l.b[0]} y2={l.b[1]} stroke={l.color} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 6"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.85 }} transition={{ duration: 0.45 }} style={{ filter: `drop-shadow(0 0 4px ${l.color})` }} />
          ))}
        </svg>
        <div style={{ perspective: 1400 }}>
          <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(GROUPS).map(([g, label], gi) => (
              <motion.div key={g} initial={{ opacity: 0, z: -80 }} whileInView={{ opacity: 1, z: gi % 2 ? 20 : 0 }} viewport={{ once: true }} transition={{ delay: gi * 0.07, duration: 0.7 }}
                className="glass glow-border rounded-3xl p-5" style={{ transformStyle: 'preserve-3d' }}>
                <h3 className="font-display text-sm font-semibold text-cyan-200 mb-4">{label}</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3" style={{ transformStyle: 'preserve-3d' }}>
                  {Object.entries(TECH).filter(([, v]) => v.group === g).map(([id, v], i) => {
                    const on = active === id, dim = related && !related.has(id)
                    return (
                      <motion.button key={id} ref={(el) => (refs.current[id] = el)} title={v.name} aria-label={`${v.name}: ${v.desc}`}
                        onPointerEnter={() => hover(id)} onFocus={() => hover(id)} onBlur={() => hover(null)}
                        animate={{ scale: on ? 1.22 : 1, z: on ? 70 : related?.has(id) ? 30 : 0, opacity: dim ? 0.25 : 1 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                        style={{ boxShadow: on ? `0 0 30px -4px ${v.color}` : 'none', animation: `floaty ${4 + (i % 4)}s ease-in-out ${i * 0.3}s infinite` }}
                        className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[.04] px-1 py-3">
                        <Logo id={id} size={30} glow={on} />
                        <span className="text-[10px] leading-tight text-slate-300 text-center">{v.name}</span>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="glass glow-border mt-6 min-h-[92px] rounded-2xl p-5" aria-live="polite">
        {t ? (
          <div className="flex items-start gap-4">
            <Logo id={active} size={40} />
            <div><h3 className="font-display text-lg text-white">{t.name}</h3><p className="text-sm text-slate-400 max-w-prose">{t.desc}</p>
              <div className="mt-2 flex flex-wrap gap-2">{t.rel.map((k) => <span key={k} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-300"><Logo id={k} size={14} glow={false} />{TECH[k].name}</span>)}</div></div>
          </div>
        ) : <p className="text-sm text-slate-500">Hover or focus a technology to see what it does and what connects to it.</p>}
      </div>
    </section>
  )
}
