
export interface Strain {
  id: string;
  name: string;
  type: "sativa" | "indica" | "hybrid";
  thcLevel: number; // percentage
  cbdLevel: number; // percentage
  effects: string[];
  medicalUses: string[];
  flavors: string[];
  description: string;
  imageUrl?: string;
  rating: number;
  reviewCount: number;
}

export interface StrainReview {
  id: string;
  strainId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  effectiveness: number; // 1-5 scale
  sideEffects: string[];
  createdAt: string;
}

export interface StrainFilter {
  search: string;
  type?: "sativa" | "indica" | "hybrid";
  effects?: string[];
  medicalUses?: string[];
  minTHC?: number;
  maxTHC?: number;
  minCBD?: number;
  maxCBD?: number;
  minRating?: number;
  limit?: number; // Add this property for pagination/limiting results
}

export interface JournalEntry {
  id: string;
  strainId: string;
  userId: string;
  date: string;
  dosage: string;
  effectiveness: number; // 1-5 scale
  notes: string;
  mood: string;
  activity: string;
  sideEffects: string[];
}
