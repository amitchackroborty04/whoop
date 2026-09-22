import { ExternalLink, MoreHorizontal, Pencil, Plus, UsersRound } from "lucide-react"

import type { Campaign } from "./campaign-data"

export function CampaignCard({ campaign, onApplicants, onTopUp }: { campaign: Campaign; onApplicants: () => void; onTopUp: () => void }) {
  return (
    <article className="grid gap-4 rounded-[14px] border border-white/15 bg-[linear-gradient(105deg,rgba(22,70,40,0.3),rgba(26,25,43,0.5))] p-4 sm:p-5 lg:grid-cols-[1fr_220px]">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[9px] font-black uppercase text-emerald-400">● Active</span>{campaign.special ? <button type="button" onClick={onApplicants} className="cursor-pointer rounded-full bg-amber-500/15 px-2 py-1 text-[9px] font-bold text-amber-300">{campaign.special}</button> : null}</div>
        <h2 className="mt-3 text-[17px] font-black text-white sm:text-[19px]">{campaign.name} <span className="mx-1 text-white/25">|</span> {campaign.budget}</h2>
        <div className="mt-3 flex flex-wrap gap-1.5">{campaign.platforms.map((platform) => <span key={platform} className="rounded-full border border-white/10 bg-white/6 px-2 py-1 text-[9px] font-semibold text-white/45">{platform}</span>)}</div>
        <div className="mt-4 flex items-center justify-between text-[10px]"><span><strong className="text-[14px] text-white">{campaign.spent}</strong> <span className="text-white/35">spent</span></span><span className="text-white/35">of $15K · {campaign.progress}%</span></div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${campaign.progress}%` }} /></div>
        <p className="mt-3 flex items-center gap-2 text-[10px] text-white/45"><UsersRound className="size-3.5 text-emerald-400" />{campaign.views}</p>
      </div>

      <div className="flex flex-col justify-between rounded-[11px] border border-white/8 bg-[#111117]/75 p-4">
        <button type="button" onClick={onApplicants} className="flex cursor-pointer items-center text-left"><span className="-mr-2 size-7 rounded-full border-2 border-[#111117] bg-emerald-500" /><span className="-mr-2 size-7 rounded-full border-2 border-[#111117] bg-sky-500" /><span className="size-7 rounded-full border-2 border-[#111117] bg-violet-500" /><span className="ml-1 text-[10px] text-white/40">+{campaign.applicants - 3}</span></button>
        <div className="mt-4"><p className="text-[9px] font-bold uppercase text-white/35">Budget</p><p className="mt-1 text-[26px] font-black text-white">$15K</p><p className="text-[9px] text-white/35">10M views generated</p></div>
        <div className="mt-4 grid grid-cols-[1fr_auto_auto_auto] gap-2"><button type="button" onClick={onTopUp} className="flex h-8 cursor-pointer items-center justify-center gap-1 rounded-[7px] bg-emerald-500/15 text-[10px] font-bold text-emerald-400"><Plus className="size-3" />Top up</button><IconButton label="Open campaign"><ExternalLink className="size-3.5" /></IconButton><IconButton label="Edit campaign"><Pencil className="size-3.5" /></IconButton><IconButton label="More options"><MoreHorizontal className="size-3.5" /></IconButton></div>
      </div>
    </article>
  )
}

function IconButton({ label, children }: { label: string; children: React.ReactNode }) { return <button type="button" title={label} aria-label={label} className="grid size-8 cursor-pointer place-items-center rounded-[7px] border border-white/10 bg-white/6 text-white/55 transition hover:text-white">{children}</button> }
