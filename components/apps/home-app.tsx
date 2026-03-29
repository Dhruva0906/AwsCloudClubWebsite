"use client"

import { Cloud, Sparkles, Rocket, Zap } from "lucide-react"

export function HomeApp() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/10 to-background p-8">
        <div className="relative z-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Welcome to the Cloud
          </div>
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            AWS Cloud Club
          </h1>
          <p className="mb-6 max-w-lg text-lg text-muted-foreground">
            Empowering the next generation of cloud innovators. Join us in exploring 
            the limitless possibilities of cloud computing with AWS.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg">
              <Rocket className="h-4 w-4" />
              Get Started
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/50 px-6 py-3 font-semibold text-foreground transition-all hover:bg-background">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Members", value: "150+", icon: Cloud },
          { label: "Events", value: "25+", icon: Sparkles },
          { label: "Projects", value: "40+", icon: Rocket },
          { label: "Workshops", value: "30+", icon: Zap },
        ].map((stat) => (
          <div
            key={stat.label}
            className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-lg"
          >
            <stat.icon className="mb-2 h-8 w-8 text-primary transition-transform group-hover:scale-110" />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Featured Content */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold text-foreground">What We Do</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Learn",
              description: "Hands-on workshops and sessions on AWS services",
              color: "bg-primary/10 text-primary",
            },
            {
              title: "Build",
              description: "Real-world projects using cloud technologies",
              color: "bg-secondary/10 text-secondary",
            },
            {
              title: "Connect",
              description: "Network with industry professionals and peers",
              color: "bg-chart-3/20 text-chart-3",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg bg-muted/30 p-4">
              <span className={`mb-2 inline-block rounded-md px-2 py-1 text-xs font-semibold ${item.color}`}>
                {item.title}
              </span>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
