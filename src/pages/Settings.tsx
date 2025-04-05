
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Capacitor } from "@capacitor/core";
import { useDevice } from "@/hooks/use-device";
import { useLanguage } from "@/contexts/LanguageContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const { platform } = useDevice();
  const { t, language, setLanguage } = useLanguage();
  const isNative = Capacitor.isNativePlatform();
  
  return (
    <PageLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("settings")}</h1>
          <p className="text-muted-foreground">
            {t("settingsDescription")}
          </p>
        </div>
        
        <Separator />
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("languagePreference")}</CardTitle>
              <CardDescription>
                {t("languagePreferenceDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup 
                defaultValue={language} 
                onValueChange={(value) => setLanguage(value as 'en' | 'de')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en" id="en" />
                  <Label htmlFor="en">{t("english")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="de" id="de" />
                  <Label htmlFor="de">{t("german")}</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t("profileSettings")}</CardTitle>
              <CardDescription>
                {t("profileSettingsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{t("publicProfile")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("publicProfileDescription")}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{t("showEmail")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("showEmailDescription")}
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t("notificationSettings")}</CardTitle>
              <CardDescription>
                {t("notificationSettingsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{t("pushNotifications")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("pushNotificationsDescription")}
                  </p>
                </div>
                <Switch defaultChecked disabled={!isNative} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{t("emailNotifications")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("emailNotificationsDescription")}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{t("marketingEmails")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("marketingEmailsDescription")}
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
          
          {isNative && (
            <Card>
              <CardHeader>
                <CardTitle>{t("deviceSettings")}</CardTitle>
                <CardDescription>
                  {t("deviceSettingsDescription")} {platform}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{t("backgroundRefresh")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("backgroundRefreshDescription")}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{t("locationServices")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("locationServicesDescription")}
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="flex items-center justify-end space-x-2">
            <Button variant="outline">{t("cancel")}</Button>
            <Button>{t("saveChanges")}</Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Settings;
