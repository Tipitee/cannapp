
import { DesktopNavBar } from "./DesktopNavBar";
import { MobileNavBar } from "./MobileNavBar";
import { useDevice } from "@/hooks/use-device";
import { useState, useEffect } from "react";

export const Navigation = () => {
  const { isDesktop, isReady } = useDevice();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Set mounted state after component mounts in browser
    setMounted(true);
    return () => {
      // Clean up mounted state on unmount
      setMounted(false);
    };
  }, []);
  
  // Don't render until device detection and client-side mounting are complete
  if (!isReady || !mounted) {
    return null;
  }

  return isDesktop ? <DesktopNavBar /> : <MobileNavBar />;
};
