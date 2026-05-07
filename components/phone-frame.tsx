"use client"

import { cn } from "@/lib/utils"

export function PhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div
        className={cn(
          "relative mx-auto flex h-[700px] w-full max-w-[430px] flex-col overflow-hidden rounded-[2.5rem] border-[8px] border-foreground/10 bg-background shadow-2xl",
          className
        )}
      >
        {/* Status bar */}
        <div className="shrink-0 flex items-center justify-between bg-background px-6 pb-1 pt-3">
          <span className="text-xs font-medium text-foreground">9:41</span>
          <div className="flex items-center gap-1.5">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" className="text-foreground">
              <rect x="0" y="4" width="3" height="8" rx="1" opacity="0.3" />
              <rect x="4.5" y="3" width="3" height="9" rx="1" opacity="0.5" />
              <rect x="9" y="1" width="3" height="11" rx="1" opacity="0.7" />
              <rect x="13.5" y="0" width="3" height="12" rx="1" />
            </svg>
            <svg width="15" height="12" viewBox="0 0 15 12" fill="currentColor" className="text-foreground">
              <path d="M7.5 3.6C9.3 3.6 10.9 4.3 12.1 5.4L13.5 4C11.9 2.5 9.8 1.6 7.5 1.6C5.2 1.6 3.1 2.5 1.5 4L2.9 5.4C4.1 4.3 5.7 3.6 7.5 3.6Z" opacity="0.5"/>
              <path d="M7.5 6.8C8.7 6.8 9.8 7.3 10.6 8L12 6.6C10.8 5.5 9.2 4.8 7.5 4.8C5.8 4.8 4.2 5.5 3 6.6L4.4 8C5.2 7.3 6.3 6.8 7.5 6.8Z" opacity="0.75"/>
              <circle cx="7.5" cy="10.5" r="1.5"/>
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor" className="text-foreground">
              <rect x="0" y="1" width="21" height="10" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/>
              <rect x="22" y="4" width="2" height="4" rx="0.5" opacity="0.4"/>
              <rect x="1.5" y="2.5" width="16" height="7" rx="1" fill="currentColor"/>
            </svg>
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
