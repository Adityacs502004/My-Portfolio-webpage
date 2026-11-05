import { useEffect, useRef, forwardRef } from 'react'

const Video = forwardRef((props , ref) => {

    const videoref = useRef(null);

    const video_source = "/Video/clientdesk_story_film_web.mp4"
    const poster_source = "/ClientDesk_ Keep Every Client in Orbit.png"

    useEffect(()=>{
        
        const video = videoref.current;

        const loadobserver = new IntersectionObserver(
            ([entry]) =>{
                if(entry.isIntersecting && !video.src){
                    video.src = video_source;
                    video.load();

                    loadobserver.disconnect();
                }
            },
            {
                rootMargin : "500px 0px"
            }
        );

        const playobserver = new IntersectionObserver(
            ([entry]) =>{
                if(entry.isIntersecting){
                    video.play().catch(()=>{});
                }
                else{
                    video.pause();
                }
            },
            {
                threshold : 0.1
            }
        );

        loadobserver.observe(video);
        playobserver.observe(video);

        return () =>{
            loadobserver.disconnect();
            playobserver.disconnect();
        }

    },[]);

  return (
    <div ref={ref} className='flex aspect-[5/3] h-auto w-full max-w-[500px] items-center justify-center rounded-xl bg-cyan-900 md:h-[300px] md:w-[500px] md:aspect-auto'>
        <div className='h-[calc(100%-20px)] w-[calc(100%-20px)] rounded-xl bg-cyan-700 md:h-[280px] md:w-[480px]'>
            <video className='h-full w-full object-cover rounded-xl' ref={videoref} width="100%" height="100%" muted loop playsInline preload='none' poster={poster_source} ></video>
        </div>
    </div>
  )
})

export default Video