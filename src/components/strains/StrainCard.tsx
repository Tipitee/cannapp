
import { Strain } from "@/types/strain";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Star, Leaf } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
    if (thcLevel >= 20) return "High THC";
    if (thcLevel >= 15) return "Medium-High THC";
    if (thcLevel >= 10) return "Medium THC";
    return "Mild THC";
  };

  // Generate a consistent background color based on strain name for missing images
  const getBackgroundColor = (name: string) => {
    const colors = [
      "from-purple-900 to-indigo-900",
      "from-indigo-900 to-blue-900",
      "from-purple-800 to-indigo-800",
      "from-violet-900 to-purple-800",
      "from-fuchsia-900 to-purple-900",
    ];
    
    // Use the string's characters to determine a consistent color
    const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };

  // If loading, return a placeholder card with the same dimensions
  if (isLoading) {
    return (
      <Card className="h-full w-full overflow-hidden border-gray-800 shadow flex flex-col bg-gray-900/80">
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
            <Skeleton className="h-6 w-16 rounded-full bg-gray-800/60" />
          </div>
          
          <div className="absolute bottom-3 right-3">
            <Skeleton className="h-5 w-10 rounded-full bg-gray-800/60" />
          </div>
        </div>
        <div className={`${compact ? 'p-3' : 'p-4'} flex flex-col justify-between flex-grow bg-gray-800/90`}>
          <div>
            <Skeleton className="h-6 bg-gray-700/50 rounded w-3/4 mb-2" />
            <Skeleton className="h-4 bg-gray-700/30 rounded w-1/4 mb-2" />
            
            {!compact && (
              <div className="flex flex-wrap gap-1 my-2">
                {[1, 2, 3].map((_, index) => (
                  <Skeleton key={index} className="h-5 bg-gray-700/30 rounded-full w-16" />
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-auto pt-2 border-t border-gray-700/30">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 bg-gray-700/30 rounded w-1/4" />
              <Skeleton className="h-4 bg-gray-700/30 rounded w-1/4" />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full w-full overflow-hidden border-0 shadow-lg transition-all duration-300 bg-gray-900 rounded-lg flex flex-col">
      {/* Image container */}
      <div 
        className={`${compact ? 'h-48' : 'h-60'} overflow-hidden flex-shrink-0 relative`}
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
              className="w-full h-full object-cover absolute inset-0"
              loading="lazy"
              onError={(e) => {
                // On error, replace with gradient background
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', ...getBackgroundColor(strain.name).split(' '));
              }}
            />
          </div>
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${getBackgroundColor(strain.name)}`}>
            <Leaf className="h-16 w-16 text-white/30" />
          </div>
        )}
        
        {/* Potency label - always visible, bottom left */}
        <div className="absolute bottom-3 left-3 z-10">
          <Badge variant="outline" className="bg-black/70 backdrop-blur-sm border-0 text-white font-bold px-3 py-1 rounded-full">
            {getPotencyLabel(strain.thcLevel)}
          </Badge>
        </div>
        
        {/* Rating badge - always visible, bottom right */}
        <div className="absolute bottom-3 right-3 z-10">
          <div className="flex items-center bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-white font-bold">
            <Star className="h-4 w-4 fill-amber-400 stroke-none mr-1" />
            <span>{strain.rating.toFixed(1)}</span>
          </div>
        </div>
        
        {/* Strain type badge - always visible, top right */}
        <Badge className={`absolute top-3 right-3 z-10 ${getStrainTypeColor(strain.type)} px-4 py-1 rounded-full`}>
          {strain.type.charAt(0).toUpperCase() + strain.type.slice(1)}
        </Badge>
      </div>

      {/* Content section */}
      <Link to={`/strains/${strain.id}`} className="flex flex-col flex-grow">
        <div className="p-4 flex flex-col justify-between flex-grow bg-gray-900">
          <div>
            {/* Strain name */}
            <h3 className="font-bold text-2xl text-white mb-1">{strain.name}</h3>
            
            {/* Rating with review count */}
            <div className="flex items-center mb-3">
              <div className="text-amber-400 flex items-center">
                <Star className="h-5 w-5 fill-amber-400 stroke-none" />
                <span className="text-lg font-bold ml-1">{strain.rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-400 ml-2">({strain.reviewCount})</span>
            </div>

            {/* Effects badges */}
            {strain.effects.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {strain.effects.slice(0, 3).map((effect, index) => (
                  <Badge key={index} className="bg-purple-900/70 hover:bg-purple-800 text-white border-0 px-4 py-1 rounded-full">
                    {effect}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* THC/CBD info */}
          <div className="mt-auto pt-3 border-t border-gray-800 flex justify-between items-center text-white">
            <div className="text-lg">
              <span className="font-medium">THC:</span> {strain.thcLevel}%
            </div>
            <div className="text-lg">
              <span className="font-medium">CBD:</span> {strain.cbdLevel}%
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};
