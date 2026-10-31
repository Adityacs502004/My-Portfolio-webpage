import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'

gsap.registerPlugin(ScrambleTextPlugin, useGSAP, ScrollTrigger)

const Contact = () => {

  const scramble_text = useRef(null);
  const contact_section = useRef(null);
  const form_box = useRef(null);

  const [user_details , Setuser_detail] = useState({
    name : "",
    email : "",
    details : ""
  });
  const [message , Setmessage] = useState("");
  const [success , Setsuccess] = useState(null);

  function handle_user_input(e) {
    const {name  , value} = e.target
    Setuser_detail((prev) => ({...prev , [name] : value}))
  }

  async function send_data(e) {
    e.preventDefault();

    try {
      const send_user_data = await axios.post("http://localhost:3000/send_detail", {
        username: user_details.name,
        email: user_details.email,
        details: user_details.details,
      });

      Setsuccess(send_user_data.data.success);
      Setmessage(send_user_data.data.message);
    } catch (error) {
      Setsuccess(false);
      Setmessage(error.response?.data?.message ?? 'Unable to send your message');
    }
  }

  useGSAP(() => {
    const intro = gsap.timeline({
      scrollTrigger: {
        trigger: contact_section.current,
        start: 'top 75%',
        once: true,
      },
    })

    intro
      .fromTo(
        form_box.current,
        { autoAlpha: 0, y: 40, clipPath: 'inset(0 0 100% 0 round 16px)' },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: 'inset(0 0 0% 0 round 16px)',
          duration: 0.9,
          ease: 'power3.out',
        }
      )
      .to(
        scramble_text.current,
        {
          duration: 2,
          scrambleText: {
            text: 'Have Something',
            chars: '!<>-_/\\[]{}=+*^?#01',
            revealDelay: 0.5,
            speed: 0.4,
          },
          ease: 'power2.out',
        },
        0.15
      )
  }, { scope: contact_section })

  return (
    <div id='contact' ref={contact_section} className='relative z-20 isolate w-full min-h-screen bg-[#153048] flex justify-center items-center py-12 lg:h-screen lg:py-0'>
        <div className='w-[92%] max-w-7xl flex flex-col gap-12 lg:h-[80%] lg:flex-row lg:justify-between lg:gap-0'>
            {/* Left section */}
            <div className='w-full flex flex-col items-center lg:h-full lg:w-[40%]'>
                 <div className='w-full flex flex-col gap-4 justify-center lg:h-full'>
                    <span ref={scramble_text} className='text-[clamp(2.25rem,9vw,3.75rem)] font-black text-amber-50'>Have something</span> 


                    <div className='whitespace-nowrap text-[clamp(2rem,4vw,3.25rem)] font-black'>
                        <span className='text-[#5aa5b3]'>worth building</span>
                        <span className='text-amber-50'> ?</span>
                    </div>


                    <div>
                    <span className='text-base text-cyan-300 sm:text-lg'>Every good project starts with a conversation.</span>
                    </div>

                    <div>
                        <span className='text-base text-cyan-200 mt-2 sm:text-lg'>Whether you have an idea to bring to life, a problem that needs solving, or simply want to connect, I'd love to hear from you.</span>
                    </div>

                    <div className='w-full h-fit mt-8 flex justify-between'>
                        <a
                          href='https://github.com/Adityacs502004'
                          target='_blank'
                          rel='noreferrer'
                          aria-label='Visit my GitHub profile'
                          className='cursor_pointer relative z-10 block h-12 w-12 cursor-pointer'
                        >
                          <img
                            src='/github.png'
                            alt='GitHub'
                            className='pointer-events-none h-full w-full object-contain'
                          />
                        </a>

                        <a
                          href='https://www.linkedin.com/in/aditya-pandey-70486221b/'
                          target='_blank'
                          rel='noreferrer'
                          aria-label='Visit my Linkdin profile'
                          className='cursor_pointer relative z-10 block h-12 w-12 cursor-pointer'
                        >
                          <img
                            src='/linkedin.png'
                            alt='linkedin'
                            className='pointer-events-none h-full w-full object-contain'
                          />
                        </a>

                        <a
                          href='https://www.instagram.com/adi.raj_23/'
                          target='_blank'
                          rel='noreferrer'
                          aria-label='Visit my insta page'
                          className='cursor_pointer relative z-10 block h-12 w-12 cursor-pointer'
                        >
                          <img
                            src='/instagram.png'
                            alt='Instagram'
                            className='pointer-events-none h-full w-full object-contain'
                          />
                        </a>
                    </div>
                 </div>

                 
                
                
            </div>
            {/* Right section */}
            <div className='w-full flex justify-center items-center lg:h-full lg:w-[55%]'>
                <div ref={form_box} className='w-full bg-[#181e32] flex items-center justify-center rounded-2xl p-3 sm:p-4 lg:h-[90%]'>
                  <div className='w-full min-h-[30rem] bg-[#060F1B] rounded-2xl p-4 sm:p-6 lg:h-[95%]'>

                    <span>~/contact/send</span>

                    <hr className='mt-2 text-gray-600'></hr>

                    <div className='w-full h-fit mt-8 flex flex-col gap-2'>
                        <span className='text-gray-500'>&gt; opening channel to aditya</span>

                        <span className=''>&gt; channel open. fill in the fields below.</span>
                    </div>

                    <form onSubmit={send_data} className='w-full mt-12 sm:mt-16 lg:mt-20' >

                      <div className='w-full flex flex-col gap-8'>
                            <div className='w-full flex items-start gap-3'>
                              <span className='text-amber-50'>$ name</span>
                              <input name='name' autoComplete='off' value={user_details.name} onChange={handle_user_input} required type='text' placeholder='Provide your name' className='min-w-0 flex-1 border-b-2 border-white/10 bg-transparent outline-none'></input>
                          </div>

                          <div className='w-full flex items-start gap-3'>
                              <span className='text-amber-50'>$ email</span>
                              <input autoComplete='off' onChange={handle_user_input} name='email' value={user_details.email} required type='email' placeholder='Provide your email' className='min-w-0 flex-1 border-b-2 border-white/10 bg-transparent outline-none'></input>
                          </div>

                          <div className='w-full flex items-start gap-3'>
                              <span className='text-amber-50'>$ details</span>
                              <textarea autoComplete='off' onChange={handle_user_input} name='details' value={user_details.details} className='min-h-20 min-w-0 flex-1 resize-y border-b-2 border-white/10 bg-transparent outline-none' required placeholder='Please provide details'></textarea>
                          </div>

                          <div className='w-fit h-fit ml-4'>
                            <button type='submit' className='w-fit p-3 pl-4 pr-4 hover:bg-[#282d79] h-fit hover:scale-110 text-amber-50 cursor_pointer border border-cyan-700 rounded-xl bg-transparent'>Submit</button>
                          </div>

                          <div
                            aria-live='polite'
                            className={`min-h-6 w-full px-1 text-sm break-words ${
                              success === true ? 'text-green-400' : 'text-red-400'
                            }`}
                          >
                            {message}
                          </div>
                          </div>
                      </form>
                      
                    <hr className='mt-2 text-gray-600'></hr>

                  </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Contact