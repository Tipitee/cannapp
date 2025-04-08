
import { Strain } from "@/types/strain";
import { StrainCard } from "./StrainCard";
import { useLanguage } from "@/contexts/LanguageContext";

interface StrainGridProps {
  strains: Strain[];
  loading: boolean;
}

export function StrainGrid({ strains, loading }: StrainGridProps) {
  const { t } = useLanguage();
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-lg border border-muted bg-card overflow-hidden">
            <div className="aspect-video bg-muted animate-pulse" />
            <div className="p-4">
              <div className="h-5 bg-muted rounded animate-pulse w-3/4 mb-2" />
              <div className="h-4 bg-muted rounded animate-pulse w-1/2 mb-3" />
              <div className="h-4 bg-muted rounded animate-pulse w-full mb-2" />
              <div className="h-4 bg-muted rounded animate-pulse w-4/5" />
            </div>
            <div className="px-4 pb-4 pt-0 flex gap-2">
              <div className="h-6 bg-muted rounded animate-pulse w-16" />
              <div className="h-6 bg-muted rounded animate-pulse w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (strains.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">{t("noStrainsFound") || "No strains found"}</h3>
        <p className="text-muted-foreground">{t("tryDifferentFilters") || "Try different filters or search terms"}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {strains.map((strain) => (
        <StrainCard key={strain.name} strain={strain} />
      ))}
    </div>
  );
}
