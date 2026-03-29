"use client"

import { useState } from "react"
import { Github, ExternalLink, ChevronRight, X } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "CloudWatch Dashboard",
    description: "Real-time monitoring dashboard for AWS resources with custom metrics and alerts.",
    techStack: ["React", "AWS Lambda", "CloudWatch", "DynamoDB"],
    demoUrl: "#",
    githubUrl: "#",
    author: "Alex Chen",
    status: "Production",
  },
  {
    id: 2,
    title: "Serverless API Gateway",
    description: "RESTful API built with serverless architecture for scalable microservices.",
    techStack: ["Node.js", "API Gateway", "Lambda", "S3"],
    demoUrl: "#",
    githubUrl: "#",
    author: "Sarah Johnson",
    status: "Development",
  },
  {
    id: 3,
    title: "ML Image Classifier",
    description: "Machine learning model deployed on SageMaker for image classification.",
    techStack: ["Python", "SageMaker", "S3", "Rekognition"],
    demoUrl: "#",
    githubUrl: "#",
    author: "Mike Williams",
    status: "Production",
  },
  {
    id: 4,
    title: "Event-Driven Architecture",
    description: "Distributed system using SNS/SQS for asynchronous event processing.",
    techStack: ["TypeScript", "SNS", "SQS", "EventBridge"],
    demoUrl: "#",
    githubUrl: "#",
    author: "Emily Davis",
    status: "Beta",
  },
  {
    id: 5,
    title: "CI/CD Pipeline",
    description: "Automated deployment pipeline using CodePipeline and CodeBuild.",
    techStack: ["AWS CDK", "CodePipeline", "CodeBuild", "ECR"],
    demoUrl: "#",
    githubUrl: "#",
    author: "James Wilson",
    status: "Production",
  },
  {
    id: 6,
    title: "Cognito Auth System",
    description: "Complete authentication system with social login and MFA support.",
    techStack: ["Next.js", "Cognito", "Amplify", "IAM"],
    demoUrl: "#",
    githubUrl: "#",
    author: "Lisa Thompson",
    status: "Production",
  },
]

export function ProjectsApp() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Production":
        return "bg-green-500/10 text-green-600"
      case "Development":
        return "bg-yellow-500/10 text-yellow-600"
      case "Beta":
        return "bg-blue-500/10 text-blue-600"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-foreground">Projects Showcase</h2>
        <p className="text-sm text-muted-foreground">Built by our talented team members</p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-lg"
          >
            {/* Header */}
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="text-xs text-muted-foreground">by {project.author}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>

            {/* Description */}
            <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-3 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-border pt-3">
              <div className="flex gap-2">
                <a
                  href={project.githubUrl}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={project.demoUrl}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <button
                onClick={() => setSelectedProject(project)}
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                View Details
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
          <div className="window-shadow glass mx-4 max-h-[80vh] w-full max-w-lg overflow-auto rounded-xl">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h3 className="font-semibold text-foreground">{selectedProject.title}</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">by {selectedProject.author}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(selectedProject.status)}`}>
                  {selectedProject.status}
                </span>
              </div>
              
              <p className="text-muted-foreground">{selectedProject.description}</p>
              
              <div>
                <h4 className="mb-2 text-sm font-medium text-foreground">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 pt-2">
                <a
                  href={selectedProject.githubUrl}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-background py-2 text-sm font-medium text-foreground transition-all hover:bg-muted"
                >
                  <Github className="h-4 w-4" />
                  View Code
                </a>
                <a
                  href={selectedProject.demoUrl}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
