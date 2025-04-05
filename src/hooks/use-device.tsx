
import { useEffect, useState } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';
type DevicePlatform = 'ios' | 'android' | 'web';

export function useDevice() {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [platform, setPlatform] = useState<DevicePlatform>('web');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const detectDevice = () => {
      const ua = navigator.userAgent;
      
      // Detect platform
      if (/iPad|iPhone|iPod/.test(ua)) {
        setPlatform('ios');
      } else if (/Android/.test(ua)) {
        setPlatform('android');
      } else {
        setPlatform('web');
      }
      
      // Detect device type
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
      
      setIsReady(true);
    };

    detectDevice();
    
    // Re-detect on resize
    window.addEventListener('resize', detectDevice);
    return () => window.removeEventListener('resize', detectDevice);
  }, []);

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';
  
  const isIOS = platform === 'ios';
  const isAndroid = platform === 'android';
  const isWeb = platform === 'web';

  return {
    deviceType,
    platform,
    isMobile,
    isTablet,
    isDesktop,
    isIOS,
    isAndroid,
    isWeb,
    isReady
  };
}
