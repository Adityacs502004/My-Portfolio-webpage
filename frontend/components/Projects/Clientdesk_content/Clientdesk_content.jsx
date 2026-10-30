const capabilities = ['React', 'Node.js', 'Express', 'PostgreSQL'];

const Clientdesk_content = () => {
  return (
    <article id='clientdesk' className='group relative w-full py-5 pr-4 sm:py-8 sm:pr-8'>
      <div className='mb-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-200/65'>
        <span className='h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_#67e8f9]' />
        <span>Project / 001</span>
        <span className='h-px w-12 bg-cyan-200/30 transition-all duration-500 group-hover:w-24 group-hover:bg-cyan-200/70' />
        <span className='text-amber-100/55'>Client management</span>
      </div>

      <div className='relative overflow-hidden'>
        <h2 className='whitespace-nowrap text-[clamp(3.25rem,8vw,7.5rem)] font-black leading-[0.78] tracking-[-0.08em] text-amber-50 transition-transform duration-700 ease-out group-hover:translate-x-2'>
          CLIENT<span className='text-cyan-300'>DESK</span>
        </h2>
        <span
          aria-hidden='true'
          className='pointer-events-none absolute -left-1 top-0 -z-10 select-none whitespace-nowrap text-[clamp(3.25rem,8vw,7.5rem)] font-black leading-[0.78] tracking-[-0.08em] text-cyan-300/10 blur-sm'
        >
          CLIENTDESK
        </span>
      </div>

      <div className='mt-8 grid max-w-2xl grid-cols-[1.5rem_1fr] gap-4 border-l border-cyan-200/30 pl-4 sm:mt-12 sm:pl-6'>
        <span className='pt-1 text-xs text-cyan-300/70'>↳</span>
        <p className='text-base leading-relaxed text-slate-200/75 sm:text-xl sm:leading-relaxed'>
          One place for everything behind the work. Manage clients, projects,
          tasks, invoices, and payments without jumping between different tools.
        </p>
      </div>

      <div className='mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-cyan-100/55 sm:mt-10'>
        {capabilities.map((capability, index) => (
          <span key={capability} className='flex items-center gap-5'>
            <span className='transition-colors duration-300 group-hover:text-cyan-100/90'>
              {capability}
            </span>
            {index < capabilities.length - 1 && <span className='text-amber-100/35'>/</span>}
          </span>
        ))}
      </div>

      <div className='mt-8 flex items-center gap-6 sm:mt-12'>
        <a
          href='https://client-desk-six.vercel.app/' 
          target="_blank"
          className='group/link inline-flex items-center gap-2 border-b border-cyan-300 pb-1 text-sm font-bold text-cyan-200 transition-colors duration-300 hover:border-amber-200 hover:text-amber-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200'
        >
          Live
          <span className='transition-transform duration-300 group-hover/link:translate-x-1'>
            ↗
          </span>
        </a>
        <a
          href='https://github.com/Adityacs502004/ClientDesk'
          target='_blank'
          rel='noreferrer'
          className='text-sm text-slate-300/55 transition-colors duration-300 hover:text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200'
        >
          GitHub ↗
        </a>
      </div>
    </article>
  );
};

export default Clientdesk_content;
