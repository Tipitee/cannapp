
import { Club } from "@/types/club";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ClubCardProps {
  club: Club;
}

export function ClubCard({ club }: ClubCardProps) {
  const getMembershipStatusBadge = () => {
    switch (club.membershipStatus) {
      case "open":
        return <Badge className="bg-green-500">Open for Members</Badge>;
      case "waitlist":
        return <Badge className="bg-amber-500">Waitlist</Badge>;
      case "closed":
        return <Badge variant="destructive">Closed</Badge>;
      default:
        return null;
    }
  };

  return (
    <Link to={`/clubs/${club.id}`}>
      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={club.thumbnailUrl || "https://placehold.co/600x400?text=No+Image"}
            alt={club.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-2 right-2">
            {getMembershipStatusBadge()}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold line-clamp-1">{club.name}</h3>
          <p className="text-muted-foreground text-sm">{club.city}, Germany</p>
          <div className="flex items-center mt-2">
            <span className="text-amber-500">★ {club.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground ml-1">({club.reviewCount} reviews)</span>
          </div>
          <p className="text-sm mt-2 line-clamp-2">{club.description}</p>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0 flex-wrap gap-1">
          {club.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="outline" className="mr-1">
              {amenity}
            </Badge>
          ))}
          {club.amenities.length > 3 && (
            <Badge variant="outline" className="bg-background">
              +{club.amenities.length - 3}
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
