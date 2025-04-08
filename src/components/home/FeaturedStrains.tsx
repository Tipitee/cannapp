
import { useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Strain } from "@/types/strain";
import { useLanguage } from "@/contexts/LanguageContext";

interface FeaturedStrainsProps {
  strains: Strain[];
}

export const FeaturedStrains = ({ strains }: FeaturedStrainsProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  if (!strains.length) return null;
  
  // Format THC level with fallback
  const formatThcLevel = (thcLevel: number | string | undefined) => {
    if (thcLevel === undefined || thcLevel === null) return "?";
    
    // Handle numeric values
    if (typeof thcLevel === 'number') {
      return `${parseFloat(String(thcLevel)).toFixed(1)}%`;
    }
    
    // Already formatted string (e.g. "15%")
    if (typeof thcLevel === 'string' && thcLevel.includes('%')) {
      return thcLevel;
    }
    
    // Raw number as string
    return `${parseFloat(String(thcLevel)).toFixed(1)}%`;
  };
  
  // Get strain type color
  const getTypeColor = (type?: string) => {
    if (!type) return "bg-gray-500";
    
    const typeLower = type.toLowerCase();
    if (typeLower.includes('sativa')) return 'bg-green-500';
    if (typeLower.includes('indica')) return 'bg-purple-500';
    if (typeLower.includes('hybrid')) return 'bg-orange-500';
    return 'bg-gray-500';
  };
  
  // Find the top effect for each strain
  const getTopEffect = (strain: Strain) => {
    if (!strain) return null;
    
    // List of all possible effects
    const effectKeys = [
      'stress', 'pain', 'depression', 'anxiety', 'insomnia', 'hungry', 'talkative',
      'headache', 'ptsd', 'creative', 'energetic', 'fatigue', 'focused', 'giggly',
      'lack_of_appetite', 'nausea', 'headaches', 'bipolar_disorder', 'cancer',
      'tingly', 'cramps', 'aroused', 'gastrointestinal_disorder', 'inflammation',
      'muscle_spasms', 'eye_pressure', 'migraines', 'asthma', 'anorexia', 'arthritis',
      'add/adhd', 'muscular_dystrophy', 'hypertension', 'glaucoma', 'pms', 'seizures',
      'spasticity', 'spinal_cord_injury', 'fibromyalgia', 'crohn\'s_disease',
      'phantom_limb_pain', 'epilepsy', 'multiple_sclerosis', 'parkinson\'s',
      'tourette\'s_syndrome', 'alzheimer\'s', 'hiv/aids', 'tinnitus'
    ];
    
    // Find the effect with highest value
    let maxEffect = null;
    let maxValue = -1;
    
    effectKeys.forEach(effect => {
      // Type-safe access
      const effectValue = strain[effect as keyof Strain];
      if (typeof effectValue === 'number' && effectValue > maxValue) {
        maxValue = effectValue;
        maxEffect = effect;
      }
    });
    
    // Return formatted top effect or fallback
    return maxValue > 0 ? 
      maxEffect?.replaceAll('_', ' ') : 
      'No effects data';
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-app-primary">Featured Strains</h3>
        <Button variant="outline" onClick={() => navigate('/strains')} className="gap-2">
          <Leaf className="h-4 w-4" />
          View All Strains
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {strains.map((strain, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-md transition-all">
            <Link to={`/strains/${encodeURIComponent(strain.name || '')}`}>
              <div className="aspect-square bg-muted overflow-hidden">
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
              </div>
              <CardContent className="p-4">
                <h4 className="font-medium text-md truncate">{strain.name || "Unknown Strain"}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className={`capitalize ${getTypeColor(strain.type)}`}>
                    {strain.type || "Unknown"}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    THC: {formatThcLevel(strain.thc_level)}
                  </Badge>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {getTopEffect(strain)}
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};
