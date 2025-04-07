
import { useState, useEffect } from "react";
import { useDevice } from "@/hooks/use-device";
import { ClubMap } from "@/components/map/ClubMap";
import { ClubList } from "@/components/clubs/ClubList";
import { PageLayout } from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClubFilter } from "@/types/club";
import { toast } from "sonner";
import { Map, List, Home as HomeIcon } from "lucide-react";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import { Home } from "@/components/home/Home";
import { useLocation, useNavigate } from "react-router-dom";
import { useClubs } from "@/hooks/use-clubs";

const Index = () => {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState<string>("welcome");
  const [filter, setFilter] = useState<ClubFilter>({ search: "" });
  const { clubs, loading: clubsLoading } = useClubs(filter);
  const { isReady } = useDevice();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hideSplash = async () => {
      if (Capacitor.isNativePlatform()) {
        try {
          await SplashScreen.hide();
        } catch (e) {
          console.error("Error hiding splash screen:", e);
        }
      }
    };
    
    hideSplash();
  }, []);

  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveView(location.state.activeTab);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (isReady) {
      toast.message("Welcome to CannaClubMap", {
        description: "Discover cannabis social clubs near you and explore strains",
      });
    }
  }, [isReady, t]);
  
  const handleTabChange = (value: string) => {
    setActiveView(value);
    navigate('/', { replace: true });
  };

  return (
    <PageLayout fullWidth className="p-0">
      <div className="min-h-[calc(100vh-4rem)]">
        <Tabs defaultValue="welcome" value={activeView} onValueChange={handleTabChange} className="w-full">
          <div className="fixed top-16 left-0 right-0 z-40 bg-background border-b px-4 py-2">
            <div className="flex items-center justify-between max-w-screen-xl mx-auto">
              <div className="flex-1">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent flex items-center">
                  <img src="/lovable-uploads/f5f3ec12-79d0-4a71-b0da-2902bd23ce66.png" alt="CannaClubMap Logo" className="h-6 mr-2" />
                  CannaClubMap
                </h1>
              </div>
              <TabsList>
                <TabsTrigger value="welcome"><HomeIcon className="h-4 w-4 mr-1" />{t("welcome") || "Welcome"}</TabsTrigger>
                <TabsTrigger value="map"><Map className="h-4 w-4 mr-1" />{t("map") || "Map"}</TabsTrigger>
                <TabsTrigger value="list"><List className="h-4 w-4 mr-1" />{t("list") || "List"}</TabsTrigger>
              </TabsList>
              <div className="flex-1 flex justify-end items-center space-x-2">
                <div className="hidden sm:block">
                  <LanguageSwitcher variant="minimal" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-28 pb-20 md:pb-0">
            <TabsContent value="welcome" className="m-0 max-w-screen-xl mx-auto p-4 md:p-8">
              <Home />
            </TabsContent>
            
            <TabsContent value="map" className="m-0">
              <div className="w-full h-[calc(100vh-12rem)] md:h-[calc(100vh-8rem)] max-h-[80vh]">
                <ClubMap 
                  clubs={clubs} 
                  height="100%"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="list" className="m-0 max-w-screen-xl mx-auto p-4 md:p-8">
              <ClubList 
                clubs={clubs}
                loading={clubsLoading}
                onFilterChange={setFilter}
                filter={filter}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Index;
