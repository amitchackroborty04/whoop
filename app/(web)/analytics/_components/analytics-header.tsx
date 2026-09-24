"use client";

import { Check, ChevronDown, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const campaigns = ["Campaign 1", "Campaign 2", "Campaign 3"];
const platforms = ["All platforms", "Instagram", "TikTok", "YouTube", "X"];
const dateRanges = ["Mar 28 - May 23", "Last 30 days", "Last 7 days"];

type MenuName = "campaign" | "platform" | "date";

export function AnalyticsHeader() {
  const controlsRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<MenuName | null>(null);
  const [campaign, setCampaign] = useState(campaigns[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [dateRange, setDateRange] = useState(dateRanges[0]);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    function closeMenus(event: PointerEvent) {
      if (!controlsRef.current?.contains(event.target as Node)) setOpenMenu(null);
    }

    window.addEventListener("pointerdown", closeMenus);
    return () => window.removeEventListener("pointerdown", closeMenus);
  }, []);

  async function shareAnalytics() {
    const shareData = {
      title: "Campaign analytics",
      text: `${campaign} · ${platform} · ${dateRange}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
      setShared(true);
      window.setTimeout(() => setShared(false), 1800);
    } catch {
      // Closing the native share sheet should leave the dashboard unchanged.
    }
  }

  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 className="text-[28px] font-black leading-none text-white sm:text-[32px]">
          Analytics
        </h1>
        <p className="mt-2 text-[12px] font-semibold text-white/40">
          {dateRange === dateRanges[0] ? `${dateRange}, 2026` : dateRange}
        </p>
      </div>

      <div ref={controlsRef} className="grid grid-cols-2 gap-2 sm:flex">
        <FilterMenu
          label={campaign}
          items={campaigns}
          isOpen={openMenu === "campaign"}
          onToggle={() => setOpenMenu(openMenu === "campaign" ? null : "campaign")}
          onSelect={(item) => {
            setCampaign(item);
            setOpenMenu(null);
          }}
        />
        <FilterMenu
          label={platform}
          items={platforms}
          isOpen={openMenu === "platform"}
          accent
          onToggle={() => setOpenMenu(openMenu === "platform" ? null : "platform")}
          onSelect={(item) => {
            setPlatform(item);
            setOpenMenu(null);
          }}
        />
        <FilterMenu
          label={dateRange}
          items={dateRanges}
          isOpen={openMenu === "date"}
          onToggle={() => setOpenMenu(openMenu === "date" ? null : "date")}
          onSelect={(item) => {
            setDateRange(item);
            setOpenMenu(null);
          }}
        />
        <button
          type="button"
          onClick={shareAnalytics}
          className="flex h-10 items-center justify-center gap-1.5 rounded-[9px] border border-white/10 bg-white/[0.04] px-3 text-[11px] font-black text-white transition-colors hover:bg-white/[0.08]"
        >
          {shared ? <Check className="size-3.5 text-emerald-400" /> : <Share2 className="size-3.5" />}
          {shared ? "Copied" : "Share"}
        </button>
      </div>
    </header>
  );
}

function FilterMenu({
  label,
  items,
  isOpen,
  accent = false,
  onToggle,
  onSelect,
}: {
  label: string;
  items: string[];
  isOpen: boolean;
  accent?: boolean;
  onToggle: () => void;
  onSelect: (item: string) => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className={cn(
          "flex h-10 w-full min-w-0 items-center justify-center gap-1 rounded-[9px] border px-3 text-[11px] font-black transition-colors",
          accent
            ? "border-emerald-400/15 bg-emerald-500/12 text-emerald-400 hover:bg-emerald-500/20"
            : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08]",
        )}
      >
        <span className="max-w-[110px] truncate">{label}</span>
        <ChevronDown className={cn("size-3.5 shrink-0 opacity-60 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-12 z-50 min-w-full overflow-hidden rounded-[9px] border border-white/15 bg-[#191a1f] p-1 shadow-[0_18px_44px_rgba(0,0,0,0.45)]">
          {items.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              className={cn(
                "block w-full whitespace-nowrap rounded-[6px] px-3 py-2 text-left text-[11px] font-bold transition-colors hover:bg-white/[0.07]",
                item === label ? "text-emerald-400" : "text-white/70",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
