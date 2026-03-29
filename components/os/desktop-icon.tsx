"use client"

import type { ReactNode } from "react"

interface DesktopIconProps {
  icon: ReactNode
  label: string
  onClick: () => void
  color?: string
}

export function DesktopIcon({ icon, label, onClick, color = "bg-primary" }: DesktopIconProps) {
  return (
    <button
      onClick={onClick}
      onDoubleClick={onClick}
      className="icon-hover group flex w-20 flex-col items-center gap-2 rounded-xl p-2 transition-all hover:bg-white/20"
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-xl ${color} text-white shadow-lg transition-all duration-200 group-hover:scale-108 group-hover:shadow-xl`}
        style={{
          boxShadow: "0 4px 15px rgba(91,79,232,0.25)",
        }}
      >
        {icon}
      </div>
      <span className="max-w-full truncate rounded-md px-1.5 py-0.5 text-center text-xs font-medium text-foreground drop-shadow-sm backdrop-blur-sm group-hover:text-primary">
        {label}
      </span>
    </button>
  )
}
