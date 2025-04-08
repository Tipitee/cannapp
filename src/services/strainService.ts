
import { supabase } from "@/integrations/supabase/client";
import { Strain, StrainReview } from "@/types/strain";

// Interface to represent the raw strain data from Supabase
interface SupabaseStrain {
  name: string;
  type?: string;
  thc_level?: number;
  description?: string;
  img_url?: string;
  [key: string]: any; // Allow for additional properties
}

// Fallback mock data with correct properties for display
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
    imageUrl: "",
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
    imageUrl: "",
    rating: 4.7,
    reviewCount: 387,
  }
];

export const strainService = {
  // Get all strains with optional filtering
  getStrains: async (filters: Record<string, any> = {}) => {
    try {
      console.log("Fetching strains with filters:", filters);
      
      // Build Supabase query with clearer filtering
      let query = supabase.from('strains').select('*');
      
      // Apply search filter if provided
      if (filters.search && typeof filters.search === 'string' && filters.search.trim() !== '') {
        query = query.ilike('name', `%${filters.search.trim()}%`);
      }
      
      // Apply type filter if provided
      if (filters.type && typeof filters.type === 'string' && filters.type !== 'all') {
        query = query.eq('type', filters.type.toLowerCase());
      }
      
      // Apply limit filter if provided
      if (filters.limit && typeof filters.limit === 'number') {
        query = query.limit(filters.limit);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching strains from Supabase:", error);
        // Log the actual error
        console.log("Falling back to mock data due to error:", error.message);
        return fallbackMockStrains;
      }
      
      if (!data || data.length === 0) {
        console.log("No strains found in Supabase, using fallback data");
        return fallbackMockStrains;
      }
      
      console.log("Supabase returned strains:", data.length);
      console.log("Sample strain data:", data[0]);
      
      // Map Supabase data to our Strain type
      const mappedStrains: Strain[] = (data as SupabaseStrain[]).map(strain => ({
        id: strain.name.toLowerCase().replace(/\s+/g, '-'),
        name: strain.name,
        type: (strain.type?.toLowerCase() as "sativa" | "indica" | "hybrid") || "hybrid",
        thcLevel: strain.thc_level || 0,
        cbdLevel: 0.1, // Default since we don't have CBD data
        effects: getEffectsFromStrain(strain),
        medicalUses: getMedicalUsesFromStrain(strain),
        flavors: [], // We don't have flavors in the table yet
        description: strain.description || "No description available",
        imageUrl: strain.img_url || undefined,
        rating: 4.5, // Default rating
        reviewCount: Math.floor(Math.random() * 400) + 50, // Random review count for now
      }));
      
      console.log("Mapped strains:", mappedStrains.length);
      return mappedStrains.length > 0 ? mappedStrains : fallbackMockStrains;
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
      
      console.log(`Fetching strain with name '${nameFromId}'`);
      
      // Supabase query
      const { data, error } = await supabase
        .from('strains')
        .select('*')
        .ilike('name', nameFromId);
      
      if (error) {
        console.error(`Error fetching strain with ID ${id}:`, error);
        console.log("Falling back to mock data due to error:", error.message);
        return fallbackMockStrains.find(s => s.id === id) || fallbackMockStrains[0];
      }
      
      if (!data || data.length === 0) {
        console.log(`No strain found with name '${nameFromId}', using fallback data`);
        return fallbackMockStrains.find(s => s.id === id) || fallbackMockStrains[0];
      }
      
      console.log(`Found strain in database:`, data[0]);
      const strain = data[0] as SupabaseStrain;
      
      return {
        id: strain.name.toLowerCase().replace(/\s+/g, '-'),
        name: strain.name,
        type: (strain.type?.toLowerCase() as "sativa" | "indica" | "hybrid") || "hybrid",
        thcLevel: strain.thc_level || 0,
        cbdLevel: 0.1,
        effects: getEffectsFromStrain(strain),
        medicalUses: getMedicalUsesFromStrain(strain),
        flavors: [],
        description: strain.description || "No description available",
        imageUrl: strain.img_url || undefined,
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
  if (strain.relaxed === "true") effects.push("relaxing");
  if (strain.happy === "true") effects.push("happy");
  if (strain.euphoric === "true") effects.push("euphoric");
  if (strain.uplifted === "true") effects.push("uplifted");
  if (strain.creative === "true") effects.push("creative");
  if (strain.energetic === "true") effects.push("energetic");
  if (strain.focused === "true") effects.push("focused");
  if (strain.tingly === "true") effects.push("tingly");
  if (strain.sleepy === "true") effects.push("sleepy");
  if (strain.hungry === "true") effects.push("hungry");
  
  return effects.length > 0 ? effects : ["relaxing", "euphoric"];
}

function getMedicalUsesFromStrain(strain: SupabaseStrain): string[] {
  const medicalUses = [];
  
  // Map Supabase strain properties to medical uses
  if (strain.stress === "true") medicalUses.push("stress");
  if (strain.anxiety === "true") medicalUses.push("anxiety");
  if (strain.pain === "true") medicalUses.push("pain");
  if (strain.depression === "true") medicalUses.push("depression");
  if (strain.insomnia === "true") medicalUses.push("insomnia");
  if (strain.lack_of_appetite === "true") medicalUses.push("lack of appetite");
  if (strain.inflammation === "true") medicalUses.push("inflammation");
  if (strain.muscle_spasms === "true") medicalUses.push("muscle spasms");
  if (strain.nausea === "true") medicalUses.push("nausea");
  if (strain.headaches === "true") medicalUses.push("headaches");
  
  return medicalUses.length > 0 ? medicalUses : ["stress", "pain"];
}
