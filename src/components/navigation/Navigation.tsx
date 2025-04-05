
import { DesktopNavBar } from "./DesktopNavBar";
import { MobileNavBar } from "./MobileNavBar";
import { useDevice } from "@/hooks/use-device";
import { useState, useEffect } from "react";

export const Navigation = () => {
  const { isDesktop, isReady } = useDevice();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Don't render until device detection and client-side mounting are complete
  if (!isReady || !mounted) {
    return null;
  }

  return isDesktop ? <DesktopNavBar /> : <MobileNavBar />;
};
