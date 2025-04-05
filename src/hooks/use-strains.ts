
import { useState, useEffect } from "react";
import { Strain, StrainFilter, StrainReview } from "@/types/strain";
import { mockStrains, mockStrainReviews } from "@/data/mockStrains";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useStrains(filter: StrainFilter = {}) {
  const [strains, setStrains] = useState<Strain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For now, we use mock data but structure the code to easily migrate to Supabase
    const fetchStrains = async () => {
      try {
        setLoading(true);
        
        // In the future, this will fetch from Supabase
        // For now, we use mock data with a simulated delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Apply filters
        let filteredStrains = [...mockStrains];
        
        // Search filter
        if (filter.search) {
          const searchLower = filter.search.toLowerCase();
          filteredStrains = filteredStrains.filter(
            (strain) => 
              strain.name.toLowerCase().includes(searchLower) ||
              strain.description.toLowerCase().includes(searchLower) ||
              strain.effects.some(effect => effect.toLowerCase().includes(searchLower)) ||
              strain.medicalUses.some(use => use.toLowerCase().includes(searchLower))
          );
        }
        
        // Type filter
        if (filter.type) {
          filteredStrains = filteredStrains.filter(strain => strain.type === filter.type);
        }
        
        // Effects filter
        if (filter.effects && filter.effects.length > 0) {
          filteredStrains = filteredStrains.filter(strain => 
            filter.effects!.every(effect => strain.effects.includes(effect))
          );
        }
        
        // Medical uses filter
        if (filter.medicalUses && filter.medicalUses.length > 0) {
          filteredStrains = filteredStrains.filter(strain => 
            filter.medicalUses!.some(use => strain.medicalUses.includes(use))
          );
        }
        
        // THC level filters
        if (filter.minTHC !== undefined) {
          filteredStrains = filteredStrains.filter(strain => strain.thcLevel >= filter.minTHC!);
        }
        if (filter.maxTHC !== undefined) {
          filteredStrains = filteredStrains.filter(strain => strain.thcLevel <= filter.maxTHC!);
        }
        
        // CBD level filters
        if (filter.minCBD !== undefined) {
          filteredStrains = filteredStrains.filter(strain => strain.cbdLevel >= filter.minCBD!);
        }
        if (filter.maxCBD !== undefined) {
          filteredStrains = filteredStrains.filter(strain => strain.cbdLevel <= filter.maxCBD!);
        }
        
        // Rating filter
        if (filter.minRating !== undefined) {
          filteredStrains = filteredStrains.filter(strain => strain.rating >= filter.minRating!);
        }

        // Apply limit if specified
        if (filter.limit !== undefined && filter.limit > 0) {
          filteredStrains = filteredStrains.slice(0, filter.limit);
        }

        setStrains(filteredStrains);
        setError(null);
      } catch (err) {
        setError("Failed to fetch strains");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStrains();
  }, [filter]);

  return { strains, loading, error };
}

export function useStrainDetail(id: string | undefined) {
  const [strain, setStrain] = useState<Strain | null>(null);
  const [reviews, setReviews] = useState<StrainReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setStrain(null);
      setReviews([]);
      setLoading(false);
      return;
    }

    const fetchStrainDetail = async () => {
      try {
        setLoading(true);
        
        // In the future, this will fetch from Supabase
        // For now, use mock data with simulated delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const foundStrain = mockStrains.find(s => s.id === id) || null;
        const strainReviews = mockStrainReviews.filter(r => r.strainId === id);
        
        setStrain(foundStrain);
        setReviews(strainReviews);
        setError(null);
      } catch (err) {
        setError("Failed to fetch strain details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStrainDetail();
  }, [id]);

  // Function to add a review
  const addReview = async (review: Omit<StrainReview, 'id' | 'createdAt'>) => {
    try {
      if (!strain) return;
      
      // In the future, this will use Supabase
      // For now, create a mock review
      const newReview: StrainReview = {
        id: `review-${Date.now()}`,
        strainId: strain.id,
        createdAt: new Date().toISOString(),
        ...review
      };
      
      // Add to local state
      setReviews(prev => [newReview, ...prev]);
      
      // Update mock strain review count
      const updatedStrain = {
        ...strain,
        reviewCount: strain.reviewCount + 1,
        rating: ((strain.rating * strain.reviewCount) + review.rating) / (strain.reviewCount + 1)
      };
      setStrain(updatedStrain);
      
      toast.success("Review added successfully");
      return true;
    } catch (err) {
      console.error("Failed to add review:", err);
      toast.error("Failed to add review");
      return false;
    }
  };

  return { 
    strain, 
    reviews, 
    loading, 
    error,
    addReview 
  };
}

export function useStrainEffects() {
  // Commonly used strain effects
  const allEffects = [
    "relaxing", 
    "euphoric", 
    "happy", 
    "uplifted", 
    "creative", 
    "energetic", 
    "focused", 
    "tingly", 
    "sleepy", 
    "hungry"
  ];
  
  // Medical uses
  const allMedicalUses = [
    "stress", 
    "anxiety", 
    "pain", 
    "depression", 
    "insomnia", 
    "lack of appetite", 
    "inflammation", 
    "muscle spasms", 
    "nausea", 
    "headaches"
  ];
  
  // Flavors
  const allFlavors = [
    "earthy", 
    "sweet", 
    "citrus", 
    "pine", 
    "woody", 
    "berry", 
    "spicy", 
    "herbal", 
    "diesel", 
    "floral",
    "tropical",
    "lemon",
    "cheese",
    "vanilla",
    "mango",
    "grape",
    "mint",
    "coffee",
    "chocolate",
    "pungent"
  ];
  
  return { allEffects, allMedicalUses, allFlavors };
}
