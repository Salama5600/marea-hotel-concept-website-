export type RoomId = 'garden' | 'sea' | 'suite';

export interface RoomInfo {
  id: RoomId;
  name: string;
  price: number;
  size: string;
  bed: string;
  guests: string;
  desc: string;
  extras: string;
  line: string;
}

export interface HourPhase {
  at: number;
  name: string;
  time: string;
  mood: string;
}

export interface TimeLabel {
  phase: string;
  clock: string;
  display: string;
  aria: string;
}

export interface Amenity {
  iconName: string;
  title: string;
  description: string;
}

export interface TimelineMoment {
  time: string;
  iconName: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  type: string;
  initials: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BookingFormData {
  room: RoomId;
  checkIn: string;
  checkOut: string;
  guests: string;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
}
