"use client"

import { useState } from "react"
import { Send, MapPin, Mail, Phone, CheckCircle } from "lucide-react"

export function ContactApp() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contact Form */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold text-foreground">Get in Touch</h2>
          
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-4 rounded-full bg-green-500/10 p-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Message Sent!</h3>
              <p className="text-sm text-muted-foreground">{"We'll"} get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  placeholder="Your message..."
                />
              </div>
              
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold text-foreground">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Location</h3>
                  <p className="text-sm text-muted-foreground">
                    Tech Building, Room 301<br />
                    University Campus
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    contact@awscloudclub.org
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Phone</h3>
                  <p className="text-sm text-muted-foreground">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold text-foreground">Office Hours</h2>
            <div className="space-y-2">
              {[
                { day: "Monday - Friday", time: "10:00 AM - 6:00 PM" },
                { day: "Saturday", time: "12:00 PM - 4:00 PM" },
                { day: "Sunday", time: "Closed" },
              ].map((schedule) => (
                <div key={schedule.day} className="flex justify-between rounded-lg bg-muted/30 px-3 py-2">
                  <span className="text-sm text-foreground">{schedule.day}</span>
                  <span className="text-sm text-muted-foreground">{schedule.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
