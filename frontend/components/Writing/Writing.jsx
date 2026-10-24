import React, { useRef } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

const Writing = () => {

    gsap.registerPlugin(ScrollTrigger);

    const root = useRef(null);

    useGSAP(()=>{
        const ctx = gsap.context(() => {
            const phrases = gsap.utils.toArray(".writing-phrase");
            const conjunction = root.current.querySelector(".writing-and");
            const conjunctionWidth = conjunction?.offsetWidth ?? 0;

            gsap.set(phrases, {
                transformPerspective: 1200,
                transformOrigin: "center center",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
            });

            const updatePhrases = (progress) => {
                const activePhrase = progress * (phrases.length - 1);

                phrases.forEach((phrase, index) => {
                    const distance = index - activePhrase;
                    const distanceFromCenter = Math.abs(distance);
                    const isVisible = distanceFromCenter <= 1;

                    gsap.set(phrase, {
                        x: distance * 600,
                        z: -Math.min(distanceFromCenter, 1) * 780,
                        rotateY: distance * -105,
                        scale: 1 - Math.min(distanceFromCenter, 1) * 0.12,
                        opacity: isVisible
                            ? 1 - Math.min(distanceFromCenter, 1)
                            : 0,
                        visibility: isVisible ? "visible" : "hidden",
                    });

                    if (index === phrases.length - 1) {
                        const conjunctionProgress = gsap.utils.clamp(
                            0,
                            1,
                            (activePhrase - (phrases.length - 2)) * 2
                        );

                        gsap.set(".writing-and", {
                            x: -conjunctionProgress * 300,
                            opacity: 1 - conjunctionProgress,
                            width: conjunctionWidth * (1 - conjunctionProgress),
                            marginRight: 12 * (1 - conjunctionProgress),
                        });
                    }
                });
            };

            updatePhrases(0);

            gsap.fromTo(
                root.current,
                {
                    opacity: 0,
                    y: 60,
                    scale: 0.96,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: root.current,
                        start: "top 85%",
                        end: "top 45%",
                        scrub: true,
                    },
                }
            );

            ScrollTrigger.create({
                trigger: root.current,
                start: "top 15%",
                end: "+=1800",
                pin: true,
                scrub: true,
                anticipatePin: 1,
                onUpdate: ({ progress }) => updatePhrases(progress),
            });
        }, root);

        return () => ctx.revert();
    }, {scope : root})


  return (
  <section
      ref={root}
      className='container my-32 h-screen w-[90%] overflow-hidden place-self-center rounded-4xl border border-[#60a7b2]/20 bg-[#10232a] p-4 text-[#d9f4ee] shadow-[0_24px_100px_rgba(0,0,0,0.35)]'
  >
      <div
          className='relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border border-[#60a7b2]/10 bg-[#0b1a20]'
          style={{ perspective: "1200px" }}
      >
          <span className='absolute left-8 top-8 text-xs font-medium uppercase tracking-[0.3em] text-[#60a7b2]/70'>
              What I build
          </span>
          <div className='writing-lines flex w-full flex-col gap-2 px-4 text-center text-5xl font-black leading-[0.95] sm:text-6xl lg:text-8xl'>
              <span>I build digital</span>
              <span>experiences that</span>
              <div className='relative mt-2 h-[1.1em] w-full overflow-hidden'>
                  <span className='writing-phrase absolute inset-0 flex items-center justify-center whitespace-nowrap'>
                      look good,
                  </span>
                  <span className='writing-phrase absolute inset-0 flex items-center justify-center whitespace-nowrap'>
                      feel intentional,
                  </span>
                  <span className='writing-phrase absolute inset-0 flex items-center justify-center whitespace-nowrap'>
                      <span className='writing-and inline-block overflow-hidden whitespace-nowrap'>and</span>
                      <span>actually work.</span>
                  </span>
              </div>
          </div>
      </div>
       
    </section>
  )
}

export default Writing