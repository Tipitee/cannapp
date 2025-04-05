
import { useState } from "react";
import { useStrains } from "@/hooks/use-strains";
import { StrainCard } from "@/components/strains/StrainCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

export const FeaturedStrains = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { strains, loading } = useStrains({ search: "", limit: 8 });
  const itemsToShow = 4;
  
  const nextSlide = () => {
    if (currentIndex + itemsToShow < strains.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(Math.max(0, strains.length - itemsToShow));
    }
  };
  
  if (loading) {
    return (
      <Card className="p-12 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  if (!strains.length) {
    return null;
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("featuredStrains")}</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevSlide}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="link" asChild>
            <Link to="/strains">{t("viewAll")}</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {strains
          .slice(currentIndex, currentIndex + itemsToShow)
          .map((strain) => (
            <StrainCard key={strain.id} strain={strain} compact />
          ))}
      </div>
    </div>
  );
};
