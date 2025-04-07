
import { useState } from "react";
import { useStrains } from "@/hooks/use-strains";
import { StrainCard } from "@/components/strains/StrainCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Cannabis } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const FeaturedStrains = () => {
  const { t } = useLanguage();
  const { strains, loading } = useStrains({ search: "", limit: 8 });
  const navigate = useNavigate();
  
  const handleViewAll = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/strains");
  };
  
  // Create placeholder cards for loading state
  const renderPlaceholderCards = () => {
    return Array(4).fill(0).map((_, index) => (
      <CarouselItem key={`placeholder-${index}`} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
        <div className="h-full">
          <StrainCard 
            strain={{
              id: `loading-${index}`,
              name: "Loading...",
              type: "hybrid",
              thcLevel: 0,
              cbdLevel: 0,
              effects: [],
              flavors: [],
              medicalUses: [],
              negativeEffects: [],
              description: "",
              rating: 0,
              reviewCount: 0,
            }} 
            compact 
            isLoading={true} 
          />
        </div>
      </CarouselItem>
    ));
  };
  
  // Handle empty state
  if (!loading && (!strains || strains.length === 0)) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-app-primary">{t("featuredStrains") || "Featured Strains"}</h2>
          <Button 
            variant="ghost" 
            onClick={handleViewAll}
            className="font-medium text-primary hover:text-primary/80 hover:bg-transparent p-0"
          >
            {t("viewAll") || "View All"} →
          </Button>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
          <Cannabis className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No Featured Strains</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Explore our strain collection to find your perfect match</p>
          <Button onClick={handleViewAll}>Browse All Strains</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-app-primary">{t("featuredStrains") || "Featured Strains"}</h2>
        <Button 
          variant="ghost" 
          onClick={handleViewAll}
          className="font-medium text-primary hover:text-primary/80 hover:bg-transparent p-0"
        >
          {t("viewAll") || "View All"} →
        </Button>
      </div>
      
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {loading ? renderPlaceholderCards() : (
              strains.map((strain) => (
                <CarouselItem key={strain.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="h-full">
                    <StrainCard strain={strain} compact />
                  </div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <div className="hidden md:flex md:items-center md:justify-end md:gap-2 md:absolute md:top-[-50px] md:right-0">
            <CarouselPrevious 
              className="static h-9 w-9 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800" 
              aria-label={t("previousStrain") || "Previous strain"}
            >
              <ChevronLeft className="h-4 w-4" />
            </CarouselPrevious>
            <CarouselNext 
              className="static h-9 w-9 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800"
              aria-label={t("nextStrain") || "Next strain"}
            >
              <ChevronRight className="h-4 w-4" />
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </div>
  );
};
