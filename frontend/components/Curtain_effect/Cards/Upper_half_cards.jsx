const Cards = ({ project }) => {
  return (
    <div className="relative h-[200px] w-[380px] flex-none rounded-tl-2xl rounded-tr-2xl bg-[#10232a] shadow-[0_24px_100px_rgba(0,0,0,0.35)]">
      <div className="absolute inset-x-2 bottom-0 top-2 overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-[#101a2b] p-4 text-slate-100">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-80`}></div>
        <div className="relative flex h-full gap-3">
          <div className="flex h-20 w-20 flex-none items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-slate-950/60 shadow-inner">
            <div className="grid w-12 grid-cols-3 gap-1 opacity-90">
              <span className="h-2 rounded-sm bg-white/80"></span>
              <span className="h-2 rounded-sm bg-emerald-300"></span>
              <span className="h-2 rounded-sm bg-white/50"></span>
              <span className="col-span-2 h-5 rounded-sm bg-white/20"></span>
              <span className="h-5 rounded-sm bg-emerald-300/80"></span>
              <span className="h-2 rounded-sm bg-white/40"></span>
              <span className="col-span-2 h-2 rounded-sm bg-white/70"></span>
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="mt-3 text-lg font-semibold leading-tight tracking-tight">{project.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">{project.stack}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards