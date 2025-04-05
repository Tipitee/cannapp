
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { StrainFilter as StrainFilterType } from "@/types/strain";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";

interface StrainFilterProps {
  filter: StrainFilterType;
  onFilterChange: (filter: StrainFilterType) => void;
}

export const StrainFilter = ({ filter, onFilterChange }: StrainFilterProps) => {
  const { t } = useLanguage();
  const [localFilter, setLocalFilter] = useState<StrainFilterType>(filter);
  const [thcRange, setThcRange] = useState<number[]>([0, 30]);
  const [cbdRange, setCbdRange] = useState<number[]>([0, 20]);
  
  // Effects options
  const effectOptions = [
    { value: "relaxing", label: t("relaxing") },
    { value: "energizing", label: t("energizing") },
    { value: "creative", label: t("creative") },
    { value: "sleepy", label: t("sleepy") },
    { value: "focused", label: t("focused") },
    { value: "euphoric", label: t("euphoric") },
  ];
  
  // Medical uses options
  const medicalOptions = [
    { value: "stress", label: "Stress" },
    { value: "anxiety", label: "Anxiety" },
    { value: "pain", label: "Pain" },
    { value: "insomnia", label: "Insomnia" },
    { value: "depression", label: "Depression" },
    { value: "appetite", label: "Appetite Loss" },
  ];

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
    <div className="space-y-4 p-4 bg-white rounded-lg border">
      <div>
        <Input
          placeholder={t("filterBy") + "..."}
          value={localFilter.search || ""}
          onChange={(e) => setLocalFilter({ ...localFilter, search: e.target.value })}
          className="mb-4"
        />
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
            className={localFilter.type === "sativa" ? "bg-green-500 hover:bg-green-600" : ""}
          >
            Sativa
          </Button>
          <Button
            variant={localFilter.type === "indica" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTypeChange("indica")}
            className={localFilter.type === "indica" ? "bg-purple-500 hover:bg-purple-600" : ""}
          >
            Indica
          </Button>
          <Button
            variant={localFilter.type === "hybrid" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTypeChange("hybrid")}
            className={localFilter.type === "hybrid" ? "bg-blue-500 hover:bg-blue-600" : ""}
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
        />
      </div>
      
      <Separator />
      
      {/* Effects */}
      <div className="space-y-2">
        <h3 className="font-medium">{t("effects")}</h3>
        <div className="grid grid-cols-2 gap-2">
          {effectOptions.map((effect) => (
            <div key={effect.value} className="flex items-center space-x-2">
              <Checkbox
                id={`effect-${effect.value}`}
                checked={localFilter.effects?.includes(effect.value) || false}
                onCheckedChange={(checked) => 
                  handleEffectChange(effect.value, checked === true)
                }
              />
              <Label htmlFor={`effect-${effect.value}`}>{effect.label}</Label>
            </div>
          ))}
        </div>
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
              />
              <Label htmlFor={`medical-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex space-x-2 pt-2">
        <Button onClick={applyFilters} className="flex-1">{t("applyFilters")}</Button>
        <Button variant="outline" onClick={resetFilters}>{t("reset")}</Button>
      </div>
    </div>
  );
};
