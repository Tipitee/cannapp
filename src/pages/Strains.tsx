
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { StrainGrid } from "@/components/strains/StrainGrid";
import { StrainFilters } from "@/components/strains/StrainFilters";
import { useStrains } from "@/hooks/use-strains";
import { StrainFilterProps } from "@/types/strain";
import { useLanguage } from "@/contexts/LanguageContext";
import { Filter, Leaf, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";

const Strains = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<StrainFilterProps>({});
  const { strains, loading, error } = useStrains(filter);

  const handleFilterChange = (newFilter: StrainFilterProps) => {
    setFilter(newFilter);
  };

  // Display a toast if there's an error
  if (error && !loading) {
    toast.error("Error loading strains", {
      description: "Please check your Supabase connection",
      duration: 5000,
    });
  }

  return (
    <PageLayout>
      <div className="bg-gradient-to-r from-purple-700 to-pink-600 text-white rounded-xl p-8 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Leaf className="h-8 w-8" />
          <h1 className="text-3xl font-bold">{t("strainExplorer") || "Strain Explorer"}</h1>
        </div>
        <p className="text-lg max-w-3xl">
          {t("strainExplorerDescription") || 
            "Discover the perfect strain for your needs with detailed profiles including effects, medicinal benefits, and flavor profiles."}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5" />
          <div>
            <h3 className="font-medium">Failed to connect to database</h3>
            <p className="text-sm">Make sure your Supabase service is running and the strains table exists.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <h2 className="text-lg font-medium mb-4">{t("filters") || "Filters"}</h2>
            <StrainFilters filter={filter} onFilterChange={handleFilterChange} />
          </div>
        </div>

        <div className="space-y-6">
          {/* Mobile filters */}
          <div className="flex lg:hidden justify-between items-center mb-4">
            <h2 className="text-lg font-medium">
              {loading ? "Loading..." : `${strains.length} ${t("strainsFound") || "strains found"}`}
            </h2>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  {t("filters") || "Filters"}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{t("filters") || "Filters"}</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <StrainFilters filter={filter} onFilterChange={(newFilter) => {
                    handleFilterChange(newFilter);
                  }} />
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <SheetClose asChild>
                    <Button className="w-full">Apply Filters</Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <StrainGrid strains={strains} loading={loading} />
        </div>
      </div>
    </PageLayout>
  );
};

export default Strains;
