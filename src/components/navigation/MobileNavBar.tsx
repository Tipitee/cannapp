
import { Home, User, Settings, Menu, X, Map, List, Leaf } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";

export const MobileNavBar = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Listen for the custom event to change tabs
  useEffect(() => {
    const handleTabChange = (event: CustomEvent<{ tab: string }>) => {
      // Handle tab change if needed
      console.log('Tab changed to:', event.detail.tab);
    };

    window.addEventListener('changeTab', handleTabChange as EventListener);
    return () => {
      window.removeEventListener('changeTab', handleTabChange as EventListener);
    };
  }, []);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden">
        <div className="flex items-center justify-around p-2">
          <NavButton to="/" label={t("home")} active={location.pathname === "/"}>
            <Home className="h-6 w-6" />
          </NavButton>
          {isHomePage && (
            <>
              <NavButton 
                to="/?view=map" 
                label={t("map")}
                onClick={() => {
                  const event = new CustomEvent('changeTab', { detail: { tab: 'map' } });
                  window.dispatchEvent(event);
                  return false; // Prevent default navigation
                }}
              >
                <Map className="h-6 w-6" />
              </NavButton>
              <NavButton 
                to="/?view=list" 
                label={t("list")}
                onClick={() => {
                  const event = new CustomEvent('changeTab', { detail: { tab: 'list' } });
                  window.dispatchEvent(event);
                  return false; // Prevent default navigation
                }}
              >
                <List className="h-6 w-6" />
              </NavButton>
            </>
          )}
          <NavButton to="/strains" label={t("strains")} active={location.pathname.includes('/strains')}>
            <Leaf className="h-6 w-6" />
          </NavButton>
          <NavButton to="/profile" label={t("profile")} active={location.pathname === "/profile"}>
            <User className="h-6 w-6" />
          </NavButton>
          <NavButton to="/settings" label={t("settings")} active={location.pathname === "/settings"}>
            <Settings className="h-6 w-6" />
          </NavButton>
        </div>
      </div>

      <Button 
        variant="outline" 
        size="icon"
        onClick={toggleMenu} 
        className="fixed top-4 right-4 z-50 md:hidden rounded-full bg-white shadow-md border"
      >
        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <div 
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-200",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
      >
        <div 
          className={cn(
            "fixed right-0 top-0 h-full w-2/3 max-w-xs bg-white shadow-xl p-6 transition-transform duration-200",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center pt-2 pb-6">
            <h3 className="font-bold">{t("appName")}</h3>
            <LanguageSwitcher variant="minimal" />
          </div>
          
          <div className="space-y-6">
            <MobileMenuItem to="/" onClick={toggleMenu} active={location.pathname === "/"}>
              {t("home")}
            </MobileMenuItem>
            <MobileMenuItem to="/strains" onClick={toggleMenu} active={location.pathname.includes('/strains')}>
              {t("strains")}
            </MobileMenuItem>
            <MobileMenuItem to="/profile" onClick={toggleMenu} active={location.pathname === "/profile"}>
              {t("profile")}
            </MobileMenuItem>
            <MobileMenuItem to="/settings" onClick={toggleMenu} active={location.pathname === "/settings"}>
              {t("settings")}
            </MobileMenuItem>
            <MobileMenuItem to="/login" onClick={toggleMenu} active={location.pathname === "/login"}>
              {t("login")}
            </MobileMenuItem>
          </div>
        </div>
      </div>
    </>
  );
};

const NavButton = ({ 
  children, 
  label, 
  to, 
  active,
  onClick 
}: { 
  children: React.ReactNode, 
  label: string, 
  to: string, 
  active?: boolean,
  onClick?: () => boolean | void
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      const result = onClick();
      if (result === false) {
        e.preventDefault();
      }
    }
  };

  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center py-1 ${active ? "text-green-500" : ""}`}
      onClick={handleClick}
    >
      {children}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

const MobileMenuItem = ({ 
  children, 
  to, 
  onClick,
  active
}: { 
  children: React.ReactNode, 
  to: string, 
  onClick: () => void,
  active?: boolean
}) => (
  <Link 
    to={to} 
    className={`block py-3 px-4 text-lg font-medium border-b border-gray-100 hover:bg-gray-50 rounded-md ${active ? "text-green-500" : ""}`}
    onClick={onClick}
  >
    {children}
  </Link>
);
