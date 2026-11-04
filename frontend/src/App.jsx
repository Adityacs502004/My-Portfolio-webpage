import { lazy, Suspense, useEffect, useState } from 'react'

import Navbar from '../components/Navbar/Navbar'
import CustomCursor from '../components/CustomCursor/CustomCursor'
import AsciiBackground from '../components/Hero/AsciiBackground/AsciiBackground'
import Hero from '../components/Hero/Hero'
import Page_roller from '../components/Page_roller/Page_roller'
import Contact from '../components/Contact/Contact'

const Writing = lazy(() => import("../components/Writing/Writing"))
const Projects = lazy(() => import("../components/Projects/Projects"))
const Technical_Skills = lazy(() => import("../components/Technical_Skills/Technical_Skills"))
const Curtain = lazy(() => import("../components/Curtain_effect/Curtain_effect"))

const App = () => {
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)')
    const update = () => setIsCompact(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  return (
    <div className='relative min-h-screen'>
      {!isCompact && <AsciiBackground />}
      <CustomCursor />
      <Navbar />
      <Hero />
      <Suspense fallback={<div>Loading ...</div>}>
        <Writing />
        <Projects />
        <Curtain />
        <Technical_Skills />
        <Page_roller />
        <Contact />
      </Suspense>
    </div>
  )
}

export default App