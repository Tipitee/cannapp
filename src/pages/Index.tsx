
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
import { Loader2, Leaf, Map, List, Home, User, Settings, MessageSquare, Star, Users } from "lucide-react";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useStrains } from "@/hooks/use-strains";
import { StrainCard } from "@/components/strains/StrainCard";
import { Link } from "react-router-dom";

const Index = () => {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState<string>("welcome");
  const [filter, setFilter] = useState<ClubFilter>({ search: "" });
  const { clubs, loading: clubsLoading } = useClubs(filter);
  const { strains, loading: strainsLoading } = useStrains({ search: "", limit: 4 });
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
    <PageLayout fullWidth className="p-0">
      <div className="min-h-[calc(100vh-4rem)]">
        <Tabs defaultValue="welcome" value={activeView} onValueChange={setActiveView} className="w-full">
          <div className="fixed top-16 left-0 right-0 z-10 bg-background border-b px-4 py-2">
            <div className="flex items-center justify-between max-w-screen-xl mx-auto">
              <div className="flex-1">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent">
                  {t("appName")}
                </h1>
              </div>
              <TabsList>
                <TabsTrigger value="welcome"><Home className="h-4 w-4 mr-1" />{t("welcome")}</TabsTrigger>
                <TabsTrigger value="map"><Map className="h-4 w-4 mr-1" />{t("map")}</TabsTrigger>
                <TabsTrigger value="list"><List className="h-4 w-4 mr-1" />{t("list")}</TabsTrigger>
                <TabsTrigger value="strains"><Leaf className="h-4 w-4 mr-1" />{t("strains")}</TabsTrigger>
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
          
          <div className="pt-24">
            <TabsContent value="welcome" className="m-0 max-w-screen-xl mx-auto p-4 md:p-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-center mb-2">{t("welcomeToApp")}</h2>
                  <p className="text-muted-foreground text-center max-w-lg mx-auto">{t("welcomeDescription")}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">{t("exploreFeatures")}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <AppCard
                      title={t("findClubs")}
                      description={t("findClubsDesc")}
                      icon={Map}
                      onClick={() => setActiveView("map")}
                    />
                    <AppCard
                      title={t("exploreStrains")}
                      description={t("exploreStrainsDesc")}
                      icon={Leaf}
                      onClick={() => setActiveView("strains")}
                    />
                    <AppCard
                      title={t("community")}
                      description={t("communityDesc")}
                      icon={Users}
                      onClick={() => window.location.href = "/community"}
                    />
                    <AppCard
                      title={t("journal")}
                      description={t("journalDesc")}
                      icon={MessageSquare}
                      onClick={() => window.location.href = "/journal"}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{t("featuredStrains")}</h3>
                    <Button variant="link" asChild>
                      <Link to="/strains">{t("viewAll")}</Link>
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {strainsLoading ? (
                      <div className="col-span-full flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      </div>
                    ) : (
                      strains.slice(0, 4).map((strain) => (
                        <StrainCard key={strain.id} strain={strain} compact />
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{t("nearbyClubs")}</h3>
                    <Button variant="link" onClick={() => setActiveView("map")}>{t("viewMap")}</Button>
                  </div>
                  <div className="h-64 rounded-xl overflow-hidden border">
                    <ClubMap 
                      clubs={clubs.slice(0, 5)} 
                      userLocation={{ latitude, longitude }}
                      height="100%"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="map" className="m-0">
              <ClubMap 
                clubs={clubs} 
                userLocation={{ latitude, longitude }}
                height="calc(100vh - 8rem)"
              />
            </TabsContent>
            
            <TabsContent value="list" className="m-0 max-w-screen-xl mx-auto p-4 md:p-8">
              <ClubList 
                clubs={clubs}
                loading={clubsLoading}
                onFilterChange={setFilter}
                filter={filter}
              />
            </TabsContent>

            <TabsContent value="strains" className="m-0 max-w-screen-xl mx-auto p-4 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{t("popularStrains")}</h2>
                <p className="text-muted-foreground">{t("popularStrainsDesc")}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {strainsLoading ? (
                  <div className="col-span-full flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  strains.map((strain) => (
                    <StrainCard key={strain.id} strain={strain} />
                  ))
                )}
              </div>
              
              <div className="flex justify-center mt-8">
                <Button asChild>
                  <Link to="/strains">{t("viewAllStrains")}</Link>
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Index;
