import { lazy, Suspense } from 'react'
import Hero from './components/Hero'
import { Navbar, About } from './components/Sections'
import { CursorGlow } from './components/ui'
const Skills = lazy(() => import('./components/Skills'))
const Architecture = lazy(() => import('./components/Flow'))
const Projects = lazy(() => import('./components/Sections').then((m) => ({ default: m.Projects })))
const Education = lazy(() => import('./components/Sections').then((m) => ({ default: m.Education })))
const Contact = lazy(() => import('./components/Sections').then((m) => ({ default: m.Contact })))

export default function App() {
  return (
    <div className="relative min-h-screen bg-void" style={{ background: 'radial-gradient(1200px 700px at 15% -10%, #0c1c3f 0%, transparent 60%), radial-gradient(900px 600px at 90% 30%, #1a0f3a55 0%, transparent 60%), #04060f' }}>
      <CursorGlow /><Navbar />
      <main className="relative z-[2]">
        <Hero /><About />
        <Suspense fallback={<div className="h-screen" />}><Skills /><Projects /><Architecture /><Education /><Contact /></Suspense>
      </main>
    </div>
  )
}
