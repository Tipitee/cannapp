
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
import { Navigation } from "./components/navigation/Navigation";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";

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
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
