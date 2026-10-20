import { useEffect, useRef } from 'react'

const characters = ['+', '*', '.', '/', '-', '@', '!', '#', '$']
const background = Array.from({ length: 600 }, () => {
    const randomNumber = Math.floor(Math.random() * characters.length)
    return characters[randomNumber]
})

const AsciiBackground = () => {
    const radius = 150;
    const max_scale = 3;

    const containerRef = useRef(null);

    useEffect(()=>{
        const spans = Array.from(containerRef.current.children);
        const picture = document.querySelector('[data-ascii-picture]');
        let centres = [];
        let frame 
        let pictureBounds;

        const measure = ()=>{
            centres = spans.map((span)=>{
                const r = span.getBoundingClientRect();
                return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
            })
            pictureBounds = picture?.getBoundingClientRect();
        }

        const onMove = (e) => {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(() => {
        spans.forEach((span, i) => {
        const d = Math.hypot(e.clientX - centres[i].x, e.clientY - centres[i].y)
        const isInsidePicture = pictureBounds &&
          centres[i].x >= pictureBounds.left &&
          centres[i].x <= pictureBounds.right &&
          centres[i].y >= pictureBounds.top &&
          centres[i].y <= pictureBounds.bottom;
        const t = isInsidePicture ? 0 : Math.max(0, 1 - d / radius)
        span.style.transform = `scale(${1 + t * (max_scale - 1)})`
        span.style.color = `rgba(96, 167, 178, ${0.2 + t * 0.8})`
    })
  })
}

    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame)
    }


    },[])

  return (
    <div
      ref={containerRef}
      aria-hidden='true'
      className='pointer-events-none absolute inset-0 z-0 grid h-dvh w-full grid-cols-30 place-items-center text-[#60a7b2]/20'
    >{background.map((character , index)=>{
        return <span key={index}>{character}</span> 
    })}</div>
  )
}

export default AsciiBackground