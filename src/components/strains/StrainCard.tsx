
import { Strain } from "@/types/strain";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface StrainCardProps {
  strain: Strain;
  compact?: boolean;
}

export const StrainCard = ({ strain, compact = false }: StrainCardProps) => {
  const { t } = useLanguage();
  
  const getStrainTypeColor = (type: string) => {
    switch (type) {
      case "sativa":
        return "bg-green-500 hover:bg-green-600";
      case "indica":
        return "bg-purple-500 hover:bg-purple-600";
      case "hybrid":
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <Link to={`/strains/${strain.id}`} className="block h-full">
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow flex flex-col">
        <div className={`relative ${compact ? 'h-36' : 'h-48'} overflow-hidden flex-shrink-0`}>
          {strain.imageUrl ? (
            <img 
              src={strain.imageUrl} 
              alt={strain.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-500">{t("noImage")}</span>
            </div>
          )}
          <Badge className={`absolute top-2 right-2 ${getStrainTypeColor(strain.type)}`}>
            {strain.type.charAt(0).toUpperCase() + strain.type.slice(1)}
          </Badge>
        </div>
        <CardContent className={`p-4 ${compact ? 'space-y-1' : 'space-y-2'} flex-grow flex flex-col`}>
          <h3 className={`font-bold ${compact ? 'text-base' : 'text-lg'} mb-1 truncate`}>{strain.name}</h3>
          <div className="flex items-center mb-1">
            <div className="flex items-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold ml-1">{strain.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-gray-500">({strain.reviewCount})</span>
          </div>

          {!compact && (
            <div className="flex flex-wrap gap-1 mb-2">
              {strain.effects.slice(0, 3).map((effect, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {t(effect)}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex justify-between text-sm mt-auto">
            <div>
              <span className="font-medium">{t("thcLevel")}:</span> {strain.thcLevel}%
            </div>
            <div>
              <span className="font-medium">{t("cbdLevel")}:</span> {strain.cbdLevel}%
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
