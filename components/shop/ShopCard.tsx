"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface Shop {
  id: string;
  name: string;
  type: string;
  specialty: string;
  priceRange: string;
  location: string;
  image: string;
  addedBy: string;
  reviews: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    rating: number;
    comment: string;
    shopId: string;
    userId: string;
  }[];
  rating: number;
  reviewCount: number;
}

interface ShopCardProps {
  shop: Shop;
}

export function ShopCard({ shop }: ShopCardProps) {
  const router = useRouter();

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-primary text-primary text-food-rating"
            : "fill-muted-foreground/20 text-muted-foreground/40"
        }`}
      />
    ));

  return (
    <Card
      className="group cursor-pointer overflow-hidden bg-gradient-card shadow-card 
                 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] 
                 active:scale-95 sm:hover:scale-[1.02] rounded-xl"
      onClick={() => router.push(`/shop/${shop.id}`)}
    >
      {/* Image */}
      <div className="aspect-[16/9] sm:aspect-[2/1] overflow-hidden">
        <img
          loading="lazy"
          src={shop.image ?? "public/assets/placeholder.svg"}
          alt={shop.name}
          className="h-full w-full object-cover transition-transform 
                     duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base sm:text-lg text-foreground truncate">
              {shop.name}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">
              {shop.specialty}
            </p>
          </div>
          <Badge
            variant="secondary"
            className="ml-1 sm:ml-2 shrink-0 text-[10px] sm:text-xs px-2 py-0.5"
          >
            {shop.type}
          </Badge>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 flex-wrap">
          {renderStars(shop.rating)}
          <span className="text-xs sm:text-sm font-medium ml-1">
            {shop.rating.toFixed(1)} ({shop.reviewCount})
          </span>
        </div>

        {/* Location + Price */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-1 text-food-location truncate">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate max-w-[12ch] sm:max-w-[20ch]">
              {shop.location}
            </span>
          </div>
          <div className="flex items-center gap-1 text-food-price font-medium">
            <span>{shop.priceRange}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-[11px] sm:text-xs text-muted-foreground truncate">
          Added by <span className="font-medium">{shop.addedBy}</span>
        </div>
      </CardContent>
    </Card>
  );
}
