import { Event } from "./Event";
import { User } from "./User";

export type Booking = {
  id: string | number;
  user: User;
  event: Event;
  seats: number;
}