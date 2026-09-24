import { audiencesByCountry, audiencesByView, totals } from "./analytics-data";
import { AiInsights } from "./ai-insights";
import { AnalyticsHeader } from "./analytics-header";
import { AudienceCard } from "./audience-card";
import { ContentClusters } from "./content-clusters";
import { HealthScore } from "./health-score";
import { PerformanceChart } from "./performance-chart";
import { PlatformLeaderboard } from "./platform-leaderboard";
import { PostingTimes } from "./posting-times";
import { PostsOverTime } from "./posts-over-time";
import { SummaryMetricCard } from "./summary-metric-card";

export function AnalyticsDashboard() {
  return (
    <div className="mx-auto max-w-[1420px]">
      <AnalyticsHeader />

      <div className="mt-10 grid gap-4 xl:grid-cols-[minmax(0,2.75fr)_minmax(220px,1fr)]">
        <PerformanceChart />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          {totals.map((metric) => (
            <SummaryMetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </div>

      <div className="mt-4 grid items-start gap-3 md:grid-cols-2 xl:grid-cols-[1.11fr_1fr_1.34fr_1.19fr]">
        <HealthScore />
        <AiInsights />
        <AudienceCard title="Audience mix - by country" items={audiencesByCountry} />
        <AudienceCard title="Audience mix - by views" items={audiencesByView} tone="violet" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[2.1fr_1fr]">
        <PlatformLeaderboard />
        <ContentClusters />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[2.1fr_1fr]">
        <PostingTimes />
        <PostsOverTime />
      </div>
    </div>
  );
}
