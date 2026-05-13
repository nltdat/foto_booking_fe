export type BookingCategory = "PERSONAL" | "COUPLE" | "EVENT" | "WEDDING" | "FAMILY";
export type BookingEnvironment = "INDOOR" | "OUTDOOR" | "STUDIO";
export type BookingStatus = "OPEN" | "MATCHED" | "COMPLETED" | "CANCELLED";

export type Booking = {
  id: string;
  customer: number;
  photographer: number | null;
  title: string;
  category: BookingCategory;
  shoot_date: string | null;
  deadline_date: string | null;
  location: number;
  environment: BookingEnvironment;
  requires_makeup: boolean;
  budget_min: string;
  budget_max: string;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
};

export type PaginatedShootingsResponse = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Booking[];
};

export type CreateBookingInput = {
  title: string;
  category: BookingCategory;
  shoot_date: string;
  deadline_date: string;
  location: number;
  environment: BookingEnvironment;
  requires_makeup: boolean;
  budget_min: string;
  budget_max: string;
};
