import { Sparkle } from "lucide-react";

import { AnalyticsPanel } from "./analytics-panel";

const insights = [
  "No activity from 4 of your top 10 creators — 31% of total views",
  "Instagram CPM ($0.12) is 3x your TikTok rate",
  "Reaction Videos drive 38% of total views this period",
];

export function AiInsights() {
  return (
    <AnalyticsPanel tone="green" className="h-full min-h-[214px] p-4">
      <p className="flex items-center gap-2 text-[14px] font-black text-[#F4F4F5]">
        <Sparkle className="size-3.5 fill-white text-white" />
        AI Insights
      </p>
      <div className="mt-3 space-y-3.5">
        {insights.map((insight) => (
          <div key={insight} className="flex gap-2 text-[11px] font-semibold leading-[1.45] text-white/80">
            <span className="mt-[5px] size-1.5 shrink-0 rounded-full bg-emerald-400" />
            <p>{insight}</p>
          </div>
        ))}
      </div>
    </AnalyticsPanel>
  );
}
