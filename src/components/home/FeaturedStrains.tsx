
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
            <Link to={`/strains/${strain.name}`}>
              <div className="aspect-square bg-muted overflow-hidden">
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
              </div>
              <CardContent className="p-4">
                <h4 className="font-medium text-md truncate">{strain.name}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="capitalize">
                    {strain.type || "Unknown"}
                  </Badge>
                  {strain.thc_level && (
                    <Badge variant="secondary" className="text-xs">
                      THC: {strain.thc_level.toFixed(1)}%
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};
