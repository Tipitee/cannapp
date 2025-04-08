
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
    // List of all possible effect properties
    const allEffectKeys = [
      // Standard effects
      'relaxed', 'happy', 'euphoric', 'uplifted', 'sleepy', 'creative', 
      'energetic', 'focused', 'talkative', 'hungry', 'tingly', 'giggly', 'aroused',
      
      // Side effects
      'dry_mouth', 'dry_eyes', 'dizzy', 'paranoid', 'anxious', 'headache',
      
      // Medical conditions
      'stress', 'pain', 'depression', 'anxiety', 'insomnia', 'fatigue', 
      'lack_of_appetite', 'nausea', 'headaches', 'cramps', 'inflammation', 
      'muscle_spasms', 'eye_pressure', 'migraines', 'ptsd',
      'spinal_cord_injury', 'fibromyalgia', 'phantom_limb_pain',
      'epilepsy', 'multiple_sclerosis', 'bipolar_disorder', 'cancer',
      'gastrointestinal_disorder', 'asthma', 'anorexia', 'arthritis',
      'add_adhd', 'muscular_dystrophy', 'hypertension', 'glaucoma',
      'pms', 'seizures', 'spasticity'
    ];
    
    // Map to collect all available effects and their numeric values
    const effectsMap = allEffectKeys.reduce<Record<string, number>>((acc, key) => {
      // Handle both camelCase and snake_case property names for compatibility
      const value = strain[key as keyof Strain];
      if (value && value !== '0' && value !== '') {
        // Convert string values to numbers for comparison
        const numValue = parseFloat(String(value));
        if (!isNaN(numValue)) {
          acc[key] = numValue;
        }
      }
      return acc;
    }, {});

    // Convert to array, sort by value and take top 3
    return Object.entries(effectsMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key]) => key.replace(/_/g, ' '));
  };
  
  const topEffects = getTopEffects();
  
  // Format THC levels for display with fallback
  const formatThcLevel = () => {
    if (strain.thc_level === undefined || strain.thc_level === null) return "?";
    
    // Handle numeric values
    if (typeof strain.thc_level === 'number') {
      return `${parseFloat(String(strain.thc_level)).toFixed(1)}%`;
    }
    
    // Already formatted string (e.g. "15%")
    if (typeof strain.thc_level === 'string' && String(strain.thc_level).includes('%')) {
      return strain.thc_level;
    }
    
    // Raw number as string
    return `${parseFloat(String(strain.thc_level)).toFixed(1)}%`;
  };
  
  // Get strain type color
  const getTypeColor = () => {
    const type = strain.type?.toLowerCase() || '';
    
    if (type.includes('sativa')) return 'bg-green-500';
    if (type.includes('indica')) return 'bg-purple-500';
    if (type.includes('hybrid')) return 'bg-orange-500';
    return 'bg-gray-500';
  };

  // Get a preview of the description (first 10 words)
  const getDescriptionPreview = () => {
    if (!strain.description) return "No description available.";
    
    const words = strain.description.split(' ');
    if (words.length <= 10) return strain.description;
    
    return words.slice(0, 10).join(' ') + '... ';
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/strains/${encodeURIComponent(strain.name || '')}`} className="block">
        <div className="relative aspect-video bg-muted overflow-hidden">
          {strain.img_url ? (
            <img 
              src={strain.img_url} 
              alt={strain.name || 'Unknown strain'} 
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
          <h3 className="font-semibold text-lg truncate">{strain.name || "Unknown Strain"}</h3>
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <span>THC: {formatThcLevel()}</span>
            {strain.most_common_terpene && (
              <span className="ml-3">Terpene: {strain.most_common_terpene}</span>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {getDescriptionPreview()}
            <span className="text-primary hover:underline">Read more</span>
          </p>
        </CardContent>
        
        <CardFooter className="px-4 pb-4 pt-0 flex flex-wrap gap-2">
          {topEffects.length > 0 ? (
            topEffects.map(effect => (
              <Badge key={effect} variant="outline" className="capitalize">
                {effect}
              </Badge>
            ))
          ) : (
            <Badge variant="outline">No effects data</Badge>
          )}
        </CardFooter>
      </Link>
    </Card>
  );
}
