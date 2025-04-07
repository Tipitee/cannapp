
import { PageLayout } from "@/components/layout/PageLayout";
import { StrainList } from "@/components/strains/StrainList";
import { useLanguage } from "@/contexts/LanguageContext";
import { Cannabis, Search, Filter, Leaf, Dna } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Strains = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already handled by state and passed to StrainList
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <PageLayout>
      <div className="space-y-6 animate-fade-in pb-20 md:pb-0">
        {/* Hero section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 mb-8">
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <path d="M203.5,51.5c-4.3-7.2-9.6-13.7-16.2-19.1c-1.5-1.2-2.9-2.4-4.1-3.9c-0.7-1-1.6-1.6-2.7-2 c-1.9-0.5-3.5,0.2-4.5,2c-1.6,3-2.5,6.2-3.5,9.4c-2.6,8.5-3.4,17.2-3.3,26.1c0.1,6.5,0.8,12.8,2.5,19.1c1.4,5.3,3.4,10.3,6.1,15 c1.3,2.2,2.8,4.3,4.9,6c1.7,1.4,3.7,2.4,5.8,3.1c3,1.1,6.1,1.4,9.2,1.8c3.5,0.4,7,0.4,10.5,0c5.1-0.5,10-1.8,14.5-4.1 c3.2-1.6,6.1-3.7,8.6-6.3c3.5-3.6,6.3-7.7,8.6-12.2c2.4-4.7,4.2-9.6,5.5-14.8c1.5-6,2.3-12.1,2.4-18.3c0.1-3.8-0.1-7.5-0.6-11.3 c-0.3-2.2-0.7-4.4-1.7-6.4c-1-2-2.3-3.3-4.5-3.7c-1.5-0.3-2.7,0.3-3.8,1.3c-1.5,1.3-2.9,2.8-4.2,4.3c-6.1,6.8-10.5,14.6-13.9,23.1 C211,41.2,207.6,46.5,203.5,51.5z M282.8,110.9c-4.3-5.9-9.5-11-15.6-15.1c-2.6-1.7-5.3-3.2-8.3-4.1c-2-0.6-4-1-6.1-0.5 c-2.6,0.6-3.5,2.8-2.1,5c0.7,1.1,1.5,2.1,2.5,3c7.4,7,13,15.1,17.1,24.4c1.3,3,2.2,6.1,2.8,9.4c0.6,3.7,0.3,7.3-0.1,11 c-0.8,7.7-2.8,15-6.5,21.8c-2.3,4.2-5.2,7.9-8.7,11c-1.2,1.1-2.7,2-4.3,2c-3.2,0.1-5.5-2-6.6-4.7c-1.6-3.8-2-7.9-2.1-12 c-0.1-11.4,1.6-22.5,5.5-33.3c0.8-2.3,1.8-4.5,2.7-6.7c-3.8-3.5-8-6.3-12.8-8.2c-13.7-5.4-27.3-5.5-40.9,0.1 c-1.8,0.8-3.6,1.7-5.2,2.8c-1.8,1.2-3.1,2.8-3.7,4.9c-0.6,2.2-0.3,4.3,0.9,6.3c2.7,4.3,6.6,7.3,11.2,9.5c8.1,3.9,16.7,5.5,25.7,5.2 c1.1,0,1.1,0,0.8,0.9c-2.7,8.9-4.2,17.9-4.3,27.2c-0.1,7.9,0.8,15.7,3.5,23.2c2,5.5,4.8,10.4,8.8,14.6c3.2,3.4,7,5.7,11.5,6.7 c3.9,0.9,7.8,0.9,11.6-0.2c5.1-1.5,9.3-4.5,13-8.2c7.7-7.8,12.9-17.2,15.9-27.9c2.2-7.9,3.1-15.9,2.5-24c-0.4-6.2-1.8-12.3-4-18.1 C286.1,119.3,284.6,114.9,282.8,110.9z M128,110.9c4.3-5.9,9.5-11,15.6-15.1c2.6-1.7,5.3-3.2,8.3-4.1c2-0.6,4-1,6.1-0.5 c2.6,0.6,3.5,2.8,2.1,5c-0.7,1.1-1.5,2.1-2.5,3c-7.4,7-13,15.1-17.1,24.4c-1.3,3-2.2,6.1-2.8,9.4c-0.6,3.7-0.3,7.3,0.1,11 c0.8,7.7,2.8,15,6.5,21.8c2.3,4.2,5.2,7.9,8.7,11c1.2,1.1,2.7,2,4.3,2c3.2,0.1,5.5-2,6.6-4.7c1.6-3.8,2-7.9,2.1-12 c0.1-11.4-1.6-22.5-5.5-33.3c-0.8-2.3-1.8-4.5-2.7-6.7c3.8-3.5,8-6.3,12.8-8.2c13.7-5.4,27.3-5.5,40.9,0.1c1.8,0.8,3.6,1.7,5.2,2.8 c1.8,1.2,3.1,2.8,3.7,4.9c0.6,2.2,0.3,4.3-0.9,6.3c-2.7,4.3-6.6,7.3-11.2,9.5c-8.1,3.9-16.7,5.5-25.7,5.2c-1.1,0-1.1,0-0.8,0.9 c2.7,8.9,4.2,17.9,4.3,27.2c0.1,7.9-0.8,15.7-3.5,23.2c-2,5.5-4.8,10.4-8.8,14.6c-3.2,3.4-7,5.7-11.5,6.7c-3.9,0.9-7.8,0.9-11.6-0.2 c-5.1-1.5-9.3-4.5-13-8.2c-7.7-7.8-12.9-17.2-15.9-27.9c-2.2-7.9-3.1-15.9-2.5-24c0.4-6.2,1.8-12.3,4-18.1 C124.7,119.3,126.2,114.9,128,110.9z M203.5,237c4.3-7.2,9.6-13.7,16.2-19.1c1.5-1.2,2.9-2.4,4.1-3.9c0.7-1,1.6-1.6,2.7-2 c1.9-0.5,3.5,0.2,4.5,2c1.6,3,2.5,6.2,3.5,9.4c2.6,8.5,3.4,17.2,3.3,26.1c-0.1,6.5-0.8,12.8-2.5,19.1c-1.4,5.3-3.4,10.3-6.1,15 c-1.3,2.2-2.8,4.3-4.9,6c-1.7,1.4-3.7,2.4-5.8,3.1c-3,1.1-6.1,1.4-9.2,1.8c-3.5,0.4-7,0.4-10.5,0c-5.1-0.5-10-1.8-14.5-4.1 c-3.2-1.6-6.1-3.7-8.6-6.3c-3.5-3.6-6.3-7.7-8.6-12.2c-2.4-4.7-4.2-9.6-5.5-14.8c-1.5-6-2.3-12.1-2.4-18.3c-0.1-3.8,0.1-7.5,0.6-11.3 c0.3-2.2,0.7-4.4,1.7-6.4c1-2,2.3-3.3,4.5-3.7c1.5-0.3,2.7,0.3,3.8,1.3c1.5,1.3,2.9,2.8,4.2,4.3c6.1,6.8,10.5,14.6,13.9,23.1 C196,226.7,199.4,232,203.5,237z" />
            </svg>
          </div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 dark:bg-purple-500/30 text-purple-500">
                  <Cannabis className="h-4 w-4" />
                  <span className="text-sm font-medium">{t("strains") || "Strains"}</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  {t("strainExplorer") || "Strain Explorer"}
                </h1>
                <p className="text-gray-300 max-w-2xl">
                  {t("findYourStrain") || "Find the perfect strain for your needs - browse by effects, potency, or type"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick navigation cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="hover:shadow-md transition-all cursor-pointer border-gray-200 dark:border-gray-800">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-lg">{t("byType") || "By Type"}</h3>
                <p className="text-sm text-muted-foreground">Sativa, Indica, or Hybrid</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all cursor-pointer border-gray-200 dark:border-gray-800">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <Dna className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-medium text-lg">{t("byEffects") || "By Effects"}</h3>
                <p className="text-sm text-muted-foreground">Relaxing, Energizing, Focus</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all cursor-pointer border-gray-200 dark:border-gray-800">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <Filter className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-medium text-lg">{t("byPotency") || "By Potency"}</h3>
                <p className="text-sm text-muted-foreground">THC & CBD levels</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main search area */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder={t("searchStrains") || "Search strains by name, effect, or type..."}
              className="pl-10 border-gray-700 dark:border-gray-800/30 focus:border-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={t("searchStrains") || "Search strains"}
            />
          </div>
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            {t("search") || "Search"}
          </Button>
        </form>

        {/* Type selector tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full mb-6">
          <TabsList className="w-full grid grid-cols-4 bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg">
            <TabsTrigger 
              value="all"
              className={cn(
                "rounded-md transition-all",
                activeTab === "all" ? "bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400" : "text-gray-600 dark:text-gray-300"
              )}
            >
              {t("all") || "All"}
            </TabsTrigger>
            <TabsTrigger 
              value="sativa"
              className={cn(
                "rounded-md transition-all",
                activeTab === "sativa" ? "bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400" : "text-gray-600 dark:text-gray-300"
              )}
            >
              {t("sativa") || "Sativa"}
            </TabsTrigger>
            <TabsTrigger 
              value="indica"
              className={cn(
                "rounded-md transition-all",
                activeTab === "indica" ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-300"
              )}
            >
              {t("indica") || "Indica"}
            </TabsTrigger>
            <TabsTrigger 
              value="hybrid"
              className={cn(
                "rounded-md transition-all",
                activeTab === "hybrid" ? "bg-white dark:bg-gray-700 text-amber-600 dark:text-amber-400" : "text-gray-600 dark:text-gray-300"
              )}
            >
              {t("hybrid") || "Hybrid"}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <StrainList initialSearch={searchQuery} activeTab={activeTab} />
      </div>
    </PageLayout>
  );
};

export default Strains;
