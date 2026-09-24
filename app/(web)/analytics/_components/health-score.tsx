import { AnalyticsPanel } from "./analytics-panel";

export function HealthScore() {
  return (
    <AnalyticsPanel tone="green" className="min-h-[188px] self-start p-4">
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-black text-[#F4F4F5]">Health Score</p>
        <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-black text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          Healthy
        </span>
      </div>
      <div className="mt-3 flex items-end gap-2">
        <p className="text-[34px] font-black leading-none text-white">76</p>
        <span className="pb-1 text-[13px] font-black text-white/42">/100</span>
      </div>
      <div className="mt-4 grid grid-cols-10 gap-1.5">
        {Array.from({ length: 10 }).map((_, index) => (
          <span
            key={index}
            className={index < 8 ? "h-3 rounded-[3px] bg-emerald-500" : "h-3 rounded-[3px] bg-white/10"}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-between text-[9px] font-semibold text-white/25">
        <span>Needs work</span>
        <span>Good</span>
        <span>Healthy</span>
      </div>
    </AnalyticsPanel>
  );
}
