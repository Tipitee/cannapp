
import { Home, User, Settings, Menu, X, Map, List } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const MobileNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isClubDetail = location.pathname.startsWith("/clubs/");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden">
        <div className="flex items-center justify-around p-2">
          <NavButton to="/" label="Home" active={location.pathname === "/"}>
            <Home className="h-6 w-6" />
          </NavButton>
          {isHomePage && (
            <>
              <NavButton 
                to="/?view=map" 
                label="Map"
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
                label="List"
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
          <NavButton to="/profile" label="Profile" active={location.pathname === "/profile"}>
            <User className="h-6 w-6" />
          </NavButton>
          <NavButton to="/settings" label="Settings" active={location.pathname === "/settings"}>
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
          <div className="space-y-6 pt-10">
            <MobileMenuItem to="/" onClick={toggleMenu} active={location.pathname === "/"}>Home</MobileMenuItem>
            <MobileMenuItem to="/profile" onClick={toggleMenu} active={location.pathname === "/profile"}>Profile</MobileMenuItem>
            <MobileMenuItem to="/settings" onClick={toggleMenu} active={location.pathname === "/settings"}>Settings</MobileMenuItem>
            <MobileMenuItem to="/login" onClick={toggleMenu} active={location.pathname === "/login"}>Login</MobileMenuItem>
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
