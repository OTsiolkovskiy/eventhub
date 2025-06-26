'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { GET_EVENTS } from '@/lib/graphql/queries';
import { Event } from '@/types/Event';
import { useQuery } from '@apollo/client';

export default function Home() {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return 'Loading! ...'
  if (error) return `Error: ${error.message}`;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-100 to-gray-800">
      <h1 className='text-blue-500 font-bold text-5xl text-center p-8'>Eventhub</h1>
      <h2 className='text-xl font-semibold mb-4'>Upcoming events</h2>
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {data.events.map((event: Event) => (
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
    </div>
  );
}
