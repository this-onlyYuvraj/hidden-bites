"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Star, MapPin, Calendar, User } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface ShopDetailClientProps {
  shop: {
    id: string;
    name: string;
    image?: string | null;
    type: string;
    speciality: string;
    priceRange: string;
    location?: string | null;
    reviewCount: number | null ;
    addedBy: { name: string; image?: string | null };
    reviews: {
      id: string;
      rating: number;
      comment: string;
      createdAt: Date;
      user: { name: string; image?: string | null };
    }[];
    rating: number;
  };
}

export default function ShopDetailClient({ shop }: ShopDetailClientProps) {
  const router = useRouter();
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAll, setShowAll] = useState(false);

  //sorted reviews
  const sortedReviews = useMemo(() => {
    return [...shop.reviews].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [shop.reviews]);

  const reviewsToShow = showAll ? sortedReviews : sortedReviews.slice(0, 4);

  const renderStars = (rating: number, interactive = false, onClick?: (rating: number) => void) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${interactive ? "cursor-pointer hover:scale-110 transition-transform hover:fill-secondary" : ""} ${i < Math.floor(rating) ? "fill-secondary text-primary " : "fill-secondary/20 text-primary/40"
          }`}
        onClick={() => interactive && onClick?.(i + 1)}
      />
    ));

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating === 0 || !newComment.trim()) return;

    setIsSubmitting(true);

    //fetching review first
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId: shop.id,
          rating: newRating,
          comment: newComment
        }),
      });

      if (!res.ok) {
        toast.error("Failed to submit review")
        setIsSubmitting(false);
        return;
      };

      //message and reset form
      toast.success("Review Added! Thank you for sharing your experience.");
      setNewRating(0);
      setNewComment("");
      router.refresh();
      setIsSubmitting(false);

    } catch (error) {
      console.error(error);
    }

  };


  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Image */}
      <div className="relative h-64 overflow-hidden">
        <Image priority={false} width={100}
          height={100} src={shop.image ?? "/assets/placeholder.svg"} alt={shop.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="absolute top-4 left-4 h-10 w-10 p-0 bg-black/20 text-white hover:bg-black/40"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="container px-4 py-6 space-y-6">
        {/* Shop Info */}
        <Card className="shadow-card -mt-20 relative z-10">
          <CardContent className="pt-6 text-primary space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{shop.name}</h1>
                <p className="text-lg text-muted-foreground">{shop.speciality}</p>
              </div>
              <Badge variant="secondary">{shop.type}</Badge>
            </div>

            <div className="grid text-primary grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2 text-food-location">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{shop.location || "Not specified"}</span>
              </div>
              <div className="flex items-center justify-evenly text-food-price">
                <div>
                  <span className="text-sm font-medium">Price Range:&nbsp; &nbsp;</span>
                  <span className="text-sm font-medium">{shop.priceRange}</span>
                </div>
                <div>
                  <span>Rating: &nbsp; &nbsp; </span>
                  <span>{shop.rating ?? "0.0"}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
              <User className="h-4 w-4" />
              <span>Added by {shop.addedBy.name}</span>
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" /> Reviews ({shop.reviews.length})


            </CardTitle>
            <div className="flex justify-end mt-[-25px] font-bold">
              {sortedReviews.length > 3 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-sm text-primary hover:underline"
                >
                  {showAll ? "See less" : "See more"}
                </button>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {sortedReviews.length > 0 ? (
              <>
                {reviewsToShow.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 rounded-lg bg-secondary/20 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          {review.user?.image ? (
                            <AvatarImage
                              src={review.user.image}
                              alt={review.user?.name ?? "User"}
                            />
                          ) : (
                            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                              {review.user?.name?.charAt(0).toUpperCase() ?? "?"}
                            </AvatarFallback>
                          )}
                        </Avatar>

                        <div>
                          <p className="font-medium">{review.user?.name ?? "User"}</p>
                          <div className="flex items-center gap-1">
                            {/* assuming renderStars is available */}
                            {renderStars(review.rating)}
                            <span className="text-sm ml-1">{review.rating}/5</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))}

                {sortedReviews.length > 4 && (
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-sm text-primary hover:underline"
                  >
                    {showAll ? "See less" : "See more"}
                  </button>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Star className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No reviews yet</p>
                <p className="text-sm">Be the first to share your experience!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Review */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Add Your Review</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Rating</label>
                <div className="flex items-center gap-1">{renderStars(newRating, true, setNewRating)}</div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Comment</label>
                <Textarea
                  placeholder="Share your experience..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="w-full flex justify-center">
                <Button
                  type="submit"
                  disabled={newRating === 0 || !newComment.trim() || isSubmitting}
                  className="w-1/2 cursor-pointer bg-primary text-popover hover:opacity-90 transition-opacity"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
