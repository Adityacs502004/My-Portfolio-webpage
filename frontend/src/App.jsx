import { lazy, Suspense } from 'react'

import Navbar from '../components/Navbar/Navbar'
import CustomCursor from '../components/CustomCursor/CustomCursor'
import AsciiBackground from '../components/Hero/AsciiBackground/AsciiBackground'
import Hero from '../components/Hero/Hero'

const Writing = lazy(() => import("../components/Writing/Writing"))
const Projects = lazy(() => import("../components/Projects/Projects"))
const Curtain = lazy(() => import("../components/Curtain_effect/Curtain_effect"))

const App = () => {
  return (
    <div className='relative min-h-screen'>
      <AsciiBackground />
      <CustomCursor />
      <Navbar />
      <Hero />
      <Suspense fallback={<div>Loading ...</div>}>
        <Writing />
        <Projects />
        <Curtain />
      </Suspense>
    </div>
  )
}

export default App