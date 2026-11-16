export type ClinicId = 'palma' | 'manacor';

export interface Clinic {
  id: ClinicId;
  name: string;
  city: string;
  address: string;
  phone: string;
  phoneFormatted: string;
  email: string;
  hoursWeekday: string;
  hoursSaturday: string;
  googleMapEmbed: string;
  rating?: number;
  ratingCount?: number;
}

export interface Treatment {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  durationMin: number;
  specialist: string;
  isPopular?: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  clinicId: ClinicId;
  date: string;
}

export interface Appointment {
  id: string;
  clinicId: ClinicId;
  treatmentId: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:30"
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  notes?: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
