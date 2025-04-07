
import { useState, useEffect } from "react";
import { useStrains } from "@/hooks/use-strains";
import { StrainCard } from "@/components/strains/StrainCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Strain } from "@/types/strain";
import { Loader2 } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface RelatedStrainsProps {
  currentStrainId: string;
  strainType?: "sativa" | "indica" | "hybrid";
  effects?: string[];
}

export function RelatedStrains({
  currentStrainId,
  strainType,
  effects = []
}: RelatedStrainsProps) {
  const { t } = useLanguage();
  const [relatedFilter, setRelatedFilter] = useState({
    type: strainType,
    limit: 10
  });
  const { strains, loading } = useStrains(relatedFilter);
  const [filteredStrains, setFilteredStrains] = useState<Strain[]>([]);
  
  // Filter out current strain and find similar strains
  useEffect(() => {
    if (strains && strains.length > 0) {
      let filtered = strains.filter(strain => strain.id !== currentStrainId);
      
      // If we have effects, prioritize strains with similar effects
      if (effects && effects.length > 0) {
        // Sort by number of matching effects (descending)
        filtered.sort((a, b) => {
          const aMatches = a.effects.filter(effect => effects.includes(effect)).length;
          const bMatches = b.effects.filter(effect => effects.includes(effect)).length;
          return bMatches - aMatches;
        });
      }
      
      // Limit to 6 strains
      setFilteredStrains(filtered.slice(0, 6));
    }
  }, [strains, currentStrainId, effects]);

  // Create placeholder cards for loading state
  const renderPlaceholderCards = () => {
    return Array(3).fill(0).map((_, index) => (
      <CarouselItem key={`placeholder-${index}`} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
        <div className="h-full">
          <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-lg animate-pulse h-full">
            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-t-lg"></div>
            <div className="p-3">
              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </CarouselItem>
    ));
  };
  
  if (loading) {
    return (
      <div className="space-y-4 py-4">
        <h3 className="text-lg font-semibold">{t("similarStrains")}</h3>
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {renderPlaceholderCards()}
          </CarouselContent>
        </Carousel>
      </div>
    );
  }
  
  if (!filteredStrains || filteredStrains.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-4 py-4">
      <h3 className="text-lg font-semibold">{t("similarStrains")}</h3>
      
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {filteredStrains.map((strain) => (
            <CarouselItem key={strain.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
              <div className="h-full">
                <StrainCard strain={strain} compact />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end gap-2 mt-2">
          <CarouselPrevious 
            className="static h-8 w-8 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800" 
            aria-label={t("previousStrain")} 
          />
          <CarouselNext 
            className="static h-8 w-8 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800" 
            aria-label={t("nextStrain")} 
          />
        </div>
      </Carousel>
    </div>
  );
}
