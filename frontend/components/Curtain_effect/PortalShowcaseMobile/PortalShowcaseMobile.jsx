import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const projects = [
  {
    id: '01',
    title: 'Smart Crops Irrigation',
    stack: 'Flask · Python · SQLite',
    description: 'An irrigation recommendation system using location, weather, and humidity data.',
    github: 'https://github.com/Adityacs502004/Cs50-final-project',
    glow: 'bg-emerald-500',
  },
  {
    id: '02',
    title: 'Personal Book Notes',
    stack: 'Node.js · Express · PostgreSQL',
    description: 'A personal reading library where users manage books, notes, and rate collections.',
    github: 'https://github.com/Adityacs502004/Personal-Book-Notes-App',
    glow: 'bg-amber-500',
  },
  {
    id: '03',
    title: 'URL to PDF Converter',
    stack: 'Node.js · Express · Axios',
    description: 'Converts a webpage URL into a downloadable PDF using external conversion APIs.',
    github: 'https://github.com/Adityacs502004/URL-TO-PDF-CONVERTER',
    glow: 'bg-violet-500',
  },
]

const PortalShowcaseMobile = () => {
  const container = useRef(null)
  const ctaScreen = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(ctaScreen.current, { clipPath: 'circle(150% at 50% 50%)' })
      return
    }

    const cards = gsap.utils.toArray('[data-project-card]')
    const glows = gsap.utils.toArray('[data-glow]')
    const numbers = gsap.utils.toArray('[data-bg-number]')

    gsap.set(cards, { autoAlpha: 0, scale: 0.8, y: 50, filter: 'blur(10px)' })
    gsap.set(glows, { autoAlpha: 0, scale: 0.5 })
    gsap.set(numbers, { autoAlpha: 0, y: 30 })
    
    gsap.set(cards[0], { autoAlpha: 1, scale: 1, y: 0, filter: 'blur(0px)' })
    gsap.set(glows[0], { autoAlpha: 0.4, scale: 1 })
    gsap.set(numbers[0], { autoAlpha: 0.1, y: 0 })
    gsap.set(ctaScreen.current, { clipPath: 'circle(0% at 50% 50%)' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: '+=260%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    })

    tl.to(cards[0], { autoAlpha: 0, scale: 1.2, filter: 'blur(20px)', ease: 'power2.in', duration: 0.7 }, 0.2)
      .to(glows[0], { autoAlpha: 0, duration: 0.7 }, '<')
      .to(numbers[0], { autoAlpha: 0, y: -30, duration: 0.7 }, '<')
      .to(cards[1], { autoAlpha: 1, scale: 1, y: 0, filter: 'blur(0px)', ease: 'power2.out', duration: 0.7 }, 0.55)
      .to(glows[1], { autoAlpha: 0.4, scale: 1, duration: 0.7 }, '<')
      .to(numbers[1], { autoAlpha: 0.1, y: 0, duration: 0.7 }, '<')
      .to(cards[1], { autoAlpha: 0, scale: 1.2, filter: 'blur(20px)', ease: 'power2.in', duration: 0.7 }, 1.25)
      .to(glows[1], { autoAlpha: 0, duration: 0.7 }, '<')
      .to(numbers[1], { autoAlpha: 0, y: -30, duration: 0.7 }, '<')
      .to(cards[2], { autoAlpha: 1, scale: 1, y: 0, filter: 'blur(0px)', ease: 'power2.out', duration: 0.7 }, 1.6)
      .to(glows[2], { autoAlpha: 0.4, scale: 1, duration: 0.7 }, '<')
      .to(numbers[2], { autoAlpha: 0.1, y: 0, duration: 0.7 }, '<')
      .to(cards[2], { autoAlpha: 0, scale: 1.2, filter: 'blur(20px)', ease: 'power2.in', duration: 0.7 }, 2.3)
      .to(glows[2], { autoAlpha: 0, duration: 0.7 }, '<')

    tl.to(ctaScreen.current, {
      clipPath: 'circle(150% at 50% 50%)',
      duration: 2,
      ease: 'power4.inOut',
    }, 2.45)

    tl.from('[data-cta-item]', {
      y: 40,
      autoAlpha: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'expo.out'
    }, 2.8)

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh())
    const refreshTimeout = window.setTimeout(() => ScrollTrigger.refresh(), 1000)
    return () => {
      cancelAnimationFrame(refreshFrame)
      window.clearTimeout(refreshTimeout)
    }

  }, { scope: container })

  return (
    <section ref={container} className='relative z-30 isolate h-dvh min-h-dvh w-full overflow-hidden bg-[#020508]'>
      
      {/* PHASE 1: THE ABYSS */}
      <div className='absolute inset-0 flex items-center justify-center px-5'>
        {projects.map((p, i) => (
          <div key={`glow-${i}`} data-glow className={`absolute left-1/2 top-1/2 h-[50vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] mix-blend-screen will-change-transform ${p.glow}`} />
        ))}
        {projects.map((p, i) => (
          <div key={`num-${i}`} data-bg-number className='absolute font-mono text-[40vw] font-black leading-none text-white will-change-transform'>{p.id}</div>
        ))}
        {projects.map((p, i) => (
          <article key={`card-${i}`} data-project-card className='absolute flex w-full max-w-sm flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a1116]/60 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl will-change-transform'>
            <div>
              <p className='font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300'>Project {p.id}</p>
              <h3 className='mt-4 text-[clamp(1.8rem,7vw,2.5rem)] font-black leading-[1.1] tracking-tight text-white'>{p.title}</h3>
              <p className='mt-4 text-sm leading-relaxed text-cyan-50/70'>{p.description}</p>
            </div>
            <div className='mt-10 border-t border-white/10 pt-5'>
              <p className='font-mono text-[10px] uppercase tracking-widest text-cyan-100/50'>{p.stack}</p>
            </div>
          </article>
        ))}
      </div>

      {/* PHASE 2: THE PORTAL */}
      {/* FIXED: Replaced rigid centering with overflow-y-auto and my-auto for flawless scaling */}
      <div 
        ref={ctaScreen}
        className='absolute inset-0 z-50 flex h-full min-h-full w-full flex-col overflow-y-auto bg-[#f2ebd9] px-6 pb-10 pt-[12dvh] text-center text-[#0a1116] will-change-[clip-path]'
      >
        <div className='flex min-h-full w-full shrink-0 flex-col items-center justify-start'>
          <div className='w-full max-w-sm'>
            <p data-cta-item className='font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#60a7b2]'>
              Next chapter
            </p>
            {/* Adjusted clamp typography slightly so it comfortably fits mobile screens */}
            <h2 data-cta-item className='mt-4 text-[clamp(3.2rem,13vw,4.5rem)] font-black leading-[0.85] tracking-[-0.05em]'>
              Let&apos;s build<br />what&apos;s next.
            </h2>

            <div className='mt-10 flex w-full flex-col gap-3'>
              {projects.map((project) => (
                <a
                  key={`link-${project.id}`}
                  data-cta-item
                  href={project.github}
                  target='_blank'
                  rel='noreferrer'
                  className='group relative flex w-full items-center justify-between overflow-hidden rounded-full border border-[#0a1116]/20 bg-transparent px-6 py-4 transition-colors hover:border-[#0a1116] hover:bg-[#0a1116] hover:text-[#f2ebd9]'
                >
                  <span className='relative z-10 text-sm font-bold tracking-wide'>{project.title}</span>
                  <span className='relative z-10 font-mono transition-transform duration-300 group-hover:rotate-45'>↗</span>
                </a>
              ))}
            </div>

            <div data-cta-item className='mt-10 flex items-center justify-center gap-2'>
              <div className='h-2 w-2 animate-pulse rounded-full bg-emerald-500' />
              <span className='font-mono text-[10px] uppercase tracking-[0.2em] text-[#0a1116]/50'>
                Available for freelance
              </span>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default PortalShowcaseMobile