import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const TICKER = ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind', 'GSAP', 'Python', 'Flask']

const HeroMobile = () => {
  const root = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-hero-img]', { scale: 1.08, autoAlpha: 0, duration: 1.2 }, 0)
        .from('[data-hero-line]', { yPercent: 110, duration: 0.8, stagger: 0.08 }, 0.35)
        .from('[data-hero-fade]', { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.1 }, 0.75)

      gsap.to('[data-scroll-cue]', {
        autoAlpha: 0,
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=80', scrub: true },
      })
    })

    return () => mm.revert()
  }, { scope: root })

  return (
    <section
      ref={root}
      id='top'
      className='relative isolate z-10 h-svh w-full overflow-hidden bg-[#060d12] lg:hidden'
    >
      <img
        data-hero-img
        src='/Contemplative_Monochrome_Portrait.png'
        alt='Portrait of Aditya Raj'
        fetchPriority='high'
        decoding='async'
        className='absolute inset-0 -z-10 h-full w-full object-cover object-[60%_center]'
      />
      <div className='absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/75 to-transparent' />
      <div className='absolute inset-x-0 bottom-0 -z-10 h-[62%] bg-gradient-to-t from-[#060d12] via-[#060d12]/85 to-transparent' />

      <div className='absolute inset-x-5 bottom-[calc(env(safe-area-inset-bottom)+5.5rem)]'>
        <p data-hero-fade className='font-mono text-xs uppercase tracking-[0.18em] text-cyan-300'>
          (Portfolio)
        </p>
        <h1 className='mt-3 text-[clamp(3.5rem,26vw,7rem)] font-black leading-[0.86] tracking-[-0.05em] text-amber-50 md:text-[9rem]'>
          <span className='block overflow-hidden'>
            <span data-hero-line className='block'>Aditya</span>
          </span>
          <span className='block overflow-hidden text-[#60a7b2]'>
            <span data-hero-line className='block'>Raj</span>
          </span>
        </h1>
        <p data-hero-fade className='mt-4 max-w-[30ch] text-[15px] leading-relaxed text-[#d9f4ee]/80'>
          <span className='text-cyan-300'>&gt; </span>
          Full-stack developer building reliable digital products for businesses and startups.
        </p>
      </div>

      <div
        data-hero-fade
        className='absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+2.25rem)] overflow-hidden border-y border-cyan-200/15 py-2'
      >
        <div className='flex w-max animate-[ticker_26s_linear_infinite] whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-[#60a7b2] motion-reduce:animate-none'>
          {[...TICKER, ...TICKER].map((item, index) => (
            <span key={`${item}-${index}`} className='pr-6'>
              {item} <span className='text-cyan-300/60'>·</span>
            </span>
          ))}
        </div>
      </div>

      <div
        data-scroll-cue
        className='absolute bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-100/60'
      >
        <span>Scroll</span>
        <span className='h-px w-10 origin-left animate-[cue_1.8s_ease-in-out_infinite] bg-cyan-300 motion-reduce:animate-none' />
      </div>
    </section>
  )
}

export default HeroMobile
