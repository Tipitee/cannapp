
import { useState } from "react";
import { useStrains } from "@/hooks/use-strains";
import { StrainCard } from "@/components/strains/StrainCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">{t("featuredStrains") || "Featured Strains"}</h2>
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
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {renderPlaceholderCards()}
            </CarouselContent>
            <div className="hidden md:flex md:items-center md:justify-end md:gap-2 md:absolute md:top-[-50px] md:right-0">
              <CarouselPrevious 
                className="static h-9 w-9 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800" 
              />
              <CarouselNext 
                className="static h-9 w-9 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800"
              />
            </div>
          </Carousel>
        </div>
      </div>
    );
  }

  if (!strains || !strains.length) {
    return null;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{t("featuredStrains") || "Featured Strains"}</h2>
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
            {strains.map((strain) => (
              <CarouselItem key={strain.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="h-full">
                  <StrainCard key={strain.id} strain={strain} compact />
                </div>
              </CarouselItem>
            ))}
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
