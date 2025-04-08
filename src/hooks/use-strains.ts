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
        console.log("Fetching strains with filter:", filter);
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
        
        // Add order by to ensure consistent results
        query = query.order('name', { ascending: true });
        
        const { data, error: apiError } = await query;
        
        if (apiError) {
          console.error("Supabase API error:", apiError);
          throw new Error(`Supabase error: ${apiError.message}`);
        }
        
        console.log("Strains fetched:", data);
        let resultData = data || [];
        
        // Transform data if needed to match expected format
        const transformedData = resultData.map(strain => {
          // Map database field names that might be different than our interface
          // For example, handles cases like 'add/adhd' in DB vs 'add_adhd' in interface
          const mappedStrain: Strain = {
            ...strain,
            name: strain.name || "Unknown Strain",
            type: strain.type || "Unknown",
            description: strain.description || "",
            
            // Handle the most common fields with potential format issues
            add_adhd: strain['add/adhd'],
            hiv_aids: strain['hiv/aids'],
            parkinsons: strain["parkinson's"],
            tourettes_syndrome: strain["tourette's_syndrome"],
            alzheimers: strain["alzheimer's"],
          };
          
          // Extract potential THC percentage from string values like "18-22%"
          if (strain.thc_level !== null && strain.thc_level !== undefined) {
            try {
              const thcStr = String(strain.thc_level);
              
              // Handle ranges like "18–22%" or "18-22%"
              const thcMatch = thcStr.match(/(\d+)[-–](\d+)/);
              if (thcMatch) {
                // Use the average of the range
                mappedStrain.thc_level = (parseInt(thcMatch[1]) + parseInt(thcMatch[2])) / 2;
              } else {
                // Extract just the number
                const numMatch = thcStr.match(/(\d+)/);
                if (numMatch) {
                  mappedStrain.thc_level = parseInt(numMatch[1]);
                } else {
                  // Keep original if no pattern matches
                  mappedStrain.thc_level = strain.thc_level;
                }
              }
            } catch (e) {
              console.warn("Error parsing THC level:", e);
              // If there's any error parsing, keep the original value
              mappedStrain.thc_level = strain.thc_level;
            }
          }
          
          return mappedStrain;
        });
        
        // Additional filtering for effects (client-side because of the complexity)
        if (filter.effects && filter.effects.length > 0) {
          const filteredData = transformedData.filter(strain => {
            return filter.effects!.some(effect => {
              // Check if the effect exists in effects, flavors, or description fields
              const effectKey = effect.replace(/\s/g, '_') as keyof Strain;
              const effectValue = strain[effectKey];
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
          description: (err as Error).message || "Please check your connection and try again",
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
        console.log("Fetching strain details for:", name);
        const { data, error: apiError } = await supabase
          .from("strains")
          .select("*")
          .eq("name", name)
          .maybeSingle();

        if (apiError) {
          console.error("Supabase API error:", apiError);
          throw new Error(`Supabase error: ${apiError.message}`);
        }
        
        console.log("Strain data:", data);
        if (!data) {
          throw new Error("Strain not found");
        } else {
          // Map database field names that might be different than our interface
          const mappedStrain: Strain = {
            ...data,
            name: data.name || "Unknown Strain",
            type: data.type || "Unknown",
            description: data.description || "",
            
            // Handle the most common fields with potential format issues
            add_adhd: data['add/adhd'],
            hiv_aids: data['hiv/aids'],
            parkinsons: data["parkinson's"],
            tourettes_syndrome: data["tourette's_syndrome"],
            alzheimers: data["alzheimer's"],
          };
          
          // Transform THC level if needed
          if (data.thc_level !== null && data.thc_level !== undefined) {
            try {
              const thcStr = String(data.thc_level);
              
              // Handle ranges like "18–22%" or "18-22%"
              const thcMatch = thcStr.match(/(\d+)[-–](\d+)/);
              if (thcMatch) {
                // Use the average of the range
                mappedStrain.thc_level = (parseInt(thcMatch[1]) + parseInt(thcMatch[2])) / 2;
              } else {
                // Extract just the number
                const numMatch = thcStr.match(/(\d+)/);
                if (numMatch) {
                  mappedStrain.thc_level = parseInt(numMatch[1]);
                } else {
                  // Keep original if no pattern matches
                  mappedStrain.thc_level = data.thc_level;
                }
              }
            } catch (e) {
              console.warn("Error parsing THC level:", e);
              // If there's any error parsing, keep the original value
              mappedStrain.thc_level = data.thc_level;
            }
          }
          
          setStrain(mappedStrain);
        }
      } catch (err) {
        console.error("Error fetching strain:", err);
        setError(err as Error);
        setStrain(null);
        toast.error("Failed to load strain details", {
          description: (err as Error).message || "Please try again later",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStrain();
  }, [name]);

  return { strain, loading, error };
};
