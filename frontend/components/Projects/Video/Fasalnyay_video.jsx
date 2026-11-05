import { forwardRef, useEffect, useRef } from 'react'

const Fasalnyay_video = forwardRef((props , ref) => {

    const videoRef = useRef(null);
    const video_src = "/Video/fasalnyay_story_film_web (1).mp4";
    

    useEffect(()=>{
        const video = videoRef.current

        const load_video = new IntersectionObserver(([entry])=>{
            if (entry.isIntersecting && !video.src){
                video.src = video_src;
                video.load()

                load_video.disconnect();
            }
        }, {rootMargin : "300px 0px"})

        const play_video = new IntersectionObserver(([entry])=>{
            if(entry.isIntersecting){
                video.play().catch(()=>{});
            }
            else{
                video.pause();
            }
        }, {threshold : 0.1})


        load_video.observe(video);
        play_video.observe(video);

        return(()=>{
            load_video.disconnect();
            play_video.disconnect();
        })
    },[]);

  return (
    <div ref={ref} className='flex aspect-[5/3] h-auto w-full max-w-[500px] items-center justify-center rounded-xl bg-cyan-900 md:h-[300px] md:w-[500px] md:aspect-auto'>
        <div className='h-[calc(100%-20px)] w-[calc(100%-20px)] rounded-xl bg-cyan-700 md:h-[280px] md:w-[480px]'>
            <video className='h-full w-full object-cover rounded-xl' ref={videoRef} width="100%" height="100%" muted loop playsInline preload='none' ></video>
        </div>
    </div>
  )
})

export default Fasalnyay_video