
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen"; 
import { Button } from "@/components/ui/button";
import { useDevice } from "@/hooks/use-device";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { platform, deviceType, isReady } = useDevice();
  const { toast } = useToast();

  useEffect(() => {
    const hideSplash = async () => {
      if (Capacitor.isNativePlatform()) {
        await SplashScreen.hide();
      }
    };
    
    hideSplash();
  }, []);

  useEffect(() => {
    if (isReady) {
      toast({
        title: "Welcome to ConnectVerse",
        description: `You're using a ${deviceType} device on ${platform}`,
      });
    }
  }, [isReady, deviceType, platform, toast]);

  return (
    <PageLayout>
      <div className="animate-fade-in space-y-8">
        <section className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-app-primary via-app-secondary to-app-accent bg-clip-text text-transparent">
            Welcome to ConnectVerse
          </h1>
          <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
            Your cross-platform companion for iOS, Android, and Web
          </p>
        </section>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle>Cross-platform</CardTitle>
              <CardDescription>One codebase, many platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <p>ConnectVerse works seamlessly across iOS, Android, and the web, giving you a consistent experience everywhere.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => toast({ 
                title: "Current Platform", 
                description: `You're currently using ${platform}` 
              })}>
                Check Platform
              </Button>
            </CardFooter>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle>Responsive Design</CardTitle>
              <CardDescription>Looks great on any screen size</CardDescription>
            </CardHeader>
            <CardContent>
              <p>From smartphones to tablets to desktops, ConnectVerse adapts to provide the optimal user experience.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => toast({ 
                title: "Device Type", 
                description: `Your device is classified as: ${deviceType}` 
              })}>
                Check Device
              </Button>
            </CardFooter>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle>Native Features</CardTitle>
              <CardDescription>Access device capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Leverage native functionality like camera, notifications, and more while maintaining a single codebase.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Explore Features
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Button className="bg-gradient-to-r from-app-primary to-app-secondary hover:opacity-90">
            Get Started
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
