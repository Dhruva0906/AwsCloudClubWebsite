"use client"

import { useState } from "react"
import { BootScreen } from "@/components/os/boot-screen"
import { Desktop } from "@/components/os/desktop"

export default function CloudOS() {
  const [isBooted, setIsBooted] = useState(false)

  return (
    <main className="h-screen w-screen overflow-hidden">
      {!isBooted ? (
        <BootScreen onComplete={() => setIsBooted(true)} />
      ) : (
        <Desktop />
      )}
    </main>
  )
}
