
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  description?: string;
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    description: "Return to the home page"
  },
  {
    title: "Profile",
    href: "/profile",
    description: "View your profile"
  },
  {
    title: "Settings",
    href: "/settings",
    description: "Manage your account settings"
  }
];

export const DesktopNavBar = () => {
  return (
    <div className="hidden md:block border-b">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent text-2xl font-bold">
              Cannabis Club Finder
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
          <Link
            to="/login"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
