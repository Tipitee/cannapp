
import { DesktopNavBar } from "./DesktopNavBar";
import { MobileNavBar } from "./MobileNavBar";
import { useDevice } from "@/hooks/use-device";
import { useState, useEffect, useRef } from "react";

export const Navigation = () => {
  const { isDesktop, isReady } = useDevice();
  const [mounted, setMounted] = useState(false);
  const renderRef = useRef(false);
  
  useEffect(() => {
    // Set mounted state after component mounts in browser
    setMounted(true);
    
    // Set render ref to true to prevent double rendering
    renderRef.current = true;
    
    return () => {
      // Clean up mounted state on unmount
      setMounted(false);
    };
  }, []);
  
  // Don't render until device detection and client-side mounting are complete
  if (!isReady || !mounted) {
    // Return an empty div with the same height as the navigation to prevent layout shifts
    return <div className="h-16" />;
  }

  return renderRef.current ? (isDesktop ? <DesktopNavBar /> : <MobileNavBar />) : null;
};
