import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Tilt, Logo, Heading, Btn } from './ui'
import { TECH, LINKS, FaGithub, FaLinkedin, FaEnvelope } from '../data/tech'
import { FaGraduationCap, FaFileAlt } from 'react-icons/fa'

const NAV = ['Home', 'About', 'Skills', 'Projects', 'Architecture', 'Education', 'Contact']

export function Navbar() {
  const [solid, setSolid] = useState(false), [open, setOpen] = useState(false), [cur, setCur] = useState('home')
  const { scrollYProgress } = useScroll(); const prog = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40); f(); window.addEventListener('scroll', f, { passive: true })
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setCur(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    NAV.forEach((n) => { const el = document.getElementById(n.toLowerCase()); el && io.observe(el) })
    return () => { window.removeEventListener('scroll', f); io.disconnect() }
  }, [])
  return (
    <header className="fixed top-4 inset-x-0 z-[999] flex justify-center px-4">
      <nav className={`glass rounded-full flex items-center gap-1 px-3 py-2 transition-all duration-500 ${solid ? 'bg-navy/70 shadow-[0_10px_40px_-10px_#000]' : 'bg-transparent'}`} style={{ backdropFilter: `blur(${solid ? 22 : 8}px)` }} aria-label="Primary">
        <a href="#home" className="font-display font-bold text-grad px-3">YB</a>
        <div className="hidden md:flex">{NAV.map((n) => (
          <a key={n} href={`#${n.toLowerCase()}`} className="relative px-3.5 py-1.5 text-sm text-slate-300 hover:text-white transition-colors">
            {cur === n.toLowerCase() && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-cyan-400/15 border border-cyan-400/30" />}<span className="relative">{n}</span></a>))}</div>
        <button className="md:hidden px-3 py-1.5 text-slate-200" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu">
          <span className="block w-5 space-y-1">{[0, 1, 2].map((i) => <motion.span key={i} className="block h-0.5 bg-current" animate={open ? { rotate: i === 1 ? 0 : i ? -45 : 45, y: i === 1 ? 0 : i ? -6 : 6, opacity: i === 1 ? 0 : 1 } : { rotate: 0, y: 0, opacity: 1 }} />)}</span>
        </button>
        <motion.div style={{ scaleX: prog }} className="absolute bottom-0 left-6 right-6 h-px origin-left bg-gradient-to-r from-cyan-400 to-violet-400" />
      </nav>
      <AnimatePresence>{open && (
        <motion.div initial={{ opacity: 0, y: -12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12 }} className="glass absolute top-16 w-[calc(100%-2rem)] max-w-sm rounded-3xl bg-navy/90 p-3 md:hidden">
          {NAV.map((n, i) => <motion.a key={n} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} onClick={() => setOpen(false)} href={`#${n.toLowerCase()}`} className="block rounded-xl px-4 py-3 text-slate-200 hover:bg-white/5">{n}</motion.a>)}
        </motion.div>)}</AnimatePresence>
    </header>
  )
}

const STATS = [['4+', 'Projects'], ['Full Stack', 'Development'], ['Backend', 'Engineering'], ['Cloud & DevOps', 'Fundamentals']]
export function About() {
  return (
    <section id="about" className="section">
      <Heading title="Java Full Stack Developer" sub="BCA graduate, 2026. I build complete applications — secure Spring Boot back ends, React front ends, and the service architecture between them." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(([a, b], i) => (
          <Tilt key={b}><motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} style={{ animation: `floaty ${5 + i}s ease-in-out infinite` }} className="glass glow-border h-full rounded-3xl p-6">
            <p className="font-display text-2xl sm:text-3xl font-bold text-grad">{a}</p><p className="mt-2 text-sm text-slate-400">{b}</p></motion.div></Tilt>
        ))}
      </div>
    </section>
  )
}

