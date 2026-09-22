import { CircleDollarSign } from "lucide-react"

import { CreatorsTable, CreatorsToolbar } from "./_components/creators-table"

export default function CreatorsPage() {
  return (
    <section className="space-y-5 mt-10 container mx-auto">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-[28px] font-black text-white sm:text-[32px]">
          Creators
        </h1>
        <span className="rounded-full bg-white/7 px-2 py-1 text-[11px] font-bold text-white/42">
          18
        </span>
        <span className="inline-flex items-center gap-1 border border-[#23C56C3D] rounded-full bg-[#23C56C1A] px-3 py-1 text-[12px] font-bold text-[#23C56C]">
          <CircleDollarSign className="size-3" />
          Earnings shown are from your agency&apos;s campaigns only
        </span>
      </div>
      <CreatorsToolbar />
      <CreatorsTable />
    </section>
  )
}
