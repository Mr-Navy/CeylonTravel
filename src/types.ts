export type Currency = 'USD' | 'EUR' | 'GBP' | 'AUD';

export interface Destination {
  id: string;
  name: string;
  district: string;
  region: 'Hill Country' | 'Cultural Triangle' | 'Southern Coast' | 'Wildlife' | 'Western Province' | 'East Coast';
  tag: string;
  image: string;
  alt: string;
  description: string;
  longDescription: string;
  highlights: string[];
  bestSeason: string;
  travelTimeFromColombo: string;
  climate: string;
  idealStayDuration: string;
}

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  overnight: string;
  activities: string[];
}

export interface TourPackage {
  id: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  days: number;
  nights: number;
  rating: number;
  reviewsCount: number;
  chauffeurType: string;
  image: string;
  alt: string;
  priceUSD: number;
  category: 'Classic & Cultural' | 'Wildlife & Nature' | 'Coast & Relaxation' | 'Luxury Signature';
  shortDesc: string;
  highlights: string[];
  itinerary: DayItinerary[];
  inclusions: string[];
  exclusions: string[];
  recommendedHotels: string[];
}

export interface Experience {
  id: string;
  title: string;
  category: string;
  badge?: string;
  duration: string;
  image: string;
  alt: string;
  description: string;
  location: string;
  idealTime: string;
}

export interface TravelStory {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  alt: string;
  summary: string;
  content: string[];
}

export interface Testimonial {
  id: string;
  rating: number;
  quote: string;
  author: string;
  location: string;
  tourName: string;
  avatar: string;
  alt: string;
}

export interface CustomTripInquiry {
  destination: string;
  season: string;
  travelers: string;
  tripType: string;
  pace: string;
  hotelStyle: string;
  selectedRegions: string[];
  name: string;
  email: string;
  phone: string;
  notes: string;
}
