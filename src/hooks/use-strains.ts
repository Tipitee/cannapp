
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Strain, StrainFilterProps } from "@/types/strain";
import { toast } from "sonner";

export const useStrains = (filter: StrainFilterProps = {}) => {
  const [strains, setStrains] = useState<Strain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStrains = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let query = supabase.from("strains").select("*");
        
        // Apply filters
        if (filter.search) {
          query = query.or(`name.ilike.%${filter.search}%,description.ilike.%${filter.search}%`);
        }
        
        if (filter.type && filter.type !== "all") {
          // Handle different type formats (e.g., "Sativa", "Sativa-dominant", etc.)
          if (filter.type === "sativa") {
            query = query.or(`type.ilike.%sativa%`);
          } else if (filter.type === "indica") {
            query = query.or(`type.ilike.%indica%`);
          } else if (filter.type === "hybrid") {
            query = query.or(`type.ilike.%hybrid%`);
          }
        }
        
        if (filter.minThc !== undefined) {
          query = query.gte("thc_level", filter.minThc);
        }
        
        if (filter.maxThc !== undefined) {
          query = query.lte("thc_level", filter.maxThc);
        }
        
        const { data, error: apiError } = await query;
        
        if (apiError) throw apiError;
        
        let resultData = data || [];
        
        // Transform data if needed to match expected format
        const transformedData = resultData.map(strain => {
          // Extract potential THC percentage from string values like "18-22%"
          let thcLevel = strain.thc_level;
          if (typeof strain.thc_level === 'string') {
            // Handle ranges like "18–22%" or "18-22%"
            const thcMatch = strain.thc_level.match(/(\d+)[-–](\d+)/);
            if (thcMatch) {
              // Use the average of the range
              thcLevel = (parseInt(thcMatch[1]) + parseInt(thcMatch[2])) / 2;
            } else {
              // Extract just the number
              const numMatch = strain.thc_level.match(/(\d+)/);
              if (numMatch) {
                thcLevel = parseInt(numMatch[1]);
              }
            }
          }
          
          return {
            ...strain,
            thc_level: thcLevel,
          };
        });
        
        // Additional filtering for effects (client-side because of the complexity)
        if (filter.effects && filter.effects.length > 0) {
          const filteredData = transformedData.filter(strain => {
            return filter.effects!.some(effect => {
              // Check if the effect exists in effects, flavors, or description fields
              const effectValue = strain[effect as keyof Strain];
              const descriptionMatch = strain.description?.toLowerCase().includes(effect.toLowerCase());
              return (effectValue && effectValue !== '0' && effectValue !== '') || descriptionMatch;
            });
          });
          setStrains(filteredData);
        } else {
          setStrains(transformedData);
        }
      } catch (err) {
        console.error("Error fetching strains:", err);
        setError(err as Error);
        setStrains([]);
        toast.error("Failed to load strains from database", {
          description: "Please check your connection and try again",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStrains();
  }, [filter]);

  return { strains, loading, error };
};

export const useStrain = (name: string) => {
  const [strain, setStrain] = useState<Strain | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStrain = async () => {
      if (!name) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const { data, error: apiError } = await supabase
          .from("strains")
          .select("*")
          .eq("name", name)
          .maybeSingle();

        if (apiError) throw apiError;
        
        if (!data) {
          throw new Error("Strain not found");
        } else {
          // Transform data if needed
          let thcLevel = data.thc_level;
          if (typeof data.thc_level === 'string') {
            // Handle ranges like "18–22%" or "18-22%"
            const thcMatch = data.thc_level.match(/(\d+)[-–](\d+)/);
            if (thcMatch) {
              // Use the average of the range
              thcLevel = (parseInt(thcMatch[1]) + parseInt(thcMatch[2])) / 2;
            } else {
              // Extract just the number
              const numMatch = data.thc_level.match(/(\d+)/);
              if (numMatch) {
                thcLevel = parseInt(numMatch[1]);
              }
            }
          }
          
          setStrain({
            ...data,
            thc_level: thcLevel,
          });
        }
      } catch (err) {
        console.error("Error fetching strain:", err);
        setError(err as Error);
        setStrain(null);
        toast.error("Failed to load strain details", {
          description: "Please try again later",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStrain();
  }, [name]);

  return { strain, loading, error };
};
