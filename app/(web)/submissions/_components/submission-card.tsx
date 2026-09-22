import { AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Submission } from "./submission-data"

export function SubmissionCard({ submission, active, onSelect }: { submission: Submission; active: boolean; onSelect: () => void }) {
  const scoreTone = submission.score >= 70 ? "border-emerald-400 text-emerald-400" : "border-rose-400 text-rose-300"

  return (
    <button type="button" onClick={onSelect} className={cn("flex w-full cursor-pointer items-center gap-3 rounded-[12px] border p-3 text-left transition", active ? "border-emerald-400/55 bg-emerald-500/15" : "border-white/8 bg-[#17171D] hover:border-white/18 hover:bg-white/6")}>
      <span className={cn("grid size-9 shrink-0 place-items-center rounded-full text-[13px] font-black text-white", submission.avatarClass)}>{submission.initial}</span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5"><span className="truncate text-[13px] font-bold text-white">{submission.creator}</span>{submission.status === "Flagged" ? <AlertTriangle className="size-3 text-amber-400" /> : null}</span>
        <span className="mt-0.5 block truncate text-[10px] text-white/45">{submission.campaign} · {submission.submitted}</span>
        <span className={cn("mt-0.5 block truncate text-[10px]", submission.status === "Flagged" ? "text-rose-300" : "text-white/35")}>{submission.views} · {submission.followers}</span>
      </span>
      <span className={cn("grid size-10 shrink-0 place-items-center rounded-full border-2 bg-black/20 text-[12px] font-black", scoreTone)}>{submission.score}</span>
    </button>
  )
}
