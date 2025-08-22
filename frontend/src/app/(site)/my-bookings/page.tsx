'use client';

import { Loader } from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import { CANCEL_BOOKING } from "@/lib/graphql/mutations";
import { GET_MY_BOOKINGS } from "@/lib/graphql/queries";
import { Booking } from "@/types/Booking";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect } from "react";

const MyBookings = () => {
  const { user } = useAuth();
  const { data, loading, error, refetch } = useQuery(GET_MY_BOOKINGS, {
    skip: !user,
  });

  
  const [cancelBooking, { loading: cancelling }] = useMutation(CANCEL_BOOKING, {
    onCompleted: () => {
      if (refetch) refetch();
    },
    onError: (err) => {
      console.error("Cancel booking failed:", err.message);
    }
  });

  useEffect(() => {
    if (user) refetch()
  }, [user, refetch]);
  
  if (error) {
    return <p className="text-red-500">Error loading bookings: {error.message}</p>;
  }

  const bookings = data?.myBookings ?? [];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">My Bookings</h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh] w-full">
          <Loader />
        </div>
      ) : bookings.length ? (
        <ul className="flex flex-col gap-4">
          {bookings.map((booking: Booking) => {
            const eventDate = new Date(Number(booking.event.date));
            return (
              <li
                key={booking.id}
                className="border rounded-xl px-6 py-5 shadow-md hover:shadow-lg transition-shadow duration-200 bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <Link
                    href={`/${booking.event.id}`}
                    className="text-xl font-semibold text-blue-600 hover:underline"
                  >
                    {booking.event.title}
                  </Link>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      {eventDate.toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => cancelBooking({ variables: { bookingId: booking.id } })}
                      disabled={cancelling}
                      className="inline-flex items-center gap-2 border border-red-500 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      🗑 {cancelling ? "Cancelling..." : "Cancel"}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <p className="text-gray-700">📍 {booking.event.location}</p>
                  <p className="text-gray-800 font-medium">
                    🎟 Seats booked:{" "}
                    <span className="text-blue-600">{booking.seats}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500 mt-4">No bookings yet.</p>
      )}
    </div>
  )
};

export default MyBookings;
