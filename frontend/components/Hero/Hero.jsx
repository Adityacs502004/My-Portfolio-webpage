import { useEffect, useState } from 'react'
import Content from './Content/Content';
import Picture from './Picture/Picture'
import HeroMobile from './HeroMobile/HeroMobile'

const Hero = () => {
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)')
    const update = () => setIsCompact(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  if (isCompact) return <HeroMobile />

  return (
    <div className='relative z-10 h-dvh w-full flex'>
      <Content />
      <Picture />
    </div>
  )
}

export default Hero