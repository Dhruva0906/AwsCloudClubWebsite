"use client"

import { Github, Linkedin, Instagram, Twitter, Youtube, MessageCircle } from "lucide-react"

const socialLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "#",
    color: "from-[#0077B5] to-[#005885]",
    followers: "2.5K",
    description: "Professional updates and networking",
  },
  {
    name: "GitHub",
    icon: Github,
    url: "#",
    color: "from-[#333] to-[#24292e]",
    followers: "1.2K",
    description: "Open source projects and code",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "#",
    color: "from-[#833AB4] via-[#E1306C] to-[#F77737]",
    followers: "3.8K",
    description: "Event photos and behind the scenes",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "#",
    color: "from-[#1DA1F2] to-[#0c85d0]",
    followers: "1.8K",
    description: "Latest news and announcements",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "#",
    color: "from-[#FF0000] to-[#cc0000]",
    followers: "850",
    description: "Workshop recordings and tutorials",
  },
  {
    name: "Discord",
    icon: MessageCircle,
    url: "#",
    color: "from-[#5865F2] to-[#4752c4]",
    followers: "500",
    description: "Community discussions and support",
  },
]

export function SocialApp() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground">Connect With Us</h2>
        <p className="text-sm text-muted-foreground">Follow us on social media for updates</p>
      </div>

      {/* Social Links Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-lg"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${social.color} text-white transition-transform group-hover:scale-110`}>
                <social.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{social.name}</h3>
                <p className="text-sm text-muted-foreground">{social.followers} followers</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{social.description}</p>
            <div className="mt-3 flex items-center justify-end">
              <span className="text-xs font-medium text-primary group-hover:underline">
                Follow →
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Newsletter */}
      <div className="rounded-xl border border-primary/30 bg-gradient-to-r from-primary/5 to-secondary/5 p-6">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-semibold text-foreground">Stay Updated</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Subscribe to our newsletter for the latest cloud computing news
          </p>
          <div className="mx-auto flex max-w-md gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary"
            />
            <button className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
