"use client"

import { useState } from "react"
import { Calendar, MapPin, Users, Plus, X, Image as ImageIcon } from "lucide-react"

const events = [
  {
    id: 1,
    title: "AWS re:Invent Watch Party",
    date: "December 2024",
    location: "Tech Hub Auditorium",
    attendees: 45,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 2,
    title: "Cloud Architecture Workshop",
    date: "November 2024",
    location: "Room 301",
    attendees: 32,
    images: ["/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 3,
    title: "Serverless Hackathon",
    date: "October 2024",
    location: "Innovation Center",
    attendees: 60,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 4,
    title: "AWS Certification Bootcamp",
    date: "September 2024",
    location: "Online",
    attendees: 85,
    images: ["/placeholder.svg"],
  },
]

export function EventsApp() {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null)
  const [showAdmin, setShowAdmin] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Past Events</h2>
          <p className="text-sm text-muted-foreground">Memories from our cloud journey</p>
        </div>
        <button
          onClick={() => setShowAdmin(!showAdmin)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Admin Panel
        </button>
      </div>

      {/* Admin Panel */}
      {showAdmin && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
          <h3 className="mb-3 font-semibold text-foreground">Add New Event</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <input
              type="text"
              placeholder="Event Title"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <input
              type="date"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="Location"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <div className="flex items-center gap-2">
              <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background px-3 py-2 text-sm text-muted-foreground transition-all hover:border-primary hover:text-primary">
                <ImageIcon className="h-4 w-4" />
                Upload Photos
              </button>
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Events Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="group cursor-pointer rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-lg"
            onClick={() => setSelectedEvent(event)}
          >
            {/* Image Preview */}
            <div className="mb-3 grid h-32 grid-cols-3 gap-1 overflow-hidden rounded-lg">
              {event.images.slice(0, 3).map((img, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br from-primary/20 to-secondary/20 ${
                    idx === 0 && event.images.length === 1 ? "col-span-3" : ""
                  } ${idx === 0 && event.images.length === 2 ? "col-span-2" : ""}`}
                >
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-primary/40" />
                  </div>
                </div>
              ))}
            </div>

            {/* Event Info */}
            <h3 className="mb-2 font-semibold text-foreground group-hover:text-primary">
              {event.title}
            </h3>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {event.date}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {event.location}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {event.attendees}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
          <div className="window-shadow glass mx-4 max-h-[80vh] w-full max-w-2xl overflow-auto rounded-xl">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h3 className="font-semibold text-foreground">{selectedEvent.title}</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              {/* Gallery */}
              <div className="mb-4 grid grid-cols-2 gap-2">
                {selectedEvent.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="flex h-40 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20"
                  >
                    <ImageIcon className="h-12 w-12 text-primary/40" />
                  </div>
                ))}
              </div>
              
              {/* Details */}
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-1.5">
                  <Calendar className="h-4 w-4 text-primary" />
                  {selectedEvent.date}
                </span>
                <span className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-1.5">
                  <MapPin className="h-4 w-4 text-primary" />
                  {selectedEvent.location}
                </span>
                <span className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-1.5">
                  <Users className="h-4 w-4 text-primary" />
                  {selectedEvent.attendees} attendees
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
