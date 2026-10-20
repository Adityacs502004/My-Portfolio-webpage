import Content from './Content/Content';
import Picture from './Picture/Picture'

const Hero = () => {
  return (
    <div className='relative z-10 h-dvh w-full flex'>
        <Content />
        <Picture />
    </div>
  )
}

export default Hero