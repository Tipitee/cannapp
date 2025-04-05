
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home, Leaf, BookOpen, User, Users, Settings, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

export function MobileDrawer() {
  const { t } = useLanguage();
  const location = useLocation();
  
  const navItems = [
    {
      title: t("home"),
      href: "/",
      icon: Home,
      active: location.pathname === "/"
    },
    {
      title: t("strains"),
      href: "/strains",
      icon: Leaf,
      active: location.pathname.includes("/strains")
    },
    {
      title: t("journal"),
      href: "/journal",
      icon: BookOpen,
      active: location.pathname.includes("/journal")
    },
    {
      title: t("community"),
      href: "/community",
      icon: Users,
      active: location.pathname.includes("/community")
    },
    {
      title: t("profile"),
      href: "/profile",
      icon: User,
      active: location.pathname.includes("/profile")
    },
    {
      title: t("settings"),
      href: "/settings",
      icon: Settings,
      active: location.pathname.includes("/settings")
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t("openMenu")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-500" />
            <span className="bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent font-bold">
              {t("appName")}
            </span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={item.active ? "default" : "ghost"}
              className={cn(
                "justify-start",
                item.active ? "bg-green-500 hover:bg-green-600" : ""
              )}
              asChild
            >
              <Link to={item.href} className="flex items-center gap-2">
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            </Button>
          ))}
          
          <div className="border-t my-4 pt-4">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/login" className="flex items-center gap-2">
                <LogIn className="h-5 w-5" />
                {t("login")}
              </Link>
            </Button>
          </div>
          
          <div className="mt-4">
            <LanguageSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
