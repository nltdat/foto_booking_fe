export type PhotographerLocation = {
  id: number;
  city_province: string;
  district: string;
};

export type PhotographerGalleryImage = {
  id: string;
  src: string | null;
  alt: string;
  category: string;
};

export type Photographer = {
  id: number;
  display_name: string;
  username: string;
  avatar_url: string | null;
  cover_image_url: string | null;
  bio: string;
  specialties: string;
  city: string;
  hourly_rate: string | null;
  experience_years: number;
  gender: string;
  languages: string[];
  working_models: string[];
  working_packages: string[];
  active_locations: PhotographerLocation[];
  rating_avg: string;
  total_reviews: number;
  shooting_count: number;
  favorite_count: number;
  favored: boolean;
  gallery_preview: PhotographerGalleryImage[];
  created_at: string;
  updated_at: string;
};

export type PaginatedPhotographersResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Photographer[];
};

export type PhotographerFavoriteResponse = {
  photographer_id: number;
  favored: boolean;
  favorite_count: number;
};
