"use client"

import { Github, Linkedin, Mail, Server } from "lucide-react"

// Pre-generated deterministic instance IDs to avoid SSR hydration mismatch
// (Math.random() in render causes server/client HTML mismatch)
const instanceIds = [
  "0f3a8b2c",
  "1e7d4f9a",
  "2c6b1e8d",
  "3a9f5c0b",
  "4b2e7d1f",
  "5d0c8a3e",
]

const teamMembers = [
  {
    name: "Alex Chen",
    role: "President",
    skills: ["AWS Solutions Architect", "Cloud Security"],
    avatar: "AC",
    status: "running",
  },
  {
    name: "Sarah Johnson",
    role: "Vice President",
    skills: ["DevOps", "Kubernetes"],
    avatar: "SJ",
    status: "running",
  },
  {
    name: "Mike Williams",
    role: "Technical Lead",
    skills: ["Serverless", "Lambda"],
    avatar: "MW",
    status: "running",
  },
  {
    name: "Emily Davis",
    role: "Events Coordinator",
    skills: ["Project Management", "Marketing"],
    avatar: "ED",
    status: "running",
  },
  {
    name: "James Wilson",
    role: "Workshop Lead",
    skills: ["EC2", "S3", "RDS"],
    avatar: "JW",
    status: "stopped",
  },
  {
    name: "Lisa Thompson",
    role: "Content Creator",
    skills: ["Technical Writing", "Design"],
    avatar: "LT",
    status: "running",
  },
]

export function TeamApp() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Cloud Instances</h2>
            <p className="text-sm text-muted-foreground">Our team members powering the cloud</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-1.5 text-sm">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-muted-foreground">{teamMembers.filter(m => m.status === "running").length} Running</span>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <div
            key={member.name}
            className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
          >
            {/* Instance Header */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-lg font-bold text-white shadow-md shadow-primary/30">
                  {member.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                </div>
              </div>
              <div className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-xs ${
                member.status === "running"
                  ? "bg-green-500/10 text-green-600"
                  : "bg-yellow-500/10 text-yellow-600"
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${
                  member.status === "running" ? "bg-green-500 animate-pulse" : "bg-yellow-500"
                }`} />
                {member.status}
              </div>
            </div>

            {/* Instance ID — deterministic, no Math.random() in render */}
            <div className="mb-3 flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-1.5">
              <Server className="h-3.5 w-3.5 text-muted-foreground" />
              <code className="text-xs text-muted-foreground">
                i-{instanceIds[index]}
              </code>
            </div>

            {/* Skills */}
            <div className="mb-3 flex flex-wrap gap-1.5">
              {member.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2 border-t border-border pt-3">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">
                <Github className="h-4 w-4" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">
                <Linkedin className="h-4 w-4" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
