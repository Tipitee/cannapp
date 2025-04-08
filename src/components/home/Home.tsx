
import { useStrains } from "@/hooks/use-strains";
import { HomeHero } from "./HomeHero";
import { AppFeatures } from "./AppFeatures";
import { FeaturedStrains } from "./FeaturedStrains";
import { NavigationButtons } from "./NavigationButtons";

export const Home = () => {
  const { strains, loading: strainsLoading } = useStrains({ type: "all" });
  
  // Get up to 4 featured strains with different types
  const getFeaturedStrains = () => {
    if (strainsLoading || !strains.length) return [];
    
    // Use JavaScript's Map class instead of the Lucide Map icon
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
      <HomeHero />
      <AppFeatures />
      {featuredStrains.length > 0 && <FeaturedStrains strains={featuredStrains} />}
      <NavigationButtons />
    </div>
  );
};
