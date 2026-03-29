"use client"

import { useEffect, useState } from "react"
import { Cloud, Server, Database, Shield, Zap } from "lucide-react"

const bootMessages = [
  "Initializing Cloud Environment...",
  "Loading AWS Services...",
  "Connecting to Cloud Infrastructure...",
  "Mounting Virtual Instances...",
  "Starting Security Protocols...",
  "Preparing Desktop Environment...",
  "Welcome to AWS Cloud Club NMIET",
]

// Sparkle positions — fixed to avoid hydration mismatch
const sparkles = [
  { top: "12%", left: "18%", delay: "0s", size: 16 },
  { top: "22%", left: "72%", delay: "0.6s", size: 12 },
  { top: "68%", left: "85%", delay: "1.2s", size: 18 },
  { top: "78%", left: "10%", delay: "0.9s", size: 14 },
  { top: "45%", left: "92%", delay: "0.3s", size: 10 },
  { top: "32%", left: "5%", delay: "1.5s", size: 12 },
]

// Floating particles — fixed positions
const particles = [
  { width: 80, height: 80, left: "8%", top: "15%", duration: "4s", delay: "0s" },
  { width: 120, height: 120, left: "78%", top: "8%", duration: "5s", delay: "0.5s" },
  { width: 60, height: 60, left: "45%", top: "85%", duration: "3.5s", delay: "1s" },
  { width: 100, height: 100, left: "20%", top: "70%", duration: "6s", delay: "0.3s" },
  { width: 70, height: 70, left: "88%", top: "55%", duration: "4.5s", delay: "1.2s" },
  { width: 90, height: 90, left: "60%", top: "30%", duration: "5.5s", delay: "0.8s" },
  { width: 50, height: 50, left: "35%", top: "20%", duration: "3s", delay: "1.5s" },
  { width: 110, height: 110, left: "5%", top: "40%", duration: "4.2s", delay: "0.2s" },
]

export function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => {
        if (prev < bootMessages.length - 1) return prev + 1
        return prev
      })
    }, 400)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + 2
      })
    }, 50)

    const completeTimeout = setTimeout(() => {
      setFadeOut(true)
      setTimeout(onComplete, 500)
    }, 3000)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
      clearTimeout(completeTimeout)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: "linear-gradient(135deg, #1a1040 0%, #130d35 50%, #0d0820 100%)" }}
    >
      {/* Floating cloud particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.width,
              height: p.height,
              left: p.left,
              top: p.top,
              background: "radial-gradient(circle, rgba(91,79,232,0.15) 0%, transparent 70%)",
              animation: `float ${p.duration} ease-in-out infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Sparkle stars — matching logo aesthetic */}
      {sparkles.map((s, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: s.top,
            left: s.left,
            animation: `sparkle 2s ease-in-out infinite`,
            animationDelay: s.delay,
          }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z"
              fill="rgba(255,255,255,0.5)"
            />
          </svg>
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo icon with glow */}
        <div className="relative mb-8">
          <div className="animate-glow rounded-full p-6" style={{ background: "linear-gradient(135deg, #5B4FE8, #7C6FFF)" }}>
            <Cloud className="h-16 w-16 text-white" />
          </div>

          {/* Orbiting icons */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: "8s" }}>
            <Server className="absolute -top-4 left-1/2 h-5 w-5 -translate-x-1/2 text-[#7C6FFF]/70" />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: "10s", animationDirection: "reverse" }}>
            <Database className="absolute -bottom-4 left-1/2 h-5 w-5 -translate-x-1/2 text-[#a78bfa]/70" />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: "12s" }}>
            <Shield className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6B5FFF]/70" />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: "9s", animationDirection: "reverse" }}>
            <Zap className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 text-[#c4b5fd]/70" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-1 text-3xl font-bold tracking-tight text-white">
          AWS Cloud Club
        </h1>
        <p className="mb-8 text-lg font-semibold" style={{ color: "#a78bfa" }}>
          NMIET Chapter
        </p>

        {/* Progress bar */}
        <div className="mb-4 h-1 w-72 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #5B4FE8, #a78bfa)",
              boxShadow: "0 0 10px rgba(91,79,232,0.6)",
            }}
          />
        </div>

        {/* Boot message */}
        <p className="h-6 animate-boot-pulse font-mono text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
          {bootMessages[currentMessage]}
        </p>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-8 text-center">
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          Powered by AWS Cloud Innovation
        </p>
      </div>
    </div>
  )
}
