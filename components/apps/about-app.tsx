"use client"

import { Target, Eye, Heart, Award } from "lucide-react"

export function AboutApp() {
  return (
    <div className="space-y-6">
      {/* Mission Section */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Our Mission</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          To democratize cloud computing education and empower students with the skills 
          needed to build scalable, innovative solutions using AWS technologies. We believe 
          in learning by doing, fostering a community where knowledge sharing and collaboration 
          drive growth.
        </p>
      </div>

      {/* Vision Section */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-secondary/10 p-2">
            <Eye className="h-6 w-6 text-secondary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Our Vision</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          To become the leading student-driven cloud computing community, producing 
          industry-ready professionals who can leverage AWS to solve real-world problems 
          and contribute to technological advancement.
        </p>
      </div>

      {/* What We Do */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold text-foreground">What We Do</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Workshops & Training",
              description: "Hands-on sessions covering AWS services, cloud architecture, and best practices",
              icon: Award,
            },
            {
              title: "Hackathons",
              description: "Competitive events to build innovative solutions using cloud technologies",
              icon: Target,
            },
            {
              title: "Study Groups",
              description: "Collaborative learning environments for AWS certifications",
              icon: Heart,
            },
            {
              title: "Industry Connect",
              description: "Networking opportunities with AWS professionals and cloud experts",
              icon: Eye,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-lg bg-muted/30 p-4 transition-all hover:bg-muted/50"
            >
              <item.icon className="mb-2 h-6 w-6 text-primary transition-transform group-hover:scale-110" />
              <h3 className="mb-1 font-medium text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { value: "Innovation", description: "Pushing boundaries with creative solutions" },
          { value: "Community", description: "Growing together through collaboration" },
          { value: "Excellence", description: "Striving for the highest standards" },
        ].map((item) => (
          <div
            key={item.value}
            className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-4 text-center"
          >
            <h3 className="mb-1 text-lg font-semibold text-primary">{item.value}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
