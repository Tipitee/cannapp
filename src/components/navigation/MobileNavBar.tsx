
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { Home, Leaf, BookOpen, User, Menu, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MobileDrawer } from "./MobileDrawer";

export const MobileNavBar = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    {
      label: t("home"),
      href: "/",
      icon: Home,
      active: location.pathname === "/",
    },
    {
      label: t("strains"),
      href: "/strains",
      icon: Leaf,
      active: location.pathname.includes("/strains"),
    },
    {
      label: t("journal"),
      href: "/journal",
      icon: BookOpen,
      active: location.pathname.includes("/journal"),
    },
    {
      label: t("community"),
      href: "/community",
      icon: Users,
      active: location.pathname.includes("/community"),
    },
    {
      label: t("profile"),
      href: "/profile",
      icon: User,
      active: location.pathname.includes("/profile"),
    },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b bg-background bg-opacity-95 backdrop-blur-sm px-4 md:hidden">
        <div className="flex items-center gap-2">
          <MobileDrawer />
          <span className="bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent text-xl font-bold">
            {t("appName")}
          </span>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 border-t bg-background bg-opacity-95 backdrop-blur-sm md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center text-center",
              item.active
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <item.icon className={cn("h-5 w-5", item.active && "text-green-500")} />
            <span className="mt-1 text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </>
  );
};
