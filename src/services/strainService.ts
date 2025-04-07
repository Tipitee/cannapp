
import { supabase } from "@/integrations/supabase/client";
import { Strain, StrainReview } from "@/types/strain";

// Interface to represent the raw strain data from Supabase
interface SupabaseStrain {
  name: string;
  type?: string;
  thc_level?: number;
  description?: string;
  img_url?: string;
  relaxed?: string;
  happy?: string;
  euphoric?: string;
  uplifted?: string;
  creative?: string;
  energetic?: string;
  focused?: string;
  tingly?: string;
  sleepy?: string;
  hungry?: string;
  stress?: string;
  anxiety?: string;
  pain?: string;
  depression?: string;
  insomnia?: string;
  lack_of_appetite?: string;
  inflammation?: string;
  muscle_spasms?: string;
  headaches?: string;
  nausea?: string;
  [key: string]: any; // Allow for additional properties
}

// Fallback mock data
const fallbackMockStrains: Strain[] = [
  {
    id: "og-kush",
    name: "OG Kush",
    type: "hybrid",
    thcLevel: 20,
    cbdLevel: 0.5,
    effects: ["relaxing", "euphoric", "happy"],
    medicalUses: ["stress", "pain", "insomnia"],
    flavors: ["earthy", "pine", "woody"],
    description: "OG Kush is a legendary strain with a strong, complex aroma and effect.",
    imageUrl: "/strains/placeholder.jpg",
    rating: 4.8,
    reviewCount: 423,
  },
  {
    id: "blue-dream",
    name: "Blue Dream",
    type: "hybrid",
    thcLevel: 18,
    cbdLevel: 0.2,
    effects: ["creative", "euphoric", "relaxing"],
    medicalUses: ["depression", "pain", "fatigue"],
    flavors: ["berry", "sweet", "herbal"],
    description: "Blue Dream is a sativa-dominant hybrid known for its balanced effects.",
    imageUrl: "/strains/placeholder.jpg",
    rating: 4.7,
    reviewCount: 387,
  }
];

export const strainService = {
  // Get all strains with optional filtering
  getStrains: async (filters: Record<string, any> = {}) => {
    try {
      // Use any type to bypass TypeScript restriction
      const query = supabase.from('strains' as any).select('*') as any;
      
      // Apply search filter if provided
      if (filters.search) {
        query.ilike('name', `%${filters.search}%`);
      }
      
      // Apply type filter if provided
      if (filters.type) {
        query.eq('type', filters.type);
      }
      
      // Apply limit filter if provided
      if (filters.limit) {
        query.limit(filters.limit);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching strains from Supabase:", error);
        // Fallback to mock data if there's an error
        return fallbackMockStrains;
      }
      
      if (!data || data.length === 0) {
        console.log("No strains found in Supabase, using fallback data");
        return fallbackMockStrains;
      }
      
      // Map Supabase data to our Strain type
      const mappedStrains: Strain[] = (data as SupabaseStrain[]).map(strain => ({
        id: strain.name.toLowerCase().replace(/\s+/g, '-'),
        name: strain.name,
        type: (strain.type as "sativa" | "indica" | "hybrid") || "hybrid",
        thcLevel: strain.thc_level || 0,
        cbdLevel: 0.1, // Default since we don't have CBD data
        effects: getEffectsFromStrain(strain),
        medicalUses: getMedicalUsesFromStrain(strain),
        flavors: [], // We don't have flavors in the table yet
        description: strain.description || "No description available",
        imageUrl: strain.img_url || "/strains/placeholder.jpg",
        rating: 4.5, // Default rating
        reviewCount: Math.floor(Math.random() * 400) + 50, // Random review count for now
      }));
      
      return mappedStrains;
    } catch (error) {
      console.error("Error fetching strains:", error);
      // Fallback to mock data if there's an error
      return fallbackMockStrains;
    }
  },
  
  // Get a single strain by ID
  getStrainById: async (id: string) => {
    try {
      // Try to find the strain by constructing a name from the ID
      const nameFromId = id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      // Query Supabase
      const { data, error } = await (supabase.from('strains' as any).select('*').ilike('name', nameFromId) as any);
      
      if (error || !data || data.length === 0) {
        console.error(`Error fetching strain with ID ${id}:`, error);
        // Fallback to mock data
        return fallbackMockStrains.find(s => s.id === id) || fallbackMockStrains[0];
      }
      
      const strain = data[0] as SupabaseStrain;
      
      return {
        id: strain.name.toLowerCase().replace(/\s+/g, '-'),
        name: strain.name,
        type: (strain.type as "sativa" | "indica" | "hybrid") || "hybrid",
        thcLevel: strain.thc_level || 0,
        cbdLevel: 0.1,
        effects: getEffectsFromStrain(strain),
        medicalUses: getMedicalUsesFromStrain(strain),
        flavors: [],
        description: strain.description || "No description available",
        imageUrl: strain.img_url || "/strains/placeholder.jpg",
        rating: 4.5,
        reviewCount: Math.floor(Math.random() * 400) + 50,
      };
    } catch (error) {
      console.error(`Error fetching strain with ID ${id}:`, error);
      return fallbackMockStrains.find(s => s.id === id) || fallbackMockStrains[0];
    }
  },
  
  // Get reviews for a specific strain - using mock data for now
  getStrainReviews: async (strainId: string) => {
    return [];
  },
  
  // Create a new review for a strain
  createReview: async (review: Omit<StrainReview, 'id' | 'createdAt'>) => {
    const newReview: StrainReview = {
      id: `review-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...review
    };
    return newReview;
  }
};

// Helper functions to extract effects and medical uses from Supabase strain data
function getEffectsFromStrain(strain: SupabaseStrain): string[] {
  const effects = [];
  
  // Map Supabase strain properties to effects
  if (strain.relaxed) effects.push("relaxing");
  if (strain.happy) effects.push("happy");
  if (strain.euphoric) effects.push("euphoric");
  if (strain.uplifted) effects.push("uplifted");
  if (strain.creative) effects.push("creative");
  if (strain.energetic) effects.push("energetic");
  if (strain.focused) effects.push("focused");
  if (strain.tingly) effects.push("tingly");
  if (strain.sleepy) effects.push("sleepy");
  if (strain.hungry) effects.push("hungry");
  
  return effects.length > 0 ? effects : ["relaxing", "euphoric"];
}

function getMedicalUsesFromStrain(strain: SupabaseStrain): string[] {
  const medicalUses = [];
  
  // Map Supabase strain properties to medical uses
  if (strain.stress) medicalUses.push("stress");
  if (strain.anxiety) medicalUses.push("anxiety");
  if (strain.pain) medicalUses.push("pain");
  if (strain.depression) medicalUses.push("depression");
  if (strain.insomnia) medicalUses.push("insomnia");
  if (strain.lack_of_appetite) medicalUses.push("lack of appetite");
  if (strain.inflammation) medicalUses.push("inflammation");
  if (strain.muscle_spasms) medicalUses.push("muscle spasms");
  if (strain.nausea) medicalUses.push("nausea");
  if (strain.headaches) medicalUses.push("headaches");
  
  return medicalUses.length > 0 ? medicalUses : ["stress", "pain"];
}
