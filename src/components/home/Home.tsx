
import { useEffect } from "react";
import { useGeolocation } from "@/hooks/use-geolocation";
import { ClubMap } from "@/components/map/ClubMap";
import { useClubs } from "@/hooks/use-clubs";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Map as MapIcon, BookOpen, Search, MapPin, Leaf, Filter } from "lucide-react";
import { toast } from "sonner";
import { useStrains } from "@/hooks/use-strains";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Define AppCard component outside of Home component
const AppCard = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  className 
}: { 
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

export const Home = () => {
  const { t } = useLanguage();
  const { clubs } = useClubs({ search: "" });
  const { strains, loading: strainsLoading } = useStrains({ type: "all" });
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
  
  // Get up to 4 featured strains with different types
  const getFeaturedStrains = () => {
    if (strainsLoading || !strains.length) return [];
    
    // Fix: Use Map class instead of the Map icon
    const typeMap = new Map<string, boolean>();
    const featured = [];
    
    // Try to select one of each type if available
    for (const strain of strains) {
      const type = strain.type?.toLowerCase() || 'unknown';
      
      if (!typeMap.has(type) && featured.length < 4) {
        typeMap.set(type, true);
        featured.push(strain);
      }
      
      if (featured.length === 4) break;
    }
    
    // If we don't have 4 yet, add more strains
    if (featured.length < 4) {
      for (const strain of strains) {
        if (!featured.includes(strain) && featured.length < 4) {
          featured.push(strain);
        }
        
        if (featured.length === 4) break;
      }
    }
    
    return featured;
  };
  
  const featuredStrains = getFeaturedStrains();
  
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
            <p className="text-white/90 text-lg mb-6">Find cannabis social clubs near you and discover perfect strains for your needs</p>
            
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => navigate('/clubs')} className="bg-white text-app-primary hover:bg-white/90 border-0">
                <Map className="h-4 w-4 mr-2" />
                Find Clubs
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-app-primary" onClick={() => navigate('/strains')}>
                <Leaf className="h-4 w-4 mr-2" />
                Explore Strains
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-app-primary">App Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AppCard
            title="Find Clubs"
            description="Locate cannabis clubs near you with our interactive map"
            icon={MapIcon}
            onClick={() => navigate('/clubs')}
          />
          <AppCard
            title="Track in Journal"
            description="Keep a personal cannabis journal to record your experiences"
            icon={BookOpen}
            onClick={() => navigate('/journal')}
          />
          <AppCard
            title="Explore Strains"
            description="Discover cannabis strains with detailed profiles and effects"
            icon={Leaf}
            onClick={() => navigate('/strains')}
          />
        </div>
      </div>

      {/* Featured Strains section */}
      {featuredStrains.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-app-primary">Featured Strains</h3>
            <Button variant="outline" onClick={() => navigate('/strains')} className="gap-2">
              <Leaf className="h-4 w-4" />
              View All Strains
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredStrains.map((strain, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-all">
                <Link to={`/strains/${strain.name}`}>
                  <div className="aspect-square bg-muted overflow-hidden">
                    {strain.img_url ? (
                      <img 
                        src={strain.img_url} 
                        alt={strain.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-900">
                        <span className="text-4xl">🌿</span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-medium text-md truncate">{strain.name}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="capitalize">
                        {strain.type || "Unknown"}
                      </Badge>
                      {strain.thc_level && (
                        <Badge variant="secondary" className="text-xs">
                          THC: {strain.thc_level.toFixed(1)}%
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Navigation buttons */}
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
    </div>
  );
};
