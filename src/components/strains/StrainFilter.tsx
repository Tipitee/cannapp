
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { StrainFilter as StrainFilterType } from "@/types/strain";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { useStrainEffects } from "@/hooks/use-strains";
import { Badge } from "@/components/ui/badge";

interface StrainFilterProps {
  filter: StrainFilterType;
  onFilterChange: (filter: StrainFilterType) => void;
}

export const StrainFilter = ({ filter, onFilterChange }: StrainFilterProps) => {
  const { t } = useLanguage();
  const { allEffects, allMedicalUses, allFlavors } = useStrainEffects();
  const [localFilter, setLocalFilter] = useState<StrainFilterType>(filter);
  const [thcRange, setThcRange] = useState<number[]>([0, 30]);
  const [cbdRange, setCbdRange] = useState<number[]>([0, 20]);
  const [popularEffects, setPopularEffects] = useState<string[]>([]);
  
  // Select most popular effects from all effects
  useEffect(() => {
    setPopularEffects(allEffects.slice(0, 6));
  }, [allEffects]);
  
  // Effects options - use the popular ones
  const effectOptions = popularEffects.map(effect => ({ 
    value: effect, 
    label: t(effect) || effect
  }));
  
  // Medical uses options - take first 6
  const medicalOptions = allMedicalUses.slice(0, 6).map(use => ({
    value: use,
    label: t(use) || use.replace('_', ' ')
  }));

  // Apply filters on button click
  const applyFilters = () => {
    onFilterChange({
      ...localFilter,
      minTHC: thcRange[0],
      maxTHC: thcRange[1],
      minCBD: cbdRange[0],
      maxCBD: cbdRange[1],
    });
  };

  // Reset filters
  const resetFilters = () => {
    const resetFilter: StrainFilterType = { search: "" };
    setLocalFilter(resetFilter);
    setThcRange([0, 30]);
    setCbdRange([0, 20]);
    onFilterChange(resetFilter);
  };

  // Update search term with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange({
        ...filter,
        search: localFilter.search
      });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [localFilter.search, filter, onFilterChange]);

  // Handle effect selection
  const handleEffectChange = (effect: string, isChecked: boolean) => {
    setLocalFilter(prev => {
      const currentEffects = prev.effects || [];
      const newEffects = isChecked
        ? [...currentEffects, effect]
        : currentEffects.filter(e => e !== effect);
      
      return {
        ...prev,
        effects: newEffects.length > 0 ? newEffects : undefined
      };
    });
  };

  // Handle medical use selection
  const handleMedicalUseChange = (use: string, isChecked: boolean) => {
    setLocalFilter(prev => {
      const currentUses = prev.medicalUses || [];
      const newUses = isChecked
        ? [...currentUses, use]
        : currentUses.filter(u => u !== use);
      
      return {
        ...prev,
        medicalUses: newUses.length > 0 ? newUses : undefined
      };
    });
  };

  // Handle strain type selection
  const handleTypeChange = (type: "sativa" | "indica" | "hybrid" | undefined) => {
    setLocalFilter(prev => ({
      ...prev,
      type: prev.type === type ? undefined : type
    }));
  };

  return (
    <div className="space-y-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <div>
        <h3 className="font-medium mb-2">{t("popularEffects") || "Popular Effects"}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {effectOptions.map((effect) => (
            <Badge
              key={effect.value}
              variant={localFilter.effects?.includes(effect.value) ? "default" : "outline"}
              className={localFilter.effects?.includes(effect.value) 
                ? "bg-purple-500 hover:bg-purple-600 cursor-pointer" 
                : "hover:bg-purple-100 dark:hover:bg-purple-900/30 cursor-pointer"}
              onClick={() => handleEffectChange(
                effect.value, 
                !localFilter.effects?.includes(effect.value)
              )}
            >
              {effect.label}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />
      
      {/* Strain Type */}
      <div className="space-y-2">
        <h3 className="font-medium">{t("type")}</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={localFilter.type === "sativa" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTypeChange("sativa")}
            className={localFilter.type === "sativa" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
          >
            Sativa
          </Button>
          <Button
            variant={localFilter.type === "indica" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTypeChange("indica")}
            className={localFilter.type === "indica" ? "bg-indigo-500 hover:bg-indigo-600" : ""}
          >
            Indica
          </Button>
          <Button
            variant={localFilter.type === "hybrid" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTypeChange("hybrid")}
            className={localFilter.type === "hybrid" ? "bg-amber-500 hover:bg-amber-600" : ""}
          >
            Hybrid
          </Button>
        </div>
      </div>
      
      <Separator />
      
      {/* THC Range */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <h3 className="font-medium">{t("thcLevel")}</h3>
          <span className="text-sm text-gray-500">{thcRange[0]}% - {thcRange[1]}%</span>
        </div>
        <Slider
          defaultValue={[0, 30]}
          min={0}
          max={30}
          step={1}
          value={thcRange}
          onValueChange={setThcRange}
          className="[&>span]:bg-purple-500"
        />
      </div>
      
      {/* CBD Range */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <h3 className="font-medium">{t("cbdLevel")}</h3>
          <span className="text-sm text-gray-500">{cbdRange[0]}% - {cbdRange[1]}%</span>
        </div>
        <Slider
          defaultValue={[0, 20]}
          min={0}
          max={20}
          step={0.5}
          value={cbdRange}
          onValueChange={setCbdRange}
          className="[&>span]:bg-purple-500"
        />
      </div>
      
      <Separator />
      
      {/* Medical Uses */}
      <div className="space-y-2">
        <h3 className="font-medium">{t("medicalUses")}</h3>
        <div className="grid grid-cols-2 gap-2">
          {medicalOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`medical-${option.value}`}
                checked={localFilter.medicalUses?.includes(option.value) || false}
                onCheckedChange={(checked) => 
                  handleMedicalUseChange(option.value, checked === true)
                }
                className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
              />
              <Label htmlFor={`medical-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex space-x-2 pt-2">
        <Button onClick={applyFilters} className="flex-1 bg-purple-600 hover:bg-purple-700">{t("applyFilters")}</Button>
        <Button variant="outline" onClick={resetFilters}>{t("reset")}</Button>
      </div>
    </div>
  );
};
