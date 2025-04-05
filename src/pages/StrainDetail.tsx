
import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { useStrainDetail } from "@/hooks/use-strains";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Loader2, 
  ArrowLeft, 
  Star, 
  Bookmark, 
  Plus, 
  ArrowRight, 
  Cannabis, 
  Share2, 
  Heart 
} from "lucide-react";
import { Link } from "react-router-dom";
import { ReviewForm } from "@/components/strains/ReviewForm";
import { RelatedStrains } from "@/components/strains/RelatedStrains";
import { StrainDetailTabs } from "@/components/strains/StrainDetailTabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StrainDetail = () => {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const { strain, reviews, loading, error, addReview } = useStrainDetail(id);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [favorited, setFavorited] = useState(false);

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
        return "bg-emerald-500";
      case "indica":
        return "bg-indigo-500";
      case "hybrid":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleReviewSubmit = async (reviewData: any) => {
    const result = await addReview({
      ...reviewData,
      strainId: strain.id,
    });
    
    if (result) {
      setShowReviewForm(false);
    }
    
    return result;
  };

  return (
    <PageLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link to="/strains">
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold">{strain.name}</h1>
            <Badge className={`${getStrainTypeColor(strain.type)} airbnb-badge`}>
              {strain.type.charAt(0).toUpperCase() + strain.type.slice(1)}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={() => setFavorited(!favorited)}
            >
              <Heart 
                className={`h-5 w-5 ${favorited ? "fill-red-500 text-red-500" : "text-gray-500"}`} 
              />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="rounded-xl overflow-hidden shadow-lg">
              {strain.imageUrl ? (
                <img 
                  src={strain.imageUrl} 
                  alt={strain.name} 
                  className="w-full h-64 md:h-[380px] object-cover"
                />
              ) : (
                <div className="w-full h-64 md:h-[380px] flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <Cannabis className="h-16 w-16 text-gray-400" />
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
                <span className="text-gray-500 ml-1">({strain.reviewCount} {t("reviews").toLowerCase()})</span>
              </div>
            </div>
            
            <Tabs defaultValue="details">
              <TabsList className="hidden">
                <TabsTrigger value="details">{t("details")}</TabsTrigger>
                <TabsTrigger value="reviews">{t("userReviews")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="pt-4">
                <StrainDetailTabs strain={strain} />
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{t("userReviews")}</h3>
                  {!showReviewForm && (
                    <Button 
                      onClick={() => setShowReviewForm(true)}
                      className="gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      {t("writeReview")}
                    </Button>
                  )}
                </div>
                
                {showReviewForm && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("writeReview")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ReviewForm 
                        strainId={strain.id}
                        onSubmit={handleReviewSubmit}
                        onCancel={() => setShowReviewForm(false)}
                      />
                    </CardContent>
                  </Card>
                )}
                
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
                        
                        {review.sideEffects && review.sideEffects.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-500 mb-1">{t("sideEffects")}:</p>
                            <div className="flex flex-wrap gap-1">
                              {review.sideEffects.map((effect, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {t(effect) || effect.replace('_', ' ')}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {review.effectiveness && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-500 mb-1">{t("effectiveness")}:</p>
                            <div className="flex items-center">
                              {Array(5).fill(0).map((_, i) => (
                                <Star 
                                  key={i}
                                  className="h-3 w-3 text-green-500"
                                  fill={i < review.effectiveness ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : !showReviewForm ? (
                  <div className="text-center py-6">
                    <p className="text-gray-500">{t("noReviewsYet")}</p>
                  </div>
                ) : null}
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card className="shadow-airbnb">
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
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (strain.thcLevel / 30) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">CBD</span>
                      <span className="text-sm font-medium">{strain.cbdLevel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (strain.cbdLevel / 20) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <h3 className="font-medium">{t("consumptionMethods")}</h3>
                  <div className="flex flex-wrap gap-1">
                    {['smoking', 'vaping', 'edibles'].map((method) => (
                      <Badge key={method} variant="secondary">
                        {t(method)}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <h3 className="font-medium">{t("trackEffectiveness")}</h3>
                  <p className="text-sm text-gray-500">{t("journalDescription")}</p>
                  <Button className="w-full" asChild>
                    <Link to="/journal">{t("startJournal")}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-4 shadow-airbnb">
              <CardHeader>
                <CardTitle>{t("askCommunity")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-3">{t("askCommunityDescription")}</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/community">{t("askQuestion")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <RelatedStrains 
          currentStrainId={strain.id}
          strainType={strain.type}
          effects={strain.effects}
        />
      </div>
    </PageLayout>
  );
};

export default StrainDetail;
