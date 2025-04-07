
export interface Strain {
  id: string;
  name: string;
  type: "sativa" | "indica" | "hybrid";
  thcLevel: number;
  cbdLevel: number;
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
  effectiveness: number;
  sideEffects: string[];
  createdAt: string;
}

export interface StrainFilter {
  search?: string;
  type?: "sativa" | "indica" | "hybrid";
  effects?: string[];
  medicalUses?: string[];
  minTHC?: number;
  maxTHC?: number;
  minCBD?: number;
  maxCBD?: number;
  minRating?: number;
  limit?: number;
}

export interface JournalEntry {
  id: string;
  strainId: string;
  userId: string;
  date: string;
  dosage: string;
  effectiveness: number;
  notes: string;
  mood: string;
  activity: string;
  sideEffects: string[];
}
