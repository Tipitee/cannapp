
export interface Club {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  phoneNumber?: string;
  email?: string;
  website?: string;
  openingHours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  amenities: string[];
  thumbnailUrl?: string;
  imageUrls: string[];
  rating: number;
  reviewCount: number;
  membershipStatus: "open" | "closed" | "waitlist";
}

export interface Review {
  id: string;
  clubId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ClubFilter {
  search: string;
  city?: string;
  membershipStatus?: "open" | "closed" | "waitlist";
  amenities?: string[];
  minRating?: number;
}
