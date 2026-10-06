import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TECH } from '../data/tech'
import { Logo, Heading, Btn } from './ui'

// Reusable animated chain: nodes [{id,label}] with a glowing data packet travelling through them.
export function FlowChain({ nodes, vertical = false, onNode, activeIdx = -1, packet = true }) {
  return (
    <div className={`flex ${vertical ? 'flex-col' : 'flex-col md:flex-row'} items-center justify-center gap-0`}>
      {nodes.map((n, i) => (
        <div key={n.id + i} className={`flex ${vertical ? 'flex-col' : 'flex-col md:flex-row'} items-center`}>
          <motion.button onClick={() => onNode?.(n, i)} whileHover={{ y: -6, scale: 1.06 }} animate={{ boxShadow: activeIdx === i ? `0 0 40px -2px ${TECH[n.id].color}` : '0 0 0 0 transparent', borderColor: activeIdx === i ? TECH[n.id].color : 'rgba(255,255,255,.12)' }}
            className="glass rounded-2xl border px-5 py-4 min-w-[120px] flex flex-col items-center gap-2" aria-label={n.label || TECH[n.id].name}>
            <Logo id={n.id} size={36} /><span className="text-xs text-slate-200 text-center">{n.label || TECH[n.id].name}</span>
          </motion.button>
          {i < nodes.length - 1 && (
            <div className={`relative ${vertical ? 'h-10 w-px' : 'h-10 w-px md:h-px md:w-14'} bg-gradient-to-b md:bg-gradient-to-r from-cyan-400/70 to-violet-400/70`}>
              {packet && <motion.span className="absolute h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee] -left-[3px] md:-top-[3px]" animate={vertical ? { top: ['0%', '100%'] } : { top: ['0%', '100%'] }} transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.25, ease: 'linear' }} style={{ left: -3 }} />}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function useRunner(len) {
  const [idx, setIdx] = useState(-1)
  const timer = useRef()
  const run = () => { clearInterval(timer.current); let i = 0; setIdx(0); timer.current = setInterval(() => { i++; if (i >= len) { clearInterval(timer.current); setTimeout(() => setIdx(-1), 900) } else setIdx(i) }, 650) }
  useEffect(() => () => clearInterval(timer.current), [])
  return [idx, run]
}

const Panel = ({ title, sub, children, action }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }} className="glass glow-border rounded-3xl p-6 sm:p-8 mb-8">
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><h3 className="font-display text-xl text-white">{title}</h3><p className="text-sm text-slate-400 mt-1 max-w-xl">{sub}</p></div>{action}</div>
    {children}
  </motion.div>
)

const AWS_CHAIN = [{ id: 'react' }, { id: 'cloudfront' }, { id: 'apigw' }, { id: 'ec2' }, { id: 'springboot', label: 'Spring Boot / Microservices' }, { id: 'rds' }]
const MICRO = [{ id: 'react', label: 'React Frontend' }, { id: 'apigw', label: 'API Gateway' }, { id: 'springboot', label: 'Microservices' }, { id: 'kafka', label: 'Apache Kafka' }, { id: 'docker', label: 'Services' }, { id: 'mysql', label: 'Database' }]
const KAFKA = [{ id: 'springboot', label: 'Producer' }, { id: 'kafka', label: 'Kafka Topic' }, { id: 'springboot', label: 'Consumer' }, { id: 'microservices' }]
const PIPE = [{ id: 'github' }, { id: 'githubactions', label: 'GitHub Actions / Jenkins' }, { id: 'docker' }, { id: 'k8s' }, { id: 'aws' }]

export default function Architecture() {
  const [aws, runAws] = useRunner(AWS_CHAIN.length)
  const [kf, runKf] = useRunner(KAFKA.length)
  const [pl, runPl] = useRunner(PIPE.length)
  const [zoom, setZoom] = useState(false)
  const AWS_SERVICES = ['aws', 'ec2', 's3', 'rds', 'lambda', 'cloudfront', 'apigw', 'iam', 'cloudwatch']
  return (
    <section id="architecture" className="section">
      <Heading title="Architecture in motion" sub="How the pieces fit together — click a flow to watch a request travel through it." />
      <Panel title="Microservices architecture" sub="Requests enter through the API Gateway, services talk through Kafka events and persist to the database.">
        <FlowChain nodes={MICRO} />
        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="mb-4 flex items-center justify-between"><p className="text-sm text-slate-300">Kafka event flow</p><Btn onClick={runKf}>Run event</Btn></div>
          <FlowChain nodes={KAFKA} activeIdx={kf} packet={false} />
        </div>
      </Panel>
      <Panel title="AWS cloud" sub="Select the AWS logo to zoom into the deployment architecture." action={<Btn onClick={runAws}>Send request</Btn>}>
        <div className="mb-6 flex flex-wrap justify-center gap-3">
          {AWS_SERVICES.map((id) => (
            <motion.button key={id} whileHover={{ y: -5, scale: 1.1 }} onClick={() => id === 'aws' && setZoom((z) => !z)} title={TECH[id].name} aria-label={TECH[id].name} className="glass rounded-2xl p-3.5"><Logo id={id} size={30} /></motion.button>
          ))}
        </div>
        <motion.div animate={{ scale: zoom ? 1.04 : 1, opacity: zoom ? 1 : 0.9 }} transition={{ type: 'spring', stiffness: 120, damping: 18 }}>
          <FlowChain nodes={AWS_CHAIN} activeIdx={aws} />
        </motion.div>
        <p className="mt-4 text-center text-xs text-slate-500">{zoom ? 'Zoomed in — click the AWS logo again to zoom out.' : 'Click the AWS logo to zoom into this architecture.'}</p>
      </Panel>
      <Panel title="DevOps pipeline" sub="From commit to a running container in the cloud." action={<Btn onClick={runPl}>Deploy</Btn>}>
        <FlowChain nodes={PIPE} activeIdx={pl} />
      </Panel>
      <Panel title="How I build" sub="One stack, layer by layer.">
        <FlowChain vertical nodes={[{ id: 'react', label: 'Frontend · React' }, { id: 'springboot', label: 'Backend · Spring Boot' }, { id: 'microservices', label: 'Architecture · Microservices' }, { id: 'kafka', label: 'Messaging · Kafka' }, { id: 'mysql', label: 'Database · MySQL / PostgreSQL / MongoDB' }, { id: 'docker', label: 'Containers · Docker' }, { id: 'aws', label: 'Cloud · AWS' }]} />
      </Panel>
    </section>
  )
}
