import { CircleDollarSign } from "lucide-react"

import { CreatorsTable, CreatorsToolbar } from "./creators/_components/creators-table"

export default function HomePage() {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-[28px] font-black text-white sm:text-[32px]">
          Campaign
        </h1>
        <span className="rounded-full bg-white/7 px-2 py-1 text-[11px] font-bold text-white/42">
          18
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/14 px-3 py-1 text-[10px] font-bold text-emerald-300">
          <CircleDollarSign className="size-3" />
          Earnings shown are from your agency&apos;s campaigns only
        </span>
      </div>
      <CreatorsToolbar />
      <CreatorsTable />
    </section>
  )
}
