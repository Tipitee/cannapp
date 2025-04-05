
import { useDevice } from "@/hooks/use-device";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const PageLayout = ({ children, className, fullWidth = false }: PageLayoutProps) => {
  const { isMobile } = useDevice();
  
  return (
    <main 
      className={cn(
        "min-h-[calc(100vh-4rem)]",
        isMobile && "pb-24", // Add padding at the bottom for mobile navigation
        !fullWidth && "container mx-auto px-4 py-6 md:py-10",
        className
      )}
    >
      {children}
    </main>
  );
};
