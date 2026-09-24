"use client";

import { Music2 } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { heatmap } from "./analytics-data";
import { AnalyticsPanel } from "./analytics-panel";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const platforms = ["TikTok", "Instagram", "YouTube", "X"] as const;
type Platform = (typeof platforms)[number];

const peaks: Record<Platform, string> = {
  TikTok: "Tue 6 PM",
  Instagram: "Thu 7 PM",
  YouTube: "Fri 8 PM",
  X: "Wed 12 PM",
};

function cellColor(value: number) {
  if (value > 82) return "bg-[#2ed47b]";
  if (value > 68) return "bg-[#25aa61]";
  if (value > 50) return "bg-[#1e7847]";
  if (value > 32) return "bg-[#1c5538]";

  return "bg-[#183225]";
}

function platformActivity(platform: Platform, value: number, row: number, hour: number) {
  const adjusted = {
    TikTok: value,
    Instagram: value * 0.92 + ((hour + row) % 5) * 3,
    YouTube: value * 0.82 + (hour >= 17 ? 12 : 0),
    X: value * 0.72 + (hour >= 11 && hour <= 15 ? 15 : 0),
  }[platform];

  return Math.round(Math.max(8, Math.min(100, adjusted)));
}

export function PostingTimes() {
  const [activePlatform, setActivePlatform] = useState<Platform>("TikTok");

  return (
    <AnalyticsPanel className="p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[14px] font-black text-[#F4F4F5]">Best posting times</p>
          <p className="mt-1 text-[10px] font-semibold text-white/35">
            Activity by weekday + hour of day
          </p>
        </div>
        <div className="flex max-w-full gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="min-w-max rounded-[7px] bg-emerald-500/18 px-3 py-1.5 text-[10px] font-black text-emerald-400">
            Peak - {peaks[activePlatform]}
          </span>
          {platforms.map((platform) => (
            <button
              key={platform}
              type="button"
              aria-pressed={platform === activePlatform}
              onClick={() => setActivePlatform(platform)}
              className={cn(
                "flex min-w-max items-center gap-1 rounded-[7px] px-3 py-1.5 text-[10px] font-black transition-colors",
                platform === activePlatform
                  ? "bg-white/[0.1] text-white"
                  : "bg-white/[0.04] text-white/55 hover:bg-white/[0.08] hover:text-white/80",
              )}
            >
              {platform === "TikTok" ? <Music2 className="size-3" /> : null}
              {platform}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-[28px_1fr] gap-2">
        <div className="grid grid-rows-7 gap-1.5 pt-5 text-[9px] font-semibold text-white/35">
          {days.map((day) => (
            <span key={day} className="flex items-center justify-end">
              {day}
            </span>
          ))}
        </div>
        <div>
          <div className="mb-1 grid grid-cols-4 text-[9px] font-semibold text-white/28">
            <span>12a</span>
            <span>6a</span>
            <span>12p</span>
            <span>6p</span>
          </div>
          <div className="space-y-1.5">
            {heatmap.map((row, rowIndex) => (
              <div key={days[rowIndex]} className="grid grid-cols-24 gap-1">
                {row.map((value, index) => {
                  const activity = platformActivity(activePlatform, value, rowIndex, index);

                  return (
                  <span
                    key={`${days[rowIndex]}-${index}`}
                    title={`${days[rowIndex]} ${String(index).padStart(2, "0")}:00 · ${activity}% activity`}
                    className={`h-4 rounded-[3px] transition-colors ${cellColor(activity)}`}
                  />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-[9px] font-semibold text-white/35">
        <span>Less</span>
        {[24, 42, 58, 74, 90].map((value) => (
          <span key={value} className={`size-2.5 rounded-[2px] ${cellColor(value)}`} />
        ))}
        <span>More</span>
      </div>
    </AnalyticsPanel>
  );
}
