
import { useState, useEffect } from "react";
import { useDevice } from "@/hooks/use-device";
import { ClubMap } from "@/components/map/ClubMap";
import { ClubList } from "@/components/clubs/ClubList";
import { useClubs } from "@/hooks/use-clubs";
import { useGeolocation } from "@/hooks/use-geolocation";
import { PageLayout } from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ClubFilter } from "@/types/club";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";

const Index = () => {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState<string>("map");
  const [filter, setFilter] = useState<ClubFilter>({ search: "" });
  const { clubs, loading } = useClubs(filter);
  const { latitude, longitude, error: locationError, loading: locationLoading, requestGeolocation } = useGeolocation();
  const { platform, deviceType, isReady } = useDevice();

  useEffect(() => {
    const hideSplash = async () => {
      if (Capacitor.isNativePlatform()) {
        await SplashScreen.hide();
      }
    };
    
    hideSplash();
  }, []);

  // Listen for custom tab change events
  useEffect(() => {
    const handleTabChange = (event: CustomEvent<{ tab: string }>) => {
      setActiveView(event.detail.tab);
    };

    window.addEventListener('changeTab', handleTabChange as EventListener);
    return () => {
      window.removeEventListener('changeTab', handleTabChange as EventListener);
    };
  }, []);

  useEffect(() => {
    if (isReady) {
      toast.message(t("welcomeTitle"), {
        description: t("welcomeMessage"),
      });
    }
  }, [isReady, t]);

  const handleLocationRequest = () => {
    requestGeolocation();
    toast.message(t("accessingLocation"), {
      description: t("locationDescription"),
    });
  };

  return (
    <PageLayout fullWidth className="p-0">
      <div className="min-h-[calc(100vh-4rem)]">
        <Tabs defaultValue="map" value={activeView} onValueChange={setActiveView} className="w-full">
          <div className="fixed top-16 left-0 right-0 z-10 bg-background border-b px-4 py-2">
            <div className="flex items-center justify-between max-w-screen-xl mx-auto">
              <div className="flex-1">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent">
                  {t("appName")}
                </h1>
              </div>
              <TabsList>
                <TabsTrigger value="map">{t("map")}</TabsTrigger>
                <TabsTrigger value="list">{t("list")}</TabsTrigger>
              </TabsList>
              <div className="flex-1 flex justify-end items-center space-x-2">
                <div className="hidden sm:block">
                  <LanguageSwitcher variant="minimal" />
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLocationRequest}
                  disabled={locationLoading}
                >
                  {locationLoading ? (
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m12 12 9-5-9-5-9 5 9 5Z"/><path d="m12 12 9 5-9 5-9-5 9-5Z"/><path d="M12 22V12"/></svg>
                  )}
                  {t("nearMe")}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-16">
            <TabsContent value="map" className="m-0">
              <ClubMap 
                clubs={clubs} 
                userLocation={{ latitude, longitude }}
                height="calc(100vh - 4rem)"
              />
            </TabsContent>
            
            <TabsContent value="list" className="m-0 max-w-screen-xl mx-auto p-4 md:p-8">
              <ClubList 
                clubs={clubs}
                loading={loading}
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
