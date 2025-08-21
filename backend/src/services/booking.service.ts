import prisma from "../prisma/client";

export const bookEventService = async (userId: string, eventId: string, seats: number) => {
  if (seats < 1) throw new Error('Seats must be at least 1');

  return await prisma.$transaction(async (tx) => {
    const event = await tx.event.findUnique({ where: { id: eventId } });
    if (!event) throw new Error('Event not found');

    if (event.status === 'CANCELLED' || event.status === 'COMPLETED') {
      throw new Error('Event is not open for booking');
    }

    const agg = await tx.booking.aggregate({
      where: { eventId },
      _sum: { seats: true },
    });

    const totalBooked = agg._sum.seats ?? 0;
    const available = event.totalSeats - totalBooked;

    if (seats > available) {
      throw new Error(`Only ${available} seats available`);
    }

    const booking = await tx.booking.upsert({
      where: { userId_eventId: { userId, eventId } },
      update: { seats: { increment: seats } },
      create: { userId, eventId, seats },
      include: { user: true, event: true },
    });

    return booking;
  });
};
