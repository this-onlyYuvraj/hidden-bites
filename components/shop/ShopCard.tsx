"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, IndianRupee } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
        className={`h-4 w-4 ${i < Math.floor(rating)
            ? "fill-food-rating text-food-rating"
            : "fill-muted-foreground/20 text-muted-foreground/40"
          }`}
      />
    ));

  return (
    <Card
      className="group cursor-pointer overflow-hidden bg-gradient-card shadow-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in"
      onClick={() => router.push(`/shop/${shop.id}`)}
    >
      <div className="aspect-[2/1] overflow-hidden">
        <Image
          width={100}
          height={100}
          src={shop.image ?? '/assets/placeholder.svg'}
          alt={shop.name}
          className="h-full w-full object-cover px-3 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground truncate">
              {shop.name}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {shop.specialty}
            </p>
          </div>
          <Badge variant="secondary" className="ml-2 shrink-0">
            {shop.type}
          </Badge>
        </div>

        {/* <div className="flex items-center gap-1">
          {renderStars(shop.rating)}
          <span className="text-sm font-medium ml-1">
            {shop.rating.toFixed(1)} ({shop.reviewCount})
          </span>
        </div> */}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-food-location">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{shop.location}</span>
          </div>
          <div className="flex items-center gap-1 text-food-price font-medium">
            <span>{shop.priceRange}</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Added by <span className="font-medium">{shop.addedBy}</span>
        </div>
      </CardContent>
    </Card>
  );
}
