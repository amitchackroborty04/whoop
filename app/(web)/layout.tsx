import type { ReactNode } from "react"

import { AccountAvatar, WebTabs } from "./_components/web-tabs"

export default function WebLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#0F0F0F]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[url('/bg.png')] bg-cover bg-top bg-no-repeat opacity-20"
      />
      <div className="relative z-10 py-5">
        <header className="grid grid-cols-[1fr_auto] items-start gap-4 lg:grid-cols-[1fr_auto_1fr]">
          <div className="hidden lg:block" />
          <div className="min-w-0 overflow-hidden">
            <WebTabs />
          </div>
          <div className="flex justify-end">
            <AccountAvatar />
          </div>
        </header>
        <main >{children}</main>
      </div>
    </div>
  )
}
