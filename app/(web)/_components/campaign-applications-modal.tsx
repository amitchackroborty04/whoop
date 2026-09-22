"use client"

import { useState } from "react"
import { Check, ChevronDown, ExternalLink, FileText, X } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Campaign } from "./campaign-data"

type ApplicantStatus = "Pending" | "Approved" | "Rejected"

const initialApplicants: Array<{ name: string; handle: string; followers: string; initials: string; status: ApplicantStatus; color: string }> = [
  { name: "Sadia Rahman", handle: "@sadia.clips", followers: "34.2K followers", initials: "SR", status: "Pending", color: "bg-emerald-700" },
  { name: "Mahin Karim", handle: "@mahinshorts", followers: "18.5K followers", initials: "MK", status: "Pending", color: "bg-amber-700" },
  { name: "Rafi Jahan", handle: "@rafi_clips_bd", followers: "41.0K followers", initials: "RJ", status: "Approved", color: "bg-emerald-800" },
  { name: "Tania Akter", handle: "Tania Viral", followers: "9.2K subscribers", initials: "TA", status: "Approved", color: "bg-teal-800" },
]

export function CampaignApplicationsModal({ campaign, onClose }: { campaign: Campaign | null; onClose: () => void }) {
  const [applicants, setApplicants] = useState(initialApplicants)
  const [expanded, setExpanded] = useState(0)
  const [filter, setFilter] = useState<"All" | ApplicantStatus>("All")
  if (!campaign) return null

  const visible = applicants.filter((applicant) => filter === "All" || applicant.status === filter)
  const updateStatus = (name: string, status: ApplicantStatus) => setApplicants((current) => current.map((applicant) => applicant.name === name ? { ...applicant, status } : applicant))

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-black/70 p-3 backdrop-blur-[3px] sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div role="dialog" aria-modal="true" aria-label="Campaign applications" className="mx-auto my-4 w-full max-w-[760px] rounded-[18px] border border-white/10 bg-[#111317] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.65)] sm:p-7">
        <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.08em] text-white/35">Private campaign · Applications</p><h2 className="mt-2 text-[23px] font-black text-white">42 applied · 18 pending review</h2></div><button type="button" onClick={onClose} aria-label="Close" className="grid size-9 cursor-pointer place-items-center rounded-[8px] border border-white/10 bg-white/5 text-white/60 hover:text-white"><X className="size-4" /></button></div>
        <div className="mt-5 flex max-w-full gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{(["All", "Pending", "Approved", "Rejected"] as const).map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={cn("h-9 min-w-max cursor-pointer rounded-full border px-4 text-[11px] font-bold", filter === item ? "border-emerald-400/45 bg-emerald-500/15 text-emerald-400" : "border-white/10 text-white/40 hover:text-white")}>{item} {item === "All" ? "42" : item === "Pending" ? "18" : item === "Approved" ? "20" : "4"}</button>)}</div>
        <div className="mt-5 space-y-3">{visible.map((applicant, index) => { const open = expanded === index; return <article key={applicant.name} className={cn("rounded-[14px] border bg-[#14161B] p-4", open ? "border-emerald-400/45 bg-emerald-500/[0.045]" : "border-white/10")}><button type="button" onClick={() => setExpanded(open ? -1 : index)} className="flex w-full cursor-pointer items-center gap-3 text-left"><span className={cn("grid size-10 place-items-center rounded-full text-[12px] font-black text-white", applicant.color)}>{applicant.initials}</span><span className="min-w-0 flex-1"><strong className="block truncate text-[14px] text-white">{applicant.name}</strong><span className="block truncate text-[10px] text-white/40">◎ {applicant.handle} · {applicant.followers}</span></span><Status status={applicant.status} /><ChevronDown className={cn("size-4 text-white/40 transition", open && "rotate-180")} /></button>{open ? <div className="mt-4 border-t border-white/8 pt-4"><div className="flex flex-wrap gap-2"><Chip>@sadia.clips</Chip><Chip>@sadia.rahman</Chip><Chip>▶ Sadia Clips</Chip></div><p className="mt-5 text-[11px] text-white/45">Why should we approve you for this campaign?</p><div className="mt-2 rounded-[9px] border border-emerald-400/25 bg-emerald-500/8 p-3 text-[12px] leading-5 text-white">I&apos;ve been clipping trading/finance content for 8 months and consistently get 50K+ views per clip.</div><p className="mt-4 text-[11px] text-white/45">Upload a screenshot of your audience analytics</p><button className="mt-2 flex w-full cursor-pointer items-center gap-3 rounded-[9px] border border-white/10 bg-white/5 p-3 text-left"><span className="grid size-8 place-items-center rounded-[6px] bg-emerald-500/15 text-emerald-400"><FileText className="size-4" /></span><span><strong className="block text-[11px] text-white">tiktok_analytics_audience.png</strong><span className="text-[9px] text-white/35">Tap to view full size</span></span></button><p className="mt-4 text-[11px] text-white/45">Share your best performing clip</p><button className="mt-2 flex w-full cursor-pointer items-center justify-between rounded-[9px] border border-white/10 bg-white/5 p-3 text-[11px] font-bold text-emerald-400"><span>▶ tiktok.com/@sadia.clips/video/789...</span><ExternalLink className="size-4" /></button><div className="mt-4 grid grid-cols-2 gap-2"><button type="button" onClick={() => updateStatus(applicant.name, "Rejected")} className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[9px] border border-rose-400/45 bg-rose-500/10 text-[12px] font-bold text-rose-300"><X className="size-4" />Reject</button><button type="button" onClick={() => updateStatus(applicant.name, "Approved")} className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[9px] border border-emerald-400/45 bg-emerald-500/15 text-[12px] font-bold text-emerald-400"><Check className="size-4" />Approve</button></div></div> : null}</article> })}</div>
      </div>
    </div>
  )
}

function Status({ status }: { status: ApplicantStatus }) { return <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-bold", status === "Pending" ? "bg-amber-500/15 text-amber-300" : status === "Approved" ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-300")}>{status}</span> }
function Chip({ children }: { children: React.ReactNode }) { return <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[10px] text-white/45">{children}</span> }
