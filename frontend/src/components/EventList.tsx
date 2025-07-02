import { Event } from "@/types/Event"
import { Card, CardContent, CardHeader } from "./ui/card"

type EventListProps  = {
  events: Event[];
};

export const EventList = ({events}: EventListProps ) => {
  return (
    <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {events.map((event: Event) => (
        <Card key={event.id} className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition">
          <CardHeader className="pb-2">
            <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-md inline-block mt-1">
              📅{' '}
              {new Date(Number(event.date)).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700 text-sm">
            <div>
              <p><strong>📍 Location:</strong> {event.location}</p>
              <p><strong>🪑 Seats:</strong> {event.totalSeats}</p>
              <p><strong>ℹ️ Status:</strong> {event.status}</p>
              <p className="pt-2 text-gray-600 italic">{event.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
