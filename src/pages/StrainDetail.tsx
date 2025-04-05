
import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { useStrainDetail } from "@/hooks/use-strains";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, ArrowLeft, Star, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

const StrainDetail = () => {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const { strain, reviews, loading, error } = useStrainDetail(id);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (error || !strain) {
    return (
      <PageLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4">{t("strainNotFound")}</h2>
          <p className="text-gray-500 mb-6">{error || t("strainNotFoundMessage")}</p>
          <Link to="/strains">
            <Button>{t("backToStrains")}</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  const getStrainTypeColor = (type: string) => {
    switch (type) {
      case "sativa":
        return "bg-green-500";
      case "indica":
        return "bg-purple-500";
      case "hybrid":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <PageLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-2">
          <Link to="/strains">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">{strain.name}</h1>
          <Badge className={getStrainTypeColor(strain.type)}>
            {strain.type.charAt(0).toUpperCase() + strain.type.slice(1)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="rounded-lg overflow-hidden">
              {strain.imageUrl ? (
                <img 
                  src={strain.imageUrl} 
                  alt={strain.name} 
                  className="w-full h-64 md:h-80 object-cover"
                />
              ) : (
                <div className="w-full h-64 md:h-80 flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <div className="flex items-center text-yellow-500">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i}
                      className="h-5 w-5"
                      fill={i < Math.floor(strain.rating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="ml-2 font-medium">{strain.rating.toFixed(1)}</span>
                <span className="text-gray-500 ml-1">({strain.reviewCount})</span>
              </div>
              
              <Button variant="outline" size="sm" className="gap-1">
                <Bookmark className="h-4 w-4" />
                {t("saveToFavorites")}
              </Button>
            </div>
            
            <Tabs defaultValue="details" className="mt-6">
              <TabsList>
                <TabsTrigger value="details">{t("details")}</TabsTrigger>
                <TabsTrigger value="reviews">{t("userReviews")}</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4 space-y-4">
                <div>
                  <h3 className="font-medium mb-2">{t("description")}</h3>
                  <p className="text-gray-700">{strain.description}</p>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">{t("effects")}</h3>
                    <div className="flex flex-wrap gap-1">
                      {strain.effects.map((effect, index) => (
                        <Badge key={index} variant="secondary">
                          {t(effect)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">{t("medicalUses")}</h3>
                    <div className="flex flex-wrap gap-1">
                      {strain.medicalUses.map((use, index) => (
                        <Badge key={index} variant="outline">
                          {use}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">{t("flavors")}</h3>
                  <div className="flex flex-wrap gap-1">
                    {strain.flavors.map((flavor, index) => (
                      <Badge key={index} variant="secondary" className="bg-amber-100 hover:bg-amber-200 text-amber-800">
                        {flavor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-4 space-y-4">
                {reviews.length > 0 ? (
                  reviews.map(review => (
                    <Card key={review.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-base">{review.userName}</CardTitle>
                          <div className="flex items-center">
                            {Array(5).fill(0).map((_, i) => (
                              <Star 
                                key={i}
                                className="h-4 w-4 text-yellow-500"
                                fill={i < review.rating ? "currentColor" : "none"}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">{t("noReviewsYet")}</p>
                    <Button className="mt-2">{t("writeReview")}</Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t("cannabinoidProfile")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">THC</span>
                      <span className="text-sm font-medium">{strain.thcLevel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (strain.thcLevel / 30) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">CBD</span>
                      <span className="text-sm font-medium">{strain.cbdLevel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (strain.cbdLevel / 20) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <h3 className="font-medium">{t("trackEffectiveness")}</h3>
                  <p className="text-sm text-gray-500">{t("journalDescription")}</p>
                  <Button className="w-full">{t("startJournal")}</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>{t("askCommunity")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-3">{t("askCommunityDescription")}</p>
                <Button variant="outline" className="w-full">{t("askQuestion")}</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default StrainDetail;
