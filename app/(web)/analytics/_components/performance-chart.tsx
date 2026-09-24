"use client";

import { useId, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

import { chartPoints, legend, performanceTabs } from "./analytics-data";
import { AnalyticsPanel } from "./analytics-panel";

const series = [
  { key: "views", name: "Views", color: "#25d97b", width: 3 },
  { key: "engagement", name: "Engagement", color: "#60a5fa", width: 2 },
  { key: "likes", name: "Likes", color: "#74df8f", width: 2 },
  { key: "comments", name: "Comments", color: "#f4b84a", width: 2 },
  { key: "shares", name: "Shares", color: "#aeb4bd", width: 2 },
] as const;

type SeriesKey = (typeof series)[number]["key"];

const tabToKey = Object.fromEntries(
  series.map((item) => [item.name, item.key]),
) as Record<(typeof performanceTabs)[number], SeriesKey>;

const totalsByKey = Object.fromEntries(
  legend.map((item) => [item.name.toLowerCase(), item.value]),
) as Record<SeriesKey, string>;

function pointPosition(index: number) {
  return 8 + index * (84 / (chartPoints.length - 1));
}

function pointHeight(key: SeriesKey, index: number) {
  return 88 - chartPoints[index][key] * 0.78;
}

function pointsFor(key: SeriesKey) {
  return chartPoints
    .map((_, index) => `${pointPosition(index)},${pointHeight(key, index)}`)
    .join(" ");
}

function formatPointValue(key: SeriesKey, value: number) {
  if (key === "engagement") return `${(value / 15).toFixed(1)}%`;
  if (key === "shares") return Math.round(value * 410).toLocaleString();

  return Math.round(value * (key === "views" ? 1000 : 530)).toLocaleString();
}

export function PerformanceChart() {
  const gradientId = useId();
  const [activeKey, setActiveKey] = useState<SeriesKey>("views");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activeSeries = series.find((item) => item.key === activeKey) ?? series[0];
  const areaPoints = `8,92 ${pointsFor(activeKey)} 92,92`;

  return (
    <AnalyticsPanel className="relative min-h-[360px] overflow-hidden p-4 sm:p-5 lg:min-h-[392px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(35,197,108,0.20),transparent_38%),linear-gradient(90deg,rgba(27,96,54,0.26),transparent_55%)]" />
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[14px] font-black text-[#F4F4F5]">Performance</p>
          <div className="mt-1 flex items-end gap-2">
            <p className="text-[28px] font-black leading-none text-white sm:text-[32px]">
              {totalsByKey[activeKey]}
            </p>
            <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-black text-emerald-400">
              +18.3%
            </span>
          </div>
        </div>
        <div className="flex max-w-full gap-1 overflow-x-auto rounded-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {performanceTabs.map((tab) => {
            const key = tabToKey[tab];
            const isActive = key === activeKey;

            return (
              <button
                key={tab}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveKey(key)}
                className={cn(
                  "h-7 min-w-max rounded-[6px] border px-3 text-[10px] font-black transition-colors",
                  isActive
                    ? "border-emerald-400/30 bg-emerald-500/20 text-emerald-400"
                    : "border-white/[0.04] bg-white/[0.04] text-white/45 hover:bg-white/[0.08] hover:text-white/70",
                )}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="relative z-10 mt-5 h-[230px] sm:h-[250px]"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <svg
          className="h-full w-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          role="img"
          aria-label="Interactive performance trend chart"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={activeSeries.color} stopOpacity="0.42" />
              <stop offset="100%" stopColor={activeSeries.color} stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {[16, 34, 52, 70, 88].map((line) => (
            <line
              key={line}
              x1="8"
              x2="92"
              y1={line}
              y2={line}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="0.35"
            />
          ))}

          <polygon points={areaPoints} fill={`url(#${gradientId})`} />

          {series.map((item) => (
            <polyline
              key={item.key}
              points={pointsFor(item.key)}
              fill="none"
              stroke={item.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={item.key === activeKey ? item.width + 0.6 : item.width}
              strokeOpacity={item.key === activeKey ? 1 : 0.82}
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {hoveredIndex !== null ? (
            <>
              <line
                x1={pointPosition(hoveredIndex)}
                x2={pointPosition(hoveredIndex)}
                y1="10"
                y2="88"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="0.45"
                vectorEffect="non-scaling-stroke"
              />
              {series.map((item) => (
                <circle
                  key={item.key}
                  cx={pointPosition(hoveredIndex)}
                  cy={pointHeight(item.key, hoveredIndex)}
                  r="1.15"
                  fill={item.color}
                  stroke="#15161c"
                  strokeWidth="0.55"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </>
          ) : null}
        </svg>

        <div className="pointer-events-none absolute left-0 top-0 flex h-[82%] flex-col justify-between text-[10px] font-semibold text-white/25">
          <span>100k</span>
          <span>75k</span>
          <span>50k</span>
          <span>25k</span>
          <span>0</span>
        </div>
        <div className="pointer-events-none absolute right-0 top-0 flex h-[82%] flex-col justify-between text-right text-[10px] font-semibold text-[#9d96ff]">
          <span>8.0%</span>
          <span>6.0%</span>
          <span>4.0%</span>
          <span>2.0%</span>
          <span>0.0%</span>
        </div>
        <div className="pointer-events-none absolute inset-x-[8%] bottom-0 grid grid-cols-5 text-[10px] font-semibold text-white/25">
          {["Jan 7", "Jan 13", "Jan 19", "Jan 28", "Feb 5"].map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <div className="absolute inset-x-[8%] bottom-[12%] top-0 flex">
          {chartPoints.map((point, index) => (
            <button
              key={`${point.label}-${index}`}
              type="button"
              aria-label={`Show data for ${point.label}`}
              onPointerEnter={() => setHoveredIndex(index)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              className="h-full flex-1 cursor-crosshair outline-none focus-visible:bg-white/[0.03]"
            />
          ))}
        </div>

        {hoveredIndex !== null ? (
          <ChartTooltip
            index={hoveredIndex}
            style={{
              left: `${Math.min(88, Math.max(12, pointPosition(hoveredIndex)))}%`,
            }}
          />
        ) : null}
      </div>

      <div className="relative z-10 mt-3 flex flex-wrap gap-x-4 gap-y-2">
        {legend.map((item) => {
          const key = item.name.toLowerCase() as SeriesKey;
          const isActive = key === activeKey;

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => setActiveKey(key)}
              aria-pressed={isActive}
              className={cn(
                "flex items-center gap-1.5 rounded text-[10px] transition-opacity",
                isActive ? "opacity-100" : "opacity-65 hover:opacity-100",
              )}
            >
              <span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="font-black text-white/90">{item.name}</span>
              <span className="font-semibold text-white/45">{item.value}</span>
            </button>
          );
        })}
      </div>
    </AnalyticsPanel>
  );
}

function ChartTooltip({ index, style }: { index: number; style: CSSProperties }) {
  const point = chartPoints[index];
  const rows = series.slice(0, 4);

  return (
    <div
      className="absolute top-1 z-20 w-[160px] -translate-x-1/2 rounded-[9px] border border-white/15 bg-[#1d1e26]/98 p-3 shadow-[0_20px_45px_rgba(0,0,0,0.38)]"
      style={style}
    >
      <div className="flex items-center justify-between gap-2 text-[9px] font-black">
        <span className="text-white/50">{point.label}</span>
        <a href="/submissions" className="text-emerald-400 hover:text-emerald-300">
          View submissions →
        </a>
      </div>
      <div className="mt-2 space-y-1.5">
        {rows.map((item) => (
          <div key={item.key} className="flex items-center justify-between gap-2 text-[9px]">
            <span className="flex items-center gap-1.5 font-semibold text-white/80">
              <span className="size-1.5 rounded-full" style={{ backgroundColor: item.color }} />
              {item.name}
            </span>
            <span className="font-black text-white">
              {formatPointValue(item.key, point[item.key])}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
