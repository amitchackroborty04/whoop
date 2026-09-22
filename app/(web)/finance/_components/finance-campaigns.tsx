import { cn } from "@/lib/utils"

type CampaignStatus = "Running low" | "On track" | "Completed"

const summary = [
  { label: "Total Budget", value: "$45,600" },
  { label: "Spent", value: "$30,500" },
  { label: "Pending Payouts", value: "$2,100" },
  { label: "Avg Cost / 1K", value: "$1.12", accent: true },
]

const campaigns: Array<{
  name: string
  meta: string
  budget: string
  spent: string
  spentPercent: number
  pending: string
  cost: string
  status: CampaignStatus
}> = [
  { name: "Harry Styles x Shania", meta: "Personal brand · 8 creators", budget: "$15,000", spent: "$14,900 (99%)", spentPercent: 99, pending: "$0", cost: "$1.50", status: "Running low" },
  { name: "FanDuel — All Formats", meta: "Gaming · 12 creators", budget: "$12,000", spent: "$5,000 (42%)", spentPercent: 42, pending: "$1,200", cost: "$0.80", status: "On track" },
  { name: "G Fuel Meme Clips", meta: "Gaming · 12 creators", budget: "$8,000", spent: "$5,000 (63%)", spentPercent: 63, pending: "$900", cost: "$1.05", status: "On track" },
  { name: "BetKing Push", meta: "Betting · 6 creators", budget: "$6,000", spent: "$3,200 (53%)", spentPercent: 53, pending: "$600", cost: "$0.95", status: "On track" },
  { name: "NovaPay Wallet", meta: "Finance · 4 creators", budget: "$4,600", spent: "$2,400 (52%)", spentPercent: 52, pending: "$300", cost: "$1.30", status: "Completed" },
]

const statusStyles: Record<CampaignStatus, string> = {
  "Running low": "bg-amber-500/15 text-amber-300",
  "On track": "bg-emerald-500/15 text-emerald-400",
  Completed: "bg-blue-500/15 text-blue-300",
}

export function FinanceCampaigns() {
  return (
    <div className="mt-5">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {summary.map((item) => (
          <article key={item.label} className="min-h-[98px] rounded-[12px] border border-white/15 bg-[linear-gradient(110deg,rgba(25,68,42,0.36),rgba(27,27,30,0.72))] p-4 sm:p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-white/40">{item.label}</p>
            <p className={cn("mt-2 text-[22px] font-black text-white sm:text-[25px]", item.accent && "text-emerald-400")}>{item.value}</p>
          </article>
        ))}
      </div>

      <section className="mt-5 overflow-hidden rounded-[14px] border border-white/15 bg-[linear-gradient(120deg,rgba(20,57,34,0.28),rgba(23,22,27,0.75))]">
        <div className="flex items-center justify-between gap-4 px-5 pb-3 pt-5">
          <h2 className="text-[14px] font-bold text-white">Active campaigns</h2>
          <span className="text-[10px] text-white/30">5 campaigns · 2 payment models</span>
        </div>

        <div className="hidden lg:block">
          <div className="grid grid-cols-[2.2fr_.65fr_1fr_.65fr_.65fr_.75fr] border-b border-white/8 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.06em] text-white/35">
            <span>Campaign</span><span>Budget</span><span>Spent</span><span>Pending</span><span>Cost / 1K</span><span className="text-right">Pace</span>
          </div>
          {campaigns.map((campaign) => <CampaignRow key={campaign.name} campaign={campaign} />)}
        </div>

        <div className="divide-y divide-white/8 lg:hidden">
          {campaigns.map((campaign) => <CampaignCard key={campaign.name} campaign={campaign} />)}
        </div>
      </section>
    </div>
  )
}

function CampaignRow({ campaign }: { campaign: (typeof campaigns)[number] }) {
  return (
    <div className="grid min-h-[74px] grid-cols-[2.2fr_.65fr_1fr_.65fr_.65fr_.75fr] items-center px-5 text-[12px] transition hover:bg-white/4">
      <CampaignName campaign={campaign} />
      <span className="font-semibold text-white">{campaign.budget}</span>
      <div className="pr-5"><span className="font-semibold text-white">{campaign.spent}</span><Progress campaign={campaign} /></div>
      <span className="text-white/65">{campaign.pending}</span>
      <span className="font-bold text-emerald-400">{campaign.cost}</span>
      <span className="text-right"><Status status={campaign.status} /></span>
    </div>
  )
}

function CampaignCard({ campaign }: { campaign: (typeof campaigns)[number] }) {
  return (
    <article className="p-4">
      <div className="flex items-start justify-between gap-3"><CampaignName campaign={campaign} /><Status status={campaign.status} /></div>
      <div className="mt-4"><div className="flex justify-between text-[12px]"><span className="text-white/40">Spent</span><span className="font-bold text-white">{campaign.spent}</span></div><Progress campaign={campaign} /></div>
      <div className="mt-4 grid grid-cols-3 gap-3"><Value label="Budget" value={campaign.budget} /><Value label="Pending" value={campaign.pending} /><Value label="Cost / 1K" value={campaign.cost} accent /></div>
    </article>
  )
}

function CampaignName({ campaign }: { campaign: (typeof campaigns)[number] }) {
  return <div className="min-w-0"><p className="truncate text-[13px] font-bold text-white">{campaign.name}</p><p className="mt-1 text-[10px] text-white/35">{campaign.meta}</p></div>
}

function Progress({ campaign }: { campaign: (typeof campaigns)[number] }) {
  return <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className={cn("h-full rounded-full", campaign.status === "Running low" ? "bg-amber-400" : "bg-emerald-400")} style={{ width: `${campaign.spentPercent}%` }} /></div>
}

function Status({ status }: { status: CampaignStatus }) {
  return <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold", statusStyles[status])}><span className="size-1.5 rounded-full bg-current" />{status}</span>
}

function Value({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return <div><p className="text-[9px] font-bold uppercase text-white/35">{label}</p><p className={cn("mt-1 text-[12px] font-semibold text-white", accent && "text-emerald-400")}>{value}</p></div>
}
