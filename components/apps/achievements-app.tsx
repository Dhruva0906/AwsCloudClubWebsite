"use client"

import { Trophy, Medal, Star, Award, Target, Zap } from "lucide-react"

const achievements = [
  {
    title: "AWS DeepRacer Championship",
    date: "2024",
    description: "1st Place in Regional AWS DeepRacer Competition",
    type: "Competition",
    icon: Trophy,
    color: "from-yellow-400 to-yellow-600",
  },
  {
    title: "Cloud Innovation Hackathon",
    date: "2024",
    description: "Best Cloud Architecture Award",
    type: "Hackathon",
    icon: Award,
    color: "from-primary to-primary/70",
  },
  {
    title: "AWS Community Builder",
    date: "2023",
    description: "Club recognized as AWS Community Builder",
    type: "Recognition",
    icon: Star,
    color: "from-secondary to-secondary/70",
  },
  {
    title: "Serverless Challenge",
    date: "2023",
    description: "2nd Place in National Serverless Challenge",
    type: "Competition",
    icon: Medal,
    color: "from-gray-300 to-gray-500",
  },
  {
    title: "100+ AWS Certifications",
    date: "2023",
    description: "Club members achieved 100+ AWS certifications collectively",
    type: "Milestone",
    icon: Target,
    color: "from-green-400 to-green-600",
  },
  {
    title: "Best Tech Club Award",
    date: "2022",
    description: "Recognized as Best Technical Club by University",
    type: "Recognition",
    icon: Zap,
    color: "from-blue-400 to-blue-600",
  },
]

const stats = [
  { label: "Total Awards", value: "15+" },
  { label: "Hackathon Wins", value: "8" },
  { label: "Certifications", value: "150+" },
  { label: "Recognition", value: "12" },
]

export function AchievementsApp() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-4 text-center"
          >
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-foreground">Achievement Timeline</h2>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.title}
              className="group relative flex gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              {/* Icon */}
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${achievement.color} text-white shadow-lg transition-transform group-hover:scale-110`}
              >
                <achievement.icon className="h-7 w-7" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {achievement.type}
                  </span>
                </div>
                <p className="mb-2 text-sm text-muted-foreground">{achievement.description}</p>
                <span className="text-xs font-medium text-primary">{achievement.date}</span>
              </div>

              {/* Timeline connector */}
              {index < achievements.length - 1 && (
                <div className="absolute left-[2.25rem] top-[4.5rem] h-4 w-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Featured Badge */}
      <div className="rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-6 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white">
          <Trophy className="h-8 w-8" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          AWS Cloud Club Excellence
        </h3>
        <p className="text-sm text-muted-foreground">
          Committed to innovation, learning, and building the future of cloud computing
        </p>
      </div>
    </div>
  )
}
