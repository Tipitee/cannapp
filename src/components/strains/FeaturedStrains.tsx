
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
      <Card className="p-12 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  if (!strains || !strains.length) {
    return null;
  }
  
  const featuredStrainsText = t("featuredStrains") || "Featured Strains";
  const viewAllText = t("viewAll") || "View All";
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{featuredStrainsText}</h2>
        <Button 
          variant="link" 
          onClick={handleViewAll}
          className="font-medium"
        >
          {viewAllText}
        </Button>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="py-2">
          {strains.map((strain) => (
            <CarouselItem key={strain.id} className="pl-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div className="p-1">
                <StrainCard key={strain.id} strain={strain} compact />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:flex md:items-center md:justify-end md:gap-2 md:absolute md:top-[-50px] md:right-0">
          <CarouselPrevious 
            className="static h-8 w-8 translate-y-0 rounded-full" 
            aria-label="Previous strain"
          />
          <CarouselNext 
            className="static h-8 w-8 translate-y-0 rounded-full"
            aria-label="Next strain"
          />
        </div>
      </Carousel>
    </div>
  );
};
