
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Heart, Share2, Users, Globe, UserCircle, Calendar, Bookmark, TrendingUp } from "lucide-react";

const CommunityPost = ({ 
  username, 
  avatar, 
  time, 
  content, 
  likes, 
  comments, 
  image = "" 
}: { 
  username: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  image?: string;
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base">{username}</CardTitle>
            <CardDescription className="text-xs">{time}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{content}</p>
        {image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <img 
              src={image} 
              alt="Post attachment" 
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-3">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Heart className="mr-1 h-4 w-4" /> 
          {likes}
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <MessageSquare className="mr-1 h-4 w-4" /> 
          {comments}
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Share2 className="mr-1 h-4 w-4" /> 
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

const Community = () => {
  const { t } = useLanguage();
  
  const posts = [
    {
      id: "1",
      username: "GreenThumb",
      avatar: "https://i.pravatar.cc/150?img=1",
      time: "2 hours ago",
      content: "Just harvested my first homegrown plants! The White Widow turned out amazing, very proud of this grow. Any tips for curing?",
      likes: 42,
      comments: 8,
      image: "https://images.unsplash.com/photo-1603909223429-69bb7909420c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "2",
      username: "ChronicChef",
      avatar: "https://i.pravatar.cc/150?img=2",
      time: "Yesterday",
      content: "Made some amazing infused olive oil with some Gelato. Perfect for salad dressings and pasta! Who else loves cooking with cannabis?",
      likes: 87,
      comments: 23,
    },
    {
      id: "3",
      username: "CannaScientist",
      avatar: "https://i.pravatar.cc/150?img=3",
      time: "3 days ago",
      content: "Interesting research coming out about terpene profiles and their effects on various conditions. Myrcene seems particularly promising for sleep issues. Anyone tried strains high in myrcene specifically for insomnia?",
      likes: 124,
      comments: 34,
    }
  ];

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-6">{t("community")}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Input placeholder={t("whatsOnYourMind")} className="rounded-full" />
              </div>
              <div className="mt-4 flex justify-between border-t pt-3">
                <Button variant="ghost" size="sm">
                  <MessageSquare className="mr-1 h-4 w-4" /> 
                  {t("post")}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="mr-1 h-4 w-4" /> 
                  {t("share")}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="popular">
            <TabsList className="mb-4 grid grid-cols-3 w-full">
              <TabsTrigger value="popular">
                <TrendingUp className="mr-1 h-4 w-4" />
                {t("popular")}
              </TabsTrigger>
              <TabsTrigger value="latest">
                <Calendar className="mr-1 h-4 w-4" />
                {t("latest")}
              </TabsTrigger>
              <TabsTrigger value="following">
                <UserCircle className="mr-1 h-4 w-4" />
                {t("following")}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="popular" className="mt-0">
              {posts.map(post => (
                <CommunityPost key={post.id} {...post} />
              ))}
            </TabsContent>
            
            <TabsContent value="latest" className="mt-0">
              <Card className="p-12 flex justify-center items-center">
                <CardDescription>
                  {t("emptyLatestPosts")}
                </CardDescription>
              </Card>
            </TabsContent>
            
            <TabsContent value="following" className="mt-0">
              <Card className="p-12 flex justify-center items-center">
                <CardDescription>
                  {t("loginToSeeFollowing")}
                </CardDescription>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5 text-green-500" />
                {t("trendingTags")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["#CannabisEducation", "#StrainReview", "#GrowTips", "#CBDvsThc", "#TerpTalk"].map((tag, i) => (
                  <Button key={i} variant="outline" size="sm" className="mr-2 mb-2">
                    {tag}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-green-500" />
                {t("suggestedGroups")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Homegrowers Network", members: 3420 },
                { name: "Cannabis Enthusiasts", members: 12500 },
                { name: "Medical Applications", members: 5280 }
              ].map((group, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{group.name}</p>
                    <p className="text-sm text-muted-foreground">{group.members} members</p>
                  </div>
                  <Button variant="outline" size="sm">
                    {t("join")}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bookmark className="mr-2 h-5 w-5 text-green-500" />
                {t("savedResources")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t("loginToSaveResources")}
                </p>
                <Button className="w-full" variant="outline">
                  <LogIn className="mr-1 h-4 w-4" />
                  {t("login")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Community;
