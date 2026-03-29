"use client"

import { useState, useEffect } from "react"
import { 
  Cloud, 
  Bell, 
  Wifi, 
  Volume2, 
  Battery, 
  Search,
  Home,
  Users,
  Calendar,
  FolderOpen,
  BookOpen,
  Share2,
  Mail,
  Trophy,
  Terminal
} from "lucide-react"

type AppId = "home" | "about" | "team" | "events" | "projects" | "resources" | "social" | "contact" | "achievements" | "terminal"

interface TaskbarProps {
  openApps: AppId[]
  activeApp: AppId | null
  onAppClick: (appId: AppId) => void
  onStartClick: () => void
}

const taskbarApps: { id: AppId; icon: React.ReactNode; label: string }[] = [
  { id: "home", icon: <Home className="h-5 w-5" />, label: "Home" },
  { id: "about", icon: <Cloud className="h-5 w-5" />, label: "About" },
  { id: "team", icon: <Users className="h-5 w-5" />, label: "Team" },
  { id: "events", icon: <Calendar className="h-5 w-5" />, label: "Events" },
  { id: "projects", icon: <FolderOpen className="h-5 w-5" />, label: "Projects" },
  { id: "resources", icon: <BookOpen className="h-5 w-5" />, label: "Resources" },
  { id: "social", icon: <Share2 className="h-5 w-5" />, label: "Social" },
  { id: "contact", icon: <Mail className="h-5 w-5" />, label: "Contact" },
  { id: "achievements", icon: <Trophy className="h-5 w-5" />, label: "Achievements" },
  { id: "terminal", icon: <Terminal className="h-5 w-5" />, label: "Terminal" },
]

export function Taskbar({ openApps, activeApp, onAppClick, onStartClick }: TaskbarProps) {
  const [time, setTime] = useState<Date | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)

  // Only set time on client to avoid hydration mismatch
  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="taskbar-shadow glass fixed bottom-0 left-0 right-0 z-40 flex h-14 items-center justify-between px-2">
      {/* Start Button — indigo gradient */}
      <button
        onClick={onStartClick}
        className="icon-hover flex h-10 items-center gap-2 rounded-lg px-4 text-white font-semibold transition-all hover:shadow-lg hover:shadow-primary/30"
        style={{ background: "linear-gradient(135deg, #5B4FE8, #7C6FFF)" }}
      >
        <Cloud className="h-5 w-5" />
        <span className="hidden sm:inline">Start</span>
      </button>

      {/* Search Bar */}
      <div className="mx-2 hidden items-center gap-2 rounded-lg bg-background/50 px-3 py-2 md:flex border border-border/50">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search apps..."
          className="w-32 bg-transparent text-sm outline-none placeholder:text-muted-foreground lg:w-48"
        />
      </div>

      {/* Open Apps */}
      <div className="flex flex-1 items-center justify-center gap-1 overflow-x-auto px-2">
        {taskbarApps.map((app) => {
          const isOpen = openApps.includes(app.id)
          const isActive = activeApp === app.id

          return (
            <button
              key={app.id}
              onClick={() => onAppClick(app.id)}
              className={`icon-hover relative flex h-10 min-w-10 items-center justify-center rounded-lg px-3 transition-all ${
                isActive
                  ? "text-primary"
                  : isOpen
                  ? "bg-background/50 text-foreground hover:bg-background/70"
                  : "text-muted-foreground hover:bg-background/30 hover:text-foreground"
              }`}
              style={isActive ? { background: "rgba(91,79,232,0.12)" } : {}}
              title={app.label}
            >
              {app.icon}
              <span className="ml-2 hidden text-sm lg:inline">{app.label}</span>
              {/* Active/open indicator dot */}
              {isOpen && (
                <div
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full transition-all ${
                    isActive ? "h-1 w-5" : "h-0.5 w-2.5"
                  }`}
                  style={{
                    background: isActive ? "#5B4FE8" : "rgba(91,79,232,0.4)",
                    boxShadow: isActive ? "0 0 6px rgba(91,79,232,0.7)" : "none",
                  }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-1">
        {/* Notifications */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="icon-hover relative flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-background/30 hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full animate-pulse" style={{ background: "#5B4FE8" }} />
        </button>

        {/* System Icons */}
        <div className="hidden items-center gap-2 rounded-lg bg-background/30 px-3 py-2 sm:flex">
          <Wifi className="h-4 w-4 text-muted-foreground" />
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Battery className="h-4 w-4 text-muted-foreground" />
        </div>

        {/* Time & Date */}
        <div className="flex flex-col items-end rounded-lg px-3 py-1 text-right hover:bg-background/30">
          <span className="text-sm font-medium text-foreground">
            {time ? time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--"}
          </span>
          <span className="text-xs text-muted-foreground">
            {time ? time.toLocaleDateString([], { month: "short", day: "numeric" }) : "---"}
          </span>
        </div>
      </div>

      {/* Notification Panel */}
      {showNotifications && (
        <div className="window-shadow glass absolute bottom-16 right-4 w-80 rounded-xl p-4">
          <h3 className="mb-3 font-semibold text-foreground">Notifications</h3>
          <div className="space-y-2">
            <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
              <p className="text-sm font-medium text-foreground">Welcome to AWS Cloud Club NMIET!</p>
              <p className="text-xs text-muted-foreground">Explore our cloud-powered workspace</p>
            </div>
            <div className="rounded-lg bg-background/50 p-3">
              <p className="text-sm font-medium text-foreground">Upcoming: Cloud Workshop</p>
              <p className="text-xs text-muted-foreground">Check out our events section</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
