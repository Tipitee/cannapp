
import { Strain } from "@/types/strain";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Star, Leaf } from "lucide-react";

interface StrainCardProps {
  strain: Strain;
  compact?: boolean;
  isLoading?: boolean;
}

export const StrainCard = ({ strain, compact = false, isLoading = false }: StrainCardProps) => {
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

  // Generate a consistent background color based on strain name for missing images
  const getBackgroundColor = (name: string) => {
    const colors = [
      "from-purple-900 to-indigo-900",
      "from-indigo-900 to-blue-900",
      "from-emerald-900 to-teal-900",
      "from-amber-900 to-orange-900",
      "from-rose-900 to-red-900",
      "from-fuchsia-900 to-purple-900",
    ];
    
    // Use the string's characters to determine a consistent color
    const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };

  // If loading, return a placeholder card with the same dimensions
  if (isLoading) {
    return (
      <Card className="h-full w-full overflow-hidden border-gray-700 dark:border-gray-800 shadow flex flex-col">
        <div 
          className={`${compact ? 'h-48' : 'h-60'} bg-gray-900 overflow-hidden flex-shrink-0 relative`}
          style={{ 
            minHeight: compact ? '12rem' : '15rem',
            maxHeight: compact ? '12rem' : '15rem' 
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <Leaf className="h-16 w-16 text-gray-700 animate-pulse" />
          </div>
          
          <div className="absolute top-3 right-3">
            <div className="h-6 w-16 rounded-full bg-gray-800 animate-pulse"></div>
          </div>
          
          <div className="absolute bottom-3 right-3">
            <div className="h-5 w-10 rounded-full bg-gray-800 animate-pulse"></div>
          </div>
        </div>
        <div className={`${compact ? 'p-3' : 'p-4'} flex flex-col justify-between flex-grow bg-gray-800/50`}>
          <div>
            <div className="h-6 bg-gray-700/50 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-700/30 rounded w-1/4 mb-2 animate-pulse"></div>
            
            {!compact && (
              <div className="flex flex-wrap gap-1 my-2">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="h-5 bg-gray-700/30 rounded-full w-16 animate-pulse"></div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-auto pt-2 border-t border-gray-700/30">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-700/30 rounded w-1/4 animate-pulse"></div>
              <div className="h-4 bg-gray-700/30 rounded w-1/4 animate-pulse"></div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full w-full overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-700 dark:border-gray-800 shadow flex flex-col">
      <div 
        className={`${compact ? 'h-48' : 'h-60'} overflow-hidden flex-shrink-0 relative bg-gradient-to-br from-gray-900 to-gray-800`}
        style={{ 
          minHeight: compact ? '12rem' : '15rem',
          maxHeight: compact ? '12rem' : '15rem' 
        }}
      >
        {strain.imageUrl ? (
          <div className="w-full h-full relative">
            <img 
              src={strain.imageUrl} 
              alt={strain.name} 
              className="w-full h-full object-cover absolute inset-0 opacity-90"
              loading="lazy"
              onError={(e) => {
                // On error, replace with a decorative element
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', ...getBackgroundColor(strain.name).split(' '));
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${getBackgroundColor(strain.name)}`}>
            <Leaf className="h-16 w-16 text-white opacity-30" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>
        )}
        <Badge className={`absolute top-3 right-3 ${getStrainTypeColor(strain.type)}`}>
          {strain.type.charAt(0).toUpperCase() + strain.type.slice(1)}
        </Badge>
        {!compact && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="outline" className="bg-black/60 text-white border-0 backdrop-blur-sm">
              {getPotencyLabel(strain.thcLevel)}
            </Badge>
          </div>
        )}
        <div className="absolute bottom-3 right-3">
          <div className="flex items-center bg-black/60 rounded-full px-2 py-0.5 text-white text-xs backdrop-blur-sm">
            <Star className="h-3 w-3 fill-amber-400 stroke-amber-400 mr-1" />
            <span>{strain.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <Link to={`/strains/${strain.id}`} className="flex flex-col flex-grow">
        <CardContent className={`${compact ? 'p-3' : 'p-4'} flex flex-col justify-between flex-grow bg-gray-800/50`}>
          <div>
            <h3 className="font-bold text-lg line-clamp-1 text-gray-100">{strain.name}</h3>
            <div className="flex items-center mt-1">
              <div className="flex items-center text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium ml-1">{strain.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-gray-400 ml-1">({strain.reviewCount})</span>
            </div>

            {!compact && strain.effects.length > 0 && (
              <div className="flex flex-wrap gap-1 my-2">
                {strain.effects.slice(0, 3).map((effect, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-900/50 text-purple-200 hover:bg-purple-800/50 dark:bg-purple-900/50 dark:text-purple-200 dark:hover:bg-purple-800/50">
                    {effect}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-auto pt-2 border-t border-gray-700 dark:border-gray-700/40">
            <div className="flex justify-between items-center text-sm text-gray-300">
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
