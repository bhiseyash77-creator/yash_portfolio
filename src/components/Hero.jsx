import { lazy, Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { Btn, mouse } from './ui'
import { useEffect, useRef } from 'react'
const HeroScene = lazy(() => import('./HeroScene'))

function PhotoFrame() {
  const [ok, setOk] = useState(true)
  const ref = useRef()
  useEffect(() => {
    let raf; const loop = () => { if (ref.current) ref.current.style.transform = `rotateY(${mouse.x * 12}deg) rotateX(${-mouse.y * 10}deg)`; raf = requestAnimationFrame(loop) }
    loop(); return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <div style={{ perspective: 800 }} className="pointer-events-none">
      <div ref={ref} className="relative w-44 h-44 sm:w-56 sm:h-56 transition-transform duration-150" style={{ transformStyle: 'preserve-3d' }}>
        <div className="absolute -inset-5 rounded-full border border-cyan-400/40 animate-[spin_24s_linear_infinite]" style={{ borderStyle: 'dashed' }} />
        <div className="absolute -inset-9 rounded-full border border-violet-400/25" />
        <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl" />
        <div className="relative w-full h-full rounded-full overflow-hidden glass glow-border p-1.5 shadow-[0_0_60px_-10px_#22d3ee]">
          <div className="w-full h-full rounded-full overflow-hidden bg-navy flex items-center justify-center">
            {ok ? <img src="/photo.jpg" alt="Yash Bhise" loading="eager" onError={() => setOk(false)} className="w-full h-full object-cover" /> : <span className="font-display text-5xl font-bold text-grad">YB</span>}
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/15 via-transparent to-transparent" />
        </div>
        <div className="absolute left-1/2 -bottom-14 h-10 w-40 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-xl" />
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-end overflow-hidden pb-14 pt-24">
      <div className="absolute inset-0"><Suspense fallback={null}><HeroScene photo={<PhotoFrame />} /></Suspense></div>
      <div className="absolute inset-0 bg-gradient-to-b from-void/0 via-void/0 to-void pointer-events-none" />
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} className="relative z-[200] text-center px-5 mt-[52vh] sm:mt-[56vh]">
        <h1 className="font-display font-extrabold tracking-tight text-5xl sm:text-7xl lg:text-8xl text-white leading-none">YASH <span className="text-grad">BHISE</span></h1>
        <p className="mt-4 font-display text-lg sm:text-2xl text-cyan-200">Java Full Stack Developer</p>
        <p className="mt-3 text-slate-300 max-w-xl mx-auto">Building scalable, secure and modern full-stack applications.</p>
        <p className="mt-2 text-sm text-slate-400">Java · Spring Boot · React · Microservices · Kafka · AWS</p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Btn primary href="#projects">VIEW MY WORK</Btn>
          <Btn href="/Yash_Bhise_Resumes.pdf">DOWNLOAD RESUME</Btn>
          <Btn href="#contact">LET'S CONNECT</Btn>
        </div>
      </motion.div>
    </section>
  )
}
