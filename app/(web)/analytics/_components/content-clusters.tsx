import { cn } from "@/lib/utils";

import { clusters } from "./analytics-data";
import { AnalyticsPanel } from "./analytics-panel";

export function ContentClusters() {
  const topClusters = clusters.slice(0, 3);
  const bottomClusters = clusters.slice(3);

  return (
    <AnalyticsPanel tone="violet" className="self-start p-4">
      <p className="text-[14px] font-black text-[#F4F4F5]">Content clusters</p>
      <div className="mt-2.5 grid h-[173px] grid-rows-[1.75fr_1fr] gap-1.5">
        <div className="grid min-h-0 grid-cols-[2.2fr_1fr_.85fr] gap-1.5">
          {topClusters.map((cluster) => (
            <ClusterTile key={cluster.label} {...cluster} />
          ))}
        </div>
        <div className="grid min-h-0 grid-cols-[1.3fr_1.08fr_1fr] gap-1.5">
          {bottomClusters.map((cluster) => (
            <ClusterTile key={cluster.label} {...cluster} />
          ))}
        </div>
      </div>
    </AnalyticsPanel>
  );
}

function ClusterTile({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col justify-end rounded-[7px] p-2 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        className,
      )}
    >
      <p className="text-[10px] font-black leading-tight">{label}</p>
      <p className="text-[11px] font-black leading-tight">{value}</p>
    </div>
  );
}
