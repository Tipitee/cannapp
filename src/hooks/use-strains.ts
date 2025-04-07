import { useState, useEffect } from "react";
import { Strain, StrainFilter, StrainReview } from "@/types/strain";
import { strainService } from "@/services/strainService";
import { toast } from "sonner";

export function useStrains(filter: StrainFilter = {}, shouldLoad: boolean = true) {
  const [strains, setStrains] = useState<Strain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't load data until explicitly told to
    if (!shouldLoad) return;
    
    let isMounted = true;
    
    const fetchStrains = async () => {
      try {
        setLoading(true);
        
        // Fetch from Supabase using the strainService
        const data = await strainService.getStrains(filter);
        
        // Only update state if component is still mounted
        if (!isMounted) return;
        
        setStrains(data);
        setError(null);
      } catch (err) {
        if (isMounted) {
          setError("Failed to fetch strains");
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStrains();
    
    return () => {
      isMounted = false;
    };
  }, [filter, shouldLoad]);

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
        
        // Use strainService to fetch strain details and reviews
        const foundStrain = await strainService.getStrainById(id);
        const strainReviews = await strainService.getStrainReviews(id);
        
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
      if (!strain) return false;
      
      // Use strainService to create a new review
      const newReview = await strainService.createReview(review);
      
      // Add to local state
      setReviews(prev => [newReview, ...prev]);
      
      // Update strain review count and rating
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
