"use client";

import { cn } from "@/lib/utils";

interface SentinelLogoProps {
  className?: string;
  collapsed?: boolean;
}

export function SentinelLogo({ className, collapsed = false }: SentinelLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M2 16C2 16 8 6 16 6C24 6 30 16 30 16C30 16 24 26 16 26C8 26 2 16 2 16Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        />
        <circle
          cx="16"
          cy="16"
          r="5"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary"
        />
        <line
          x1="16"
          y1="11"
          x2="16"
          y2="21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-primary"
        />
        <line
          x1="11"
          y1="16"
          x2="21"
          y2="16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-primary"
        />
        <line
          x1="16"
          y1="2"
          x2="16"
          y2="6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-muted-foreground/40"
        />
        <line
          x1="16"
          y1="26"
          x2="16"
          y2="30"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-muted-foreground/40"
        />
      </svg>
      {!collapsed && (
        <span className="text-base font-semibold tracking-tight text-foreground">
          Sentinel
        </span>
      )}
    </div>
  );
}
