
import { useState } from "react";
import { Club, ClubFilter } from "@/types/club";
import { ClubCard } from "./ClubCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface ClubListProps {
  clubs: Club[];
  loading?: boolean;
  onFilterChange?: (filter: ClubFilter) => void;
  filter?: ClubFilter;
}

export function ClubList({ clubs, loading, onFilterChange, filter = { search: "" } }: ClubListProps) {
  const [tempSearch, setTempSearch] = useState(filter.search);
  const [tempStatus, setTempStatus] = useState<string>(filter.membershipStatus || "");
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearch(e.target.value);
  };

  const handleSearch = () => {
    if (onFilterChange) {
      onFilterChange({
        ...filter,
        search: tempSearch,
        membershipStatus: tempStatus as any || undefined
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleStatusChange = (value: string) => {
    setTempStatus(value);
    if (onFilterChange) {
      onFilterChange({
        ...filter,
        search: tempSearch,
        membershipStatus: value as any || undefined
      });
    }
  };

  const handleReset = () => {
    setTempSearch("");
    setTempStatus("");
    if (onFilterChange) {
      onFilterChange({
        search: ""
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Input
            placeholder="Search clubs by name or city..."
            value={tempSearch}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Select value={tempStatus} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Membership status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="waitlist">Waitlist</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleSearch} className="sm:w-auto">Search</Button>
        {(filter.search || filter.membershipStatus) && (
          <Button variant="outline" onClick={handleReset} className="sm:w-auto">Reset</Button>
        )}
      </div>

      {clubs.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-semibold">No clubs found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
          <Button onClick={handleReset} variant="outline" className="mt-4">Reset Filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map(club => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      )}
    </div>
  );
}
