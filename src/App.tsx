
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import ClubDetail from "./pages/ClubDetail";
import Strains from "./pages/Strains";
import StrainDetail from "./pages/StrainDetail";
import Journal from "./pages/Journal";
import Community from "./pages/Community";
import { Navigation } from "./components/navigation/Navigation";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { LanguageProvider } from "./contexts/LanguageContext";

// Initialize Capacitor plugins when needed
const initCapacitor = async () => {
  if (Capacitor.isNativePlatform()) {
    // Import and initialize plugins only in native platforms
    try {
      const { SplashScreen } = await import("@capacitor/splash-screen");
      await SplashScreen.show({
        showDuration: 2000,
        autoHide: false,
      });
    } catch (error) {
      console.error("Error initializing Capacitor plugins:", error);
    }
  }
};

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initCapacitor();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/clubs/:id" element={<ClubDetail />} />
              <Route path="/strains" element={<Strains />} />
              <Route path="/strains/:id" element={<StrainDetail />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/community" element={<Community />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
