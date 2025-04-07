import { supabase } from "@/integrations/supabase/client";
import { Strain, StrainReview, JournalEntry } from "@/types/strain";
import { mockStrains, mockStrainReviews } from "@/data/mockStrains";

// This service is now connected to Supabase strains table
export const strainService = {
  // Get all strains with optional filtering
  getStrains: async (filters: Record<string, any> = {}) => {
    try {
      let query = supabase.from('strains').select('*');
      
      // Apply search filter if provided
      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }
      
      // Apply type filter if provided
      if (filters.type) {
        query = query.eq('type', filters.type);
      }
      
      // Apply limit filter if provided
      if (filters.limit) {
        query = query.limit(filters.limit);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching strains from Supabase:", error);
        // Fallback to mock data if there's an error
        return mockStrains;
      }
      
      // Map Supabase data to our Strain type
      const mappedStrains: Strain[] = data.map(strain => ({
        id: strain.name.toLowerCase().replace(/\s+/g, '-'),
        name: strain.name,
        type: strain.type as "sativa" | "indica" | "hybrid" || "hybrid",
        thcLevel: strain.thc_level || 0,
        cbdLevel: 0.1, // Default since we don't have this in the Supabase table yet
        effects: getEffectsFromStrain(strain),
        medicalUses: getMedicalUsesFromStrain(strain),
        flavors: [], // We don't have flavors in the Supabase table yet
        description: strain.description || "",
        imageUrl: strain.img_url || "/strains/placeholder.jpg",
        rating: 4.5, // Default since we don't have ratings in the Supabase table yet
        reviewCount: 0, // Default since we don't have review counts in the Supabase table yet
      }));
      
      return mappedStrains.length > 0 ? mappedStrains : mockStrains;
    } catch (error) {
      console.error("Error fetching strains:", error);
      // Fallback to mock data if there's an error
      return mockStrains;
    }
  },
  
  // Get a single strain by ID - still using mock data for now
  getStrainById: async (id: string) => {
    try {
      // For now, we'll use mock data since our Supabase data doesn't have the same IDs
      return mockStrains.find(strain => strain.id === id) || null;
    } catch (error) {
      console.error(`Error fetching strain with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Get reviews for a specific strain
  getStrainReviews: async (strainId: string) => {
    try {
      // In the future, this will use Supabase
      // const { data, error } = await supabase
      //   .from('strain_reviews')
      //   .select('*')
      //   .eq('strain_id', strainId)
      //   .order('created_at', { ascending: false });
      
      // if (error) throw error;
      // return data;
      
      // Using mock data for now
      return mockStrainReviews.filter(review => review.strainId === strainId);
    } catch (error) {
      console.error(`Error fetching reviews for strain ${strainId}:`, error);
      throw error;
    }
  },
  
  // Create a new review for a strain
  createReview: async (review: Omit<StrainReview, 'id' | 'createdAt'>) => {
    try {
      // In the future, this will use Supabase
      // const { data, error } = await supabase
      //   .from('strain_reviews')
      //   .insert([
      //     { 
      //       strain_id: review.strainId,
      //       user_id: review.userId,
      //       user_name: review.userName,
      //       rating: review.rating,
      //       comment: review.comment,
      //       effectiveness: review.effectiveness,
      //       side_effects: review.sideEffects
      //     }
      //   ])
      //   .select();
      
      // if (error) throw error;
      // return data[0];
      
      // Using mock data for now
      const newReview: StrainReview = {
        id: `review-${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...review
      };
      
      // In a real app, we would add this to the database
      // For now, we just return the newly created review
      return newReview;
    } catch (error) {
      console.error("Error creating review:", error);
      throw error;
    }
  },
  
  // Get journal entries for a specific strain for a user
  getJournalEntries: async (strainId: string, userId: string) => {
    try {
      // In the future, this will use Supabase
      // const { data, error } = await supabase
      //   .from('journal_entries')
      //   .select('*')
      //   .eq('strain_id', strainId)
      //   .eq('user_id', userId)
      //   .order('date', { ascending: false });
      
      // if (error) throw error;
      // return data;
      
      // Return empty array for now
      return [] as JournalEntry[];
    } catch (error) {
      console.error(`Error fetching journal entries for strain ${strainId}:`, error);
      throw error;
    }
  },
  
  // Create a new journal entry
  createJournalEntry: async (entry: Omit<JournalEntry, 'id'>) => {
    try {
      // In the future, this will use Supabase
      // const { data, error } = await supabase
      //   .from('journal_entries')
      //   .insert([
      //     { 
      //       strain_id: entry.strainId,
      //       user_id: entry.userId,
      //       date: entry.date,
      //       dosage: entry.dosage,
      //       effectiveness: entry.effectiveness,
      //       notes: entry.notes,
      //       mood: entry.mood,
      //       activity: entry.activity,
      //       side_effects: entry.sideEffects
      //     }
      //   ])
      //   .select();
      
      // if (error) throw error;
      // return data[0];
      
      // Creating a mock entry
      const newEntry: JournalEntry = {
        id: `entry-${Date.now()}`,
        ...entry
      };
      
      return newEntry;
    } catch (error) {
      console.error("Error creating journal entry:", error);
      throw error;
    }
  }
};

// Helper functions to extract effects and medical uses from Supabase strain data
function getEffectsFromStrain(strain: any): string[] {
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

function getMedicalUsesFromStrain(strain: any): string[] {
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
