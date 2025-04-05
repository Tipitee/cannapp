
import { useState } from "react";
import { useStrains } from "@/hooks/use-strains";
import { StrainCard } from "./StrainCard";
import { StrainFilter } from "./StrainFilter";
import { StrainFilter as StrainFilterType } from "@/types/strain";
import { Button } from "@/components/ui/button";
import { Loader2, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";

export const StrainList = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<StrainFilterType>({ search: "" });
  const { strains, loading } = useStrains(filter);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t("strainExplorer")}</h2>
        
        {/* Mobile filter button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="md:hidden">
              <Filter className="h-4 w-4 mr-1" />
              {t("filter")}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-4/5">
            <div className="py-6">
              <h3 className="text-lg font-bold mb-4">{t("filterStrains")}</h3>
              <StrainFilter filter={filter} onFilterChange={setFilter} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop sidebar filter */}
        <div className="hidden md:block w-full md:w-64 lg:w-72 flex-shrink-0">
          <StrainFilter filter={filter} onFilterChange={setFilter} />
        </div>

        {/* Main content */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : strains.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg text-gray-500">{t("noStrainsFound")}</p>
              <Button variant="outline" onClick={() => setFilter({ search: "" })} className="mt-4">
                {t("reset")}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {strains.map((strain) => (
                <StrainCard key={strain.id} strain={strain} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
