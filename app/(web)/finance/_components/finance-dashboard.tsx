"use client"

import { useEffect, useRef, useState } from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { FinanceCampaigns } from "./finance-campaigns"
import { FinanceInvoices } from "./finance-invoices"

const overviewTabs = ["Overview", "Campaigns", "Invoices"] as const
const chartModes = ["Spend", "Payouts"] as const

type FilterOption = {
  label: string
  description?: string
  separated?: boolean
}

const rangeOptions: FilterOption[] = [
  { label: "Last 7 days" },
  { label: "Last 30 days" },
  { label: "Last 3 months" },
  { label: "Last 6 months" },
  { label: "Last 12 months" },
  { label: "Year to date" },
  { label: "Custom range...", description: "Pick start & end", separated: true },
]

const campaignOptions: FilterOption[] = [
  { label: "All campaigns", description: "5 active · 2 models" },
  { label: "Harry Styles x Shania", description: "Personal brand" },
  { label: "FanDuel — All Formats", description: "Gaming" },
  { label: "G Fuel Meme Clips", description: "Gaming" },
  { label: "BetKing Push", description: "Betting" },
  { label: "NovaPay Wallet", description: "Finance" },
]

const metrics = [
  { label: "Available Budget", value: "$500,000", description: "Ready to fund campaigns" },
  { label: "Total Spent · 30D", value: "$36,950", description: "Across all campaigns", change: "+18.3%" },
  { label: "Pending Payouts", value: "$15,000", description: "Queued to creators" },
  { label: "Avg Cost / 1K Views", value: "$1.12", description: "Blended across campaigns", accent: true },
]

const spendData = [
  { month: "Mar", payout: 32, fee: 8, bonus: 3 },
  { month: "Apr", payout: 38, fee: 8, bonus: 4 },
  { month: "May", payout: 34, fee: 9, bonus: 3 },
  { month: "Jun", payout: 48, fee: 13, bonus: 5 },
  { month: "Jul", payout: 42, fee: 11, bonus: 4 },
  { month: "Aug", payout: 60, fee: 18, bonus: 6 },
  { month: "Sep", payout: 56, fee: 15, bonus: 5 },
  { month: "Oct", payout: 70, fee: 17, bonus: 7 },
  { month: "Nov", payout: 65, fee: 18, bonus: 6 },
  { month: "Dec", payout: 82, fee: 22, bonus: 8 },
  { month: "Jan", payout: 94, fee: 25, bonus: 9 },
  { month: "Feb", payout: 108, fee: 29, bonus: 11 },
]

const campaignSpend = [
  { name: "FanDuel — All Formats", meta: "CPM · 12 creators", amount: "$5,000", percent: 32 },
  { name: "G Fuel Meme Clips", meta: "CPM · 12 creators", amount: "$5,000", percent: 32 },
  { name: "BetKing Push", meta: "CPM · 6 creators", amount: "$3,200", percent: 21 },
  { name: "NovaPay Wallet", meta: "Retainer · 4 creators", amount: "$2,400", percent: 15 },
]

type TransactionStatus = "Paid" | "Completed" | "Pending"

const transactions: Array<{
  date: string
  campaign: string
  type: string
  amount: string
  positive?: boolean
  status: TransactionStatus
}> = [
  { date: "Feb 18", campaign: "Gambling Summer Push", type: "CPM payout · 171.9k views", amount: "−$139.75", status: "Paid" },
  { date: "Feb 17", campaign: "FanDuel — All Formats", type: "Creator payout · 4 clips", amount: "−$420.00", status: "Paid" },
  { date: "Feb 16", campaign: "Add funds", type: "Top-up · Whop balance", amount: "+$10,000", positive: true, status: "Completed" },
  { date: "Feb 15", campaign: "G Fuel Meme Clips", type: "CPM payout · 88.2k views", amount: "−$88.20", status: "Pending" },
  { date: "Feb 14", campaign: "Whop platform fee", type: "Fee · payout batch", amount: "−$54.10", status: "Paid" },
]

const statusStyles: Record<TransactionStatus, string> = {
  Paid: "bg-emerald-500/15 text-emerald-400",
  Completed: "bg-teal-400/15 text-teal-300",
  Pending: "bg-amber-500/15 text-amber-300",
}