const PROJECTS = [
  { n: 'I-RISE Training Institute Platform', d: 'A training-institute platform with secure sign-in, course management and Google integrations.', tech: ['react', 'springboot', 'springsecurity', 'jwt', 'mysql', 'docker'], f: ['JWT authentication with role-based access', 'Google API integration', 'Dockerised deployment'], gh: LINKS.github, live: '#' },
  { n: 'College Management & Admission System', d: 'Admission, inquiry and student record management for a college.', tech: ['react', 'java', 'springboot', 'hibernate', 'rest', 'mysql'], f: ['Admission and inquiry workflows', 'Hibernate / JPA data layer', 'REST API with validation'], gh: LINKS.github, live: '#' },
  { n: 'Microservices Application', d: 'Service-oriented application with discovery, gateway routing and shared authentication.', tech: ['java', 'springboot', 'microservices', 'kafka', 'docker', 'aws'], f: ['Eureka discovery and API Gateway', 'Event messaging with Kafka', 'Container-ready services'], gh: LINKS.github, live: '#' },
  { n: 'Full Stack Web Application', d: 'End-to-end web app with a React front end and a Spring Boot REST back end.', tech: ['react', 'springboot', 'rest', 'mysql', 'docker'], f: ['Responsive React UI', 'Layered Spring Boot API', 'Relational schema design'], gh: LINKS.github, live: '#' },
]
export function Projects() {
  return (
    <section id="projects" className="section">
      <Heading title="Selected projects" sub="Each card lists the exact technologies used. Tilt them." />
      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Tilt key={p.n} max={7}><motion.article initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: (i % 2) * 0.1 }} className="glass glow-border h-full overflow-hidden rounded-3xl">
            <div className="relative h-40 overflow-hidden bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-violet-500/20">
              <img src={`/projects/${i + 1}.jpg`} alt="" loading="lazy" onError={(e) => (e.currentTarget.style.display = 'none')} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center gap-4" style={{ transform: 'translateZ(40px)' }}>{p.tech.slice(0, 4).map((id) => <Logo key={id} id={id} size={40} />)}</div>
            </div>
            <div className="p-6" style={{ transform: 'translateZ(30px)' }}>
              <h3 className="font-display text-lg text-white">{p.n}</h3><p className="mt-2 text-sm text-slate-400">{p.d}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-300">{p.f.map((f) => <li key={f} className="flex gap-2"><span className="mt-2 h-1 w-1 rounded-full bg-cyan-400" />{f}</li>)}</ul>
              <div className="mt-5 flex flex-wrap gap-2">{p.tech.map((id) => <span key={id} title={TECH[id].name} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs"><Logo id={id} size={14} glow={false} />{TECH[id].name}</span>)}</div>
              <div className="mt-6 flex gap-3"><a href={p.gh} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm hover:text-cyan-200"><FaGithub />GitHub</a>
                <a href={p.live} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm hover:text-cyan-200">Live demo</a></div>
            </div>
          </motion.article></Tilt>
        ))}
      </div>
    </section>
  )
}

export function Education() {
  return (
    <section id="education" className="section">
      <Heading title="Education" />
      <Tilt max={6}><motion.div initial={{ opacity: 0, rotateX: 25 }} whileInView={{ opacity: 1, rotateX: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="glass glow-border flex items-center gap-6 rounded-3xl p-8">
        <FaGraduationCap className="shrink-0 text-5xl text-cyan-300 drop-shadow-[0_0_12px_#22d3ee]" />
        <div><h3 className="font-display text-xl text-white">Bachelor of Computer Applications (BCA)</h3><p className="mt-1 text-slate-300">Swami Ramanand Teerth Marathwada University</p><p className="text-sm text-slate-500">2026</p></div>
      </motion.div></Tilt>
      <div className="mt-24 grid items-center gap-8 md:grid-cols-2">
        <div><h2 className="section-title">Explore my professional profile</h2><p className="section-sub">Skills, projects and education on one page.</p><div className="mt-6"><Btn primary href="/Yash_Bhise_Resume.pdf">DOWNLOAD RESUME</Btn></div></div>
        <Tilt max={14}><motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }} className="glass glow-border mx-auto w-64 rounded-3xl p-7 text-center shadow-[0_30px_60px_-20px_#22d3ee55]">
          <FaFileAlt className="mx-auto text-5xl text-cyan-300" /><p className="mt-4 font-display text-white">Yash Bhise</p><p className="text-xs text-slate-400">Java Full Stack Developer</p>
          <div className="mt-4 space-y-2">{[90, 70, 80].map((w, i) => <div key={i} className="h-1.5 rounded bg-white/10" style={{ width: `${w}%` }} />)}</div></motion.div></Tilt>
      </div>
    </section>
  )
}

export function Contact() {
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const submit = (e) => { e.preventDefault(); window.location.href = `${LINKS.email}?subject=${encodeURIComponent('Portfolio message from ' + f.name)}&body=${encodeURIComponent(f.message + '\n\n' + f.name + ' (' + f.email + ')')}` }
  const inp = 'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/60 focus:shadow-[0_0_20px_-4px_#22d3ee]'
  return (
    <section id="contact" className="section pb-24">
      <div className="text-center"><h2 className="section-title">LET'S BUILD SOMETHING GREAT</h2></div>
      <form onSubmit={submit} className="glass glow-border mx-auto mt-10 max-w-xl space-y-4 rounded-3xl p-6 sm:p-8">
        <input required className={inp} placeholder="Name" aria-label="Name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
        <input required type="email" className={inp} placeholder="Email" aria-label="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
        <textarea required rows={5} className={inp} placeholder="Message" aria-label="Message" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
        <div className="text-center"><Btn primary type="submit">SEND MESSAGE</Btn></div>
      </form>
      <div className="mt-10 flex justify-center gap-5 text-3xl">
        {[[FaGithub, LINKS.github, 'GitHub'], [FaLinkedin, LINKS.linkedin, 'LinkedIn'], [FaEnvelope, LINKS.email, 'Email']].map(([I, h, l]) => (
          <motion.a key={l} href={h} target="_blank" rel="noreferrer" aria-label={l} title={l} whileHover={{ y: -6, scale: 1.12 }} className="glass rounded-2xl p-4 text-slate-300 hover:text-cyan-300"><I /></motion.a>))}
      </div>
      <p className="mt-16 text-center text-xs text-slate-600">© {new Date().getFullYear()} Yash Bhise</p>
    </section>
  )
}
