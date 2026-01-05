
export enum Region {
  NORTH = 'North',
  CENTRAL = 'Central',
  SOUTH = 'South'
}

export interface Place {
  id: string;
  name: string;
  region: Region;
  description: string;
  climate: string;
  bestTime: string;
  image: string;
  rating: number;
  topSpots: { name: string; image: string; rating: number }[];
  specialties: string[];
  festivals: string[];
}

export interface Food {
  id: string;
  name: string;
  region: Region;
  image: string;
  description: string;
  priceRange: string;
  type: 'Street Food' | 'Restaurant' | 'Fine Dining';
  tags: string[];
  recommendedPlaces: { name: string; address: string; link?: string }[];
}

export interface ItineraryDay {
  day: number;
  activities: {
    time: string;
    description: string;
    location: string;
    cost: number;
  }[];
}

export interface TripPlan {
  itinerary: ItineraryDay[];
  totalBudget: number;
  tips: string[];
}
