"use client"

import { useState, useCallback } from "react"
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
  Sparkles
} from "lucide-react"
import { Window } from "./window"
import { Taskbar } from "./taskbar"
import { DesktopIcon } from "./desktop-icon"
import { StartMenu } from "./start-menu"
import { HomeApp } from "../apps/home-app"
import { AboutApp } from "../apps/about-app"
import { TeamApp } from "../apps/team-app"
import { EventsApp } from "../apps/events-app"
import { ProjectsApp } from "../apps/projects-app"
import { ResourcesApp } from "../apps/resources-app"
import { SocialApp } from "../apps/social-app"
import { ContactApp } from "../apps/contact-app"
import { AchievementsApp } from "../apps/achievements-app"
import { TerminalApp } from "../apps/terminal-app"

type AppId = "home" | "about" | "team" | "events" | "projects" | "resources" | "social" | "contact" | "achievements" | "terminal"

interface WindowState {
  id: AppId
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
}

const desktopApps = [
  { id: "home" as AppId, label: "Home", icon: <Home className="h-6 w-6" />, color: "bg-primary" },
  { id: "about" as AppId, label: "About Us", icon: <Cloud className="h-6 w-6" />, color: "bg-secondary" },
  { id: "team" as AppId, label: "Team", icon: <Users className="h-6 w-6" />, color: "bg-chart-3" },
  { id: "events" as AppId, label: "Events", icon: <Calendar className="h-6 w-6" />, color: "bg-chart-4" },
  { id: "projects" as AppId, label: "Projects", icon: <FolderOpen className="h-6 w-6" />, color: "bg-chart-5" },
  { id: "resources" as AppId, label: "Resources", icon: <BookOpen className="h-6 w-6" />, color: "bg-primary" },
  { id: "social" as AppId, label: "Social", icon: <Share2 className="h-6 w-6" />, color: "bg-secondary" },
  { id: "contact" as AppId, label: "Contact", icon: <Mail className="h-6 w-6" />, color: "bg-chart-3" },
  { id: "achievements" as AppId, label: "Achievements", icon: <Trophy className="h-6 w-6" />, color: "bg-chart-4" },
  { id: "terminal" as AppId, label: "Terminal", icon: <Terminal className="h-6 w-6" />, color: "bg-foreground" },
]

const appTitles: Record<AppId, string> = {
  home: "Home",
  about: "About Us",
  team: "Team",
  events: "Events",
  projects: "Projects",
  resources: "Resources",
  social: "Social Media",
  contact: "Contact Us",
  achievements: "Achievements",
  terminal: "Terminal",
}

const appIcons: Record<AppId, React.ReactNode> = {
  home: <Home className="h-4 w-4" />,
  about: <Cloud className="h-4 w-4" />,
  team: <Users className="h-4 w-4" />,
  events: <Calendar className="h-4 w-4" />,
  projects: <FolderOpen className="h-4 w-4" />,
  resources: <BookOpen className="h-4 w-4" />,
  social: <Share2 className="h-4 w-4" />,
  contact: <Mail className="h-4 w-4" />,
  achievements: <Trophy className="h-4 w-4" />,
  terminal: <Terminal className="h-4 w-4" />,
}

const appContent: Record<AppId, React.ReactNode> = {
  home: <HomeApp />,
  about: <AboutApp />,
  team: <TeamApp />,
  events: <EventsApp />,
  projects: <ProjectsApp />,
  resources: <ResourcesApp />,
  social: <SocialApp />,
  contact: <ContactApp />,
  achievements: <AchievementsApp />,
  terminal: <TerminalApp />,
}

