
import { useParams, useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { StrainDetail as StrainDetailComponent } from "@/components/strains/StrainDetail";
import { useStrain } from "@/hooks/use-strains";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, Loader2 } from "lucide-react";

const StrainDetail = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { strain, loading, error } = useStrain(name || "");

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (error || !strain) {
    return (
      <PageLayout>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">{t("strainNotFound") || "Strain Not Found"}</h2>
          <p className="text-muted-foreground mb-8">
            {t("strainNotFoundDescription") || "The strain you're looking for doesn't exist or couldn't be loaded."}
          </p>
          <Button onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("goBack") || "Go Back"}
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={handleGoBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("backToStrains") || "Back to Strains"}
      </Button>
      
      <StrainDetailComponent strain={strain} />
    </PageLayout>
  );
};

export default StrainDetail;
