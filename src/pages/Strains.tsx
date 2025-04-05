
import { PageLayout } from "@/components/layout/PageLayout";
import { StrainList } from "@/components/strains/StrainList";
import { useLanguage } from "@/contexts/LanguageContext";
import { Leaf, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Strains = () => {
  const { t } = useLanguage();
  const [filterOpen, setFilterOpen] = useState(false);
  
  return (
    <PageLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 pb-6 border-b">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Leaf className="h-4 w-4" />
              <span className="text-sm font-medium">{t("strains")}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{t("strainExplorer")}</h1>
            <p className="text-muted-foreground max-w-2xl">
              {t("findYourStrain")}
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {t("filter")}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{t("filterStrains")}</SheetTitle>
                  <SheetDescription>
                    {t("filterBy")}
                  </SheetDescription>
                </SheetHeader>
                {/* Filter content would go here */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <StrainList />
      </div>
    </PageLayout>
  );
};

export default Strains;
