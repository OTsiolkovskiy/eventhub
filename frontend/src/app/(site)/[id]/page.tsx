'use client';

import { Loader } from "@/components/Loader";
import { GET_EVENT_BY_ID } from "@/lib/graphql/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const EventDetailPage = () => {
  
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const { isAuthenticated, initializing } = useAuth();

  useEffect(() => { 
    if (!initializing && !isAuthenticated) {
      router.push('/login');
    }
  }, [initializing, isAuthenticated, router]);

  const { data, loading, error } = useQuery(GET_EVENT_BY_ID, {
    variables: {
      eventId: id
    },
    skip: !isAuthenticated,
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