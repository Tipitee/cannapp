
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
      
      try {
        let query = supabase.from("strains").select("*");
        
        // Apply filters
        if (filter.search) {
          query = query.ilike("name", `%${filter.search}%`);
        }
        
        if (filter.type && filter.type !== "all") {
          query = query.eq("type", filter.type);
        }
        
        if (filter.minThc !== undefined) {
          query = query.gte("thc_level", filter.minThc);
        }
        
        if (filter.maxThc !== undefined) {
          query = query.lte("thc_level", filter.maxThc);
        }
        
        const { data, error: apiError } = await query;
        
        if (apiError) throw apiError;
        
        // Additional filtering for effects (client-side because of the complexity)
        let filteredData = data as Strain[];
        
        if (filter.effects && filter.effects.length > 0) {
          filteredData = filteredData.filter(strain => {
            return filter.effects!.some(effect => {
              const effectValue = strain[effect as keyof Strain];
              return effectValue && effectValue !== '0' && effectValue !== '';
            });
          });
        }
        
        setStrains(filteredData);
      } catch (err) {
        console.error("Error fetching strains:", err);
        setError(err as Error);
        toast.error("Failed to load strains", {
          description: "Please try again later",
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
      try {
        const { data, error: apiError } = await supabase
          .from("strains")
          .select("*")
          .eq("name", name)
          .maybeSingle();

        if (apiError) throw apiError;
        
        setStrain(data);
      } catch (err) {
        console.error("Error fetching strain:", err);
        setError(err as Error);
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