export function FinanceDashboard() {
  const [activeTab, setActiveTab] = useState<(typeof overviewTabs)[number]>("Overview")
  const [chartMode, setChartMode] = useState<(typeof chartModes)[number]>("Spend")

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-[28px] font-black text-white sm:text-[32px]">Finance</h1>
          <div className="mt-4 flex items-center gap-1">
            {overviewTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "h-10 cursor-pointer rounded-[9px] px-5 text-[13px] font-semibold transition",
                  activeTab === tab
                    ? "border border-white/15 bg-white/10 text-white"
                    : "text-white/45 hover:bg-white/5 hover:text-white",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex">
          <FilterDropdown label="Range" options={rangeOptions} initialValue="Last 6 months" />
          <FilterDropdown label="Campaign" options={campaignOptions} initialValue="All campaigns" />
        </div>
      </div>

      {activeTab === "Overview" ? (
        <>
          <section className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Finance summary">
            {metrics.map((metric) => (
              <article key={metric.label} className="relative min-h-[132px] rounded-[14px] border border-white/15 bg-[linear-gradient(110deg,rgba(25,68,42,0.36),rgba(27,27,30,0.72))] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.16)]">
                {metric.change ? <span className="absolute right-5 top-5 rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-black text-emerald-400">{metric.change}</span> : null}
                <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-white/40">{metric.label}</p>
                <p className={cn("mt-2 text-[28px] font-black text-white", metric.accent && "text-emerald-400")}>{metric.value}</p>
                <p className="mt-2 text-[12px] font-medium text-white/40">{metric.description}</p>
              </article>
            ))}
          </section>

          <div className="mt-6 grid gap-4 xl:grid-cols-[2.2fr_1fr]">
            <SpendChart mode={chartMode} onModeChange={setChartMode} />
            <CampaignSpend />
          </div>

          <Transactions />
        </>
      ) : null}
      {activeTab === "Campaigns" ? <FinanceCampaigns /> : null}
      {activeTab === "Invoices" ? <FinanceInvoices /> : null}
    </div>
  )
}

