
import { supabase } from "@/integrations/supabase/client";
import { Strain, StrainReview, JournalEntry } from "@/types/strain";
import { mockStrains, mockStrainReviews } from "@/data/mockStrains";

// This service is designed to be easily switchable between mock data and Supabase
// Once your Supabase tables are set up, you can replace the mock implementations

export const strainService = {
  // Get all strains with optional filtering
  getStrains: async (filters: Record<string, any> = {}) => {
    try {
      // In the future, this will use Supabase
      // const { data, error } = await supabase
      //   .from('strains')
      //   .select('*')
      //   .eq('condition', filters.condition)
      //   .limit(filters.limit || 50);
      
      // if (error) throw error;
      // return data;
      
      // Using mock data for now
      return mockStrains;
    } catch (error) {
      console.error("Error fetching strains:", error);
      throw error;
    }
  },
  
  // Get a single strain by ID
  getStrainById: async (id: string) => {
    try {
      // In the future, this will use Supabase
      // const { data, error } = await supabase
      //   .from('strains')
      //   .select('*')
      //   .eq('id', id)
      //   .single();
      
      // if (error) throw error;
      // return data;
      
      // Using mock data for now
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
