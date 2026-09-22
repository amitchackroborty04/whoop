"use client"

import { useMemo, useState } from "react"
import { ArrowUpDown, BookOpen, Download, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { SubmissionCard } from "./submission-card"
import { submissions, type SubmissionStatus } from "./submission-data"
import { SubmissionDetail } from "./submission-detail"
import { SubmissionDialog, type DialogType } from "./submission-dialogs"

const filters: Array<{ label: "All" | SubmissionStatus; count: number }> = [
  { label: "All", count: 21 },
  { label: "Pending", count: 8 },
  { label: "Approved", count: 5 },
  { label: "Rejected", count: 5 },
  { label: "Flagged", count: 3 },
]

export function SubmissionsBoard() {
  const [activeId, setActiveId] = useState(3)
  const [filter, setFilter] = useState<(typeof filters)[number]["label"]>("All")
  const [query, setQuery] = useState("")
  const [dialog, setDialog] = useState<DialogType>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const visible = useMemo(() => submissions.filter((submission) => {
    const matchesFilter = filter === "All" || submission.status === filter
    const needle = query.trim().toLowerCase()
    const matchesQuery = !needle || `${submission.creator} ${submission.campaign}`.toLowerCase().includes(needle)
    return matchesFilter && matchesQuery
  }), [filter, query])

  const active = submissions.find((submission) => submission.id === activeId) ?? submissions[0]

  function confirmAction() {
    setNotice(dialog === "approve" ? `${active.creator}'s payout approved.` : `${active.creator}'s submission rejected.`)
    setDialog(null)
    window.setTimeout(() => setNotice(null), 2800)
  }

  return (
    <div>
      <header className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="flex items-center gap-3"><h1 className="text-[28px] font-black text-white sm:text-[32px]">Submissions</h1><span className="rounded-full bg-white/8 px-2 py-1 text-[11px] font-bold text-white/45">21</span></div>
          <div className="mt-4 flex max-w-full gap-1 overflow-x-auto rounded-[10px] bg-[#0B0B0E] p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filters.map((item) => <button key={item.label} type="button" onClick={() => setFilter(item.label)} className={cn("flex h-8 min-w-max cursor-pointer items-center gap-2 rounded-[8px] px-4 text-[12px] font-bold transition", filter === item.label ? "bg-emerald-500/15 text-emerald-400" : "text-white/45 hover:bg-white/7 hover:text-white")}>{item.label}<span className="rounded-full bg-white/8 px-1.5 py-0.5 text-[10px]">{item.count}</span></button>)}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 xl:pt-1"><span className="mr-2 inline-flex items-center gap-1.5 text-[11px] text-white/45">ⓘ Understanding scores &amp; matches</span><button className="h-9 cursor-pointer rounded-[8px] border border-white/12 bg-white/5 px-3 text-[11px] font-bold text-white">Campaign 1 <span className="text-emerald-400">⌄</span></button><button className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-[8px] border border-white/12 bg-white/5 px-3 text-[11px] font-bold text-white"><BookOpen className="size-3.5" />Rules</button><button className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-[8px] border border-white/12 bg-white/5 px-3 text-[11px] font-bold text-white"><Download className="size-3.5" />Export</button></div>
      </header>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <label className="relative block flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/35" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by video title (as submitted)..." className="h-10 w-full rounded-[8px] border border-white/12 bg-black/25 pl-10 pr-3 text-[12px] text-white outline-none placeholder:text-white/30 focus:border-emerald-400/50" /></label>
        <button type="button" className="h-10 cursor-pointer rounded-[8px] border border-white/12 bg-white/5 px-4 text-[11px] text-white/65">Min views: <strong className="ml-1 text-emerald-400">2K</strong></button><button type="button" aria-label="Sort submissions" className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-[8px] border border-white/12 bg-white/5 text-white/65"><ArrowUpDown className="size-4" /></button>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="space-y-2 lg:max-h-[760px] lg:overflow-y-auto lg:pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {visible.length ? visible.map((submission) => <SubmissionCard key={submission.id} submission={submission} active={active.id === submission.id} onSelect={() => setActiveId(submission.id)} />) : <div className="rounded-[12px] border border-white/10 bg-white/4 p-6 text-center text-[12px] text-white/40">No submissions found.</div>}
        </aside>
        <SubmissionDetail submission={active} onAction={setDialog} />
      </div>

      {notice ? <div className="fixed bottom-5 right-5 z-[90] rounded-[10px] border border-emerald-400/25 bg-[#173124] px-4 py-3 text-[12px] font-bold text-emerald-300 shadow-xl">{notice}</div> : null}
      <SubmissionDialog type={dialog} creator={active.creator} onClose={() => setDialog(null)} onConfirm={confirmAction} />
    </div>
  )
}
