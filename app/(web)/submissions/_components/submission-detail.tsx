"use client"

import { useState } from "react"
import { Check, ChevronDown, ExternalLink, Sparkles, X } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Submission } from "./submission-data"
import type { DialogType } from "./submission-dialogs"

export function SubmissionDetail({ submission, onAction }: { submission: Submission; onAction: (type: Exclude<DialogType, null>) => void }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="overflow-hidden rounded-[14px] border border-white/12 bg-[#121218]/90">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/8 px-4 py-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3"><span className={cn("grid size-10 shrink-0 place-items-center rounded-full text-[14px] font-black text-white", submission.avatarClass)}>{submission.initial}</span><div className="min-w-0"><div className="flex items-center gap-2"><h2 className="truncate text-[16px] font-black text-white">{submission.creator}</h2><span className="text-[11px] text-white/35">@ {submission.platform}</span></div><p className="mt-1 truncate text-[11px] text-white/40">{submission.campaign} · 27 Feb 26 · 3d ago</p></div></div>
        <div className="text-right"><p className="text-[22px] font-black text-emerald-400">◆ {submission.score}<span className="text-[11px] text-white/40"> /100</span></p><p className="text-[10px] font-bold text-emerald-400">Pass · 10/13 checks</p></div>
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[260px_1fr] xl:grid-cols-[290px_1fr]">
        <aside className="space-y-3">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[12px] border border-white/10 bg-[linear-gradient(160deg,#0f2419,#08130e_55%,#050706)]"><span className="absolute left-3 top-3 rounded-full bg-black/55 px-2 py-1 text-[10px] font-bold text-white">♪ TikTok</span><span className="absolute right-3 top-3 rounded-[5px] bg-black/70 px-1.5 py-1 text-[9px] text-white">0:10</span><span className="absolute bottom-3 right-3 grid size-7 place-items-center rounded-[6px] bg-black/70 text-[12px] text-white">↗</span><div className="grid h-full place-items-center"><div className="size-16 rounded-full border border-emerald-400/30 bg-emerald-500/10 shadow-[0_0_50px_rgba(35,197,108,0.14)]" /></div></div>
          <button type="button" className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-white/12 bg-white/4 text-[11px] font-bold text-white transition hover:bg-white/8">Open original on TikTok <ExternalLink className="size-3.5" /></button>
          <p className="text-[10px] text-white/30">Tap video to play · enlarge · opens post in a new tab</p>
          <MiniPanel title="Top countries · by views"><Bar label="🇺🇸 United States" value="47%" width={47} /><Bar label="🇬🇧 United Kingdom" value="28%" width={28} /><Bar label="🇨🇦 Canada" value="15%" width={15} /><Bar label="Others" value="15%" width={15} /></MiniPanel>
          <div className="flex items-center justify-between rounded-[9px] border border-white/10 bg-white/[0.025] px-3 py-3 text-[10px]"><span className="text-white/35">Top age</span><strong className="text-white">25–34 · 41%</strong></div>
          <MiniPanel title="Views by source"><Bar label="Reels" value="1.85M · 58%" width={96} /><Bar label="Feed" value="760K · 24%" width={58} /><Bar label="Story" value="380K · 12%" width={36} /><Bar label="Live" value="190K · 6%" width={20} /></MiniPanel>
        </aside>

        <div className="min-w-0 space-y-3">
          <div className="grid grid-cols-3 overflow-hidden rounded-[10px] border border-white/10"><Metric label="Est. payout" value="$425" accent /><Metric label="Eng. rate" value="5.1%" /><Metric label="Views" value="2K" /></div>
          <section className="rounded-[12px] border border-white/10 p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><h3 className="text-[12px] font-bold text-white">Engagement over time</h3><div className="flex flex-wrap gap-1.5"><Legend color="bg-emerald-400" label="Likes" /><Legend color="bg-blue-400" label="Comments" /><Legend color="bg-violet-400" label="Shares" /><Legend color="bg-amber-400" label="Saves" /></div></div><EngagementChart /></section>
          <div className="grid gap-4 md:grid-cols-2"><StatsPanel title="Creator trust & bot check" badge="Low bot risk" values={[["Account age", "2y 3m"], ["Followers", "142K"], ["Avg views / post", "210K"], ["This vs avg", "+24%"]]} /><StatsPanel title="Video analytics" badge="· TikTok" values={[["Views", "890K"], ["Eng. rate", "5.1%"], ["Completion", "38%"], ["Follower growth", "+1,240"]]} /></div>
          <div className="flex gap-3 rounded-[10px] border border-emerald-400/20 bg-emerald-500/10 p-3 text-[11px] leading-5 text-emerald-100"><Check className="mt-0.5 size-4 shrink-0 text-emerald-400" />Views are consistent with follower base and posting history — no sudden spike or purchased-view pattern detected.</div>
          <AiBreakdown expanded={expanded} onToggle={() => setExpanded((value) => !value)} />
        </div>
      </div>

      <footer className="flex justify-end gap-2 border-t border-white/8 bg-white/[0.025] p-4"><button type="button" onClick={() => onAction("reject")} className="flex h-10 cursor-pointer items-center gap-2 rounded-[8px] border border-white/12 bg-black/20 px-4 text-[12px] font-bold text-white transition hover:bg-white/8"><X className="size-4" />Reject</button><button type="button" onClick={() => onAction("approve")} className="flex h-10 cursor-pointer items-center gap-2 rounded-[8px] bg-emerald-400 px-4 text-[12px] font-bold text-[#07110B] transition hover:bg-emerald-300"><Check className="size-4" />Approve payout</button></footer>
    </article>
  )
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) { return <div className="border-r border-white/8 p-3 last:border-r-0"><p className="text-[9px] uppercase text-white/35">{label}</p><p className={cn("mt-1 text-[14px] font-black text-white", accent && "text-emerald-400")}>{value}</p></div> }
function MiniPanel({ title, children }: { title: string; children: React.ReactNode }) { return <section className="rounded-[10px] border border-white/10 bg-white/[0.025] p-3"><h3 className="mb-3 text-[11px] font-bold text-white">{title}</h3><div className="space-y-2.5">{children}</div></section> }
function Bar({ label, value, width }: { label: string; value: string; width: number }) { return <div><div className="flex justify-between text-[10px]"><span className="text-white/70">{label}</span><span className="text-white/45">{value}</span></div><div className="mt-1 h-1 overflow-hidden rounded-full bg-white/8"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${width}%` }} /></div></div> }
function Legend({ color, label }: { color: string; label: string }) { return <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2 py-1 text-[9px] text-white/55"><span className={cn("size-1.5 rounded-full", color)} />{label}</span> }

function EngagementChart() {
  return <div className="relative mt-5 h-[190px] overflow-hidden border-b border-l border-white/8 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_46px,rgba(255,255,255,0.055)_47px)]"><svg viewBox="0 0 600 190" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-label="Engagement trends"><polygon fill="#22C55E1A" points="0,190 0,125 100,116 200,103 300,90 400,75 500,58 600,40 600,190"/><polyline fill="none" stroke="#25d27f" strokeWidth="2" points="0,125 100,116 200,103 300,90 400,75 500,58 600,40"/><polyline fill="none" stroke="#38bdf8" strokeWidth="2" points="0,115 100,100 200,80 300,61 400,43 500,24 600,8"/><polyline fill="none" stroke="#a855f7" strokeWidth="2" points="0,156 100,153 200,149 300,144 400,138 500,131 600,123"/><polyline fill="none" stroke="#fbbf24" strokeWidth="2" points="0,168 100,166 200,162 300,157 400,152 500,145 600,137"/></svg></div>
}

function StatsPanel({ title, badge, values }: { title: string; badge: string; values: string[][] }) {
  const botRisk = badge === "Low bot risk"

  return <section className="rounded-[16px] border border-white/10 bg-white/[0.02] p-4 sm:p-5"><div className="flex items-center justify-between gap-3"><h3 className="text-[14px] font-black text-white sm:text-[16px]">{title}</h3><span className={cn("shrink-0 text-[12px] font-semibold text-white/40", botRisk && "inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1.5 text-emerald-400")}><span className={cn(botRisk ? "size-2 rounded-full bg-emerald-400" : "hidden")} />{badge}</span></div><div className="mt-4 grid grid-cols-2 overflow-hidden rounded-[14px] border border-white/10">{values.map(([label, value], index) => <div key={label} className={cn("min-h-[66px] p-3 sm:p-4", index % 2 === 0 && "border-r border-white/10", index < 2 && "border-b border-white/10")}><p className="text-[11px] font-medium text-white/40 sm:text-[12px]">{label}</p><p className={cn("mt-1 text-[17px] font-black text-white sm:text-[19px]", value.startsWith("+") && "text-emerald-400")}>{value}</p></div>)}</div></section>
}

function AiBreakdown({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) {
  const checks = [["Audio Match", "Original audio", "95"], ["Video Match", "Content aligned", "88"], ["Talking Points", "3/4 covered", "75"], ["Brand Mentions", "Mentioned 3x", "82"]]
  const pills = [["Audio", "95"], ["Video", "88"], ["Talking pts", "75"], ["Brand", "82"]]
  return <section className="py-2"><button type="button" onClick={onToggle} className="flex w-full cursor-pointer items-center justify-between gap-3 text-left"><span className="inline-flex items-center gap-2 text-[14px] font-black text-white sm:text-[16px]"><Sparkles className="size-4" />AI Quality breakdown <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] text-emerald-400">BETA</span></span><span className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-white/70">{expanded ? "Hide details" : "Show details"}<ChevronDown className={cn("size-3.5 transition", expanded && "rotate-180")} /></span></button><div className="mt-4 flex gap-1">{Array.from({ length: 13 }, (_, i) => <span key={i} className={cn("h-2 flex-1 rounded-full", i < 10 ? "bg-emerald-400" : "bg-rose-400/55")} />)}</div><p className="mt-3 text-[12px] leading-5 text-white/45">Passed 10/13 checks · good brand integration, 2 minor issues</p><div className="mt-3 flex flex-wrap gap-2">{pills.map(([label, score]) => <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-white/80"><Check className="size-3.5" />{label} {score}</span>)}</div>{expanded ? <div className="mt-4 space-y-1 border-t border-white/8 pt-3">{checks.map(([name, note, score]) => <div key={name} className="grid grid-cols-[18px_1fr_1fr_auto] items-center gap-2 py-2 text-[10px]"><span className="grid size-4 place-items-center rounded-full bg-emerald-400 text-black"><Check className="size-2.5" /></span><strong className="text-white">{name}</strong><span className="text-white/35">{note}</span><strong className="text-emerald-400">{score}</strong></div>)}</div> : null}</section>
}
