"use client"

import { useEffect, useRef, useState } from "react"
import { Ban, DollarSign, Flag, Mail, MoreHorizontal, Search, UserRound } from "lucide-react"
import { FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

type Creator = {
  rank: number
  name: string
  joined: string
  avatar: string
  avatarClass: string
  earnings: string
  views: string
  engagement: string
  trust: number
  sentiment: number
  flagged?: boolean
}

type ActionMenuState = {
  creatorName: string
  left: number
  top: number
}

const creators: Creator[] = [
  { rank: 1, name: "xKaizen", joined: "Joined Oct 26", avatar: "X", avatarClass: "bg-amber-500", earnings: "$24,815.67", views: "680.4K", engagement: "4.8%", trust: 85, sentiment: 78 },
  { rank: 2, name: "Cryptoclipz", joined: "Joined Nov 25", avatar: "C", avatarClass: "bg-red-500", earnings: "$18,090.32", views: "520.1K", engagement: "3.9%", trust: 79, sentiment: 72 },
  { rank: 3, name: "ViralVince", joined: "Joined Jan 26", avatar: "V", avatarClass: "bg-violet-500", earnings: "$25,450.67", views: "750.3K", engagement: "4.1%", trust: 86, sentiment: 75 },
  { rank: 5, name: "GamingGrace", joined: "Joined Mar 26", avatar: "G", avatarClass: "bg-emerald-500", earnings: "$15,340.78", views: "450.2K", engagement: "3.5%", trust: 80, sentiment: 78, flagged: true },
  { rank: 6, name: "BetBoss", joined: "Joined Apr 26", avatar: "B", avatarClass: "bg-pink-500", earnings: "$28,432.12", views: "800.5K", engagement: "3.1%", trust: 70, sentiment: 80 },
  { rank: 7, name: "ClipKingJr", joined: "Joined May 26", avatar: "C", avatarClass: "bg-sky-500", earnings: "$19,876.00", views: "530.7K", engagement: "2.4%", trust: 90, sentiment: 77 },
  { rank: 8, name: "NeonEdits", joined: "Joined Jun 26", avatar: "N", avatarClass: "bg-purple-500", earnings: "$24,760.99", views: "670.9K", engagement: "3.0%", trust: 82, sentiment: 74 },
  { rank: 9, name: "ReelMaster", joined: "Joined Jul 26", avatar: "R", avatarClass: "bg-green-500", earnings: "$30,052.45", views: "900.4K", engagement: "2.6%", trust: 68, sentiment: 81 },
  ...Array.from({ length: 6 }, () => ({ rank: 10, name: "WealthWave", joined: "Joined Aug 26", avatar: "W", avatarClass: "bg-amber-600", earnings: "$26,485.33", views: "750.6K", engagement: "3.3%", trust: 77, sentiment: 73 })),
  { rank: 11, name: "StableAssets", joined: "Joined Sep 26", avatar: "S", avatarClass: "bg-indigo-500", earnings: "$23,548.08", views: "620.8K", engagement: "2.7%", trust: 72, sentiment: 79 },
]

function trustScoreTone(score: number) {
  if (score >= 80) return { ring: "#16C979", text: "text-emerald-400" }
  if (score >= 70) return { ring: "#FFB23F", text: "text-amber-400" }
  return { ring: "#FB7185", text: "text-rose-400" }
}

function TrustScore({ score }: { score: number }) {
  const value = Math.min(100, Math.max(0, score))
  const tone = trustScoreTone(value)

  return (
    <div
      role="progressbar"
      aria-label={`Trust score ${value} out of 100`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      className="grid size-10 place-items-center rounded-full"
      style={{
        background: `conic-gradient(${tone.ring} ${value * 3.6}deg, #343434 0deg)`,
      }}
    >
      <span
        className={cn(
          "grid size-[30px] place-items-center rounded-full bg-[#1A1A1A] text-[14px] font-black",
          tone.text,
        )}
      >
        {value}
      </span>
    </div>
  )
}

function sentimentTone(score: number) {
  if (score >= 78) return "bg-emerald-500/12 text-emerald-300"
  if (score >= 74) return "bg-amber-500/12 text-amber-300"
  return "bg-rose-500/12 text-rose-300"
}

function PlatformIcons() {
  return (
    <div
      className="flex items-center gap-3 text-white/90"
      aria-label="TikTok, Instagram, YouTube and X"
    >
      <FaTiktok className="size-5" aria-hidden="true" />
      <FaInstagram className="size-[22px]" aria-hidden="true" />
      <FaYoutube className="size-[22px]" aria-hidden="true" />
      <FaXTwitter className="size-5" aria-hidden="true" />
    </div>
  )
}

const actionItems = [
  { label: "View profile", icon: UserRound, className: "text-white" },
  { label: "View payouts", icon: DollarSign, className: "text-white" },
  { label: "Message creator", icon: Mail, className: "text-white" },
  { label: "Flag creator", icon: Flag, className: "text-[#FF9D2F]", separated: true },
  { label: "Ban creator", icon: Ban, className: "text-[#FF4545]" },
]

export function CreatorsTable() {
  const [actionMenu, setActionMenu] = useState<ActionMenuState | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!actionMenu) return

    function closeOnOutsideClick(event: MouseEvent) {
      const target = event.target as Node

      if (menuRef.current?.contains(target) || triggerRef.current?.contains(target)) {
        return
      }

      setActionMenu(null)
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActionMenu(null)
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick)
    document.addEventListener("keydown", closeOnEscape)

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [actionMenu])

  function toggleActionMenu(creatorName: string, button: HTMLButtonElement) {
    if (actionMenu?.creatorName === creatorName) {
      setActionMenu(null)
      return
    }

    const menuWidth = Math.min(336, window.innerWidth - 24)
    const gap = 10
    const margin = 12
    const rect = button.getBoundingClientRect()
    const left = Math.max(
      margin,
      Math.min(window.innerWidth - menuWidth - margin, rect.right - menuWidth),
    )

    triggerRef.current = button
    setActionMenu({
      creatorName,
      left,
      top: rect.bottom + gap,
    })
  }

  return (
    <div className="overflow-hidden rounded-[14px] border-2 border-[#FFFFFF14] bg-[#FFFFFF0D]! ">
      <Table className="min-w-[980px] text-[14px]">
        <TableHeader>
          <TableRow className="border-white/8 bg-[linear-gradient(90deg,rgba(36,88,56,0.28),rgba(36,37,55,0.34))] hover:bg-transparent">
            <TableHead className="w-12 px-5 text-[14px] uppercase tracking-[0.08em] text-[#8B8B96]">#</TableHead>
            <TableHead className="min-w-64 text-[14px] uppercase tracking-[0.08em] text-[#8B8B96]">Creator</TableHead>
            <TableHead className="text-[14px] uppercase tracking-[0.08em] text-[#8B8B96]">Platforms</TableHead>
            <TableHead className="text-[14px] uppercase tracking-[0.08em] text-[#8B8B96]">Earned - You</TableHead>
            <TableHead className="text-[14px] uppercase tracking-[0.08em] text-[#8B8B96]">Views</TableHead>
            <TableHead className="text-[14px] uppercase tracking-[0.08em] text-[#8B8B96]">Eng. Rate</TableHead>
            <TableHead className="text-[14px] uppercase tracking-[0.08em] text-[#8B8B96]">Trust Score</TableHead>
            <TableHead className="text-[14px] uppercase tracking-[0.08em] text-[#8B8B96]">Sentiment</TableHead>
            <TableHead className="text-right text-[14px] uppercase tracking-[0.08em] text-[#8B8B96]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {creators.map((creator, index) => (
            <TableRow
              key={`${creator.name}-${index}`}
              className="border-white/7 bg-[linear-gradient(90deg,rgba(22,70,40,0.34),rgba(26,25,43,0.5))] text-white/80 hover:bg-white/5"
            >
              <TableCell className="px-5 text-white/38">{creator.rank}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className={cn("grid size-8 place-items-center rounded-full text-[14px] font-bold text-white", creator.avatarClass)}>
                    {creator.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[16px] font-bold text-white">{creator.name}</p>
                      {creator.flagged ? (
                        <span className="rounded-[4px] bg-amber-400/18 px-1.5 py-0.5 text-[14px] font-black uppercase text-amber-300">
                          Flagged
                        </span>
                      ) : null}
                    </div>
                    <p className="text-[14px] font-medium text-white/38">{creator.joined}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell><PlatformIcons /></TableCell>
              <TableCell className="font-bold text-white">{creator.earnings}</TableCell>
              <TableCell className="text-white/48">{creator.views}</TableCell>
              <TableCell className="font-semibold text-white">{creator.engagement}</TableCell>
              <TableCell>
                <TrustScore score={creator.trust} />
              </TableCell>
              <TableCell>
                <span className={cn("rounded-full px-3 py-1 text-[14px] font-black", sentimentTone(creator.sentiment))}>
                  {creator.sentiment}%
                </span>
              </TableCell>
              <TableCell className="text-right">
                <button
                  type="button"
                  aria-label={`Open actions for ${creator.name}`}
                  aria-haspopup="menu"
                  aria-expanded={actionMenu?.creatorName === creator.name}
                  onClick={(event) => toggleActionMenu(creator.name, event.currentTarget)}
                  className="inline-grid size-8 cursor-pointer place-items-center rounded-[8px] border border-white/10 bg-white/5 text-white/48 transition hover:border-emerald-400/50 hover:text-white aria-expanded:border-emerald-400/50 aria-expanded:text-white"
                >
                  <MoreHorizontal className="size-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {actionMenu ? (
        <div
          ref={menuRef}
          role="menu"
          aria-label={`Quick actions for ${actionMenu.creatorName}`}
          className="fixed z-50 w-[336px] max-w-[calc(100vw-24px)] rounded-[15px] border border-white/8 bg-[#17171F] px-[22px] py-[18px] text-left shadow-[0_22px_60px_rgba(0,0,0,0.42)]"
          style={{ left: actionMenu.left, top: actionMenu.top }}
        >
          <p className="px-0.5 text-[13px] font-black uppercase tracking-[0.12em] text-[#8E8E9A]">
            Quick Actions
          </p>
          <div className="mt-4 space-y-1">
            {actionItems.map((item) => {
              const Icon = item.icon

              return (
                <div key={item.label}>
                  {item.separated ? <div className="my-4 h-px bg-white/10" /> : null}
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => setActionMenu(null)}
                    className={cn(
                      "flex h-[52px] w-full cursor-pointer items-center gap-5 rounded-[8px] px-1 text-[18px] font-bold transition hover:bg-white/7 focus-visible:bg-white/7 focus-visible:outline-none",
                      item.className,
                    )}
                  >
                    <Icon className="size-[22px] shrink-0 stroke-[2.4]" aria-hidden="true" />
                    <span>{item.label}</span>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function CreatorsToolbar() {
  const filters = [["All", "18"], ["Top", "5"], ["Rising", "6"], ["Inactive", "5"], ["Flagged", "3"], ["Blocked", "3"]]

  return (
    <div className="flex flex-col mt-5 gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex max-w-full gap-1 overflow-x-auto rounded-[10px] bg-[#0B0B0E] p-1">
        {filters.map(([label, count], index) => (
          <button
            key={label}
            type="button"
            className={cn(
              "flex h-8 min-w-max items-center gap-2 rounded-[8px] px-4 text-[13px] font-bold transition",
              index === 0 ? "bg-[#23C56C29] text-[#23C56C]" : "text-[#8B8B96] hover:bg-white/7 hover:text-white"
            )}
          >
            {label}
            <span className={cn("rounded-full px-1.5 py-0.5 text-[12px]", index === 0 ? "bg-emerald-500/20 text-emerald-200" : "bg-white/8 text-white/50")}>
              {count}
            </span>
          </button>
        ))}
      </div>
      <label className="relative block w-full md:w-[280px]">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/45" />
        <input
          type="search"
          placeholder="Search Users"
          className="h-10 w-full rounded-[9px] border border-white/12 bg-white/7 pl-11 pr-4 text-[12px] font-medium text-white outline-none transition placeholder:text-white/38 focus:border-emerald-400/55 focus:ring-3 focus:ring-emerald-400/15"
        />
      </label>
    </div>
  )
}
