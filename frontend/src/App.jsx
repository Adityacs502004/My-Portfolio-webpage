import { lazy, Suspense } from 'react'

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
        <Technical_Skills />
        <Page_roller />
        <Contact />
      </Suspense>
    </div>
  )
}

export default App