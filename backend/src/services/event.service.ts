import prisma from "../prisma/client";
import { EventInput } from "../types/EventInput";
import { EventStatus } from '@prisma/client';

export async function findAllEventService(filters: any = {}, skip: any, take: any) {
  const { dateFrom, dateTo, location, status } = filters || {};
  
  const where: any = {}

  if (location) where.location = location;
  if (status) where.status = status;
  if (dateFrom || dateTo) {
    where.date = {};

    if (dateFrom) where.date.gte = new Date(dateFrom);
    if (dateTo) where.date.lte = new Date(dateTo);
  };

  return await prisma.event.findMany({
    where,
    skip,
    take
  });
};

export async function countAllEvents(filters: any = {}) {
  const { dateFrom, dateTo, location, status } = filters || {};

  const where: any = {};

  if (location) where.location = location;
  if (status) where.status = status;
  if (dateFrom || dateTo) {
    where.date = {};
    if (dateFrom) where.date.gte = new Date(dateFrom);
    if (dateTo) where.date.lte = new Date(dateTo);
  }

  return await prisma.event.count({ where });
}

export async function findOneEventService(id: string) {
  return await prisma.event.findUnique({
    where: {
      id
    }
  })
};

export async function createEventService(input: EventInput) {
  return await prisma.event.create({
    data: {
      title: input.title,
      description: input.description ?? '',
      date: new Date(input.date),
      location: input.location,
      totalSeats: input.totalSeats,
      status: (input.status as EventStatus) ?? EventStatus.SCHEDULED,
    }
  })
};

export async function updateEventService(id: string, input: Partial<EventInput>) {
  const data: any = {}
  
  if (input.title) data.title = input.title
  if (input.description) data.description = input.description
  if (input.date) data.date = new Date(input.date) 
  if (input.location) data.location = input.location
  if (input.totalSeats) data.totalSeats = input.totalSeats
  if (input.status) data.status = input.status

  return await prisma.event.update({
    where: {
      id
    },
    data
  })
};

export async function deleteEventService(id: string) {
  return await prisma.event.delete({
    where: {
      id
    }
  })
};