import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Upper_half_card from '../Cards/Upper_half_cards'
import Lower_half_card from '../Cards/Lower_half_card'

gsap.registerPlugin(ScrollTrigger, useGSAP)

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

const CurtainMobile = () => {
  const curtain = useRef(null)
  const topPanel = useRef(null)
  const bottomPanel = useRef(null)
  const upperTrack = useRef(null)
  const lowerTrack = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(topPanel.current, { yPercent: -100 })
      gsap.set(bottomPanel.current, { yPercent: 100 })
      return
    }

    const distance = () => curtain.current.clientWidth + upperTrack.current.scrollWidth

    gsap.timeline({
      scrollTrigger: {
        trigger: curtain.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
      .to([upperTrack.current, lowerTrack.current], {
        x: () => -distance(),
        duration: 2,
        ease: 'none',
      }, 0)
      .to(topPanel.current, { yPercent: -100, duration: 1, ease: 'none' }, 2)
      .to(bottomPanel.current, { yPercent: 100, duration: 1, ease: 'none' }, 2)
  }, { scope: curtain })

  return (
    <section ref={curtain} className='relative h-svh w-full max-w-full overflow-hidden [contain:paint] md:hidden'>
      <div className='absolute inset-0 flex items-center justify-center bg-amber-50 px-8 py-12 text-[#10232a]'>
        <div className='w-full'>
          <p className='text-xs font-bold uppercase tracking-[0.3em] text-[#60a7b2]'>Next chapter</p>
          <h2 className='mt-4 text-5xl font-black leading-[0.9] tracking-[-0.06em]'>
            Let&apos;s build what&apos;s next.
          </h2>
          <ul className='mt-8 space-y-1 text-sm'>
            {projects.map((project) => (
              <li key={project.title}>
                <a
                  href={project.github}
                  target='_blank'
                  rel='noreferrer'
                  className='block py-3 font-semibold underline decoration-[#60a7b2] underline-offset-4'
                >
                  {project.title} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div ref={topPanel} className='absolute inset-x-0 top-0 z-10 h-1/2 origin-top bg-[#060D13]' aria-hidden='true'>
        <div ref={upperTrack} className='absolute bottom-0 left-full flex h-1/2 w-max items-end gap-4 px-4'>
          {projects.map((project) => <Upper_half_card key={project.title} project={project} />)}
        </div>
      </div>
      <div ref={bottomPanel} className='absolute inset-x-0 bottom-0 z-10 h-1/2 origin-bottom bg-[#060D13]' aria-hidden='true'>
        <div ref={lowerTrack} className='absolute left-full top-0 flex h-1/2 w-max gap-4 px-4'>
          {projects.map((project) => <Lower_half_card key={project.title} project={project} />)}
        </div>
      </div>
    </section>
  )
}

export default CurtainMobile
