
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";
import { Capacitor } from "@capacitor/core";
import { LanguageProvider } from "./contexts/LanguageContext";

// Lazily load pages to improve initial load time
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const Login = lazy(() => import("./pages/Login"));
const ClubDetail = lazy(() => import("./pages/ClubDetail"));
const Strains = lazy(() => import("./pages/Strains"));
const StrainDetail = lazy(() => import("./pages/StrainDetail"));
const Journal = lazy(() => import("./pages/Journal"));

import { Navigation } from "./components/navigation/Navigation";

// Initialize Capacitor plugins when needed
const initCapacitor = async () => {
  if (Capacitor.isNativePlatform()) {
    // Import and initialize plugins only in native platforms
    try {
      const { SplashScreen } = await import("@capacitor/splash-screen");
      await SplashScreen.hide({
        fadeOutDuration: 500
      });
    } catch (error) {
      console.error("Error initializing Capacitor plugins:", error);
    }
  }
};

// Create a stable queryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false, // Prevent refetching when window gets focus
    },
  },
});

// ScrollToTop component to handle scroll position on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

const App = () => {
  const [appReady, setAppReady] = useState(false);
  
  // Initialize Capacitor and mark app as ready
  useEffect(() => {
    const init = async () => {
      await initCapacitor();
      setAppReady(true);
    };
    
    init();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Navigation />
            <Suspense fallback={
              <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            }>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/clubs/:id" element={<ClubDetail />} />
                <Route path="/strains" element={<Strains />} />
                <Route path="/strains/:id" element={<StrainDetail />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
