"use client"

import { BookOpen, Video, FileText, Code, ExternalLink, Star } from "lucide-react"

const resourceCategories = [
  {
    title: "AWS Fundamentals",
    icon: BookOpen,
    resources: [
      { name: "AWS Cloud Practitioner Essentials", type: "Course", url: "#", featured: true },
      { name: "Introduction to AWS Services", type: "Video", url: "#", featured: false },
      { name: "AWS Well-Architected Framework", type: "Document", url: "#", featured: true },
    ],
  },
  {
    title: "Compute & Serverless",
    icon: Code,
    resources: [
      { name: "EC2 Instance Types Guide", type: "Document", url: "#", featured: false },
      { name: "Lambda Best Practices", type: "Course", url: "#", featured: true },
      { name: "ECS vs EKS Comparison", type: "Video", url: "#", featured: false },
    ],
  },
  {
    title: "Database & Storage",
    icon: FileText,
    resources: [
      { name: "DynamoDB Deep Dive", type: "Course", url: "#", featured: true },
      { name: "S3 Security Best Practices", type: "Document", url: "#", featured: false },
      { name: "RDS vs Aurora Comparison", type: "Video", url: "#", featured: false },
    ],
  },
  {
    title: "DevOps & CI/CD",
    icon: Video,
    resources: [
      { name: "AWS CDK Workshop", type: "Course", url: "#", featured: true },
      { name: "CodePipeline Tutorial", type: "Video", url: "#", featured: false },
      { name: "Infrastructure as Code Guide", type: "Document", url: "#", featured: false },
    ],
  },
]

const certifications = [
  { name: "Cloud Practitioner", level: "Foundational", color: "from-green-400 to-green-600" },
  { name: "Solutions Architect", level: "Associate", color: "from-blue-400 to-blue-600" },
  { name: "Developer", level: "Associate", color: "from-purple-400 to-purple-600" },
  { name: "DevOps Engineer", level: "Professional", color: "from-orange-400 to-orange-600" },
]

export function ResourcesApp() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Course":
        return <BookOpen className="h-3.5 w-3.5" />
      case "Video":
        return <Video className="h-3.5 w-3.5" />
      case "Document":
        return <FileText className="h-3.5 w-3.5" />
      default:
        return <Code className="h-3.5 w-3.5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Certifications */}
      <div>
        <h2 className="mb-3 text-xl font-semibold text-foreground">AWS Certifications</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="group cursor-pointer rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className={`mb-2 h-2 w-12 rounded-full bg-gradient-to-r ${cert.color}`} />
              <h3 className="font-medium text-foreground">{cert.name}</h3>
              <p className="text-xs text-muted-foreground">{cert.level}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Categories */}
      <div>
        <h2 className="mb-3 text-xl font-semibold text-foreground">Learning Resources</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {resourceCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{category.title}</h3>
              </div>
              <div className="space-y-2">
                {category.resources.map((resource) => (
                  <a
                    key={resource.name}
                    href={resource.url}
                    className="group flex items-center justify-between rounded-lg bg-muted/30 p-3 transition-all hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-2">
                      {resource.featured && (
                        <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                      )}
                      <span className="text-sm text-foreground">{resource.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 rounded-md bg-secondary/10 px-2 py-0.5 text-xs text-secondary">
                        {getTypeIcon(resource.type)}
                        {resource.type}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="rounded-xl border border-primary/30 bg-gradient-to-r from-primary/5 to-secondary/5 p-4">
        <h3 className="mb-3 font-semibold text-foreground">Quick Links</h3>
        <div className="flex flex-wrap gap-2">
          {["AWS Documentation", "AWS Blog", "AWS Samples", "AWS Training", "AWS Free Tier"].map((link) => (
            <a
              key={link}
              href="#"
              className="inline-flex items-center gap-1 rounded-lg bg-background/50 px-3 py-1.5 text-sm text-foreground transition-all hover:bg-background"
            >
              {link}
              <ExternalLink className="h-3 w-3" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
