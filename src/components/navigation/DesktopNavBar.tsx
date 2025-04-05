
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, Notebook, UserCircle, Settings, LogIn, Leaf } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon: React.ComponentType<any>;
}

export const DesktopNavBar = () => {
  const { t } = useLanguage();
  
  const navItems: NavItem[] = [
    {
      title: t("home"),
      href: "/",
      description: t("homeDescription"),
      icon: Home
    },
    {
      title: t("strains"),
      href: "/strains",
      description: t("strainsDescription"),
      icon: Leaf
    },
    {
      title: t("journal"),
      href: "/journal",
      description: t("journalDescription"),
      icon: Notebook
    },
    {
      title: t("profile"),
      href: "/profile",
      description: t("profileDescription"),
      icon: UserCircle
    },
    {
      title: t("settings"),
      href: "/settings",
      description: t("settingsDescription"),
      icon: Settings
    }
  ];

  return (
    <div className="hidden md:block border-b">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-green-500" />
            <span className="bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent text-2xl font-bold">
              {t("appName")}
            </span>
          </Link>
          <nav className="mx-6 flex items-center space-x-6">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.href === window.location.pathname;
              
              return (
                <Link
                  key={index}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-1 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-green-500" : "text-muted-foreground")} />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <LanguageSwitcher variant="minimal" />
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
            <Link to="/login" className="flex items-center space-x-1">
              <LogIn className="h-4 w-4" />
              <span>{t("login")}</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
