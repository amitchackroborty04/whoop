"use client"

import { useMemo, useState, type ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import { FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

type PayoutStatus = "Pending" | "Paid" | "Upcoming" | "Blocked"
type Platform = "tiktok" | "instagram" | "youtube" | "x"

type Payout = {
  creator: string
  initial: string
  avatarClass: string
  campaign: string
  campaignName: string
  views: string
  estimated: string
  net: string
  status: PayoutStatus
  platforms: Platform[]
}

const payouts: Payout[] = [
  { creator: "xKaizen", initial: "X", avatarClass: "bg-emerald-500", campaign: "#1344555", campaignName: "Caffeine AI...", views: "337.4K", estimated: "$139.75", net: "$129.32", status: "Pending", platforms: ["tiktok", "instagram", "youtube", "x"] },
  { creator: "Cryptoclipz", initial: "C", avatarClass: "bg-blue-500", campaign: "#1344555", campaignName: "Caffeine AI...", views: "337.4K", estimated: "$139.75", net: "$129.32", status: "Paid", platforms: ["tiktok", "instagram", "youtube", "x"] },
  { creator: "ViralVince", initial: "V", avatarClass: "bg-amber-500", campaign: "#1344555", campaignName: "Caffeine AI...", views: "337.4K", estimated: "$139.75", net: "$129.32", status: "Pending", platforms: ["tiktok", "instagram", "youtube", "x"] },
  { creator: "TechnoTrade", initial: "T", avatarClass: "bg-rose-400/55", campaign: "#1344555", campaignName: "Caffeine AI...", views: "337.4K", estimated: "$139.75", net: "$129.32", status: "Blocked", platforms: ["tiktok", "instagram", "youtube", "x"] },
  { creator: "GamingGrace", initial: "G", avatarClass: "bg-violet-500", campaign: "#1344555", campaignName: "Caffeine AI...", views: "337.4K", estimated: "$139.75", net: "$129.32", status: "Upcoming", platforms: ["tiktok", "instagram", "youtube", "x"] },
  { creator: "BetBoss", initial: "B", avatarClass: "bg-teal-400", campaign: "#1344555", campaignName: "Caffeine AI...", views: "337.4K", estimated: "$139.75", net: "$129.32", status: "Paid", platforms: ["tiktok", "instagram", "youtube", "x"] },
  { creator: "ClipKingJr", initial: "C", avatarClass: "bg-emerald-500", campaign: "#1344555", campaignName: "Caffeine AI...", views: "337.4K", estimated: "$139.75", net: "$129.32", status: "Pending", platforms: ["tiktok", "instagram", "youtube", "x"] },
  { creator: "NeonEdits", initial: "N", avatarClass: "bg-blue-500", campaign: "#1344555", campaignName: "Caffeine AI...", views: "337.4K", estimated: "$139.75", net: "$129.32", status: "Paid", platforms: ["tiktok", "x"] },
  { creator: "ReelMaster", initial: "R", avatarClass: "bg-amber-500", campaign: "#1344555", campaignName: "Caffeine AI...", views: "337.4K", estimated: "$139.75", net: "$129.32", status: "Pending", platforms: ["tiktok", "instagram"] },
]

const summary = [
  { label: "Budget", value: "$42,000", tone: "text-white" },
  { label: "Paid", value: "$18,240", tone: "text-[#19D978]" },
  { label: "Pending", value: "$9,580", tone: "text-[#FFB42E]" },
  { label: "Upcoming", value: "$6,120", tone: "text-[#4399FF]" },
  { label: "Clawed Back", value: "$420", tone: "text-white" },
  { label: "Flagged", value: "$1,290", tone: "text-[#FF637B]" },
]

const statusStyles: Record<PayoutStatus, string> = {
  Pending: "bg-amber-500/15 text-amber-300",
  Paid: "bg-emerald-500/15 text-emerald-400",
  Upcoming: "bg-blue-500/18 text-blue-300",
  Blocked: "bg-rose-500/15 text-rose-300",
}

const filters = ["All Clips", "Processing", "In Review", "Suspicious"] as const
const periods = ["This week", "This month", "All time"] as const

function PlatformIcons({ platforms }: { platforms: Platform[] }) {
  const icons = { tiktok: FaTiktok, instagram: FaInstagram, youtube: FaYoutube, x: FaXTwitter }

  return (
    <div className="flex items-center gap-3 text-white/90">
      {platforms.map((platform) => {
        const Icon = icons[platform]
        return (
          <Icon
            key={platform}
            className={cn(
              "size-5",
              (platform === "instagram" || platform === "youtube") && "size-[22px]",
            )}
            aria-label={platform}
          />
        )
      })}
    </div>
  )
}

function StatusBadge({ status }: { status: PayoutStatus }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[14px] font-black", statusStyles[status])}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

function Campaign({ payout }: { payout: Payout }) {
  return (
    <div className="min-w-0">
      <span className="inline-flex rounded-[5px] border border-white/8 bg-black/25 px-2 py-1 font-mono text-[14px] font-bold text-emerald-300">{payout.campaign}</span>
      <p className="mt-1 truncate text-[12px] font-medium text-white/40">{payout.campaignName}</p>
    </div>
  )
}

export function PayoutsTable() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All Clips")
  const [period, setPeriod] = useState<(typeof periods)[number]>("This week")

  const visiblePayouts = useMemo(() => {
    if (activeFilter === "Processing") return payouts.filter((payout) => payout.status === "Pending")
    if (activeFilter === "In Review") return payouts.filter((payout) => payout.status === "Upcoming")
    if (activeFilter === "Suspicious") return payouts.filter((payout) => payout.status === "Blocked")
    return payouts
  }, [activeFilter])

  return (
    <div className="pb-8">
      <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[28px] font-black text-white sm:text-[32px]">Payouts</h1>
          <p className="mt-1 text-[13px] font-medium text-white/45 sm:text-[14px]">
            Review and moderate creator submissions
          </p>
        </div>

        <div className="grid w-full grid-cols-3 rounded-[10px] border border-white/10 bg-[#0B0B0E] p-1 sm:w-auto">
          {periods.map((item) => (
            <button key={item} type="button" onClick={() => setPeriod(item)} className={cn("h-8 cursor-pointer rounded-[7px] px-4 text-[11px] font-bold transition sm:min-w-[92px]", period === item ? "bg-emerald-500/15 text-emerald-400" : "text-white/45 hover:text-white")}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 border border-[#FFFFFF0D] bg-[#FFFFFF14] sm:grid-cols-3 xl:grid-cols-6">
        {summary.map((item) => (
          <div key={item.label} className="min-h-22 border-b border-r border-[#FFFFFF14] p-4 last:border-r-0 sm:min-h-23 xl:border-b-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-white/45">{item.label}</p>
            <p className={cn("mt-2 text-[22px] font-black", item.tone)}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-full gap-1 overflow-x-auto border-b border-white/10">
          {filters.map((filter) => (
            <button key={filter} type="button" onClick={() => setActiveFilter(filter)} className={cn("relative flex h-11 min-w-max cursor-pointer items-center gap-2 px-3 text-[13px] font-bold transition", activeFilter === filter ? "text-white after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-emerald-400" : "text-white/50 hover:text-white")}>
              {filter}
              <span className={cn("rounded-[5px] px-1.5 py-0.5 text-[10px]", activeFilter === filter ? "bg-emerald-500 text-white" : "bg-white/10 text-white/65")}>{filter === "All Clips" ? "99" : "99+"}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex">
          <SelectControl label="Filter by campaign" options={["All Campaigns", "Caffeine AI"]} />
          <SelectControl label="Sort payouts" options={["Sort: Highest paid out", "Sort: Lowest paid out"]} />
        </div>
      </div>

      <DesktopTable payouts={visiblePayouts} />
      <MobileList payouts={visiblePayouts} />
    </div>
  )
}

function SelectControl({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select className="h-10 w-full cursor-pointer appearance-none rounded-[9px] border border-white/10 bg-[#14141A] pl-3 pr-8 text-[12px] font-semibold text-white outline-none focus:border-emerald-400/50 sm:w-auto">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-white/55" />
    </label>
  )
}

function DesktopTable({ payouts: rows }: { payouts: Payout[] }) {
  return (
    <div className="mt-4 hidden overflow-hidden rounded-[14px] border-2 border-[#FFFFFF14] bg-[#FFFFFF0D] md:block">
      <Table className="min-w-[980px] text-[14px]">
        <TableHeader>
          <TableRow className="border-white/10 bg-[linear-gradient(90deg,rgba(28,91,52,0.28),rgba(27,25,47,0.5))] hover:bg-transparent">
            {['Creator', 'Platforms', 'Campaign', 'Views', 'Est. Payout', 'Net', 'Status'].map((heading) => (
              <TableHead key={heading} className={cn("h-12 text-[14px] font-medium uppercase tracking-[0.08em] text-[#8B8B96]", heading === "Creator" && "px-5", heading === "Status" && "pr-5 text-right")}>{heading}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((payout) => (
            <TableRow key={payout.creator} className={cn("h-[70px] border-white/8 bg-[linear-gradient(90deg,rgba(22,70,40,0.3),rgba(26,25,43,0.48))] hover:bg-white/5", payout.status === "Blocked" && "bg-[linear-gradient(90deg,rgba(94,35,42,0.23),rgba(49,25,43,0.45))]")}>
              <TableCell className="px-5"><div className="flex items-center gap-3"><span className={cn("grid size-8 place-items-center rounded-full text-[14px] font-bold text-white", payout.avatarClass)}>{payout.initial}</span><span className="text-[16px] font-bold text-white">{payout.creator}</span></div></TableCell>
              <TableCell><PlatformIcons platforms={payout.platforms} /></TableCell>
              <TableCell className="max-w-32"><Campaign payout={payout} /></TableCell>
              <TableCell className="text-[14px] font-medium text-white/48">{payout.views}</TableCell>
              <TableCell className="text-[14px] font-bold text-emerald-400">{payout.estimated}</TableCell>
              <TableCell className="text-[14px] font-semibold text-white">{payout.net}</TableCell>
              <TableCell className="pr-5 text-right"><StatusBadge status={payout.status} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function MobileList({ payouts: rows }: { payouts: Payout[] }) {
  return (
    <div className="mt-4 overflow-hidden rounded-[12px] border border-white/15 bg-white/[0.035] md:hidden">
      {rows.map((payout) => (
        <article key={payout.creator} className="border-b border-white/8 p-4 last:border-b-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3"><span className={cn("grid size-9 shrink-0 place-items-center rounded-full text-[12px] font-black text-white", payout.avatarClass)}>{payout.initial}</span><div className="min-w-0"><p className="truncate text-[14px] font-bold text-white">{payout.creator}</p><PlatformIcons platforms={payout.platforms} /></div></div>
            <StatusBadge status={payout.status} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-white/8 pt-4">
            <MobileField label="Campaign"><Campaign payout={payout} /></MobileField>
            <MobileField label="Views" value={payout.views} />
            <MobileField label="Est. Payout" value={payout.estimated} accent />
            <MobileField label="Net" value={payout.net} />
          </div>
        </article>
      ))}
    </div>
  )
}

function MobileField({ label, value, accent, children }: { label: string; value?: string; accent?: boolean; children?: ReactNode }) {
  return <div><p className="mb-1 text-[9px] font-bold uppercase tracking-[0.07em] text-white/35">{label}</p>{children ?? <p className={cn("text-[14px] font-semibold text-white", accent && "font-black text-emerald-400")}>{value}</p>}</div>
}
