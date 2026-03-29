"use client"

import { 
  Home, 
  Cloud, 
  Users, 
  Calendar, 
  FolderOpen, 
  BookOpen, 
  Share2, 
  Mail, 
  Trophy,
  Terminal,
  Settings,
  Power,
  Search
} from "lucide-react"

type AppId = "home" | "about" | "team" | "events" | "projects" | "resources" | "social" | "contact" | "achievements" | "terminal"

interface StartMenuProps {
  onAppClick: (appId: AppId) => void
  onClose: () => void
}

const apps = [
  { id: "home" as AppId, name: "Home", icon: Home, color: "bg-primary" },
  { id: "about" as AppId, name: "About Us", icon: Cloud, color: "bg-secondary" },
  { id: "team" as AppId, name: "Team", icon: Users, color: "bg-chart-3" },
  { id: "events" as AppId, name: "Events", icon: Calendar, color: "bg-chart-4" },
  { id: "projects" as AppId, name: "Projects", icon: FolderOpen, color: "bg-chart-5" },
  { id: "resources" as AppId, name: "Resources", icon: BookOpen, color: "bg-primary" },
  { id: "social" as AppId, name: "Social", icon: Share2, color: "bg-secondary" },
  { id: "contact" as AppId, name: "Contact", icon: Mail, color: "bg-chart-3" },
  { id: "achievements" as AppId, name: "Achievements", icon: Trophy, color: "bg-chart-4" },
  { id: "terminal" as AppId, name: "Terminal", icon: Terminal, color: "bg-foreground" },
]

export function StartMenu({ onAppClick, onClose }: StartMenuProps) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div
        className="window-shadow absolute bottom-16 left-2 z-50 w-80 overflow-hidden rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-200"
        style={{
          background: "rgba(248, 248, 255, 0.95)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          border: "1px solid rgba(91, 79, 232, 0.15)",
          boxShadow: "0 20px 60px -10px rgba(91, 79, 232, 0.25), 0 0 0 1px rgba(255,255,255,0.8) inset",
        }}
      >
        
        {/* Header — branded gradient */}
        <div
          className="flex items-center gap-3 px-4 py-4"
          style={{ background: "linear-gradient(135deg, #5B4FE8, #7C6FFF)" }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <Cloud className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">AWS Cloud Club</p>
            <p className="text-xs text-white/70">NMIET Chapter</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/70">Online</span>
          </div>
        </div>

        <div className="p-4">
          {/* Search */}
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-background/70 px-3 py-2 border border-border/50">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search applications..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* Apps Grid */}
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Applications</p>
          <div className="mb-4 grid grid-cols-5 gap-1">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  onAppClick(app.id)
                  onClose()
                }}
                className="group flex flex-col items-center gap-1 rounded-xl p-2 transition-all hover:bg-primary/8"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${app.color} text-white shadow-sm transition-transform group-hover:scale-110 group-hover:shadow-md`}>
                  <app.icon className="h-5 w-5" />
                </div>
                <span className="text-[9px] text-muted-foreground group-hover:text-primary leading-tight text-center">
                  {app.name}
                </span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="mb-3 h-px bg-border/60" />

          {/* Quick Actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">
                <Settings className="h-4 w-4" />
              </button>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-1.5 text-sm text-destructive transition-all hover:bg-destructive/20">
              <Power className="h-4 w-4" />
              <span>Shutdown</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
