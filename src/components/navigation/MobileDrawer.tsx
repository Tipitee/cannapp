
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home, BookOpen, User, Settings, LogIn, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

export function MobileDrawer() {
  const { t } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  
  const navItems = [
    {
      title: t("home"),
      href: "/",
      icon: Home,
      active: location.pathname === "/"
    },
    {
      title: t("journal"),
      href: "/journal",
      icon: BookOpen,
      active: location.pathname.includes("/journal")
    },
    {
      title: t("strains"),
      href: "/strains",
      icon: Leaf,
      active: location.pathname.includes("/strains")
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

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t("openMenu")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2">
            <img src="/lovable-uploads/4e1faf83-8ac7-4c73-8d15-9764b0688d4b.png" alt="CannaClubMap Logo" className="h-6" />
            <span className="bg-canna-gradient bg-clip-text text-transparent font-bold">
              CannaClubMap
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
                item.active ? "bg-app-primary hover:bg-app-secondary" : ""
              )}
              asChild
              onClick={handleLinkClick}
            >
              <Link to={item.href} className="flex items-center gap-2">
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            </Button>
          ))}
          
          <div className="border-t my-4 pt-4">
            <Button variant="outline" className="w-full justify-start" asChild onClick={handleLinkClick}>
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
