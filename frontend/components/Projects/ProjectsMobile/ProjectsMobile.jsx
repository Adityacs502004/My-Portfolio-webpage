import { useEffect, useRef } from 'react'
import Video from '../Video/Video'
import Clientdesk_content from '../Clientdesk_content/Clientdesk_content'
import Fasalnyay_contnet from '../Fasalnyay_contnet/Fasalnyay_contnet'
import Fasalnyay_video from '../Video/Fasalnyay_video'

const ProjectsMobile = () => {
  const root = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })

    root.current.querySelectorAll('[data-reveal]').forEach((element) => {
      revealObserver.observe(element)
    })

    return () => revealObserver.disconnect()
  }, [])

  return (
    <section id='work' ref={root} className='relative my-20 flex w-full flex-col'>
      <div className='w-[90%] place-self-center text-sm text-[#60a7b2]/70'>My Work</div>

      <div data-project className='mt-8 flex w-[90%] flex-col place-self-center'>
        <div data-reveal className='translate-y-8 opacity-0 transition-[transform,opacity] duration-700 ease-out [&.is-revealed]:translate-y-0 [&.is-revealed]:opacity-100'>
          <Video />
        </div>
        <div className='mt-8 w-full'>
          <Clientdesk_content />
        </div>
      </div>

      <div data-project className='mt-20 flex w-[90%] flex-col place-self-center'>
        <div data-reveal className='translate-y-8 opacity-0 transition-[transform,opacity] duration-700 ease-out [&.is-revealed]:translate-y-0 [&.is-revealed]:opacity-100'>
          <Fasalnyay_video />
        </div>
        <div className='mt-8 w-full'>
          <Fasalnyay_contnet />
        </div>
      </div>
    </section>
  )
}

export default ProjectsMobile
