
import { PageLayout } from "@/components/layout/PageLayout";
import { StrainList } from "@/components/strains/StrainList";
import { useLanguage } from "@/contexts/LanguageContext";

const Strains = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{t("strainExplorer")}</h1>
          <p className="text-muted-foreground">
            {t("findYourStrain")}
          </p>
        </div>
        
        <StrainList />
      </div>
    </PageLayout>
  );
};

export default Strains;
