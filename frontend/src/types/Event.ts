export type Event = {
  id: string;
  title?: string;
  description?: string;
  date?: Date;
  location?: string;
  totalSeats?: number;
  availableSeats?: number;
  status?: string
  createdAt: Date;
  updatedAt: Date;
}
