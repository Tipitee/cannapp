
import { useState, useEffect } from "react";
import { useStrains } from "@/hooks/use-strains";
import { StrainCard } from "@/components/strains/StrainCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
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
  
  if (loading) {
    return (
      <div className="rounded-xl p-8 flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!strains || !strains.length) {
    return null;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{t("featuredStrains")}</h2>
        <Button 
          variant="ghost" 
          onClick={handleViewAll}
          className="font-medium text-primary hover:text-primary/80 hover:bg-transparent p-0"
        >
          {t("viewAll")} →
        </Button>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {strains.map((strain) => (
            <CarouselItem key={strain.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 h-full">
              <div className="h-full">
                <StrainCard key={strain.id} strain={strain} compact />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:flex md:items-center md:justify-end md:gap-2 md:absolute md:top-[-50px] md:right-0">
          <CarouselPrevious 
            className="static h-9 w-9 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800" 
            aria-label={t("previousStrain")}
          >
            <ChevronLeft className="h-4 w-4" />
          </CarouselPrevious>
          <CarouselNext 
            className="static h-9 w-9 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800"
            aria-label={t("nextStrain")}
          >
            <ChevronRight className="h-4 w-4" />
          </CarouselNext>
        </div>
      </Carousel>
    </div>
  );
};
