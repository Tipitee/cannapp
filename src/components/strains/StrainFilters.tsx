
import { useState } from "react";
import { StrainType, StrainFilterProps } from "@/types/strain";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Filter, X } from "lucide-react";

interface StrainFiltersProps {
  filter: StrainFilterProps;
  onFilterChange: (filter: StrainFilterProps) => void;
}

export function StrainFilters({ filter, onFilterChange }: StrainFiltersProps) {
  const { t } = useLanguage();
  const [search, setSearch] = useState(filter.search || "");
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ ...filter, search });
  };
  
  const handleTypeChange = (type: StrainType) => {
    onFilterChange({ ...filter, type });
  };
  
  const handleEffectToggle = (effect: string) => {
    const currentEffects = filter.effects || [];
    
    const newEffects = currentEffects.includes(effect)
      ? currentEffects.filter(e => e !== effect)
      : [...currentEffects, effect];
    
    onFilterChange({ ...filter, effects: newEffects });
  };
  
  const clearFilters = () => {
    setSearch("");
    onFilterChange({});
  };
  
  const popularEffects = [
    "relaxed", 
    "euphoric", 
    "happy", 
    "uplifted", 
    "creative",
    "energetic",
    "sleepy",
    "hungry",
    "focused",
  ];
  
  const typeOptions: StrainType[] = ["all", "sativa", "indica", "hybrid"];
  
  const hasActiveFilters = !!filter.search || 
    (filter.type && filter.type !== "all") || 
    (filter.effects && filter.effects.length > 0);

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearchSubmit} className="relative">
        <Input
          type="text"
          placeholder={t("searchStrains") || "Search strains..."}
          value={search}
          onChange={handleSearchChange}
          className="pr-10 rounded-full"
        />
        <Button 
          type="submit" 
          size="icon" 
          variant="ghost" 
          className="absolute right-0 top-0 h-full"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">{t("search")}</span>
        </Button>
      </form>
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-sm">{t("strainType") || "Strain Type"}</h3>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs flex items-center" 
              onClick={clearFilters}
            >
              <X className="h-3 w-3 mr-1" />
              {t("clearFilters") || "Clear Filters"}
            </Button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-1 rounded-lg overflow-hidden">
          {typeOptions.map((type) => (
            <Button
              key={type}
              variant={filter.type === type ? "default" : "outline"}
              className="rounded-none h-10 capitalize"
              onClick={() => handleTypeChange(type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-sm mb-2">{t("popularEffects") || "Popular Effects"}</h3>
        <div className="flex flex-wrap gap-2">
          {popularEffects.map(effect => {
            const isActive = filter.effects?.includes(effect);
            return (
              <Badge
                key={effect}
                variant={isActive ? "default" : "outline"}
                className={`cursor-pointer capitalize ${isActive ? "" : "hover:bg-accent hover:text-accent-foreground"}`}
                onClick={() => handleEffectToggle(effect)}
              >
                {effect}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
}
