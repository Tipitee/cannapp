
import { useParams, useNavigate } from "react-router-dom";
import { useClubs } from "@/hooks/use-clubs";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClubMap } from "@/components/map/ClubMap";
import { Review } from "@/types/club";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

const ClubDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getClubById, getReviewsByClubId, loading } = useClubs();
  
  const club = id ? getClubById(id) : null;
  const reviews = id ? getReviewsByClubId(id) : [];
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const renderReview = (review: Review) => {
    return (
      <div key={review.id} className="mb-6">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>{getInitials(review.userName)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{review.userName}</div>
            <div className="text-muted-foreground text-sm">{formatDate(review.createdAt)}</div>
          </div>
        </div>
        <div className="mt-2">{renderStarRating(review.rating)}</div>
        <p className="mt-2 text-gray-700">{review.comment}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </PageLayout>
    );
  }

  if (!club) {
    return (
      <PageLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold">Club Not Found</h2>
          <p className="text-muted-foreground mt-2">The club you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')} className="mt-4">Back to Home</Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="relative rounded-lg overflow-hidden h-64 md:h-96">
              <img
                src={club.thumbnailUrl || "https://placehold.co/600x400?text=No+Image"}
                alt={club.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 right-4">
                {club.membershipStatus === "open" && (
                  <Badge className="bg-green-500">Open for Members</Badge>
                )}
                {club.membershipStatus === "waitlist" && (
                  <Badge className="bg-amber-500">Waitlist</Badge>
                )}
                {club.membershipStatus === "closed" && (
                  <Badge variant="destructive">Closed</Badge>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h1 className="text-3xl font-bold">{club.name}</h1>
              <div className="flex items-center mt-2">
                <span className="text-amber-500">★ {club.rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground ml-1">
                  ({club.reviewCount} reviews)
                </span>
                <span className="text-muted-foreground mx-2">•</span>
                <span className="text-muted-foreground">{club.city}, Germany</span>
              </div>

              <Tabs defaultValue="about" className="mt-6">
                <TabsList>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-4">
                  <p className="text-gray-700">{club.description}</p>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <h3 className="font-semibold">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p>
                          {club.address}, {club.zipCode} {club.city}, Germany
                        </p>
                      </div>
                      {club.phoneNumber && (
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p>{club.phoneNumber}</p>
                        </div>
                      )}
                      {club.email && (
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p>{club.email}</p>
                        </div>
                      )}
                      {club.website && (
                        <div>
                          <p className="text-sm text-muted-foreground">Website</p>
                          <a 
                            href={club.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {club.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <h3 className="font-semibold">Opening Hours</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {club.openingHours?.monday && (
                        <div>
                          <p className="text-sm text-muted-foreground">Monday</p>
                          <p>{club.openingHours.monday}</p>
                        </div>
                      )}
                      {club.openingHours?.tuesday && (
                        <div>
                          <p className="text-sm text-muted-foreground">Tuesday</p>
                          <p>{club.openingHours.tuesday}</p>
                        </div>
                      )}
                      {club.openingHours?.wednesday && (
                        <div>
                          <p className="text-sm text-muted-foreground">Wednesday</p>
                          <p>{club.openingHours.wednesday}</p>
                        </div>
                      )}
                      {club.openingHours?.thursday && (
                        <div>
                          <p className="text-sm text-muted-foreground">Thursday</p>
                          <p>{club.openingHours.thursday}</p>
                        </div>
                      )}
                      {club.openingHours?.friday && (
                        <div>
                          <p className="text-sm text-muted-foreground">Friday</p>
                          <p>{club.openingHours.friday}</p>
                        </div>
                      )}
                      {club.openingHours?.saturday && (
                        <div>
                          <p className="text-sm text-muted-foreground">Saturday</p>
                          <p>{club.openingHours.saturday}</p>
                        </div>
                      )}
                      {club.openingHours?.sunday && (
                        <div>
                          <p className="text-sm text-muted-foreground">Sunday</p>
                          <p>{club.openingHours.sunday}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="amenities" className="mt-4">
                  <div className="grid grid-cols-2 gap-2">
                    {club.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"/></svg>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-4">
                  {reviews.length > 0 ? (
                    <div>
                      {reviews.map(review => renderReview(review))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No reviews yet.</p>
                      <Button className="mt-4">Write a Review</Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>
                  {club.address}, {club.zipCode} {club.city}, Germany
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-64 rounded-md overflow-hidden">
                  <ClubMap
                    clubs={[club]}
                    initialCenter={[club.latitude, club.longitude]}
                    initialZoom={14}
                    height="100%"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {club.imageUrls.map((url, index) => (
                    <div key={index} className="aspect-square rounded-md overflow-hidden">
                      <img
                        src={url}
                        alt={`${club.name} ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ClubDetail;
