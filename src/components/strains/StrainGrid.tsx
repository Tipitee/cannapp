
import { Strain } from "@/types/strain";
import { StrainCard } from "./StrainCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, Database, AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface StrainGridProps {
  strains: Strain[];
  loading: boolean;
  error: Error | null;
}

export function StrainGrid({ strains, loading, error }: StrainGridProps) {
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

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>{t("errorLoadingStrains") || "Error Loading Strains"}</AlertTitle>
        <AlertDescription className="mt-2">
          <p className="mb-2">{error.message}</p>
          <p className="text-sm">Please check your Supabase connection and ensure the strains table exists with proper permissions.</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (strains.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed rounded-lg">
        <div className="flex justify-center mb-4">
          <Database className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-medium mb-2">{t("noStrainsFound") || "No strains found in the database"}</h3>
        <p className="text-muted-foreground mb-4">{t("checkSupabaseConnection") || "Please check your Supabase connection and ensure the strains table is populated with data"}</p>
        <Alert variant="outline" className="mt-6 mx-auto max-w-2xl">
          <AlertTitle>Setup Guide</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2">Make sure you have created the strains table and added at least one row of data.</p>
            <p className="mb-2">Also verify that you have enabled public access to this table if you're not using authentication.</p>
          </AlertDescription>
        </Alert>
        <pre className="text-xs text-left bg-muted p-4 rounded-md mt-4 max-w-2xl mx-auto overflow-auto">
          <code>
            {`
Table: strains
Expected columns: 
- name (text, required)
- type (text) 
- thc_level (numeric or text)
- description (text)
- img_url (text, optional)
- effects columns (relaxed, happy, etc.)
            `}
          </code>
        </pre>
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
