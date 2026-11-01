interface Props { text?: string; size?: 'sm' | 'md' | 'lg'; }

export default function LoadingSpinner({ text = 'AI 正在分析您的症状…', size = 'md' }: Props) {
  const sizes = {
    sm: { c: 'w-16 h-16', ew: 120, eh: 30, sw: 2 },
    md: { c: 'w-24 h-24', ew: 180, eh: 40, sw: 2.5 },
    lg: { c: 'w-32 h-32', ew: 240, eh: 50, sw: 3 },
  };
  const s = sizes[size];
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <div className="relative">
        <div className={`${s.c} rounded-full bg-primary/10 flex items-center justify-center`}>
          <div className="relative w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/30 animate-pulseRing" />
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-primary animate-heartbeat" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>
      </div>
      <svg viewBox={`0 0 ${s.ew} ${s.eh}`} className="text-primary" width={s.ew} height={s.eh}>
        <path
          d={`M0 ${s.eh/2} L${s.ew*0.2} ${s.eh/2} L${s.ew*0.28} ${s.eh*0.2} L${s.ew*0.32} ${s.eh*0.8} L${s.ew*0.36} ${s.eh/2} L${s.ew*0.5} ${s.eh/2} L${s.ew*0.58} ${s.eh*0.15} L${s.ew*0.62} ${s.eh*0.85} L${s.ew*0.66} ${s.eh/2} L${s.ew*0.8} ${s.eh/2} L${s.ew*0.88} ${s.eh*0.3} L${s.ew*0.92} ${s.eh*0.7} L${s.ew} ${s.eh/2}`}
          fill="none" stroke="currentColor" strokeWidth={s.sw} strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="300" className="animate-ecg"
        />
      </svg>
      <div className="flex flex-col items-center gap-2">
        <p className="text-neutral-700 font-medium text-center">{text}</p>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
