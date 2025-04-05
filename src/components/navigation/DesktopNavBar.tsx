
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavItem {
  title: string;
  href: string;
  description?: string;
}

export const DesktopNavBar = () => {
  const { t } = useLanguage();
  
  const navItems: NavItem[] = [
    {
      title: t("home"),
      href: "/",
      description: t("homeDescription")
    },
    {
      title: t("strains"),
      href: "/strains",
      description: t("strainsDescription")
    },
    {
      title: t("profile"),
      href: "/profile",
      description: t("profileDescription")
    },
    {
      title: t("settings"),
      href: "/settings",
      description: t("settingsDescription")
    }
  ];

  return (
    <div className="hidden md:block border-b">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent text-2xl font-bold">
              {t("appName")}
            </span>
          </Link>
          <nav className="mx-6 flex items-center space-x-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  item.href === window.location.pathname
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <LanguageSwitcher variant="minimal" />
          <Link
            to="/login"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("login")}
          </Link>
        </div>
      </div>
    </div>
  );
};
