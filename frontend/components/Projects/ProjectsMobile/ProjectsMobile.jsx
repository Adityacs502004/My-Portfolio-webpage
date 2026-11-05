import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Video from '../Video/Video'
import Clientdesk_content from '../Clientdesk_content/Clientdesk_content'
import Fasalnyay_contnet from '../Fasalnyay_contnet/Fasalnyay_contnet'
import Fasalnyay_video from '../Video/Fasalnyay_video'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ProjectsMobile = () => {
  const container = useRef(null)

  useGSAP(() => {
    const cards = gsap.utils.toArray('.project-card')

    cards.forEach((card, index) => {
      // We don't animate the last card moving away
      if (index === cards.length - 1) return

      const nextCard = cards[index + 1]

      gsap.to(card, {
        scale: 0.88,
        opacity: 0.4,
        filter: 'blur(8px)',
        ease: 'none',
        scrollTrigger: {
          trigger: nextCard,
          start: 'top bottom', // Animation starts when the next card enters the bottom of the viewport
          end: 'top top',      // Animation completes when the next card fully covers the screen
          scrub: true,
        },
      })
    })
  }, { scope: container })

  return (
    <section ref={container} id='work' className='relative w-full bg-[#020508] pb-10'>
      
      {/* Editorial Section Header */}
      <div className='sticky top-0 z-0 px-5 py-12 pt-24 h-svh bg-[#020508]'>
        <p className='font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-500'>
          (Archive)
        </p>
        <h2 className='mt-4 text-[18vw] font-black uppercase leading-[0.8] tracking-tighter text-white mix-blend-difference'>
          Selected<br />Work.
        </h2>
        <p className='mt-8 text-sm leading-relaxed text-white/50 max-w-[25ch]'>
          Scroll to explore engineering case studies and freelance deployments.
        </p>
        
        {/* Scroll Indicator */}
        <div className='absolute bottom-10 left-5 h-16 w-px bg-white/20'>
          <div className='h-1/2 w-full bg-cyan-400 animate-[bounce_2s_infinite]' />
        </div>
      </div>

      {/* Project 01: ClientDesk */}
      <div className='project-card sticky top-0 z-10 flex h-svh w-full flex-col overflow-hidden rounded-t-[2.5rem] border-t border-white/10 bg-[#0a0f14] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]'>
        
        {/* Visual Container */}
        <div className='relative h-[45%] w-full overflow-hidden bg-black p-4 pb-0'>
          <div className='h-full w-full overflow-hidden rounded-t-2xl border border-white/5'>
            <Video />
          </div>
          {/* Brutalist Watermark */}
          <div className='pointer-events-none absolute -bottom-6 -right-2 z-20 text-[9rem] font-black leading-none text-white/5 mix-blend-screen'>
            01
          </div>
        </div>

        {/* Content Container */}
        <div className='h-[55%] w-full overflow-y-auto px-6 py-8 pb-24'>
          <Clientdesk_content />
        </div>
      </div>

      {/* Project 02: FasalNyay */}
      <div className='project-card sticky top-0 z-20 flex h-svh w-full flex-col overflow-hidden rounded-t-[2.5rem] border-t border-white/10 bg-[#10161d] shadow-[0_-30px_60px_rgba(0,0,0,0.9)]'>
        
        {/* Visual Container */}
        <div className='relative h-[45%] w-full overflow-hidden bg-black p-4 pb-0'>
          <div className='h-full w-full overflow-hidden rounded-t-2xl border border-white/5'>
            <Fasalnyay_video />
          </div>
          {/* Brutalist Watermark */}
          <div className='pointer-events-none absolute -bottom-6 -right-2 z-20 text-[9rem] font-black leading-none text-white/5 mix-blend-screen'>
            02
          </div>
        </div>

        {/* Content Container */}
        <div className='h-[55%] w-full overflow-y-auto px-6 py-8 pb-24'>
          <Fasalnyay_contnet />
        </div>
      </div>

    </section>
  )
}

export default ProjectsMobile