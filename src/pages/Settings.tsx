
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Capacitor } from "@capacitor/core";
import { useDevice } from "@/hooks/use-device";

const Settings = () => {
  const { platform } = useDevice();
  const isNative = Capacitor.isNativePlatform();
  
  return (
    <PageLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        
        <Separator />
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Public profile</p>
                  <p className="text-sm text-muted-foreground">
                    Allow others to see your profile
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Show email</p>
                  <p className="text-sm text-muted-foreground">
                    Display your email on your public profile
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Push notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications on your device
                  </p>
                </div>
                <Switch defaultChecked disabled={!isNative} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Email notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates and alerts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Marketing emails</p>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new features and updates
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
          
          {isNative && (
            <Card>
              <CardHeader>
                <CardTitle>Device Settings</CardTitle>
                <CardDescription>
                  Platform-specific settings for {platform}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Background refresh</p>
                    <p className="text-sm text-muted-foreground">
                      Update content when app is not active
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Location services</p>
                    <p className="text-sm text-muted-foreground">
                      Allow app to use your location
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="flex items-center justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save changes</Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Settings;
