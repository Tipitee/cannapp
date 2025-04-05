
import { useState, useEffect, useMemo } from "react";
import { Club, ClubFilter, Review } from "@/types/club";
import { mockClubs, mockReviews } from "@/data/mockClubs";

export function useClubs(filter?: ClubFilter) {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In the future, this would fetch from Supabase
    const fetchClubs = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setClubs(mockClubs);
        setLoading(false);
      } catch (err) {
        setError("Failed to load clubs");
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const filteredClubs = useMemo(() => {
    if (!filter || !clubs.length) return clubs;

    return clubs.filter(club => {
      // Search filter
      if (filter.search && !club.name.toLowerCase().includes(filter.search.toLowerCase()) && 
          !club.city.toLowerCase().includes(filter.search.toLowerCase()) &&
          !club.description.toLowerCase().includes(filter.search.toLowerCase())) {
        return false;
      }

      // City filter
      if (filter.city && club.city.toLowerCase() !== filter.city.toLowerCase()) {
        return false;
      }

      // Membership status filter
      if (filter.membershipStatus && club.membershipStatus !== filter.membershipStatus) {
        return false;
      }

      // Amenities filter
      if (filter.amenities && filter.amenities.length > 0) {
        const hasAllAmenities = filter.amenities.every(amenity => 
          club.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      // Rating filter
      if (filter.minRating && club.rating < filter.minRating) {
        return false;
      }

      return true;
    });
  }, [clubs, filter]);

  const getClubById = (id: string) => {
    return clubs.find(club => club.id === id) || null;
  };

  const getReviewsByClubId = (clubId: string): Review[] => {
    // In the future, this would fetch from Supabase
    return mockReviews.filter(review => review.clubId === clubId);
  };

  return {
    clubs: filteredClubs,
    allClubs: clubs,
    loading,
    error,
    getClubById,
    getReviewsByClubId
  };
}
