
import { useState, useEffect } from "react";
import { useDevice } from "@/hooks/use-device";
import { ClubMap } from "@/components/map/ClubMap";
import { ClubList } from "@/components/clubs/ClubList";
import { PageLayout } from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ClubFilter } from "@/types/club";
import { toast } from "sonner";
import { Map, List, Home as HomeIcon } from "lucide-react";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import { Home } from "@/components/home/Home";
import { useLocation, useNavigate } from "react-router-dom";

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

  // Handle tab changes from location state
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveView(location.state.activeTab);
      // Clear the state after consuming it
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (isReady) {
      toast.message(t("welcomeTitle") || "Welcome to German Cannabis Club Finder", {
        description: t("welcomeMessage") || "Discover cannabis clubs near you",
      });
    }
  }, [isReady, t]);
  
  // Auto-collapse mobile navigation when clicking a section
  const handleTabChange = (value: string) => {
    setActiveView(value);
    // If you have a mobile drawer state, you could close it here
    // For example: setMobileDrawerOpen(false);
    
    // Use navigate to update the URL without the hash
    navigate('/', { replace: true });
  };

  return (
    <PageLayout fullWidth className="p-0">
      <div className="min-h-[calc(100vh-4rem)]">
        <Tabs defaultValue="welcome" value={activeView} onValueChange={handleTabChange} className="w-full">
          <div className="fixed top-16 left-0 right-0 z-10 bg-background border-b px-4 py-2">
            <div className="flex items-center justify-between max-w-screen-xl mx-auto">
              <div className="flex-1">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent">
                  {t("appName") || "Cannabis Club Finder"}
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
          
          <div className="pt-24">
            <TabsContent value="welcome" className="m-0 max-w-screen-xl mx-auto p-4 md:p-8">
              <Home />
            </TabsContent>
            
            <TabsContent value="map" className="m-0">
              <div className="w-full h-[calc(100vh-8rem)] max-h-[80vh]">
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
