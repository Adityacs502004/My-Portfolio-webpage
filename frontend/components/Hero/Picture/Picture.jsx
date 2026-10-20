import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const Picture = () => {
    const imageRef = useRef(null);
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const asciiRef = useRef(null);

    const [ascii, setAscii] = useState("");

    useEffect(()=>{
        const image = imageRef.current;
        const canvas = canvasRef.current;

        if (!image || !canvas) return;

        const renderAscii = () => {
            const ctx = canvas.getContext('2d');
            if (!ctx || !image.naturalWidth || !image.naturalHeight) return;

            const width = 120;
            const aspectRatio = image.naturalHeight / image.naturalWidth;
            // Monospace characters are taller than they are wide.
            const height = Math.max(1, Math.floor(width * aspectRatio * 0.6));
            const characters = ' .:-=+*#%@';

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(image, 0, 0, width, height);

            const pixels = ctx.getImageData(0, 0, width, height).data;
            let result = '';

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const index = (y * width + x) * 4;
                    const brightness =
                        0.299 * pixels[index] +
                        0.587 * pixels[index + 1] +
                        0.114 * pixels[index + 2];

                    result += characters[
                        Math.floor((brightness / 255) * (characters.length - 1))
                    ];
                }
                result += '\n';
            }

            setAscii(result);
        };

        if (image.complete) {
            renderAscii();
        } else {
            image.addEventListener('load', renderAscii);
        }

        return () => image.removeEventListener('load', renderAscii);
    }, [])

    useEffect(()=>{
        const container = containerRef.current;
        const image = imageRef.current;
        const ascii = asciiRef.current;

        if (!container || !image || !ascii) return;

        const enter = () =>{
            gsap.to(image , {
                opacity : 1,
                duration : 0.15,
                ease : 'power2.out'
            });
        };

        const move = (event) => {
            const bounds = container.getBoundingClientRect();
            const x = event.clientX - bounds.left;
            const y = event.clientY - bounds.top;

            image.style.maskImage = `radial-gradient(circle 6rem at ${x}px ${y}px, black 0 68%, transparent 100%)`;
            image.style.webkitMaskImage = image.style.maskImage;
        };

        const leave = () => {
            gsap.to(image, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.out'
            });
        };

        container.addEventListener('mouseenter' , enter);
        container.addEventListener('mousemove', move);
        container.addEventListener('mouseleave' , leave);

        return () => {
            container.removeEventListener('mouseenter', enter);
            container.removeEventListener('mousemove', move);
            container.removeEventListener('mouseleave', leave);
        };

    }, []);

  return (
    <div className='relative h-svh w-[45%] flex justify-center items-center gap-2'>
        <div ref={containerRef} data-ascii-picture className='relative w-[min(90%,42rem)] aspect-1178/976'>
            <img ref={imageRef}
          src="/portfolio_photo.jpg"
          alt=""
          className='absolute inset-0 z-10 h-full w-full object-contain opacity-0 pointer-events-none'
        />

        <canvas ref={canvasRef} className='hidden'/>

        <pre ref={asciiRef} className='absolute inset-0 z-0 flex items-center justify-center overflow-hidden whitespace-pre text-[clamp(4px,0.5vw,8px)] leading-[clamp(4px,0.5vw,8px)] font-mono text-[#d8d8d8]'>
          {ascii}
        </pre>

        </div>
    </div>
  )
}

export default Picture