export function Desktop() {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [highestZIndex, setHighestZIndex] = useState(10)

  const openApp = useCallback((appId: AppId) => {
    setWindows((prev) => {
      const existingWindow = prev.find((w) => w.id === appId)
      if (existingWindow) {
        if (existingWindow.isMinimized) {
          return prev.map((w) =>
            w.id === appId ? { ...w, isMinimized: false, zIndex: highestZIndex + 1 } : w
          )
        }
        setHighestZIndex((z) => z + 1)
        return prev.map((w) =>
          w.id === appId ? { ...w, zIndex: highestZIndex + 1 } : w
        )
      }
      setHighestZIndex((z) => z + 1)
      return [...prev, { id: appId, isMinimized: false, isMaximized: false, zIndex: highestZIndex + 1 }]
    })
  }, [highestZIndex])

  const closeApp = useCallback((appId: AppId) => {
    setWindows((prev) => prev.filter((w) => w.id !== appId))
  }, [])

  const minimizeApp = useCallback((appId: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === appId ? { ...w, isMinimized: true } : w))
    )
  }, [])

  const maximizeApp = useCallback((appId: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === appId ? { ...w, isMaximized: !w.isMaximized } : w))
    )
  }, [])

  const focusApp = useCallback((appId: AppId) => {
    setHighestZIndex((z) => z + 1)
    setWindows((prev) =>
      prev.map((w) => (w.id === appId ? { ...w, zIndex: highestZIndex + 1 } : w))
    )
  }, [highestZIndex])

  const getActiveApp = () => {
    const visibleWindows = windows.filter((w) => !w.isMinimized)
    if (visibleWindows.length === 0) return null
    return visibleWindows.reduce((a, b) => (a.zIndex > b.zIndex ? a : b)).id
  }

  const getInitialPosition = (appId: AppId) => {
    const index = desktopApps.findIndex((a) => a.id === appId)
    return {
      x: 120 + (index % 4) * 40,
      y: 60 + (index % 4) * 25,
    }
  }

  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      style={{ background: "linear-gradient(135deg, #eef0ff 0%, #f3f0ff 40%, #faf0ff 100%)" }}
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="h-full w-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#5B4FE8" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Subtle background orbs */}
      <div
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #7C6FFF, transparent)" }}
      />
      <div
        className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }}
      />

      {/* Desktop Icons */}
      <div className="absolute left-4 top-4 grid grid-cols-2 gap-1 sm:grid-cols-1">
        {desktopApps.map((app) => (
          <DesktopIcon
            key={app.id}
            icon={app.icon}
            label={app.label}
            color={app.color}
            onClick={() => openApp(app.id)}
          />
        ))}
      </div>

      {/* Welcome Widget */}
      <div className="glass window-shadow absolute right-4 top-4 hidden w-72 overflow-hidden rounded-2xl lg:block">
        {/* Widget header */}
        <div
          className="px-4 py-3"
          style={{ background: "linear-gradient(135deg, rgba(91,79,232,0.12), rgba(124,111,255,0.08))" }}
        >
          <div className="mb-1 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">System Status: Online</span>
          </div>
          <h3 className="text-base font-bold text-foreground">Welcome to Cloud OS</h3>
          <p className="text-xs text-primary font-medium">AWS Cloud Club NMIET</p>
        </div>
        <div className="p-4">
          <p className="mb-3 text-sm text-muted-foreground">
            Click icons to open applications. Drag windows to reposition them.
          </p>
          <div className="flex items-center gap-2 rounded-lg bg-primary/8 px-3 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary">Tip: Double-click to maximize</span>
          </div>
        </div>
      </div>

      {/* Windows */}
      {windows.map((win) => (
        <Window
          key={win.id}
          id={win.id}
          title={appTitles[win.id]}
          icon={appIcons[win.id]}
          isActive={getActiveApp() === win.id}
          isMinimized={win.isMinimized}
          isMaximized={win.isMaximized}
          initialPosition={getInitialPosition(win.id)}
          initialSize={win.id === "terminal" ? { width: 620, height: 420 } : { width: 820, height: 600 }}
          onClose={() => closeApp(win.id)}
          onMinimize={() => minimizeApp(win.id)}
          onMaximize={() => maximizeApp(win.id)}
          onFocus={() => focusApp(win.id)}
          zIndex={win.zIndex}
        >
          {appContent[win.id]}
        </Window>
      ))}

      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu
          onAppClick={openApp}
          onClose={() => setShowStartMenu(false)}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        openApps={windows.map((w) => w.id)}
        activeApp={getActiveApp()}
        onAppClick={openApp}
        onStartClick={() => setShowStartMenu(!showStartMenu)}
      />
    </div>
  )
}
