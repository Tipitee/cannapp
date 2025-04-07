import { useState, useEffect } from "react";
import { useStrains } from "@/hooks/use-strains";
import { StrainCard } from "./StrainCard";
import { StrainFilter } from "./StrainFilter";
import { StrainFilter as StrainFilterType } from "@/types/strain";
import { Button } from "@/components/ui/button";
import { Loader2, SlidersHorizontal, Cannabis as CannabisIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface StrainListProps {
  initialSearch?: string;
  activeTab?: string;
}

export const StrainList = ({ initialSearch = "", activeTab = "all" }: StrainListProps) => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<StrainFilterType>({ search: initialSearch });
  const { strains, loading } = useStrains(filter);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const strainsPerPage = 9;
  
  // Update filter when initialSearch changes
  useEffect(() => {
    setFilter(prev => ({ ...prev, search: initialSearch }));
  }, [initialSearch]);
  
  // Handle tab changes
  useEffect(() => {
    if (activeTab === "all") {
      setFilter(prev => ({ ...prev, type: undefined }));
    } else {
      setFilter(prev => ({ ...prev, type: activeTab as "sativa" | "indica" | "hybrid" }));
    }
    // Reset to first page when changing tabs
    setCurrentPage(1);
  }, [activeTab]);
  
  // Calculate pagination
  const indexOfLastStrain = currentPage * strainsPerPage;
  const indexOfFirstStrain = indexOfLastStrain - strainsPerPage;
  const currentStrains = strains.slice(indexOfFirstStrain, indexOfLastStrain);
  const totalPages = Math.ceil(strains.length / strainsPerPage);
  
  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);
  
  // Pagination logic
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  
  // Create placeholder cards for loading state
  const renderPlaceholderCards = () => {
    return Array(strainsPerPage).fill(0).map((_, index) => (
      <div key={`placeholder-${index}`} className="flex h-full">
        <StrainCard 
          strain={{
            id: `loading-${index}`,
            name: "Loading...",
            type: "hybrid",
            thcLevel: 0,
            cbdLevel: 0,
            effects: [],
            flavors: [],
            medicalUses: [],
            description: "",
            rating: 0,
            reviewCount: 0,
          }} 
          isLoading={true} 
        />
      </div>
    ));
  };
  
  return (
    <div className="min-h-[300px]">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop sidebar filter */}
        <div className="hidden md:block w-full md:w-64 lg:w-72 flex-shrink-0">
          <div className="sticky top-24">
            <StrainFilter filter={filter} onFilterChange={setFilter} />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{t("strainsFound") || "Strains Found"}</h2>
            
            {/* Mobile filter button */}
            <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  {t("filter") || "Filter"}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-4/5">
                <div className="py-6">
                  <h3 className="text-lg font-bold mb-4">{t("filterStrains") || "Filter Strains"}</h3>
                  <StrainFilter filter={filter} onFilterChange={setFilter} />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {loading ? (
            <div>
              <p className="text-sm text-gray-500 mb-4">{t("loading") || "Loading results..."}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderPlaceholderCards()}
              </div>
            </div>
          ) : strains.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 dark:bg-gray-900 rounded-lg min-h-[300px]">
              <CannabisIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg text-gray-500 font-medium">{t("noStrainsFound") || "No strains found"}</p>
              <p className="text-gray-400 mt-1 mb-4">{t("tryDifferentSearch") || "Try a different search or filter"}</p>
              <Button variant="outline" onClick={() => setFilter({ search: "" })} className="mt-4">
                {t("reset") || "Reset"}
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">{`${strains.length} ${t("results") || "results"}`}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentStrains.map((strain) => (
                  <div key={strain.id} className="flex h-full">
                    <StrainCard strain={strain} />
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => prevPage()}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      // Show first page, last page, current page, and pages around current
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink 
                            onClick={() => paginate(pageNum)} 
                            isActive={currentPage === pageNum}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => nextPage()}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
