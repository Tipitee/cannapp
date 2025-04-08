
import { useState } from "react";
import { StrainCard } from "@/components/strains/StrainCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Cannabis } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useStrains } from "@/hooks/use-strains";

export const FeaturedStrains = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Directly load strains without initial state management for better performance
  const { strains, loading } = useStrains({ limit: 8 });
  
  const handleViewAll = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/strains");
  };
  
  // Create placeholder cards for loading state
  const renderPlaceholderCards = () => {
    return Array(4).fill(0).map((_, index) => (
      <CarouselItem key={`placeholder-${index}`} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4">
        <div className="h-full w-full">
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
              description: "",
              rating: 0,
              reviewCount: 0,
            }} 
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
          <h2 className="text-2xl font-bold tracking-tight text-white">{t("featuredStrains") || "Featured Strains"}</h2>
          <Button 
            variant="ghost" 
            onClick={handleViewAll}
            className="font-medium text-purple-400 hover:text-purple-300 hover:bg-transparent p-0"
          >
            {t("viewAll") || "View All"} →
          </Button>
        </div>
        
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
          <Cannabis className="h-12 w-12 mx-auto text-gray-700 mb-4" />
          <h3 className="text-xl font-medium text-gray-300 mb-2">No Featured Strains</h3>
          <p className="text-gray-500 mb-4">Explore our strain collection to find your perfect match</p>
          <Button onClick={handleViewAll} className="bg-purple-600 hover:bg-purple-700 text-white">Browse All Strains</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-white">{t("featuredStrains") || "Featured Strains"}</h2>
        <Button 
          variant="ghost" 
          onClick={handleViewAll}
          className="font-medium text-purple-400 hover:text-purple-300 hover:bg-transparent p-0"
        >
          {t("viewAll") || "View All"} →
        </Button>
      </div>
      
      <div className="relative min-h-[320px]">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {loading ? renderPlaceholderCards() : (
              strains.map((strain) => (
                <CarouselItem key={strain.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4">
                  <div className="h-full w-full">
                    <StrainCard strain={strain} compact />
                  </div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <div className="flex md:items-center justify-end gap-2 mt-2">
            <CarouselPrevious 
              className="static h-9 w-9 rounded-full border border-gray-800 bg-gray-900 hover:bg-gray-800" 
              aria-label={t("previousStrain") || "Previous strain"}
            >
              <ChevronLeft className="h-4 w-4" />
            </CarouselPrevious>
            <CarouselNext 
              className="static h-9 w-9 rounded-full border border-gray-800 bg-gray-900 hover:bg-gray-800"
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
