
import { useState, useEffect } from "react";
import { useStrains } from "@/hooks/use-strains";
import { StrainCard } from "@/components/strains/StrainCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

export const FeaturedStrains = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { strains, loading } = useStrains({ search: "", limit: 8 });
  const navigate = useNavigate();
  const itemsToShow = 4;
  
  // Calculate the maximum starting index based on the available strains
  const maxStartIndex = Math.max(0, strains.length - itemsToShow);
  
  const nextSlide = () => {
    if (currentIndex + itemsToShow < strains.length) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    } else {
      setCurrentIndex(maxStartIndex);
    }
  };

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
  
  // Make sure we don't exceed array bounds
  const safeCurrentIndex = Math.min(currentIndex, maxStartIndex);
  
  const visibleStrains = strains
    .slice(safeCurrentIndex, safeCurrentIndex + itemsToShow)
    .filter(Boolean); // Ensure no undefined elements
  
  if (!visibleStrains.length) {
    return null;
  }

  const featuredStrainsText = t("featuredStrains") || "Featured Strains";
  const viewAllText = t("viewAll") || "View All";
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{featuredStrainsText}</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevSlide}
            type="button"
            aria-label="Previous strain"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextSlide}
            type="button"
            aria-label="Next strain"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="link" 
            onClick={handleViewAll}
          >
            {viewAllText}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {visibleStrains.map((strain) => (
          <StrainCard key={strain.id} strain={strain} compact />
        ))}
      </div>
    </div>
  );
};
