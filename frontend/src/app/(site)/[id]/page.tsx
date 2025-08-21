'use client';

import { Loader } from "@/components/Loader";
import { GET_EVENT_BY_ID } from "@/lib/graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BOOK_EVENT } from "@/lib/graphql/mutations";

// const BOOK_EVENT = gql`
//   mutation BookEvent($eventId: String!, $seats: Int!) {
//     bookEvent(eventId: $eventId, seats: $seats) {
//       id
//       seats
//       event {
//         id
//         availableSeats
//       }
//     }
//   }
// `;

const EventDetailPage = () => {
  
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const { isAuthenticated, initializing } = useAuth();

  const [seats, setSeats] = useState<number>(1);
  const [uiMsg, setUiMsg] = useState<{ type: 'success' | 'error';  text: string } | null>(null);

  useEffect(() => { 
    if (!initializing && !isAuthenticated) {
      router.push('auth?mode=login');
    }
  }, [initializing, isAuthenticated, router]);

  const { data, loading, error, refetch } = useQuery(GET_EVENT_BY_ID, {
    variables: {
      eventId: id
    },
    skip: !isAuthenticated,
  });

  const [bookEvent, { loading: bookingLoading }] = useMutation(BOOK_EVENT, {
    onCompleted: async () => {
      setUiMsg({ type: 'success', text: 'Booking confirmed ✅' });
      await refetch();
    },
    onError: (e) => {
      setUiMsg({ type: 'error', text: e.message || 'Booking failed' })
    }
  });

  if (initializing || !isAuthenticated) return null;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader />
      </div>
    );
  }

  if (error || !data?.event) {
    return (
      <div className="text-center text-red-500 mt-20">
        <p>Event not found.</p>
      </div>
    );
  }

  const event = data.event;

  const availableSeats: number | undefined = event.availableSeats
  
  const canBook = (availableSeats ?? 0) > 0 && event.status !== 'CANCELLED';
  
  const handleBook = async () => {
    setUiMsg(null);
    const seatsInt = Number(seats);

    if (!id) {
      setUiMsg({ type: 'error', text: 'Invalid event id' });
      return;
    }

    if (!seatsInt || seatsInt < 1) {
      setUiMsg({ type: 'error', text: 'Please select at least 1 seat' });
      return;
    }

    if (availableSeats !== undefined && seatsInt > availableSeats) {
      setUiMsg({ type: 'error', text: 'Only ${availableSeats} seats available' });
      return;
    }

    await bookEvent({ variables: { eventId: id, seats: seatsInt } });
  }

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-gray-100 to-gray-800 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-gray-200 p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>

        <div className="flex flex-col gap-2 text-gray-700">
          <div>
            <span className="font-semibold">📅 Date: </span>
            {new Date(Number(event.date)).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>

          <div>
            <span className="font-semibold">📍 Location: </span>
            {event.location}
          </div>

          <div>
            <span className="font-semibold">🪑 Total Seats: </span>
            {event.totalSeats}
          </div>

          <div>
            <span className="font-semibold">🪑 Available Seats: </span>
            {availableSeats ?? 'N/A'}
          </div>

          <div>
            <span className="font-semibold">ℹ️ Status: </span>
            <span
              className={`inline-block px-2 py-1 rounded-md text-white ${
                event.status === 'ACTIVE'
                  ? 'bg-green-500'
                  : 'bg-gray-500'
              }`}
            >
              {event.status}
            </span>
          </div>
        </div>

        {event.description && (
          <div className="pt-4 border-t border-gray-300">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Description</h2>
            <p className="text-gray-700">{event.description}</p>
          </div>
        )}


        {canBook && (
          <div className="pt-4 border-t border-gray-300 space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={availableSeats}
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                className="border rounded px-2 py-1 w-20"
              />
              <button
                onClick={handleBook}
                disabled={bookingLoading}
                className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition disabled:opacity-50"
              >
                {bookingLoading ? 'Booking...' : 'Book'}
              </button>
            </div>

            {uiMsg && (
              <p
                className={`text-sm ${
                  uiMsg.type === 'success' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {uiMsg.text}
              </p>
            )}
          </div>
        )}

        <button
          onClick={() => history.back()}
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
        >
          ← Back
        </button>
      </div>
    </main>
  );
}

export default EventDetailPage;
