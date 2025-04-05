import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Strain } from "@/types/strain";
import { useLanguage } from "@/contexts/LanguageContext";
import { Award, Leaf, Dna, Beaker, Info } from "lucide-react";

interface StrainDetailTabsProps {
  strain: Strain;
}

export const StrainDetailTabs = ({ strain }: StrainDetailTabsProps) => {
  const { t } = useLanguage();
  
  return (
    <Tabs defaultValue="details" className="mt-6">
      <TabsList className="grid grid-cols-4 md:grid-cols-5 mb-2">
        <TabsTrigger value="details">
          <Info className="h-4 w-4 mr-2 hidden sm:inline-block" />
          {t("details")}
        </TabsTrigger>
        <TabsTrigger value="genetics">
          <Dna className="h-4 w-4 mr-2 hidden sm:inline-block" />
          {t("genetics")}
        </TabsTrigger>
        <TabsTrigger value="growInfo">
          <Leaf className="h-4 w-4 mr-2 hidden sm:inline-block" />
          {t("growInfo")}
        </TabsTrigger>
        <TabsTrigger value="terpenes">
          <Beaker className="h-4 w-4 mr-2 hidden sm:inline-block" />
          {t("topTerpenes")}
        </TabsTrigger>
        <TabsTrigger value="reviews" className="hidden md:flex">
          <Award className="h-4 w-4 mr-2 hidden sm:inline-block" />
          {t("userReviews")}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="mt-4 space-y-4 animate-fade-in">
        <div>
          <h3 className="font-medium mb-2">{t("description")}</h3>
          <p className="text-gray-700 dark:text-gray-300">{strain.description}</p>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">{t("effects")}</h3>
            <div className="flex flex-wrap gap-2">
              {strain.effects.map((effect, index) => (
                <Badge key={index} variant="secondary" className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 dark:bg-indigo-900 dark:hover:bg-indigo-800 dark:text-indigo-200">
                  {t(effect)}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">{t("medicalUses")}</h3>
            <div className="flex flex-wrap gap-2">
              {strain.medicalUses.map((use, index) => (
                <Badge key={index} variant="outline" className="bg-green-50 border-green-200 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:border-green-900 dark:text-green-400 dark:hover:bg-green-900/30">
                  {t(use) || use}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium mb-2">{t("flavors")}</h3>
          <div className="flex flex-wrap gap-2">
            {strain.flavors.map((flavor, index) => (
              <Badge key={index} className="bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/40">
                {flavor}
              </Badge>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium mb-2">{t("bestFor")}</h3>
          <div className="flex flex-wrap gap-2">
            {strain.medicalUses.map((use, index) => (
              <Badge key={index} className="bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/40">
                {use}
              </Badge>
            ))}
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="genetics" className="mt-4 space-y-4 animate-fade-in">
        <div>
          <h3 className="font-medium mb-2">{t("lineage")}</h3>
          <p className="text-gray-700 dark:text-gray-300">
            {strain.name} is a {strain.type} strain with complex genetic heritage.
          </p>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium mb-2">{t("parentStrains")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="font-medium">Parent 1</p>
              <p className="text-gray-700 dark:text-gray-300">Unknown {strain.type} strain</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="font-medium">Parent 2</p>
              <p className="text-gray-700 dark:text-gray-300">Unknown {strain.type} strain</p>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="growInfo" className="mt-4 space-y-4 animate-fade-in">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">{t("floweringTime")}</p>
            <p className="font-medium">7-9 weeks</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">{t("height")}</p>
            <p className="font-medium">Medium</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">{t("yield")}</p>
            <p className="font-medium">Moderate to High</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">{t("difficulty")}</p>
            <p className="font-medium">Moderate</p>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium mb-2">{t("indoorOutdoor")}</h3>
          <p className="text-gray-700 dark:text-gray-300">
            This strain can be cultivated both indoors and outdoors, but performs best in a controlled indoor environment with moderate humidity and consistent temperatures between 68-80°F.
          </p>
        </div>
      </TabsContent>
      
      <TabsContent value="terpenes" className="mt-4 space-y-4 animate-fade-in">
        <div>
          <h3 className="font-medium mb-2">{t("topTerpenes")}</h3>
          <div className="space-y-4">
            {strain.flavors.slice(0, 3).map((flavor, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">{flavor}</span>
                  <span>{Math.round(Math.random() * 30 + 10)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${Math.round(Math.random() * 30 + 10)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {getTerpeneDescription(flavor)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="reviews" className="mt-4 animate-fade-in">
        <div className="text-center py-8">
          <p className="text-gray-500">{t("reviewsInSeparateTab")}</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

function getTerpeneDescription(terpene: string): string {
  const descriptions: Record<string, string> = {
    earthy: "Provides grounding, woody notes and is often associated with calming effects.",
    sweet: "Adds a candy-like sweetness and is often found in dessert-inspired strains.",
    citrus: "Offers bright, uplifting notes and may contribute to energizing effects.",
    pine: "Brings forest-like freshness and may help with mental clarity.",
    woody: "Delivers rich, natural wood notes and often has a balancing effect.",
    berry: "Provides fruity sweetness reminiscent of fresh berries.",
    spicy: "Adds pungent, peppery notes that can create a warming sensation.",
    herbal: "Contributes fresh, plant-like notes similar to herbs and botanicals.",
    diesel: "Gives a fuel-like pungency that's often associated with potent sativas.",
    floral: "Adds fragrant flower-like aromas that can enhance mood and relaxation.",
  };
  
  return descriptions[terpene.toLowerCase()] || "A distinctive aroma that contributes to this strain's unique profile.";
}
