
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, BookOpen, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const NavigationButtons = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <div className="mt-6 flex flex-wrap gap-3 justify-center">
      <Button variant="outline" onClick={() => navigate("/clubs")} className="gap-2">
        <MapPin className="h-4 w-4" />
        Find Clubs
      </Button>
      <Button variant="outline" onClick={() => navigate("/journal")} className="gap-2">
        <BookOpen className="h-4 w-4" />
        View Journal
      </Button>
      <Button variant="outline" onClick={() => navigate("/strains")} className="gap-2">
        <Leaf className="h-4 w-4" />
        Explore Strains
      </Button>
    </div>
  );
};
