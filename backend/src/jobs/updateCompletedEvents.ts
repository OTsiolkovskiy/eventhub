import { EventStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateCompletedEvents() {
  try {
    const result = await prisma.event.updateMany({
      where: {
        status: EventStatus.SCHEDULED,
        date: { lt: new Date() },
      },
      data: { status: EventStatus.COMPLETED },
    });
    console.log(`[Cron] Updated events: ${result.count} at ${new Date().toLocaleString()}`);
  } catch (error) {
    console.error('[Cron] Error updating events:', error);
  }
};
