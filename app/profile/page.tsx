import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { BottomNav } from "../../components/layout/BottomNav";
import { mockShops } from "../../data/mockShops";
import { Star, MapPin, Calendar } from "lucide-react";
import { auth } from "@/auth";
import Link from "next/link";

export default async function ProfilePage() {
  // Filter shops added by current user
  const session = await auth();
  if(!session){
    return (
      <div className="flex justify-center flex-col text-center items-center">
        <p className="text-center text-2xl">Please login first</p>
        <div className="px-5 py-5 bg-primary text-white text-2xl w-20">
          <div>
            <Link className="text-center" href={"/login"}>
            Login
          </Link>
          </div>
        </div>
      </div>
    )
  }

  const userShops = session?.user
    ? mockShops.filter(shop => shop.addedBy === session.user?.name)
    : [];

  // Get user reviews (from mock data)
  const userReviews = mockShops.flatMap(shop =>
    (shop.reviews || []).filter(review => review.userName === "John D.")
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating)
            ? "fill-food-rating text-food-rating"
            : "fill-muted-foreground/20 text-muted-foreground/40"
          }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">

      <div className="container px-4 py-6 pb-24 space-y-6">
        {/* Profile Header */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={session?.user?.image ?? ""} alt={session?.user?.name ?? ""} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {(session?.user?.name?.charAt(0)?.toUpperCase()) ?? ""}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{session?.user?.name ?? ""}</h1>
                <p className="text-muted-foreground">{session?.user?.email ?? ""}</p>
                <div className="flex gap-4 mt-2 text-sm">
                  <span><strong>{userShops.length}</strong> shops added</span>
                  <span><strong>{userReviews.length}</strong> reviews</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-card">
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-primary">{userShops.length}</div>
              <div className="text-sm text-muted-foreground">Shops Added</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-primary">{userReviews.length}</div>
              <div className="text-sm text-muted-foreground">Reviews Written</div>
            </CardContent>
          </Card>
        </div>

        {/* My Shops */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              My Shops
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userShops.length > 0 ? (
              userShops.map((shop) => (
                <div key={shop.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{shop.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{shop.specialty}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {shop.type}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {renderStars(shop.rating)}
                        <span className="text-xs">{shop.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>You haven't added any shops yet</p>
                <p className="text-sm">Share your favorite food spots with the community!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* My Reviews */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              My Reviews
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userReviews.length > 0 ? (
              userReviews.map((review) => (
                <div key={review.id} className="p-3 rounded-lg bg-secondary/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                      <span className="text-sm font-medium ml-1">{review.rating}/5</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Star className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No reviews written yet</p>
                <p className="text-sm">Visit some shops and share your experience!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}