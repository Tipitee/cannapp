
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapIcon, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const HomeHero = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-app-primary to-app-secondary rounded-3xl p-8 md:p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,2.5L2.5,35v30L50,97.5l47.5-32.5v-30L50,2.5z" stroke="currentColor" strokeWidth="0.5" fill="none"></path>
            <path d="M50,35L2.5,67.5L50,97.5l47.5-30L50,35z" stroke="currentColor" strokeWidth="0.5" fill="none"></path>
            <path d="M50,2.5L2.5,35L50,65l47.5-30L50,2.5z" stroke="currentColor" strokeWidth="0.5" fill="none"></path>
            <path d="M2.5,35v30l47.5,30V65L2.5,35z" stroke="currentColor" strokeWidth="0.5" fill="none"></path>
            <path d="M97.5,35v30l-47.5,30V65L97.5,35z" stroke="currentColor" strokeWidth="0.5" fill="none"></path>
          </svg>
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome to CannaClubMap</h2>
          <p className="text-white/90 text-lg mb-6">Find cannabis social clubs near you and discover perfect strains for your needs</p>
          
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate('/clubs')} className="bg-white text-app-primary hover:bg-white/90 border-0">
              <MapIcon className="h-4 w-4 mr-2" />
              Find Clubs
            </Button>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-app-primary" onClick={() => navigate('/strains')}>
              <Leaf className="h-4 w-4 mr-2" />
              Explore Strains
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
