
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { GB, DE } from "country-flag-icons/react/3x2";

interface LanguageSwitcherProps {
  variant?: "icon" | "button" | "minimal";
}

export const LanguageSwitcher = ({ variant = "icon" }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "de" : "en");
  };

  if (variant === "minimal") {
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={toggleLanguage}
        className="w-8 h-8 p-0"
      >
        {language === "en" ? (
          <GB className="w-5 h-3.5" />
        ) : (
          <DE className="w-5 h-3.5" />
        )}
      </Button>
    );
  }

  if (variant === "icon") {
    return (
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleLanguage}
        className="rounded-full w-10 h-10"
      >
        {language === "en" ? (
          <GB className="w-6 h-4" />
        ) : (
          <DE className="w-6 h-4" />
        )}
      </Button>
    );
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      {language === "en" ? (
        <>
          <GB className="w-5 h-3.5" />
          <span>EN</span>
        </>
      ) : (
        <>
          <DE className="w-5 h-3.5" />
          <span>DE</span>
        </>
      )}
    </Button>
  );
};
