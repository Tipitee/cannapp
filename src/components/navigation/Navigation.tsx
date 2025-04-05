
import { DesktopNavBar } from "./DesktopNavBar";
import { MobileNavBar } from "./MobileNavBar";
import { useDevice } from "@/hooks/use-device";

export const Navigation = () => {
  const { isDesktop, isReady } = useDevice();

  if (!isReady) {
    return null; // Don't render until device detection is complete
  }

  return (
    <>
      {isDesktop ? <DesktopNavBar /> : null}
      {!isDesktop ? <MobileNavBar /> : null}
    </>
  );
};
