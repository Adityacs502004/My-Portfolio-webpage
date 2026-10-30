const Lower_half_card = ({ project }) => {
  return (
    <div className="relative h-[200px] w-[380px] flex-none rounded-bl-2xl rounded-br-2xl bg-[#10232a] shadow-[0_24px_100px_rgba(0,0,0,0.35)]">
      <div className="absolute inset-x-2 bottom-2 top-0 overflow-hidden rounded-bl-2xl rounded-br-2xl bg-[#101a2b] p-4 text-slate-100">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#18243a] to-[#0d1728]"></div>
        <div className="relative flex h-full flex-col justify-between">
          <p className="max-w-[330px] text-sm leading-relaxed text-slate-300">{project.description}</p>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
            <a
              className="border-b border-slate-500 pb-1 transition-colors hover:border-emerald-300 hover:text-emerald-300"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub repository ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lower_half_card