import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const Page_roller = () => {
  const anchor = useRef(null)
  const curtain = useRef(null)

  useGSAP(() => {
    let busy = false
    const block = (e) => e.preventDefault()
    const anchorY = () => anchor.current.getBoundingClientRect().top + window.scrollY

    gsap.set(curtain.current, { yPercent: 100 }) 

    const wipe = (dir) => {            
      if (busy) return
      busy = true
      window.addEventListener('wheel', block, { passive: false })
      window.addEventListener('touchmove', block, { passive: false })

      
      const target = dir === 1 ? anchorY() + 1 : anchorY() - window.innerHeight

      gsap.timeline({
        onComplete: () => {
          busy = false
          window.removeEventListener('wheel', block)
          window.removeEventListener('touchmove', block)
        },
      })
        .fromTo(curtain.current,
          { yPercent: 100 * dir },
          { yPercent: 0, duration: 0.6, ease: 'power3.in' })
        .add(() => window.scrollTo({ top: target, behavior: 'instant' }))
        .to(curtain.current,
          { yPercent: -100 * dir, duration: 0.6, ease: 'power3.out' })
    }

    
    ScrollTrigger.create({
      trigger: anchor.current,
      start: 'top bottom',
      onEnter: () => wipe(1),
    })

    
    ScrollTrigger.create({
      trigger: anchor.current,
      start: 'top top',
      onLeaveBack: () => wipe(-1),
    })
  }, { scope: anchor })

  return (
    <div ref={anchor} className="h-0">
      <div
        ref={curtain}
        className="pointer-events-none fixed left-0 top-0 z-40 h-dvh w-screen bg-[#153048]"
      />
    </div>
  )
}

export default Page_roller