import { Check, X } from "lucide-react"

import { cn } from "@/lib/utils"

export type DialogType = "approve" | "reject" | null

export function SubmissionDialog({ type, creator, onClose, onConfirm }: { type: DialogType; creator: string; onClose: () => void; onConfirm: () => void }) {
  if (!type) return null
  const approve = type === "approve"

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/65 p-4 backdrop-blur-[3px]" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div role="dialog" aria-modal="true" aria-labelledby="moderation-title" className="w-full max-w-[440px] rounded-[16px] border border-white/10 bg-[#191B20] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.6)] sm:p-6">
        <div className="flex items-center gap-3"><span className={cn("grid size-10 place-items-center rounded-[10px] border", approve ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-400" : "border-amber-400/30 bg-amber-500/10 text-amber-300")}>{approve ? <Check className="size-5" /> : <X className="size-5" />}</span><h2 id="moderation-title" className="text-[16px] font-black text-white">{approve ? "Approve this submission?" : "Reject this submission?"}</h2></div>
        <p className="mt-5 text-[12px] leading-6 text-white/50">{approve ? `Approving releases payout for this clip to @${creator} via Whop. Once Whop processes it, this can't be undone.` : `Rejecting skips payout on this clip. @${creator} will see your note below and can edit and resubmit before the deadline.`}</p>
        {approve ? <div className="mt-4 flex items-center justify-between rounded-[9px] border border-white/10 bg-white/5 px-3 py-3 text-[12px]"><span className="text-white/45">Payout amount</span><strong className="text-emerald-400">$425 · via Whop</strong></div> : <textarea aria-label="Rejection note" placeholder="Add a note explaining why this submission was rejected..." className="mt-4 min-h-24 w-full resize-none rounded-[9px] border border-white/10 bg-black/20 p-3 text-[12px] text-white outline-none placeholder:text-white/25 focus:border-amber-400/50" />}
        <div className="mt-5 flex justify-end gap-2"><button type="button" onClick={onClose} className="h-10 cursor-pointer rounded-[8px] border border-white/12 bg-white/5 px-4 text-[12px] font-bold text-white transition hover:bg-white/10">Cancel</button><button type="button" onClick={onConfirm} className={cn("h-10 cursor-pointer rounded-[8px] px-4 text-[12px] font-bold text-[#08110C]", approve ? "bg-emerald-400 hover:bg-emerald-300" : "bg-amber-400 hover:bg-amber-300")}>{approve ? "Approve payout" : "Reject submission"}</button></div>
      </div>
    </div>
  )
}
