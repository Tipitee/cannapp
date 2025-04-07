
import { PageLayout } from "@/components/layout/PageLayout";
import { StrainList } from "@/components/strains/StrainList";
import { useLanguage } from "@/contexts/LanguageContext";
import { Cannabis, Filter, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const Strains = () => {
  const { t } = useLanguage();
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <PageLayout>
      <div className="space-y-6 animate-fade-in pb-20 md:pb-0">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Cannabis className="h-4 w-4" />
              <span className="text-sm font-medium">{t("strains")}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{t("strainExplorer") || "Strain Explorer"}</h1>
            <p className="text-muted-foreground max-w-2xl">
              {t("findYourStrain") || "Find the perfect strain for your needs"}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder={`${t("searchPlaceholder") || "Search"}...`}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex-shrink-0">
            <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  <SlidersHorizontal className="h-4 w-4" />
                  {t("filter") || "Filter"}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{t("filterStrains") || "Filter Strains"}</SheetTitle>
                  <SheetDescription>
                    {t("filterBy") || "Filter by various criteria"}
                  </SheetDescription>
                </SheetHeader>
                {/* Filter content would go here */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <StrainList initialSearch={searchQuery} />
      </div>
    </PageLayout>
  );
};

export default Strains;
