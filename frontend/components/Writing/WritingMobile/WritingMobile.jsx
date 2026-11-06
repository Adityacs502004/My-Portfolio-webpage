import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const principles = [
  {
    number: '01',
    word: 'Good',
    phrase: 'look good.',
    detail: 'A clear visual point of view makes useful things easier to understand.',
    accent: 'text-amber-50',
  },
  {
    number: '02',
    word: 'Intentional',
    phrase: 'feel intentional.',
    detail: 'Every interaction earns its place, from the first tap to the last detail.',
    accent: 'text-cyan-300',
  },
  {
    number: '03',
    word: 'Useful',
    phrase: 'actually work.',
    detail: 'The final measure is simple: does it help someone get something done?',
    accent: 'text-amber-50',
  },
]

const WritingMobile = () => {
  const root = useRef(null)

  useGSAP(() => {
    const cards = gsap.utils.toArray('[data-principle]')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(cards, { autoAlpha: 1, y: 0 })
      return
    }

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { autoAlpha: 0.25, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            end: 'top 55%',
            scrub: true,
          },
        }
      )

      gsap.from(card.querySelector('[data-principle-word]'), {
        xPercent: index % 2 === 0 ? -12 : 12,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 72%', once: true },
      })
    })
  }, { scope: root })

  return (
    <section ref={root} data-writing-mobile className='relative my-16 w-full overflow-hidden bg-[#060d12] px-4 py-10 text-[#d9f4ee] md:hidden'>
      <div className='mb-12 flex items-end justify-between border-b border-cyan-200/15 pb-5'>
        <div>
          <p className='font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300'>(Writing)</p>
          <h2 className='mt-3 max-w-[10ch] text-[clamp(2.2rem,11vw,3.8rem)] font-black leading-[0.9] tracking-[-0.08em] text-amber-50'>
            I build digital experiences.
          </h2>
        </div>
        <span className='pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-100/45'>Scroll / 03</span>
      </div>

      <div className='relative'>
        <div className='absolute bottom-0 left-3 top-0 w-px bg-cyan-200/15' />
        <div className='space-y-5'>
          {principles.map((principle) => (
            <article
              key={principle.number}
              data-principle
              className='relative ml-3 min-h-[15rem] overflow-hidden border border-cyan-200/15 bg-[#10232a] p-5 pl-8 shadow-[0_18px_50px_rgba(0,0,0,0.2)]'
            >
              <span className='absolute -left-[1.05rem] top-6 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/50 bg-[#060d12] font-mono text-[10px] text-cyan-300'>
                {principle.number}
              </span>
              <div className='flex items-start justify-between gap-4'>
                <span className='font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-100/45'>Principle</span>
                <span className='font-mono text-[10px] text-cyan-100/45'>0{principle.number[1]} / 03</span>
              </div>
              <p
                data-principle-word
                className={`mt-12 whitespace-nowrap font-black leading-[0.8] tracking-[-0.09em] ${principle.word === 'Intentional' ? 'text-[clamp(1.8rem,9vw,2.8rem)]' : 'text-[clamp(3.2rem,16vw,5.5rem)]'} ${principle.accent}`}
              >
                {principle.word}
              </p>
              <div className='mt-8 border-t border-cyan-200/15 pt-4'>
                <p className='font-mono text-xs uppercase tracking-[0.16em] text-cyan-300'>{principle.phrase}</p>
                <p className='mt-3 max-w-[28ch] text-sm leading-relaxed text-cyan-100/60'>{principle.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WritingMobile
