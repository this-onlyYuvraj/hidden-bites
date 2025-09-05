"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Star, MapPin, IndianRupee, Calendar, User } from "lucide-react";
import { toast } from "sonner";

interface ShopDetailClientProps {
  shop: {
    id: string;
    name: string;
    image?: string | null;
    type: string;
    speciality: string;
    priceRange: string;
    location?: string | null;
    addedBy: { name: string; image?: string | null };
    reviews: {
      id: string;
      rating: number;
      comment: string;
      createdAt: Date;
      user: { name: string; image?: string | null };
    }[];
  };
}

export default function ShopDetailClient({ shop }: ShopDetailClientProps) {
  const router = useRouter();
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renderStars = (rating: number, interactive = false, onClick?: (rating: number) => void) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""} ${
          i < Math.floor(rating) ? "fill-secondary text-primary" : "fill-secondary/20 text-primary/40"
        }`}
        onClick={() => interactive && onClick?.(i + 1)}
      />
    ));

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating === 0 || !newComment.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate API call
    toast("Review Added! Thank you for sharing your experience.");
    setNewRating(0);
    setNewComment("");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Image */}
      <div className="relative h-64 overflow-hidden">
        <img src={shop.image ?? "/assets/placeholder.svg"} alt={shop.name} className="h-full w-full object-cover" />
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
        <Card className="shadow-card -mt-16 relative z-10">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{shop.name}</h1>
                <p className="text-lg text-muted-foreground">{shop.speciality}</p>
              </div>
              <Badge variant="secondary">{shop.type}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2 text-food-location">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{shop.location || "Not specified"}</span>
              </div>
              <div className="flex items-center gap-2 text-food-price">
                <IndianRupee className="h-4 w-4" />
                <span className="text-sm font-medium">{shop.priceRange}</span>
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
          </CardHeader>
          <CardContent className="space-y-4">
            {shop.reviews.length > 0 ? (
              shop.reviews.map((review) => (
                <div key={review.id} className="p-4 rounded-lg bg-secondary/20 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        {review.user.image ? (
                          <AvatarImage src={review.user.image} alt={review.user.name} />
                        ) : (
                          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                            {review.user.name.charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <p className="font-medium">{review.user.name}</p>
                        <div className="flex items-center gap-1">
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
              ))
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

              <Button
                type="submit"
                disabled={newRating === 0 || !newComment.trim() || isSubmitting}
                className="w-full bg-gradient-fab hover:opacity-90 transition-opacity"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