function FilterDropdown({
  label,
  options,
  initialValue,
}: {
  label: string
  options: FilterOption[]
  initialValue: string
}) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(initialValue)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function closeMenu(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("mousedown", closeMenu)
    document.addEventListener("keydown", closeOnEscape)

    return () => {
      document.removeEventListener("mousedown", closeMenu)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative min-w-0 sm:min-w-[190px]">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex h-11 w-full cursor-pointer items-center rounded-[10px] border border-white/12 bg-white/5 pl-3 pr-9 text-left transition hover:border-white/20 focus-visible:border-emerald-400/60 focus-visible:outline-none"
      >
        <span className="mr-1.5 shrink-0 text-[11px] font-medium text-white/35">{label}:</span>
        <span className="min-w-0 truncate text-[12px] font-bold text-white">{selected}</span>
        <ChevronDown className={cn("pointer-events-none absolute right-3 size-4 text-white/50 transition", open && "rotate-180")} />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label={label}
          className={cn(
            "absolute right-0 top-[calc(100%+8px)] z-50 max-h-[430px] w-[300px] max-w-[calc(100vw-32px)] overflow-y-auto rounded-[15px] border border-white/8 bg-[#1A1C21] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.5)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            label === "Campaign" && "sm:w-[310px]",
          )}
        >
          <p className="px-3 pb-2 pt-2 text-[12px] font-black uppercase tracking-[0.06em] text-white/35">
            {label === "Range" ? "Date Range" : "Campaign"}
          </p>

          {options.map((option) => {
            const active = selected === option.label

            return (
              <div key={option.label} className={option.separated ? "mt-2 border-t border-white/8 pt-2" : undefined}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setSelected(option.label)
                    setOpen(false)
                  }}
                  className={cn(
                    "flex min-h-[54px] w-full cursor-pointer items-center justify-between gap-4 rounded-[10px] px-3 py-2 text-left transition hover:bg-white/6",
                    active && "border border-emerald-400/45 bg-emerald-500/15 text-emerald-400",
                  )}
                >
                  <span className="min-w-0">
                    <span className={cn("block truncate text-[15px] font-semibold text-white", active && "text-emerald-400")}>{option.label}</span>
                    {option.description ? <span className="mt-1 block text-[12px] font-medium text-white/35">{option.description}</span> : null}
                  </span>
                  {active ? <Check className="size-5 shrink-0 stroke-[2.5]" aria-hidden="true" /> : null}
                </button>
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn("rounded-[14px] border border-white/15 bg-[linear-gradient(120deg,rgba(20,57,34,0.28),rgba(23,22,27,0.75))]", className)}>{children}</section>
}

function SpendChart({ mode, onModeChange }: { mode: (typeof chartModes)[number]; onModeChange: (mode: (typeof chartModes)[number]) => void }) {
  return (
    <Panel className="min-h-[398px] p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[14px] font-bold text-white">Spend over time</p>
          <div className="mt-2 flex flex-wrap items-baseline gap-2">
            <span className="text-[28px] font-black text-white">$36,950</span>
            <span className="text-[11px] font-medium text-white/30">spent · last 6 months</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-4 text-[11px] font-semibold text-white/65">
            <Legend color="bg-emerald-400" label="Payouts" />
            <Legend color="bg-emerald-200" label="Fees" />
            <Legend color="bg-emerald-100" label="Bonuses" />
          </div>
        </div>

        <div className="flex w-fit rounded-[8px] border border-white/10 bg-white/5 p-1">
          {chartModes.map((item) => (
            <button key={item} type="button" onClick={() => onModeChange(item)} className={cn("h-7 cursor-pointer rounded-[6px] px-4 text-[10px] font-bold transition", mode === item ? "bg-emerald-500/20 text-emerald-400" : "text-white/45 hover:text-white")}>{item}</button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex h-[220px] items-end gap-2 sm:gap-3" aria-label={`${mode} by month`}>
        {spendData.map((item) => {
          const multiplier = mode === "Spend" ? 1 : 0.82
          return (
            <div key={item.month} className="flex h-full min-w-0 flex-1 flex-col justify-end">
              <div className="flex w-full flex-col-reverse overflow-hidden rounded-[6px] bg-white/5" title={`${item.month}: ${item.payout + item.fee + item.bonus}`}>
                <span className="block bg-[#28C979]" style={{ height: item.payout * multiplier }} />
                <span className="block bg-[#9BE8C2]" style={{ height: item.fee * multiplier }} />
                <span className="block bg-[#D2F5E4]" style={{ height: item.bonus * multiplier }} />
              </div>
              <span className="mt-4 text-center text-[10px] font-medium text-white/30">{item.month}</span>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return <span className="inline-flex items-center gap-2"><span className={cn("size-3 rounded-[3px]", color)} />{label}</span>
}

function CampaignSpend() {
  return (
    <Panel className="p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[14px] font-bold text-white">Spend by campaign</h2>
        <span className="text-[10px] text-white/25">where it goes</span>
      </div>

      <div className="mt-4 space-y-4">
        {campaignSpend.map((campaign) => (
          <div key={campaign.name}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0"><p className="truncate text-[13px] font-bold text-white">{campaign.name}</p><p className="mt-0.5 text-[10px] text-white/35">{campaign.meta}</p></div>
              <div className="shrink-0 text-right"><span className="text-[13px] font-black text-white">{campaign.amount}</span><span className="ml-2 text-[10px] text-white/35">{campaign.percent}%</span></div>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${campaign.percent}%` }} /></div>
          </div>
        ))}
      </div>
    </Panel>
  )
}

function StatusBadge({ status }: { status: TransactionStatus }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold", statusStyles[status])}><span className="size-1.5 rounded-full bg-current" />{status}</span>
}

function Transactions() {
  return (
    <Panel className="mt-6 overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-5 pb-3 pt-5 sm:px-6">
        <h2 className="text-[14px] font-bold text-white">Recent transactions</h2>
        <span className="text-[10px] text-white/25">money out · top-ups · fees</span>
      </div>

      <div className="hidden md:block">
        <div className="grid grid-cols-[110px_1.7fr_1fr_130px_110px] border-b border-white/8 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.06em] text-white/35">
          <span>Date</span><span>Campaign / Item</span><span>Type</span><span className="text-right">Amount</span><span className="text-right">Status</span>
        </div>
        {transactions.map((transaction) => (
          <div key={`${transaction.date}-${transaction.campaign}`} className="grid min-h-[54px] grid-cols-[110px_1.7fr_1fr_130px_110px] items-center px-6 text-[12px] transition hover:bg-white/4">
            <span className="text-white/45">{transaction.date}</span><span className="font-semibold text-white">{transaction.campaign}</span><span className="text-white/40">{transaction.type}</span><span className={cn("text-right font-bold text-white", transaction.positive && "text-emerald-400")}>{transaction.amount}</span><span className="text-right"><StatusBadge status={transaction.status} /></span>
          </div>
        ))}
      </div>

      <div className="divide-y divide-white/8 md:hidden">
        {transactions.map((transaction) => (
          <article key={`${transaction.date}-${transaction.campaign}`} className="p-4">
            <div className="flex items-start justify-between gap-4"><div className="min-w-0"><p className="truncate text-[14px] font-bold text-white">{transaction.campaign}</p><p className="mt-1 text-[11px] text-white/40">{transaction.date} · {transaction.type}</p></div><StatusBadge status={transaction.status} /></div>
            <p className={cn("mt-4 text-right text-[16px] font-black text-white", transaction.positive && "text-emerald-400")}>{transaction.amount}</p>
          </article>
        ))}
      </div>
    </Panel>
  )
}
