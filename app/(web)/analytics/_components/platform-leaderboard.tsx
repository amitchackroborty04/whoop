import { FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";

import { leaderboard } from "./analytics-data";
import { AnalyticsPanel } from "./analytics-panel";

const icons = {
  Instagram: FaInstagram,
  TikTok: FaTiktok,
  YouTube: FaYoutube,
  X: FaXTwitter,
};

export function PlatformLeaderboard() {
  return (
    <AnalyticsPanel className="overflow-hidden p-4">
      <p className="text-[14px] font-black text-[#F4F4F5]">Platform leaderboard</p>
      <div className="mt-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <table className="w-full min-w-[560px] text-left">
          <thead>
            <tr className="border-b border-white/8 text-[9px] uppercase text-white/34">
              <th className="pb-3 font-black">#</th>
              <th className="pb-3 font-black">Platform</th>
              <th className="pb-3 text-right font-black">Views</th>
              <th className="pb-3 text-right font-black">Posts</th>
              <th className="pb-3 text-right font-black">Eng.</th>
              <th className="pb-3 text-right font-black">CPM</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((row) => {
              const Icon = icons[row.platform as keyof typeof icons];

              return (
                <tr key={row.platform} className="border-b border-white/7 last:border-0">
                  <td className="py-4">
                    <span className="grid size-5 place-items-center rounded-full bg-emerald-500/16 text-[10px] font-black text-emerald-400">
                      {row.rank}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2 text-[11px] font-black text-white">
                      <Icon className="size-3.5 text-white/55" aria-hidden="true" />
                      {row.platform}
                    </div>
                  </td>
                  <td className="py-4 text-right text-[11px] font-black text-white">{row.views}</td>
                  <td className="py-4 text-right text-[11px] font-semibold text-white/55">{row.posts}</td>
                  <td className="py-4 text-right text-[11px] font-black text-white">{row.engagement}</td>
                  <td className="py-4 text-right text-[11px] font-black text-white">{row.cpm}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AnalyticsPanel>
  );
}
