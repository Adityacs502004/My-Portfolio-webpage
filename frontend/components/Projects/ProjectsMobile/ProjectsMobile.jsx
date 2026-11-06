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
      if (index === cards.length - 1) return
      const nextCard = cards[index + 1]

      gsap.to(card, {
        scale: 0.88,
        opacity: 0.4,
        filter: 'blur(8px)',
        ease: 'none',
        scrollTrigger: {
          trigger: nextCard,
          start: 'top bottom',
          // Syncs the animation to finish exactly when the next card hits the top-20 sticky mark
          end: 'top 80px', 
          scrub: true,
        },
      })
    })
  }, { scope: container })

  return (
    <section ref={container} id='work' className='relative w-full bg-[#020508] pb-10'>
      
      {/* Editorial Section Header */}
      <div className='sticky top-0 z-0 flex h-[100dvh] flex-col bg-[#020508] px-5 pb-12 pt-[15vh]'>
        <p className='font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-500'>
          (Archive)
        </p>
        <h2 className='mt-4 text-[18vw] font-black uppercase leading-[0.8] tracking-tighter text-white mix-blend-difference'>
          Selected<br />Work.
        </h2>
        <p className='mt-8 max-w-[25ch] text-sm leading-relaxed text-white/50'>
          Scroll to explore engineering case studies and freelance deployments.
        </p>
        
        {/* Scroll Indicator */}
        <div className='absolute bottom-10 left-5 h-16 w-px bg-white/20'>
          <div className='h-1/2 w-full animate-[bounce_2s_infinite] bg-cyan-400' />
        </div>
      </div>

      {/* Project 01: ClientDesk */}
      {/* FIXED: Changed to top-20 and calc() height. Removed all internal padding. */}
      <div className='project-card sticky top-20 z-10 flex h-[calc(100dvh-5rem)] w-full flex-col overflow-hidden rounded-t-[2.5rem] border-t border-white/10 bg-[#0a0f14] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]'>
        
        {/* The video sits flush at the very top of the card again */}
        <div className='relative h-[45%] w-full shrink-0 overflow-hidden bg-black p-4 pb-0'>
          <div className='h-full w-full overflow-hidden rounded-t-2xl border border-white/5'>
            <Video />
          </div>
          <div className='pointer-events-none absolute -bottom-6 -right-2 z-20 text-[9rem] font-black leading-none text-white/5 mix-blend-screen'>
            01
          </div>
        </div>
        <div className='h-[55%] w-full overflow-y-auto px-6 py-8 pb-10'>
          <Clientdesk_content />
        </div>
      </div>

      {/* Project 02: FasalNyay */}
      {/* FIXED: Changed to top-20 and calc() height. Removed all internal padding. */}
      <div className='project-card sticky top-20 z-20 flex h-[calc(100dvh-5rem)] w-full flex-col overflow-hidden rounded-t-[2.5rem] border-t border-white/10 bg-[#10161d] shadow-[0_-30px_60px_rgba(0,0,0,0.9)]'>
        
        <div className='relative h-[45%] w-full shrink-0 overflow-hidden bg-black p-4 pb-0'>
          <div className='h-full w-full overflow-hidden rounded-t-2xl border border-white/5'>
            <Fasalnyay_video />
          </div>
          <div className='pointer-events-none absolute -bottom-6 -right-2 z-20 text-[9rem] font-black leading-none text-white/5 mix-blend-screen'>
            02
          </div>
        </div>
        <div className='h-[55%] w-full overflow-y-auto px-6 py-8 pb-10'>
          <Fasalnyay_contnet />
        </div>
      </div>

    </section>
  )
}

export default ProjectsMobile