import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './Technical_Skills.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)


const stages = [
  {
    id: 'frontend',
    label: 'Frontend',
    blurb: 'What people see, touch and click.',
    tools: [
      ['React', '⚛', '#61dafb', 'ui library'],
      ['JavaScript', 'JS', '#f7df1e', 'language'],
      ['HTML', '5', '#e34f26', 'markup'],
      ['CSS', '#', '#1572b6', 'styling'],
      ['EJS', '<>', '#b4ca65', 'templating'],
    ],
  },
  {
    id: 'style-motion',
    label: 'Style & Motion',
    blurb: 'Making interfaces feel designed and alive.',
    tools: [
      ['Tailwind CSS', 'TW', '#38bdf8', 'utility css'],
      ['GSAP', 'G', '#88ce02', 'animation'],
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    blurb: 'Servers, routes and the logic behind them.',
    tools: [
      ['Node.js', 'JS', '#68a063', 'runtime'],
      ['Express', 'EX', '#d9f4ee', 'web framework'],
      ['Python', 'Py', '#ffd343', 'language'],
      ['Flask', 'F', '#d9f4ee', 'micro framework'],
    ],
  },
  {
    id: 'data',
    label: 'Data',
    blurb: 'Where everything gets stored and queried.',
    tools: [
      ['PostgreSQL', 'PG', '#699eca', 'relational db'],
      ['SQLite', 'SQ', '#9dd7f5', 'embedded db'],
    ],
  },
  {
    id: 'workflow',
    label: 'Workflow',
    blurb: 'Versioning, shipping and talking to APIs.',
    tools: [
      ['Git', '◆', '#f05032', 'version control'],
      ['GitHub', 'GH', '#d9f4ee', 'collaboration'],
      ['Axios', 'AX', '#8f75ff', 'http client'],
    ],
  },
]

const N = stages.length
const TOTAL = N + 0.4 // timeline length: N stages + a short hold at the end
const GLYPHS = '01<>/\\{}[]#$%&*+=-_~'
const pad = (n) => String(n).padStart(2, '0')

// Shows `text` with the first p (0..1) of it resolved and the rest as random glyphs
const setScramble = (el, text, p) => {
  if (!el) return
  if (p >= 1) {
    if (el.textContent !== text) el.textContent = text
    return
  }
  const keep = Math.floor(text.length * p)
  let out = text.slice(0, keep)
  for (let k = keep; k < text.length; k++) {
    out += text[k] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0]
  }
  el.textContent = out
}

// Hover version: plays the scramble once, on its own
const runScramble = (el, text) => {
  if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  el._scr?.kill()
  const s = { p: 0 }
  el._scr = gsap.to(s, {
    p: 1,
    duration: 0.45,
    ease: 'none',
    onUpdate: () => setScramble(el, text, s.p),
    onComplete: () => setScramble(el, text, 1),
  })
}

// Moves the soft cyan glow under the cursor inside a card
const handleMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

