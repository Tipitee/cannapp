
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
    if (thcLevel >= 20) return t("highTHC");
    if (thcLevel >= 15) return t("dominant");
    if (thcLevel >= 10) return t("moderate");
    return t("mild");
  };

  return (
    <Link to={`/strains/${strain.id}`} className="block h-full">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow card-hover-effect">
        <div className={`relative ${compact ? 'h-48' : 'h-60'} overflow-hidden flex-shrink-0`}>
          {strain.imageUrl ? (
            <img 
              src={strain.imageUrl} 
              alt={strain.name} 
              className="w-full h-full object-cover transform transition-transform hover:scale-105 duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <span className="text-gray-500">{t("noImage")}</span>
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
        <CardContent className={`p-4 ${compact ? 'space-y-2' : 'space-y-3'} flex-grow flex flex-col`}>
          <div className="space-y-1">
            <h3 className="font-bold text-lg line-clamp-1">{strain.name}</h3>
            <div className="flex items-center">
              <div className="flex items-center text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium ml-1">{strain.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-gray-500 ml-1">({strain.reviewCount})</span>
            </div>
          </div>

          {!compact && (
            <div className="flex flex-wrap gap-1 my-2">
              {strain.effects.slice(0, 3).map((effect, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                  {t(effect)}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="mt-auto pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="flex justify-between text-sm">
              <div>
                <span className="font-medium">{t("thcLevel")}:</span> {strain.thcLevel}%
              </div>
              <div>
                <span className="font-medium">{t("cbdLevel")}:</span> {strain.cbdLevel}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
