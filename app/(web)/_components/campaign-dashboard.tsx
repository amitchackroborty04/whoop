"use client"

import { useMemo, useState } from "react"
import { Info, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { CampaignApplicationsModal } from "./campaign-applications-modal"
import { CampaignCard } from "./campaign-card"
import { campaigns, type Campaign, type CampaignStatus } from "./campaign-data"

const periods = ["24H", "7D", "30D", "All time"] as const
const filters: Array<{ label: "All Clips" | CampaignStatus; count: number }> = [{ label: "All Clips", count: 99 }, { label: "Active", count: 12 }, { label: "Pending Budget", count: 3 }, { label: "Ended", count: 40 }, { label: "Archive", count: 44 }, { label: "Locked", count: 4 }]
const stats = [{ label: "Pending Submissions", value: "12", note: "▲ 3 new today" }, { label: "Total Views · 7D", value: "2.4M", note: "▲ 18%" }, { label: "Paid Out · 7D", value: "$6,950", note: "Across campaigns" }, { label: "Approval Rate", value: "57%", note: "— stable" }]

export function CampaignDashboard() {
  const [period, setPeriod] = useState<(typeof periods)[number]>("7D")
  const [filter, setFilter] = useState<(typeof filters)[number]["label"]>("All Clips")
  const [modalCampaign, setModalCampaign] = useState<Campaign | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const visible = useMemo(() => campaigns.filter((campaign) => filter === "All Clips" || campaign.status === filter), [filter])
  const toast = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(null), 2500) }

  return <div><header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><span className="size-10 rounded-full bg-emerald-500/35" /><div><h1 className="text-[19px] font-black text-white">ishowspeed clips</h1><p className="text-[9px] text-white/35">Workspace overview</p></div></div><div className="grid grid-cols-4 rounded-[9px] border border-white/8 bg-[#111117] p-1">{periods.map((item) => <button key={item} type="button" onClick={() => setPeriod(item)} className={cn("h-8 cursor-pointer rounded-[6px] px-3 text-[10px] font-bold", period === item ? "bg-emerald-500/20 text-emerald-400" : "text-white/40")}>{item}</button>)}</div></header><section className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">{stats.map((stat) => <article key={stat.label} className="min-h-[112px] rounded-[14px] border border-white/15 bg-[linear-gradient(105deg,rgba(22,70,40,0.35),rgba(28,27,31,0.75))] p-4"><p className="flex items-center gap-1 text-[10px] font-bold uppercase text-white/35">{stat.label}<Info className="size-3" /></p><p className="mt-3 text-[25px] font-black text-white">{stat.value}</p><p className={cn("mt-2 text-[10px] text-white/35", stat.note.startsWith("▲") && "text-emerald-400")}>{stat.note}</p></article>)}</section><div className="mt-6 flex items-center justify-between gap-4"><h2 className="text-[14px] font-black text-white">My Campaigns</h2><button type="button" onClick={() => toast("New campaign flow opened.")} className="flex h-9 cursor-pointer items-center gap-1 rounded-[8px] bg-emerald-400 px-3 text-[10px] font-black text-[#07110B]"><Plus className="size-3.5" />New Campaign</button></div><div className="mt-4 flex gap-1 overflow-x-auto rounded-[10px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{filters.map((item) => <button key={item.label} type="button" onClick={() => setFilter(item.label)} className={cn("flex h-8 min-w-max cursor-pointer items-center gap-2 rounded-[8px] px-3 text-[10px] font-bold", filter === item.label ? "bg-emerald-500/15 text-emerald-400" : "bg-white/5 text-white/40")}>{item.label}<span className="rounded-full bg-white/8 px-1.5 py-0.5 text-[9px]">{item.count}</span></button>)}</div><div className="mt-4 space-y-4">{visible.map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} onApplicants={() => setModalCampaign(campaign)} onTopUp={() => toast(`${campaign.name} top-up selected.`)} />)}{!visible.length ? <p className="rounded-[14px] border border-white/10 p-8 text-center text-[12px] text-white/40">No campaigns in this category.</p> : null}</div>{notice ? <div className="fixed bottom-5 right-5 z-[90] rounded-[9px] border border-emerald-400/25 bg-[#173124] px-4 py-3 text-[12px] font-bold text-emerald-300">{notice}</div> : null}<CampaignApplicationsModal campaign={modalCampaign} onClose={() => setModalCampaign(null)} /></div>
}
