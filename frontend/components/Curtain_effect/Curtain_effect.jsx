import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Upper_half_card from './Cards/Upper_half_cards'
import Lower_half_card from './Cards/Lower_half_card'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Smart Crops Irrigation System',
    stack: 'Flask · Python · SQLite · Weather APIs',
    description: 'An irrigation recommendation system using crop selection, location, weather conditions and humidity data.',
    accent: 'from-emerald-400/80 via-teal-500/30 to-slate-950',
    github: 'https://github.com/Adityacs502004/Cs50-final-project',
  },
  {
    title: 'Personal Book Notes',
    stack: 'Node.js · Express · PostgreSQL · EJS',
    description: 'A personal reading library where users can manage books, maintain notes and rate their collection.',
    accent: 'from-amber-300/80 via-orange-500/30 to-slate-950',
    github: 'https://github.com/Adityacs502004/Personal-Book-Notes-App',
  },
  {
    title: 'URL to PDF Converter',
    stack: 'Node.js · Express · Axios · PDFEndpoint API',
    description: 'Converts a webpage URL into a downloadable PDF using an external conversion API.',
    accent: 'from-violet-400/80 via-blue-500/30 to-slate-950',
    github: 'https://github.com/Adityacs502004/URL-TO-PDF-CONVERTER',
  },
]

const Curtain_effect = () => {
  const curtain = useRef(null)
  const topPanel = useRef(null)
  const bottomPanel = useRef(null)

  const horizontal_width_upper = useRef(null)
  const horizontal_width_below = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([topPanel.current, bottomPanel.current], { yPercent: 0 })
      return
    }

    const getHorizontalDistance = () => {
      const viewportWidth = curtain.current.clientWidth
      const trackWidth = horizontal_width_upper.current.scrollWidth
      return (viewportWidth + trackWidth) / 2
    }

    gsap.timeline({
      scrollTrigger: {
        trigger: curtain.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    })
      .to(horizontal_width_upper.current, {
        x: () => -getHorizontalDistance(),
        ease: 'none',
      }, 0)
      .to(horizontal_width_below.current, {
        x: () => -getHorizontalDistance(),
        ease: 'none',
      }, 0)
      .to(topPanel.current, { yPercent: -100, ease: 'none' }, 1)
      .to(bottomPanel.current, { yPercent: 100, ease: 'none' }, 1)
  }, { scope: curtain })


  return (
    <section ref={curtain} className='relative h-svh w-full overflow-hidden'>
      <div className='absolute inset-0 flex items-center justify-center bg-amber-50 px-8 text-center text-[#10232a]'>
        <div>
          <p className='text-xs font-bold uppercase tracking-[0.3em] text-[#60a7b2]'>
            Next chapter
          </p>
          <h2 className='mt-4 text-5xl font-black tracking-[-0.06em] sm:text-7xl'>
            Let&apos;s build what&apos;s next.
          </h2>
        </div>
      </div>


      <div
        ref={topPanel}
        className='absolute inset-x-0 top-0 z-10 h-1/2 origin-top bg-[#060D13]'
        aria-hidden='true'>
          <div ref={horizontal_width_upper} className='absolute bottom-0 left-full flex h-1/2 w-screen items-end justify-between px-6'>
            {projects.map((project) => (
              <Upper_half_card key={project.title} project={project} />
            ))}
          </div>
      </div>
      <div
        ref={bottomPanel}
        className='absolute inset-x-0 bottom-0 z-10 h-1/2 origin-bottom bg-[#060D13]'
        aria-hidden='true'>
          <div ref={horizontal_width_below} className='absolute left-full top-0 flex h-1/2 w-screen justify-between px-6'>
            {projects.map((project) => (
              <Lower_half_card key={project.title} project={project} />
            ))}
          </div>
      </div>
    </section>
  )
}

export default Curtain_effect