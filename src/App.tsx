
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, Suspense, lazy, ErrorBoundary } from "react";
import { Capacitor } from "@capacitor/core";
import { LanguageProvider } from "./contexts/LanguageContext";

// Import Index page statically to avoid dynamic import errors
import Index from "./pages/Index";

// Only lazy load other pages with improved error handling
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import ClubDetail from "./pages/ClubDetail";
import Journal from "./pages/Journal";
import Strains from "./pages/Strains";
import StrainDetail from "./pages/StrainDetail";

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

// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-xl font-bold text-red-500 mb-4">Something went wrong</h2>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-w-full mb-4">
        {error.message}
      </pre>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  );
}

// Wrapper for ErrorBoundary as it's not imported from React anymore
function ErrorBoundaryWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      {children}
    </ErrorBoundary>
  );
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
              <ErrorBoundaryWrapper>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/clubs/:id" element={<ClubDetail />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/strains" element={<Strains />} />
                  <Route path="/strains/:name" element={<StrainDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ErrorBoundaryWrapper>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
