import { postBars } from "./analytics-data";
import { AnalyticsPanel } from "./analytics-panel";

export function PostsOverTime() {
  return (
    <AnalyticsPanel className="p-4">
      <div className="flex items-start justify-between">
        <p className="text-[14px] font-black text-[#F4F4F5]">Posts over time</p>
        <div className="text-right">
          <p className="text-[13px] font-black text-white">818</p>
          <p className="text-[10px] font-black text-emerald-400">+18.3%</p>
        </div>
      </div>
      <div className="mt-5 flex h-[174px] items-end gap-3">
        {postBars.map((bar, index) => (
          <div key={`${bar}-${index}`} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span
              className="w-full max-w-[5px] rounded-full bg-[linear-gradient(180deg,#30dc82,#5b55b7)]"
              style={{ height: `${Math.min(bar, 100)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-4 text-[9px] font-semibold text-white/28">
        <span>Wk 1</span>
        <span>Wk 2</span>
        <span>Wk 3</span>
        <span>Wk 4</span>
      </div>
    </AnalyticsPanel>
  );
}
