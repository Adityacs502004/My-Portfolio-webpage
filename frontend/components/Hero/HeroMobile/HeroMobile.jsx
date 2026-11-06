import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const HeroMobile = () => {
  const root = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    // Cinematic slow-zoom on the portrait
    gsap.fromTo(
      '[data-hero-img]',
      { scale: 1.1, filter: 'contrast(1.2) brightness(0.5)' },
      { scale: 1, filter: 'contrast(1.2) brightness(1)', duration: 3, ease: 'power2.out' }
    )

    // Staggered text entrance sliding in from the sides
    tl.from('[data-text-line]', {
      xPercent: (i) => (i % 2 === 0 ? -100 : 100),
      autoAlpha: 0,
      duration: 1.4,
      stagger: 0.1,
    })
    
    // Fade in the metadata
    tl.from('[data-meta]', { autoAlpha: 0, y: 10, duration: 1 }, '-=0.8')
  }, { scope: root })

  return (
    <section ref={root} className='relative h-svh w-full overflow-hidden bg-[#e5e5e5]'>
      
      {/* 1. The Anchor Image (Massive, Grayscale, High Contrast) */}
      <div className='absolute bottom-0 right-0 z-0 h-[85%] w-[95%] origin-bottom-right'>
        <img
          data-hero-img
          src='/Contemplative_Monochrome_Portrait.png'
          alt='Aditya Raj'
          className='h-full w-full object-cover object-[60%_20%] grayscale'
        />
      </div>

      {/* 2. The Mix-Blend Typography Layer */}
      {/* Using mix-blend-difference makes the text invert its color based on what is behind it */}
      <div className='pointer-events-none absolute inset-0 z-10 flex flex-col justify-center px-4 mix-blend-difference'>
        <div className='overflow-hidden'>
          <h1 data-text-line className='text-[22vw] font-black uppercase leading-[0.8] tracking-tighter text-white'>
            Aditya
          </h1>
        </div>
        <div className='overflow-hidden'>
          <h1 data-text-line className='ml-[15%] text-[22vw] font-black uppercase leading-[0.8] tracking-tighter text-white'>
            Raj.
          </h1>
        </div>
        <div className='mt-8 overflow-hidden'>
          <p data-text-line className='max-w-[20ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-white'>
            Full-Stack Developer &<br /> Obsessive Product Builder
          </p>
        </div>
      </div>

      {/* 3. Bottom Metadata & Scroll Trigger (Standard Blend) */}
      <div data-meta className='absolute bottom-6 left-5 z-20 flex flex-col gap-1 mix-blend-difference'>
        <span className='font-mono text-[10px] uppercase tracking-[0.3em] text-white'>Available for work</span>
        <div className='mt-2 h-px w-12 animate-[pulse_2s_ease-in-out_infinite] bg-white' />
      </div>

    </section>
  )
}

export default HeroMobile