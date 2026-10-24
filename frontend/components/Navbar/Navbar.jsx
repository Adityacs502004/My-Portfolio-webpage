import { useEffect } from "react"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Navbar = () => {

  gsap.registerPlugin(ScrollTrigger);

  useEffect(()=>{
    let ctx = gsap.context(() => {
      
      gsap.to(".navbar", {
        scaleX: 0.70,
        transformOrigin: 'top center',
        ease: 'none',
        willChange: 'transform',
        scrollTrigger: {
          trigger: 'body',
          start: "top+=50px top",
          end: "top+=350px top",
          scrub: 0.6,
        }
      });

    });

    return () => ctx.revert(); 
  },[]);


  function handlerefresh() {
    window.location.reload()
  }

  return (
    <header className='sticky top-2 z-20 pt-2'>
          <div className='navbar mx-auto flex h-fit w-[95%] items-center-safe justify-between rounded-xl bg-gray-900 p-2'>
            <button
              type='button'
              onClick={handlerefresh}
              aria-label='Refresh profile'
              className='h-12 w-12 shrink-0 cursor_pointer cursor-none rounded-xl bg-[url("/Profile_logo.png")] bg-contain bg-no-repeat'
            />
            <div className='flex h-full shrink-0 items-center gap-8'>
                <div className='shrink-0'>[Projects]</div>
                <div className='shrink-0'>[Images]</div>
            </div>
          </div>
        </header>
  )}

export default Navbar