const Technical_Skills = () => {
  const root = useRef(null)
  const stage = useRef(null)
  const stRef = useRef(null)

  // Clicking a discipline in the list scrolls to the point where that stage is showing
  const goTo = (i) => {
    const st = stRef.current
    if (!st) return
    const y = st.start + ((i + 0.6) / TOTAL) * (st.end - st.start)
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()

      // Reduced motion: no pin, no animation, everything is just laid out and readable
      mm.add('(prefers-reduced-motion: reduce)', () => {
        root.current.dataset.static = 'true'
        return () => {
          delete root.current.dataset.static
        }
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const pathEl = q('[data-path]')[0]
        const blurbEl = q('[data-blurb]')[0]
        const countEl = q('[data-count]')[0]
        const noEl = q('[data-stage-no]')[0]
        const barEl = q('[data-bar]')[0]
        const scanEl = q('[data-scan]')[0]
        const navEls = q('[data-nav]')
        const cardsOf = (i) => q(`[data-panel="${i}"] [data-card]`)

        const cardFrom = { autoAlpha: 0, y: 36, rotateX: -25, scale: 0.94, transformPerspective: 700 }
        const cardTo = { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, ease: 'back.out(1.4)' }

        /* 1) INTRO: plays while the section scrolls into view, finishes right when it pins */
        gsap
          .timeline({
            scrollTrigger: {
              trigger: stage.current,
              start: 'top 80%',
              end: 'top top',
              scrub: 0.6,
            },
          })
          .from(q('[data-line]'), { yPercent: 110, duration: 0.6, stagger: 0.12, ease: 'power3.out' }, 0)
          .from(q('[data-eyebrow], [data-copy], [data-status]'), { autoAlpha: 0, y: 20, duration: 0.4, stagger: 0.1 }, 0.15)
          .from(navEls, { autoAlpha: 0, x: -24, duration: 0.4, stagger: 0.06 }, 0.3)
          .from(q('[data-frame]'), { autoAlpha: 0, y: 50, scale: 0.97, duration: 0.6, ease: 'power2.out' }, 0.1)
          .fromTo(cardsOf(0), cardFrom, { ...cardTo, stagger: 0.06, duration: 0.4 }, 0.5)

        /* 2) MAIN: pinned, one stage per unit of timeline time */
        const proxy = { t: 0 }

        const render = (t) => {
          const i = Math.min(N - 1, Math.floor(t))
          const f = t >= N ? 1 : t - i // 0..1 progress inside the current stage
          const p = i === 0 ? 1 : Math.min(1, f / 0.35) // how much of the label has "decoded"
          const s = stages[i]

          setScramble(pathEl, s.id, p)
          setScramble(blurbEl, s.blurb, p)
          if (countEl) countEl.textContent = `${pad(s.tools.length)} tools`
          if (noEl) noEl.textContent = `stage ${pad(i + 1)} / ${pad(N)}`
          navEls.forEach((el, k) => {
            el.dataset.active = String(k === i)
          })

          gsap.set(barEl, { scaleX: Math.min(1, t / N), transformOrigin: 'left center' })
          const sweep = i === 0 || f >= 0.5 ? 0 : Math.sin((Math.PI * f) / 0.5)
          gsap.set(scanEl, { top: `${Math.min(1, f / 0.5) * 100}%`, opacity: sweep })
        }

        const main = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage.current,
            start: 'top top',
            end: `+=${N * 550}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        })
        stRef.current = main.scrollTrigger

        // A "ruler" tween: t goes 0 -> N as you scroll, and render() reads it
        main.to(proxy, { t: N, duration: N, onUpdate: () => render(proxy.t) }, 0)
        main.to({}, { duration: TOTAL - N }, N) // short hold at the end

        stages.forEach((_, i) => {
          const cards = cardsOf(i)
          if (i > 0) {
            main.fromTo(cards, cardFrom, { ...cardTo, stagger: 0.06, duration: 0.3 }, i + 0.05)
          }
          if (i < N - 1) {
            main.to(
              cards,
              { autoAlpha: 0, y: -30, scale: 0.96, stagger: 0.03, duration: 0.2, ease: 'power2.in' },
              i + 0.78
            )
          }
        })
      })

      return () => mm.revert()
    },
    { scope: root }
  )

    return (
    <section ref={root} className='ts font-mono text-[#d9f4ee]'>
      <div ref={stage} className='ts-stage'>
        <div className='ts-bg-glow' />
        <div className='ts-bg-grid' />

        <div className='ts-inner'>
          {/* LEFT */}
          <div className='ts-left'>
            <p data-eyebrow className='mb-4 text-[11px] uppercase tracking-[0.3em] text-[#60a7b2]/80'>
              [ technical skills ]
            </p>

            <h2 className='ts-title'>
              <span className='ts-title-line'>
                <span data-line>Tools I use</span>
              </span>
              <span className='ts-title-line ts-title-accent'>
                <span data-line>
                  to make.<span className='animate-pulse'>_</span>
                </span>
              </span>
            </h2>

            <p data-copy className='ts-desktop mt-6 max-w-sm text-sm leading-7 text-[#d9f4ee]/55'>
              A practical toolkit shaped by the products I build and the problems I like solving.
            </p>

            <nav className='ts-nav ts-hide-static'>
              {stages.map((s, i) => (
                <button
                  key={s.id}
                  type='button'
                  data-nav
                  data-active={i === 0}
                  onClick={() => goTo(i)}
                  className='ts-nav-item'
                >
                  <span style={{ opacity: 0.7 }}>[{pad(i + 1)}]</span>
                  <span>{s.label}</span>
                  <span className='ts-nav-rule' />
                  <span className='ts-nav-count'>{pad(s.tools.length)}</span>
                </button>
              ))}
            </nav>

            <div
              data-status
              className='ts-desktop-flex mt-8 items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#d9f4ee]/35'
            >
              <span className='h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_#6ee7b7]' />
              <span>16 tools / 05 disciplines</span>
            </div>
          </div>

          {/* RIGHT */}
          <div data-frame className='ts-frame'>
            <div className='ts-frame-glow' />
            <span className='ts-corner tl' />
            <span className='ts-corner tr' />
            <span className='ts-corner bl' />
            <span className='ts-corner br' />
            <div data-scan className='ts-scan' />

            <div className='ts-frame-head ts-hide-static'>
              <p>
                <span className='text-[#60a7b2]'>~/stack/</span>
                <span data-path>{stages[0].id}</span>
                <span className='animate-pulse text-[#60a7b2]'>▍</span>
              </p>
              <span data-count className='ts-count'>{pad(stages[0].tools.length)} tools</span>
            </div>
            <p data-blurb className='ts-blurb ts-hide-static'>{stages[0].blurb}</p>

            <div className='ts-body'>
              {stages.map((s, si) => (
                <div key={s.id} data-panel={si} className='ts-panel'>
                  <p className='ts-panel-label'>[{pad(si + 1)}] {s.label}</p>

                  {s.tools.map(([name, mark, color, role], ti) => (
                    <div
                      key={name}
                      data-card
                      className='ts-card'
                      onMouseMove={handleMove}
                      onMouseEnter={(e) => runScramble(e.currentTarget.querySelector('[data-name]'), name)}
                    >
                      <span aria-hidden className='ts-card-glow' />
                      <span className='ts-idx'>{pad(ti + 1)}</span>
                      <div
                        className='ts-mark'
                        style={{ color, boxShadow: `inset 0 0 0 1px ${color}26`, textShadow: `0 0 14px ${color}99` }}
                      >
                        {mark}
                      </div>
                      <div className='ts-card-text'>
                        <p data-name className='ts-name'>{name}</p>
                        <p className='ts-role'>{role}</p>
                      </div>
                      <span
                        aria-hidden
                        className='ts-card-line'
                        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className='ts-foot ts-hide-static'>
              <span data-stage-no>stage 01 / 05</span>
              <span>scroll to switch ↓</span>
            </div>
            <div className='ts-bar-track ts-hide-static'>
              <div data-bar className='ts-bar' style={{ transform: 'scaleX(0)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Technical_Skills