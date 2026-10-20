import Navbar from '../components/Navbar/Navbar'
import CustomCursor from '../components/CustomCursor/CustomCursor'
import AsciiBackground from '../components/Hero/AsciiBackground/AsciiBackground'
import Hero from '../components/Hero/Hero'

const App = () => {
  return (
    <div className='relative min-h-screen'>
      <AsciiBackground />
      <CustomCursor />
      <Navbar />
      <Hero />
    </div>
  )
}

export default App