import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
  { label: 'GitHub', href: 'https://github.com/Adityacs502004', external: true },
]

const Navbar = () => {
  const nav = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      gsap.to(nav.current, {
        width: '70%',
        maxWidth: '900px',
        ease: 'none',
        willChange: 'width, max-width',
        scrollTrigger: {
          trigger: document.body,
          start: 'top+=50px top',
          end: 'top+=350px top',
          scrub: 0.6,
        },
      })
    })

    return () => mm.revert()
  }, { scope: nav })

  return (
    <header className='sticky top-2 z-40 px-2 pt-2 sm:px-4'>
      <nav
        ref={nav}
        aria-label='Primary navigation'
        className='mx-auto flex min-h-14 w-[95%] max-w-7xl items-center justify-between gap-4 rounded-2xl border border-cyan-200/10 bg-[#0b1425]/95 px-3 py-2 text-sm text-cyan-100 shadow-[0_12px_40px_rgba(0,0,0,0.2)] backdrop-blur-md sm:px-4'
      >
        <a
          href='/'
          aria-label='Return to the home page'
          className='group flex shrink-0 items-center gap-3 rounded-xl outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-cyan-300'
        >
          <span
            aria-hidden='true'
            className='block h-10 w-10 rounded-xl bg-[#06222b] bg-[url("/Profile_logo.png")] bg-contain bg-center bg-no-repeat'
          />
          <span className='hidden font-mono text-xs uppercase tracking-[0.25em] text-cyan-100/70 sm:block'>
            Aditya Raj
          </span>
        </a>

        <div className='hidden items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-cyan-100/45 md:flex'>
          <span className='h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_#6ee7b7]' />
          <span>Available for ideas</span>
        </div>

        <div className='flex items-center gap-1 font-mono text-xs uppercase tracking-[0.12em] sm:gap-2'>
          {links.map(({ label, href, external }) => (
            <a
              key={href}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              className='rounded-lg px-2 py-2 text-cyan-100/65 transition-colors hover:bg-cyan-200/10 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:px-3'
            >
              [{label}]
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
