
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'de';
type Translations = Record<string, Record<Language, string>>;

// Define translations
const translations: Translations = {
  // Navigation
  "home": { en: "Home", de: "Startseite" },
  "map": { en: "Map", de: "Karte" },
  "list": { en: "List", de: "Liste" },
  "profile": { en: "Profile", de: "Profil" },
  "settings": { en: "Settings", de: "Einstellungen" },
  "strains": { en: "Strains", de: "Sorten" },
  "login": { en: "Login", de: "Anmelden" },
  "nearMe": { en: "Near Me", de: "In meiner Nähe" },
  
  // Headers & General
  "appName": { en: "Cannabis Club Finder", de: "Cannabis Club Finder" },
  "welcomeTitle": { en: "Welcome to German Cannabis Club Finder", de: "Willkommen beim deutschen Cannabis-Club-Finder" },
  "welcomeMessage": { en: "Discover cannabis clubs near you", de: "Entdecke Cannabis-Clubs in deiner Nähe" },
  
  // Settings
  "languagePreference": { en: "Language Preference", de: "Spracheinstellung" },
  "english": { en: "English", de: "Englisch" },
  "german": { en: "German", de: "Deutsch" },
  "profileSettings": { en: "Profile", de: "Profil" },
  "notificationSettings": { en: "Notifications", de: "Benachrichtigungen" },
  "deviceSettings": { en: "Device Settings", de: "Geräteeinstellungen" },
  "saveChanges": { en: "Save changes", de: "Änderungen speichern" },
  "cancel": { en: "Cancel", de: "Abbrechen" },
  
  // Strain Explorer
  "strainExplorer": { en: "Strain Explorer", de: "Sortenfinder" },
  "findYourStrain": { en: "Find your perfect strain", de: "Finde deine perfekte Sorte" },
  "effects": { en: "Effects", de: "Wirkungen" },
  "thcLevel": { en: "THC Level", de: "THC-Gehalt" },
  "cbdLevel": { en: "CBD Level", de: "CBD-Gehalt" },
  "medicalUses": { en: "Medical Uses", de: "Medizinische Anwendungen" },
  "userReviews": { en: "User Reviews", de: "Nutzerbewertungen" },
  "filterBy": { en: "Filter by", de: "Filtern nach" },
  "mood": { en: "Mood", de: "Stimmung" },
  "activity": { en: "Activity", de: "Aktivität" },
  "medicalNeed": { en: "Medical Need", de: "Medizinischer Bedarf" },
  "journal": { en: "Journal", de: "Tagebuch" },
  "trackEffectiveness": { en: "Track Effectiveness", de: "Wirksamkeit verfolgen" },
  "shareExperiences": { en: "Share Experiences", de: "Erfahrungen teilen" },
  "askQuestions": { en: "Ask Questions", de: "Fragen stellen" },
  
  // Strain Effects
  "relaxing": { en: "Relaxing", de: "Entspannend" },
  "energizing": { en: "Energizing", de: "Energetisierend" },
  "creative": { en: "Creative", de: "Kreativ" },
  "sleepy": { en: "Sleepy", de: "Schläfrig" },
  "focused": { en: "Focused", de: "Konzentriert" },
  "euphoric": { en: "Euphoric", de: "Euphorisch" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get language from localStorage or use browser language, default to English
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage === 'en' || savedLanguage === 'de') return savedLanguage;
    
    const browserLang = navigator.language.split('-')[0].toLowerCase();
    return browserLang === 'de' ? 'de' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  const value = {
    language,
    setLanguage,
    t,
    translations
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
