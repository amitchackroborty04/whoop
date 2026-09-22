import { FileText } from "lucide-react"

import { cn } from "@/lib/utils"

type InvoiceStatus = "Paid" | "Completed" | "Pending"

const summary = [
  { label: "Total Funded", value: "$25,000", description: "Added to Whop balance" },
  { label: "Paid Out", value: "$10,120", description: "To creators", accent: true },
  { label: "Whop Fees", value: "$312", description: "Platform & processing" },
  { label: "Outstanding", value: "$2,100", description: "1 invoice pending" },
]

const invoices: Array<{ id: string; date: string; description: string; type: "Payout" | "Top-up" | "Fee"; amount: string; positive?: boolean; status: InvoiceStatus; pdf?: boolean }> = [
  { id: "INV-0241", date: "Feb 18, 2026", description: "Payout batch — 12 creators", type: "Payout", amount: "−$4,820", status: "Paid", pdf: true },
  { id: "INV-0240", date: "Feb 16, 2026", description: "Whop balance top-up", type: "Top-up", amount: "+$10,000", positive: true, status: "Completed", pdf: true },
  { id: "INV-0239", date: "Feb 14, 2026", description: "Whop platform fee — payout batch", type: "Fee", amount: "−$54.10", status: "Paid", pdf: true },
  { id: "INV-0238", date: "Feb 10, 2026", description: "Payout batch — 8 creators", type: "Payout", amount: "−$3,200", status: "Paid", pdf: true },
  { id: "INV-0237", date: "Feb 05, 2026", description: "Whop balance top-up", type: "Top-up", amount: "+$15,000", positive: true, status: "Completed", pdf: true },
  { id: "INV-0236", date: "Feb 01, 2026", description: "Payout batch — pending review", type: "Payout", amount: "−$2,100", status: "Pending" },
]

const statusStyles: Record<InvoiceStatus, string> = {
  Paid: "bg-emerald-500/15 text-emerald-400",
  Completed: "bg-teal-500/15 text-teal-300",
  Pending: "bg-amber-500/15 text-amber-300",
}

export function FinanceInvoices() {
  return (
    <div className="mt-5">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {summary.map((item) => (
          <article key={item.label} className="min-h-[105px] rounded-[12px] border border-white/15 bg-[linear-gradient(110deg,rgba(25,68,42,0.36),rgba(27,27,30,0.72))] p-4 sm:p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-white/40">{item.label}</p><p className={cn("mt-2 text-[22px] font-black text-white sm:text-[25px]", item.accent && "text-emerald-400")}>{item.value}</p><p className="mt-1 text-[10px] text-white/35">{item.description}</p>
          </article>
        ))}
      </div>

      <section className="mt-5 overflow-hidden rounded-[14px] border border-white/15 bg-[linear-gradient(120deg,rgba(20,57,34,0.28),rgba(23,22,27,0.75))]">
        <div className="flex items-center justify-between gap-4 px-5 pb-3 pt-5"><h2 className="text-[14px] font-bold text-white">Invoices &amp; receipts</h2><span className="text-[10px] text-white/30">Billing handled by Whop</span></div>
        <div className="hidden md:block">
          <div className="grid grid-cols-[120px_1.8fr_.7fr_.65fr_.65fr_70px] border-b border-white/8 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.06em] text-white/35"><span>Invoice</span><span>Description</span><span>Type</span><span className="text-right">Amount</span><span className="text-right">Status</span><span /></div>
          {invoices.map((invoice) => <InvoiceRow key={invoice.id} invoice={invoice} />)}
        </div>
        <div className="divide-y divide-white/8 md:hidden">{invoices.map((invoice) => <InvoiceCard key={invoice.id} invoice={invoice} />)}</div>
      </section>
    </div>
  )
}

function InvoiceRow({ invoice }: { invoice: (typeof invoices)[number] }) {
  return <div className="grid min-h-[68px] grid-cols-[120px_1.8fr_.7fr_.65fr_.65fr_70px] items-center px-5 text-[12px] transition hover:bg-white/4"><div><p className="font-bold text-white">{invoice.id}</p><p className="mt-1 text-[10px] text-white/35">{invoice.date}</p></div><span className="font-medium text-white">{invoice.description}</span><TypeBadge type={invoice.type} /><span className={cn("text-right font-bold text-white", invoice.positive && "text-emerald-400")}>{invoice.amount}</span><span className="text-right"><Status status={invoice.status} /></span><span className="text-right">{invoice.pdf ? <PdfButton /> : <span className="text-white/25">—</span>}</span></div>
}

function InvoiceCard({ invoice }: { invoice: (typeof invoices)[number] }) {
  return <article className="p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-[14px] font-bold text-white">{invoice.id}</p><p className="mt-1 text-[10px] text-white/35">{invoice.date}</p></div><Status status={invoice.status} /></div><p className="mt-3 text-[13px] font-medium text-white">{invoice.description}</p><div className="mt-4 flex items-center justify-between gap-3"><TypeBadge type={invoice.type} /><div className="flex items-center gap-3"><span className={cn("text-[15px] font-black text-white", invoice.positive && "text-emerald-400")}>{invoice.amount}</span>{invoice.pdf ? <PdfButton /> : null}</div></div></article>
}

function TypeBadge({ type }: { type: (typeof invoices)[number]["type"] }) {
  return <span className={cn("w-fit rounded-[5px] border px-2 py-1 text-[10px] font-bold", type === "Fee" ? "border-amber-400/25 bg-amber-500/10 text-amber-300" : "border-emerald-400/25 bg-emerald-500/10 text-emerald-400")}>{type}</span>
}

function Status({ status }: { status: InvoiceStatus }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold", statusStyles[status])}><span className="size-1.5 rounded-full bg-current" />{status}</span>
}

function PdfButton() {
  return <button type="button" title="Download PDF" aria-label="Download PDF" className="inline-flex h-7 cursor-pointer items-center gap-1 rounded-[6px] border border-white/12 bg-white/8 px-2 text-[10px] font-bold text-white/75 transition hover:bg-white/12 hover:text-white"><FileText className="size-3.5" />PDF</button>
}
