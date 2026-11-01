const capabilities = ['React', 'Node.js', 'Express', 'PostgreSQL', 'Gemini AI'];

const Fasalnyay_contnet = () => {
  return (
    <article id='fasalnyay' className='group relative w-full py-5 pl-4 text-right sm:py-8 sm:pl-8'>
      <div className='mb-8 flex items-center justify-end gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-200/65'>
        <span className='text-amber-100/55'>Agriculture platform</span>
        <span className='h-px w-12 bg-cyan-200/30 transition-all duration-500 group-hover:w-24 group-hover:bg-cyan-200/70' />
        <span>Project / 002</span>
        <span className='h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_#67e8f9]' />
      </div>

      <div className='relative overflow-hidden'>
        <h2 className='whitespace-nowrap text-[clamp(3.25rem,8vw,7.5rem)] font-black leading-[0.78] tracking-[-0.08em] text-amber-50 transition-transform duration-700 ease-out group-hover:-translate-x-2'>
          FASAL<span className='text-cyan-300'>NYAY</span>
        </h2>
      </div>

      <div className='mt-8 grid max-w-2xl grid-cols-[1fr_1.5rem] gap-4 border-r border-cyan-200/30 pr-4 sm:mt-12 sm:pr-6'>
        <p className='text-base leading-relaxed text-slate-200/75 sm:text-xl sm:leading-relaxed'>
          An AI-powered agricultural platform that helps farmers verify field
          information, analyze crop images, and access relevant agricultural guidance.
        </p>
        <span className='pt-1 text-xs text-cyan-300/70'>↲</span>
      </div>

      <div className='mt-8 flex flex-wrap justify-end gap-x-5 gap-y-2 text-xs text-cyan-100/55 sm:mt-10'>
        {capabilities.map((capability, index) => (
          <span key={capability} className='flex items-center gap-5'>
            {index > 0 && <span className='text-amber-100/35'>/</span>}
            <span className='transition-colors duration-300 group-hover:text-cyan-100/90'>
              {capability}
            </span>
          </span>
        ))}
      </div>

      <div className='mt-8 flex items-center justify-end gap-6 sm:mt-12'>
        <a
          href='https://fasal-nyay.vercel.app/'
          target='_blank'
          rel='noreferrer'
          className='group/link inline-flex items-center gap-2 border-b border-cyan-300 pb-1 text-sm font-bold text-cyan-200 transition-colors duration-300 hover:border-amber-200 hover:text-amber-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200'
        >
          Live
          <span className='transition-transform duration-300 group-hover/link:translate-x-1'>
            ↗
          </span>
        </a>
        <a
          href='https://github.com/Adityacs502004/FasalNyay'
          target='_blank'
          rel='noreferrer'
          className='text-sm text-slate-300/55 transition-colors duration-300 hover:text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200'
        >
          GitHub ↗
        </a>
      </div>
    </article>
  )
}

export default Fasalnyay_contnet