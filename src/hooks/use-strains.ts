
import { useState, useEffect } from "react";
import { Strain, StrainFilter, StrainReview } from "@/types/strain";
import { mockStrains, mockStrainReviews } from "@/data/mockStrains";

export function useStrains(filter: StrainFilter = { search: "" }) {
  const [strains, setStrains] = useState<Strain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This would be replaced with an API call in a production app
    const fetchStrains = async () => {
      try {
        setLoading(true);
        
        // Simulate API fetch
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
        
        // Simulate API fetch
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

  return { strain, reviews, loading, error };
}
