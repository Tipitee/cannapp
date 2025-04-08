
import { useNavigate } from "react-router-dom";
import { MapIcon, BookOpen, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppCardProps { 
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  onClick: () => void;
  className?: string;
}

export const AppCard = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  className 
}: AppCardProps) => (
  <div 
    className={`cursor-pointer group rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-app-card dark:to-app-background ${className}`} 
    onClick={onClick}
  >
    <div className="p-6">
      <div className="rounded-full w-12 h-12 flex items-center justify-center bg-app-primary/10 text-app-primary mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-semibold text-xl mb-2 group-hover:text-app-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

export const AppFeatures = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6 text-app-primary">App Features</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AppCard
          title="Find Clubs"
          description="Locate cannabis clubs near you with our interactive map"
          icon={MapIcon}
          onClick={() => navigate('/clubs')}
        />
        <AppCard
          title="Track in Journal"
          description="Keep a personal cannabis journal to record your experiences"
          icon={BookOpen}
          onClick={() => navigate('/journal')}
        />
        <AppCard
          title="Explore Strains"
          description="Discover cannabis strains with detailed profiles and effects"
          icon={Leaf}
          onClick={() => navigate('/strains')}
        />
      </div>
    </div>
  );
};
