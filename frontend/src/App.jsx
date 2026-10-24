import Navbar from '../components/Navbar/Navbar'
import CustomCursor from '../components/CustomCursor/CustomCursor'
import AsciiBackground from '../components/Hero/AsciiBackground/AsciiBackground'
import Hero from '../components/Hero/Hero'
import Writing from '../components/Writing/Writing'
import Projects from '../components/Projects/Projects'

const App = () => {
  return (
    <div className='relative min-h-screen'>
      <AsciiBackground />
      <CustomCursor />
      <Navbar />
      <Hero />
      <Writing />
      <Projects />
    </div>
  )
}

export default App