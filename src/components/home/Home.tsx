
import { useEffect } from "react";
import { useGeolocation } from "@/hooks/use-geolocation";
import { ClubMap } from "@/components/map/ClubMap";
import { useClubs } from "@/hooks/use-clubs";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { FeaturedStrains } from "@/components/strains/FeaturedStrains";
import { Leaf, Map, BookOpen, Search, MapPin } from "lucide-react";
import { toast } from "sonner";

export const Home = () => {
  const { t } = useLanguage();
  const { clubs } = useClubs({ search: "" });
  const { latitude, longitude, requestGeolocation } = useGeolocation();
  const navigate = useNavigate();
  
  const handleLocationRequest = () => {
    requestGeolocation();
    toast.message("Accessing Your Location", {
      description: "We'll show you cannabis clubs near your current location",
    });
  };
  
  const handleChangeTab = (tab: string) => {
    // Use the navigate API with state to indicate which tab should be active
    navigate("/", { state: { activeTab: tab } });
  };
  
  const AppCard = ({ title, description, icon: Icon, onClick, className }: { 
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    onClick: () => void;
    className?: string;
  }) => (
    <div 
      className={`cursor-pointer group rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-app-card dark:to-app-background ${className}`} 
      onClick={onClick}
    >
      <div className="p-6">
        <div className="rounded-full w-12 h-12 flex items-center justify-center bg-app-primary/10 text-app-primary mb-4">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-semibold text-xl mb-2 group-hover:text-app-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
  
  return (
    <div className="space-y-12">
      {/* Hero section */}
      <div className="relative">
        <div className="bg-gradient-to-r from-app-primary to-app-secondary rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M50,2.5L2.5,35v30L50,97.5l47.5-32.5v-30L50,2.5z" stroke="currentColor" strokeWidth="0.5" fill="none"></path>
              <path d="M50,35L2.5,67.5L50,97.5l47.5-30L50,35z" stroke="currentColor" strokeWidth="0.5" fill="none"></path>
              <path d="M50,2.5L2.5,35L50,65l47.5-30L50,2.5z" stroke="currentColor" strokeWidth="0.5" fill="none"></path>
              <path d="M2.5,35v30l47.5,30V65L2.5,35z" stroke="currentColor" strokeWidth="0.5" fill="none"></path>
              <path d="M97.5,35v30l-47.5,30V65L97.5,35z" stroke="currentColor" strokeWidth="0.5" fill="none"></path>
            </svg>
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome to CannaClubMap</h2>
            <p className="text-white/90 text-lg mb-6">Find cannabis social clubs near you and explore strains with our comprehensive guide</p>
            
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => navigate('/strains')} className="bg-white text-app-primary hover:bg-white/90 border-0">
                <Leaf className="h-4 w-4 mr-2" />
                Browse Strains
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-app-primary" onClick={() => navigate('/journal')}>
                <BookOpen className="h-4 w-4 mr-2" />
                My Journal
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-app-primary">App Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AppCard
            title="Explore Strains"
            description="Browse our extensive library of cannabis strains with detailed information"
            icon={Leaf}
            onClick={() => navigate('/strains')}
          />
          <AppCard
            title="Track in Journal"
            description="Keep a personal cannabis journal to record your experiences"
            icon={BookOpen}
            onClick={() => navigate('/journal')}
          />
          <AppCard
            title="Find Perfect Match"
            description="Discover strains based on your preferences and needs"
            icon={Search}
            onClick={() => navigate('/strains')}
          />
        </div>
      </div>

      {/* Featured Strains section */}
      <div className="pt-4">
        <FeaturedStrains />
      </div>

      {/* Nearby Clubs section */}
      <div>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate("/strains")} className="gap-2">
            <Leaf className="h-4 w-4" />
            Browse Strains
          </Button>
          <Button variant="outline" onClick={() => navigate("/journal")} className="gap-2">
            <BookOpen className="h-4 w-4" />
            View Journal
          </Button>
        </div>
      </div>
    </div>
  );
};
