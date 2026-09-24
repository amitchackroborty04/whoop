"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  CircleHelp,
  HandCoins,
  Inbox,
  Megaphone,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const navItems = [
  { value: "campaign", label: "Campaign", href: "/", icon: Megaphone },
  {
    value: "submissions",
    label: "Submissions",
    href: "/submissions",
    icon: Inbox,
  },
  {
    value: "analytics",
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  { value: "finance", label: "Finance", href: "/finance", icon: WalletCards },
  { value: "creators", label: "Creators", href: "/creators", icon: Users },
  { value: "payouts", label: "Payouts", href: "/payouts", icon: HandCoins },
] as const;

function getActiveValue(pathname: string) {
  if (pathname.startsWith("/creators")) return "creators";
  if (pathname.startsWith("/submissions")) return "submissions";
  if (pathname.startsWith("/analytics")) return "analytics";
  if (pathname.startsWith("/finance")) return "finance";
  if (pathname.startsWith("/payouts")) return "payouts";

  return "campaign";
}

export function WebTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const activeValue = getActiveValue(pathname);

  return (
    <Tabs
      value={activeValue}
      onValueChange={(value) => {
        const item = navItems.find((navItem) => navItem.value === value);

        if (item) {
          router.push(item.href);
        }
      }}
      className="w-full items-center"
    >
      <div className="h-17 max-w-full rounded-[16px] bg-[radial-gradient(121.25%_121.25%_at_110%_121.25%,rgba(255,255,255,0.8)_34.71%,rgba(255,255,255,0)_54.43%,rgba(255,255,255,0)_71.13%,rgba(255,255,255,0.8)_90.77%)] p-px">
        <TabsList className="h-full! max-w-full gap-2 overflow-x-auto rounded-[15px] bg-[#0F0F0F] p-2 text-white/60">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className={cn(
                  "h-[50px] min-w-max rounded-[12px] border-0 bg-[#181818] px-4 text-[13px] font-semibold text-[#9D9DA5] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]",
                  "data-active:bg-[linear-gradient(90deg,#1FAF5A_0%,#21BA63_50%,#48E08D_100%)] data-active:text-white dark:data-active:bg-[linear-gradient(90deg,#1FAF5A_0%,#21BA63_50%,#48E08D_100%)]",
                  "hover:bg-[#202020] hover:text-white focus-visible:ring-emerald-400/40",
                )}
              >
                <Icon className="size-5" />
                <span>{item.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>
    </Tabs>
  );
}

export function AccountAvatar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open profile menu"
        className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border-2 border-emerald-300 bg-[linear-gradient(135deg,#28e08c,#f16b86_48%,#161722_50%,#6ed6ff)] text-sm font-black text-white shadow-[0_0_0_4px_rgba(255,255,255,0.05)] outline-none transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-emerald-300/60 data-popup-open:ring-2 data-popup-open:ring-emerald-300/40"
      >
        AM
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-[312px] max-w-[calc(100vw-2rem)] rounded-[20px] border border-white/10 bg-[#191A1E] p-2.5 text-white shadow-[0_24px_60px_rgba(0,0,0,0.48)] ring-0"
      >
        <div className="flex items-center gap-3 px-2.5 py-3">
          <div className="size-12 shrink-0 rounded-full bg-[#174E3C]" aria-hidden="true" />
          <div className="min-w-0">
            <p className="truncate text-[18px] font-bold leading-tight text-[#F4F4F5]">nadim</p>
            <p className="mt-1 truncate text-[16px] leading-none text-[#A8A8B3]">@nadimm</p>
          </div>
        </div>

        <DropdownMenuSeparator className="mx-0 my-1 bg-white/10" />

        <DropdownMenuItem className="h-13 cursor-pointer gap-4 rounded-[10px] px-3 text-[18px] font-medium !text-[#F4F4F5] hover:!bg-white/[0.05] focus:!bg-[#191A1E] focus:!text-white focus-visible:ring-1 focus-visible:ring-white/15 [&_span]:!text-[#F4F4F5] [&_svg]:!text-[#AEB3BD]">
          <Sparkles className="size-6" />
          <span>Community</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="h-13 cursor-pointer gap-4 rounded-[10px] px-3 text-[18px] font-medium !text-[#F4F4F5] hover:!bg-white/[0.05] focus:!bg-[#191A1E] focus:!text-white focus-visible:ring-1 focus-visible:ring-white/15 [&_span]:!text-[#F4F4F5] [&_svg]:!text-[#AEB3BD]">
          <CircleHelp className="size-6" />
          <span>Help</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
