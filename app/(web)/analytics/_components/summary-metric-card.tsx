import { AnalyticsPanel } from "./analytics-panel";

export function SummaryMetricCard({
  label,
  value,
  detail,
  bars,
}: {
  label: string;
  value: string;
  detail: string;
  bars: number[];
}) {
  return (
    <AnalyticsPanel className="flex min-h-[112px] items-center justify-between gap-3 p-4 sm:min-h-[126px] xl:min-h-0">
      <div>
        <p className="text-[11px] font-semibold text-white/42">{label}</p>
        <p className="mt-1 text-[22px] font-black leading-none text-white sm:text-[24px]">
          {value}
        </p>
        <p className="mt-2 text-[10px] font-black text-emerald-400">{detail}</p>
      </div>
      <div className="flex h-11 items-end gap-1.5">
        {bars.map((bar, index) => (
          <span
            key={`${label}-${bar}-${index}`}
            className="w-1.5 rounded-full bg-emerald-500/75"
            style={{ height: `${bar}%` }}
          />
        ))}
      </div>
    </AnalyticsPanel>
  );
}
