
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f723b71bc9a447eaa3401437f171345d',
  appName: 'cross-platform-connect-verse',
  webDir: 'dist',
  server: {
    url: 'https://f723b71b-c9a4-47ea-a340-1437f171345d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#3B82F6",
      showSpinner: true,
      spinnerColor: "#ffffff"
    }
  }
};

export default config;
