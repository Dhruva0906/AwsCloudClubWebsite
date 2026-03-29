"use client"

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react"
import { X, Minus, Maximize2, Minimize2 } from "lucide-react"

interface WindowProps {
  id: string
  title: string
  icon: ReactNode
  children: ReactNode
  isActive: boolean
  isMinimized: boolean
  isMaximized: boolean
  initialPosition?: { x: number; y: number }
  initialSize?: { width: number; height: number }
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  zIndex: number
}

export function Window({
  id: _id,
  title,
  icon,
  children,
  isActive,
  isMinimized,
  isMaximized,
  initialPosition = { x: 100, y: 50 },
  initialSize = { width: 800, height: 600 },
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  zIndex,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(initialPosition)
  const [size, setSize] = useState(initialSize)
  const [isClosing, setIsClosing] = useState(false)
  const [isOpening, setIsOpening] = useState(true)

  // Use refs for drag state to avoid stale closures in event handlers
  const isDraggingRef = useRef(false)
  const isResizingRef = useRef(false)
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  const positionRef = useRef(initialPosition)
  const sizeRef = useRef(initialSize)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpening(false), 300)
    return () => clearTimeout(timer)
  }, [])

  // Keep refs in sync with state
  useEffect(() => { positionRef.current = position }, [position])
  useEffect(() => { sizeRef.current = size }, [size])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDraggingRef.current && !isMaximized) {
      setPosition({
        x: Math.max(0, Math.min(e.clientX - dragOffsetRef.current.x, window.innerWidth - sizeRef.current.width)),
        y: Math.max(0, Math.min(e.clientY - dragOffsetRef.current.y, window.innerHeight - sizeRef.current.height - 56)),
      })
    }
    if (isResizingRef.current && !isMaximized) {
      const newWidth = Math.max(400, e.clientX - positionRef.current.x)
      const newHeight = Math.max(300, e.clientY - positionRef.current.y - 56)
      setSize({ width: newWidth, height: newHeight })
    }
  }, [isMaximized])

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false
    isResizingRef.current = false
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".window-controls")) return
    onFocus()
    isDraggingRef.current = true
    dragOffsetRef.current = {
      x: e.clientX - positionRef.current.x,
      y: e.clientY - positionRef.current.y,
    }
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(onClose, 200)
  }

  if (isMinimized) return null

  return (
    <div
      ref={windowRef}
      className={`window-shadow glass absolute overflow-hidden rounded-xl transition-all duration-200 ${
        isOpening ? "scale-95 opacity-0" : "scale-100 opacity-100"
      } ${isClosing ? "scale-95 opacity-0" : ""} ${
        isActive ? "ring-2 ring-primary/40" : "ring-1 ring-white/20"
      }`}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? "100%" : size.width,
        height: isMaximized ? "calc(100vh - 56px)" : size.height,
        zIndex,
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`flex h-10 cursor-move items-center justify-between px-3 select-none ${
          isActive
            ? "bg-gradient-to-r from-primary/15 via-primary/8 to-secondary/10"
            : "bg-muted/40"
        }`}
        onMouseDown={handleTitleBarMouseDown}
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-2">
          <span className="text-primary">{icon}</span>
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>

        {/* macOS-style traffic light controls */}
        <div className="window-controls flex items-center gap-1.5">
          <button
            onClick={onMinimize}
            className="group flex h-3.5 w-3.5 items-center justify-center rounded-full bg-yellow-400 transition-all hover:bg-yellow-500"
            title="Minimize"
          >
            <Minus className="h-2 w-2 text-yellow-900 opacity-0 group-hover:opacity-100" />
          </button>
          <button
            onClick={onMaximize}
            className="group flex h-3.5 w-3.5 items-center justify-center rounded-full bg-green-400 transition-all hover:bg-green-500"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? (
              <Minimize2 className="h-2 w-2 text-green-900 opacity-0 group-hover:opacity-100" />
            ) : (
              <Maximize2 className="h-2 w-2 text-green-900 opacity-0 group-hover:opacity-100" />
            )}
          </button>
          <button
            onClick={handleClose}
            className="group flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-400 transition-all hover:bg-red-500"
            title="Close"
          >
            <X className="h-2 w-2 text-red-900 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="custom-scrollbar h-[calc(100%-2.5rem)] overflow-auto bg-background/80 p-4">
        {children}
      </div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 h-4 w-4 cursor-se-resize opacity-40 hover:opacity-100"
          style={{
            background: "linear-gradient(135deg, transparent 50%, rgba(91,79,232,0.4) 50%)",
          }}
          onMouseDown={(e) => {
            e.stopPropagation()
            isResizingRef.current = true
            onFocus()
          }}
        />
      )}
    </div>
  )
}
