
import { Strain } from "@/types/strain";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface StrainCardProps {
  strain: Strain;
}

export function StrainCard({ strain }: StrainCardProps) {
  const { t } = useLanguage();
  
  // Get top 3 effects with highest values
  const getTopEffects = () => {
    const effectsMap: Record<string, string | undefined> = {
      relaxed: strain.relaxed,
      happy: strain.happy,
      euphoric: strain.euphoric,
      uplifted: strain.uplifted,
      sleepy: strain.sleepy,
      creative: strain.creative,
      energetic: strain.energetic,
      focused: strain.focused,
    };

    return Object.entries(effectsMap)
      .filter(([_, value]) => value && value !== '0')
      .sort((a, b) => Number(b[1]) - Number(a[1]))
      .slice(0, 3)
      .map(([key]) => key);
  };
  
  const topEffects = getTopEffects();
  
  // Format THC levels for display
  const formatThcLevel = () => {
    if (!strain.thc_level) return "Unknown";
    return `${strain.thc_level.toFixed(1)}%`;
  };
  
  const getTypeColor = () => {
    switch(strain.type?.toLowerCase()) {
      case 'sativa': return 'bg-green-500';
      case 'indica': return 'bg-purple-500';
      case 'hybrid': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/strains/${encodeURIComponent(strain.name)}`} className="block">
        <div className="relative aspect-video bg-muted overflow-hidden">
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
          <Badge className={`absolute top-2 right-2 ${getTypeColor()}`}>
            {strain.type || "Unknown"}
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg truncate">{strain.name}</h3>
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <span>THC: {formatThcLevel()}</span>
            {strain.most_common_terpene && (
              <span className="ml-3">Terpene: {strain.most_common_terpene}</span>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {strain.description || "No description available."}
          </p>
        </CardContent>
        
        <CardFooter className="px-4 pb-4 pt-0 flex flex-wrap gap-2">
          {topEffects.map(effect => (
            <Badge key={effect} variant="outline" className="capitalize">
              {effect}
            </Badge>
          ))}
        </CardFooter>
      </Link>
    </Card>
  );
}
