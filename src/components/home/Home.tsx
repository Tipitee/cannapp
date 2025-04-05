
import { useEffect } from "react";
import { useGeolocation } from "@/hooks/use-geolocation";
import { ClubMap } from "@/components/map/ClubMap";
import { useClubs } from "@/hooks/use-clubs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { FeaturedStrains } from "@/components/strains/FeaturedStrains";
import { Leaf, Map, Users, BookOpen, MessageSquare } from "lucide-react";
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
  
  const AppCard = ({ title, description, icon: Icon, onClick }: { 
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    onClick: () => void;
  }) => (
    <Card className="cursor-pointer hover:shadow-md transition-all" onClick={onClick}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-green-500" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-center mb-2">{t("welcomeToApp") || "Welcome to Cannabis Club Finder"}</h2>
        <p className="text-muted-foreground text-center max-w-lg mx-auto">{t("welcomeDescription") || "Discover cannabis clubs, explore strains, and connect with the community."}</p>
        
        <div className="mt-6 flex justify-center">
          <Button onClick={handleLocationRequest} className="bg-green-500 hover:bg-green-600">
            {t("findNearMe") || "Find Near Me"}
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">{t("exploreFeatures") || "Explore Features"}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <AppCard
            title={t("findClubs") || "Find Clubs"}
            description={t("findClubsDesc") || "Discover cannabis clubs in your area"}
            icon={Map}
            onClick={() => handleChangeTab('map')}
          />
          <AppCard
            title={t("exploreStrains") || "Explore Strains"}
            description={t("exploreStrainsDesc") || "Browse and learn about different cannabis strains"}
            icon={Leaf}
            onClick={() => navigate('/strains')}
          />
          <AppCard
            title={t("community") || "Community"}
            description={t("communityDesc") || "Connect with other cannabis enthusiasts"}
            icon={Users}
            onClick={() => navigate('/community')}
          />
          <AppCard
            title={t("journal") || "Journal"}
            description={t("journalDesc") || "Track your personal cannabis experiences"}
            icon={MessageSquare}
            onClick={() => navigate('/journal')}
          />
        </div>
      </div>

      <FeaturedStrains />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{t("nearbyClubs") || "Nearby Clubs"}</h3>
          <Button variant="link" onClick={() => handleChangeTab('map')}>
            {t("viewMap") || "View Map"}
          </Button>
        </div>
        <div className="h-64 rounded-xl overflow-hidden border">
          <ClubMap 
            clubs={clubs.slice(0, 5)} 
            userLocation={{ latitude, longitude }}
            height="100%"
          />
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button variant="outline" onClick={() => navigate("/strains")}>
            {t("browseStrains") || "Browse Strains"}
          </Button>
        </div>
      </div>
    </div>
  );
};
