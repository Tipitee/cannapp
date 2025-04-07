
import { useEffect } from "react";
import { useGeolocation } from "@/hooks/use-geolocation";
import { ClubMap } from "@/components/map/ClubMap";
import { useClubs } from "@/hooks/use-clubs";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { FeaturedStrains } from "@/components/strains/FeaturedStrains";
import { Leaf, Map, Users, BookOpen, MessageSquare, Search, MapPin, PlusCircle } from "lucide-react";
import { toast } from "sonner";

export const Home = () => {
  const { t } = useLanguage();
  const { clubs } = useClubs({ search: "" });
  const { latitude, longitude, requestGeolocation } = useGeolocation();
  const navigate = useNavigate();
  
  const handleLocationRequest = () => {
    requestGeolocation();
    toast.message(t("accessingLocation") || "Accessing Location", {
      description: t("locationDescription") || "We'll show you clubs near your current location",
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
      className={`cursor-pointer group rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 ${className}`} 
      onClick={onClick}
    >
      <div className="p-6">
        <div className="rounded-full w-12 h-12 flex items-center justify-center bg-pink-500/10 text-pink-500 mb-4">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-semibold text-xl mb-2 group-hover:text-pink-500 transition-colors">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
  
  return (
    <div className="space-y-12">
      {/* Hero section */}
      <div className="relative">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 md:p-12 overflow-hidden">
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
            <div className="flex items-center mb-4 gap-3">
              <img src="/lovable-uploads/f5f3ec12-79d0-4a71-b0da-2902bd23ce66.png" alt="CannaClubMap Logo" className="h-10" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">{t("welcomeToApp") || "Welcome to CannaClubMap"}</h2>
            </div>
            <p className="text-white/90 text-lg mb-6">{t("welcomeDescription") || "Find cannabis clubs near you and explore strains"}</p>
            
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleLocationRequest} className="bg-white text-pink-600 hover:bg-white/90 border-0">
                <MapPin className="h-4 w-4 mr-2" />
                {t("findNearMe")}
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-pink-600" onClick={() => navigate('/strains')}>
                <Leaf className="h-4 w-4 mr-2" />
                {t("exploreStrains")}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">{t("exploreFeatures")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AppCard
            title={t("findClubs")}
            description={t("findClubsDesc")}
            icon={Map}
            onClick={() => handleChangeTab('map')}
          />
          <AppCard
            title={t("exploreStrains")}
            description={t("exploreStrainsDesc")}
            icon={Leaf}
            onClick={() => navigate('/strains')}
            className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20"
          />
          <AppCard
            title={t("community")}
            description={t("communityDesc")}
            icon={Users}
            onClick={() => navigate('/community')}
          />
          <AppCard
            title={t("journal")}
            description={t("journalDesc")}
            icon={BookOpen}
            onClick={() => navigate('/journal')}
          />
        </div>
      </div>

      {/* Featured Strains section */}
      <div className="pt-4">
        <FeaturedStrains />
      </div>

      {/* Nearby Clubs section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold">{t("nearbyClubs")}</h3>
          <Button variant="ghost" onClick={() => handleChangeTab('map')} className="font-medium text-pink-500 hover:text-pink-600 hover:bg-transparent p-0">
            {t("viewMap")} →
          </Button>
        </div>
        <div className="h-80 rounded-xl overflow-hidden border shadow">
          <ClubMap 
            clubs={clubs.slice(0, 5)} 
            userLocation={{ latitude, longitude }}
            height="100%"
          />
        </div>
        
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Button variant="outline" onClick={() => handleChangeTab('map')} className="gap-2">
            <Search className="h-4 w-4" />
            {t("findClubs")}
          </Button>
          <Button variant="outline" onClick={() => navigate("/strains")} className="gap-2">
            <Leaf className="h-4 w-4" />
            {t("browseStrains")}
          </Button>
          <Button variant="outline" onClick={() => navigate("/journal")} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            {t("startJournal")}
          </Button>
        </div>
      </div>
    </div>
  );
};
