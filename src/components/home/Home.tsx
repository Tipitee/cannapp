
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
    toast.message(t("accessingLocation"), {
      description: t("locationDescription"),
    });
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
        <h2 className="text-3xl font-bold text-center mb-2">{t("welcomeToApp")}</h2>
        <p className="text-muted-foreground text-center max-w-lg mx-auto">{t("welcomeDescription")}</p>
        
        <div className="mt-6 flex justify-center">
          <Button onClick={handleLocationRequest} className="bg-green-500 hover:bg-green-600">
            {t("findNearMe")}
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">{t("exploreFeatures")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <AppCard
            title={t("findClubs")}
            description={t("findClubsDesc")}
            icon={Map}
            onClick={() => window.dispatchEvent(new CustomEvent('changeTab', { detail: { tab: 'map' } }))}
          />
          <AppCard
            title={t("exploreStrains")}
            description={t("exploreStrainsDesc")}
            icon={Leaf}
            onClick={() => navigate('/strains')}
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
            icon={MessageSquare}
            onClick={() => navigate('/journal')}
          />
        </div>
      </div>

      <FeaturedStrains />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{t("nearbyClubs")}</h3>
          <Button variant="link" onClick={() => window.dispatchEvent(new CustomEvent('changeTab', { detail: { tab: 'map' } }))}>
            {t("viewMap")}
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
          <Button variant="outline" asChild>
            <Link to="/strains">{t("browseStrains")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
