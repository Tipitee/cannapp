
import { Strain } from "@/types/strain";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Star } from "lucide-react";

interface StrainCardProps {
  strain: Strain;
  compact?: boolean;
}

export const StrainCard = ({ strain, compact = false }: StrainCardProps) => {
  const { t } = useLanguage();
  
  const getStrainTypeColor = (type: string) => {
    switch (type) {
      case "sativa":
        return "bg-emerald-500 hover:bg-emerald-600 text-white";
      case "indica":
        return "bg-indigo-500 hover:bg-indigo-600 text-white";
      case "hybrid":
        return "bg-amber-500 hover:bg-amber-600 text-white";
      default:
        return "bg-gray-500 hover:bg-gray-600 text-white";
    }
  };

  const getPotencyLabel = (thcLevel: number) => {
    if (thcLevel >= 20) return t("highTHC") || "High THC";
    if (thcLevel >= 15) return t("mediumHighTHC") || "Medium-High THC";
    if (thcLevel >= 10) return t("mediumTHC") || "Medium THC";
    return t("mildTHC") || "Mild THC";
  };

  return (
    <Card className="h-full w-full overflow-hidden hover:shadow-lg transition-all duration-300 border-pink-100 dark:border-pink-900/30 shadow card-hover-effect flex flex-col">
      <div 
        className={`${compact ? 'h-48' : 'h-60'} overflow-hidden flex-shrink-0 relative bg-gradient-to-br from-pink-50 to-white dark:from-gray-900 dark:to-pink-950/20`}
        style={{ minHeight: compact ? '12rem' : '15rem' }}
      >
        {strain.imageUrl ? (
          <div className="w-full h-full relative">
            <img 
              src={strain.imageUrl} 
              alt={strain.name} 
              className="w-full h-full object-cover absolute inset-0"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30">
            <span className="text-4xl text-pink-500 font-medium">{strain.name.charAt(0).toUpperCase()}</span>
          </div>
        )}
        <Badge className={`absolute top-3 right-3 ${getStrainTypeColor(strain.type)} airbnb-badge`}>
          {strain.type.charAt(0).toUpperCase() + strain.type.slice(1)}
        </Badge>
        {!compact && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="outline" className="bg-black/60 text-white border-0 backdrop-blur-sm">
              {getPotencyLabel(strain.thcLevel)}
            </Badge>
          </div>
        )}
      </div>
      <Link to={`/strains/${strain.id}`} className="flex flex-col flex-grow">
        <CardContent className={`${compact ? 'p-3' : 'p-4'} flex flex-col justify-between flex-grow bg-gradient-to-b from-white to-pink-50/50 dark:from-gray-900 dark:to-pink-950/20`}>
          <div>
            <h3 className="font-bold text-lg line-clamp-1">{strain.name}</h3>
            <div className="flex items-center mt-1">
              <div className="flex items-center text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium ml-1">{strain.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-gray-500 ml-1">({strain.reviewCount})</span>
            </div>

            {!compact && strain.effects.length > 0 && (
              <div className="flex flex-wrap gap-1 my-2">
                {strain.effects.slice(0, 3).map((effect, index) => (
                  <Badge key={index} variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:hover:bg-pink-800/50">
                    {effect}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-auto pt-2 border-t border-pink-100 dark:border-pink-900/20">
            <div className="flex justify-between items-center text-sm">
              <div>
                <span className="font-medium">THC:</span> {strain.thcLevel}%
              </div>
              <div>
                <span className="font-medium">CBD:</span> {strain.cbdLevel}%
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
