import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function AnalyticsPanel({
  children,
  className,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "green" | "violet";
}) {
  return (
    <div
      className={cn(
        "rounded-[14px] border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_44px_rgba(0,0,0,0.26)]",
        tone === "default" &&
          "bg-[linear-gradient(145deg,rgba(25,25,27,0.9),rgba(15,15,17,0.86))]",
        tone === "green" &&
          "bg-[linear-gradient(135deg,rgba(20,40,31,0.93),rgba(24,31,28,0.9))]",
        tone === "violet" &&
          "bg-[linear-gradient(135deg,rgba(24,23,31,0.94),rgba(25,22,35,0.9))]",
        className,
      )}
    >
      {children}
    </div>
  );
}
