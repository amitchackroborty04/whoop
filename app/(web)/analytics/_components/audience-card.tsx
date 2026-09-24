import { AnalyticsPanel } from "./analytics-panel";

export function AudienceCard({
  title,
  items,
  tone = "default",
}: {
  title: string;
  tone?: "default" | "violet";
  items: Array<{
    label: string;
    value: string;
    percent: string;
    width: number;
    marker?: string;
    markerColor?: string;
    barColor: string;
  }>;
}) {
  return (
    <AnalyticsPanel tone={tone} className="h-full min-h-[214px] p-4">
      <p className="text-[14px] font-black text-[#F4F4F5]">{title}</p>
      <div className="mt-4 flex h-4 overflow-hidden rounded-full bg-white/10">
        {items.map((item) => (
          <span
            key={item.label}
            style={{ width: `${item.width}%`, backgroundColor: item.barColor }}
          />
        ))}
      </div>
      <div className="mt-4 space-y-3.5">
        {items.map((item) => (
          <div key={item.label} className="grid grid-cols-[1fr_auto_auto] items-center gap-2 text-[10px]">
            <span className="flex min-w-0 items-center gap-2 font-black text-white">
              {item.marker ? (
                <span className="w-3 shrink-0 text-[10px] leading-none">{item.marker}</span>
              ) : (
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: item.markerColor ?? "#25c878" }}
                  aria-hidden="true"
                />
              )}
              <span className="truncate">{item.label}</span>
            </span>
            <span className="font-black text-white">{item.value}</span>
            <span className="font-semibold text-white/35">{item.percent}</span>
          </div>
        ))}
      </div>
    </AnalyticsPanel>
  );
}
