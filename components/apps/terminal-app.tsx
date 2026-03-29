"use client"

import { useState, useRef, useEffect } from "react"

interface TerminalLine {
  type: "input" | "output" | "error"
  content: string
}

const awsFacts = [
  "AWS has over 200 fully featured services from data centers globally.",
  "The first AWS service was S3, launched in March 2006.",
  "AWS operates in 33 geographic regions with 105 Availability Zones.",
  "Lambda was the first mainstream FaaS (serverless compute) service, launched 2014.",
  "EC2 stands for Elastic Compute Cloud — it launched in 2006.",
  "AWS accounts for roughly 31% of the global cloud market share.",
  "Amazon S3 stores over 100 trillion objects.",
  "AWS CloudFront has over 600 Points of Presence worldwide.",
]

const commandRegistry: Record<string, string> = {
  help: `Available commands:
  help          - Show this help message
  about         - Learn about AWS Cloud Club NMIET
  join          - Join our community
  events        - Show upcoming events
  team          - List team members
  skills        - Show club skills
  clear         - Clear terminal
  aws           - Random AWS fun fact
  whoami        - Who are you?
  date          - Show current date
  echo [text]   - Echo back text`,

  about: `
╔═══════════════════════════════════════════╗
║      AWS CLOUD CLUB NMIET  v1.0           ║
╠═══════════════════════════════════════════╣
║  Empowering the next generation of        ║
║  cloud innovators through hands-on        ║
║  learning and community building at       ║
║  NMIET, Navi Mumbai.                      ║
╚═══════════════════════════════════════════╝`,

  join: `
🚀 Welcome to AWS Cloud Club NMIET!

To join our community:
1. Follow us on social media (@awscloudclubNMIET)
2. Join our Discord server
3. Attend our next workshop

Type 'events' to see upcoming activities!`,

  events: `
📅 Upcoming Events:
┌────────────────────────────────────────┐
│ 🎯 Cloud Workshop       - Next Week    │
│ 🏆 Hackathon 2026       - April        │
│ 📚 Study Group          - Every Friday │
│ 🎤 Guest Speaker        - TBA          │
│ ☁️  AWS Certification   - Coming Soon  │
└────────────────────────────────────────┘`,

  team: `
👥 Core Team Members:
- Alex Chen      [President]      🟣 Online
- Sarah Johnson  [Vice President] 🟣 Online
- Mike Williams  [Tech Lead]      🟣 Online
- Emily Davis    [Events]         🟣 Online
- James Wilson   [Workshop]       🟡 Away
- Lisa Thompson  [Content]        🟣 Online`,

  skills: `
☁️ Club Skills & Technologies:

AWS Services    ████████████████░░░░ 80%
Serverless      ███████████████░░░░░ 75%
DevOps / CI-CD  ██████████████░░░░░░ 70%
Machine Learning████████████░░░░░░░░ 60%
Cloud Security  ███████████████░░░░░ 75%`,

  whoami: "cloud_enthusiast@aws-club-nmiet",
}

export function TerminalApp() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "AWS Cloud Club NMIET Terminal v1.0" },
    { type: "output", content: 'Type "help" for available commands.\n' },
  ])
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [lines])

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    const parts = trimmedCmd.split(" ")
    const command = parts[0]
    const args = parts.slice(1).join(" ")

    setLines((prev) => [...prev, { type: "input", content: `$ ${cmd}` }])

    if (command === "clear") {
      setLines([])
      return
    }

    if (command === "echo") {
      setLines((prev) => [...prev, { type: "output", content: args || "" }])
      return
    }

    if (command === "date") {
      setLines((prev) => [...prev, { type: "output", content: new Date().toString() }])
      return
    }

    // Fix: aws fact is selected at command-execution time, not module load time
    if (command === "aws") {
      const fact = awsFacts[Math.floor(Math.random() * awsFacts.length)]
      setLines((prev) => [
        ...prev,
        { type: "output", content: `☁️  AWS Fun Fact:\n\n"${fact}"` },
      ])
      return
    }

    if (commandRegistry[command]) {
      setLines((prev) => [...prev, { type: "output", content: commandRegistry[command] }])
    } else if (command) {
      setLines((prev) => [
        ...prev,
        { type: "error", content: `Command not found: ${command}. Type "help" for available commands.` },
      ])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setInput("")
    }
  }

  return (
    <div
      className="flex h-full flex-col rounded-lg bg-[#110d2a] font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 border-b border-purple-900/50 px-4 py-2">
        <div className="h-2 w-2 rounded-full bg-[#7C6FFF]/60" />
        <span className="text-xs text-purple-300/60">aws-cloud-club-nmiet — bash</span>
      </div>

      {/* Terminal Content */}
      <div ref={containerRef} className="custom-scrollbar flex-1 overflow-auto p-4">
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${
              line.type === "input"
                ? "text-[#a78bfa]"
                : line.type === "error"
                ? "text-red-400"
                : "text-gray-300"
            }`}
          >
            {line.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-purple-900/50 p-3">
        <span className="text-[#a78bfa]">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-gray-200 outline-none placeholder:text-purple-800"
          placeholder="Type a command..."
          autoFocus
        />
      </form>
    </div>
  )
}
