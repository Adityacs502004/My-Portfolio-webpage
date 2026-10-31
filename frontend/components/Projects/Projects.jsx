import { useLayoutEffect, useRef } from 'react'
import Video from './Video/Video';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Clientdesk_content from './Clientdesk_content/Clientdesk_content';
import Fasalnyay_contnet from './Fasalnyay_contnet/Fasalnyay_contnet';
import Fasalnyay_video from './Video/Fasalnyay_video';

const Projects = () => {
  gsap.registerPlugin(ScrollTrigger);

  const container_element = useRef(null);
  const section_element = useRef(null);
  const video_element = useRef(null);
  const content_element = useRef(null);
  const content_overlay = useRef(null);
  const fasalnyay_section_element = useRef(null);
  const fasalnyay_video_element = useRef(null);
  const fasalnyay_content_element = useRef(null);
  const fasalnyay_content_overlay = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(content_element.current, { autoAlpha: 0, y: 60, pointerEvents: 'none' });
      gsap.set(fasalnyay_content_element.current, { autoAlpha: 0, y: 60, pointerEvents: 'none' });
      gsap.set([content_overlay.current, fasalnyay_content_overlay.current], {
        autoAlpha: 0,
        pointerEvents: 'none',
      });

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(content_element.current, { autoAlpha: 1, y: 0, pointerEvents: 'auto' });
        gsap.set(fasalnyay_content_element.current, { autoAlpha: 1, y: 0, pointerEvents: 'auto' });
        gsap.set([content_overlay.current, fasalnyay_content_overlay.current], {
          autoAlpha: 1,
          pointerEvents: 'auto',
        });
        return;
      }

      const video = video_element.current;
      const scale = 1.5;
      const initialLeft = video.getBoundingClientRect().left;
      const initialWidth = video.offsetWidth;
      
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section_element.current,
          start: "center center",
          end: "+=1500", 
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onEnter: () => gsap.set(content_overlay.current, { autoAlpha: 1 }),
          onEnterBack: () => gsap.set(content_overlay.current, { autoAlpha: 1 }),
          onLeave: () => gsap.set(content_overlay.current, { autoAlpha: 0 }),
          onLeaveBack: () => gsap.set(content_overlay.current, { autoAlpha: 0 })
        }
      });

      timeline
        .to(video_element.current, {
          x: () => window.innerWidth - 30 - initialLeft - ((scale + 1) * initialWidth) / 2,
          scale,
          duration: 0.85
        })
        .to(content_element.current, {
          autoAlpha: 1,
          y: 0,
          pointerEvents: 'auto',
          duration: 0.2
        })
        .to({}, { duration: 0.5 }); 

      const fasalnyayTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: fasalnyay_section_element.current,
          start: 'center center',
          end: '+=1500', 
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onEnter: () => gsap.set(fasalnyay_content_overlay.current, { autoAlpha: 1 }),
          onEnterBack: () => gsap.set(fasalnyay_content_overlay.current, { autoAlpha: 1 }),
          onLeave: () =>
            gsap.set(fasalnyay_content_overlay.current, { autoAlpha: 0 }),
          onLeaveBack: () =>
            gsap.set(fasalnyay_content_overlay.current, { autoAlpha: 0 })
        }
      });

      fasalnyayTimeline
        .to(fasalnyay_video_element.current, {
          x: () => {
            const video = fasalnyay_video_element.current;
            const { left, width } = video.getBoundingClientRect();
            const targetLeft = window.innerWidth * 0.05;

            return targetLeft - left + ((1.5 - 1) * width) / 2;
          },
          scale: 1.5,
          duration: 0.85
        })
        .to(fasalnyay_content_element.current, {
          autoAlpha: 1,
          y: 0,
          pointerEvents: 'auto',
          duration: 0.2
        })
        .to({}, { duration: 0.5 });  

    }, container_element);

    return () => ctx.revert();
  }, []);

  return (
    <div id='work' ref={container_element} className='relative flex flex-col w-full'>
        {/* client desk */}
        <div className='relative z-10 w-[90%] place-self-center'>
        <div className='w-full text-[#60a7b2]/70 text-sm'>My Work</div>
        <div ref={content_overlay} className='pointer-events-none fixed left-[5vw] top-1/2 z-10 w-[40vw] -translate-y-1/2 max-md:left-[5vw] max-md:w-[90vw]'>
          <div ref={content_element}>
            <Clientdesk_content />
          </div>
        </div>

        <div ref={section_element} className='relative min-h-screen w-[90%] flex items-center'>
          <div className='absolute left-0 '>
            <Video ref={video_element}/>
          </div>
        </div>
      </div>

      {/* fasalnyay */}
      <div className='relative z-10 w-[90%] place-self-center mt-32'>
        <div ref={fasalnyay_content_overlay} className='pointer-events-none fixed right-[5vw] top-1/2 z-10 w-[40vw] -translate-y-1/2 max-md:right-[5vw] max-md:w-[90vw]'>
          <div ref={fasalnyay_content_element}>
            <Fasalnyay_contnet />
          </div>
        </div>

        <div ref={fasalnyay_section_element} className='relative min-h-screen w-full flex items-center justify-end'>
          <div className='absolute right-0 top-1/2 -translate-y-1/2'>
            <Fasalnyay_video ref={fasalnyay_video_element} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects