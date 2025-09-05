"use client";

import { ShopCard } from "@/components/shop/ShopCard";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const shops = [
  {
    id: "1",
    name: "Midnight Biryani",
    specialty: "Hyderabadi Biryani",
    priceRange: "₹200-500",
    location: "Camp Area, Pune",
    rating: 4.6,
    reviewCount: 312,
    image:
      "https://res.cloudinary.com/demo/image/upload/biryani.jpg",
    type: "Restaurant",
    addedBy: "admin",
  },
  {
    id: "2",
    name: "Chai Adda",
    specialty: "Masala Chai",
    priceRange: "₹30-100",
    location: "MG Road, Delhi",
    rating: 4.2,
    reviewCount: 180,
    image:
      "https://res.cloudinary.com/demo/image/upload/chai.jpg",
    type: "Cafe",
    addedBy: "admin",
  },
  // add more...
];

const ShopCardSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="aspect-[4/3] w-full" />
    <CardContent className="p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
      <Skeleton className="h-4 w-24" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-3 w-20" />
    </CardContent>
  </Card>
);

export default function ShopsPage() {
  const isLoading = false; // replace with loading state
  const filteredAndSortedShops = shops; // replace with real filtered list

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-2xl font-bold mb-6">Hidden Bites</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="h-52 rounded-lg bg-muted animate-pulse"
            />
          ))
        ) : filteredAndSortedShops.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground mb-2">No shops found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search terms or browse all shops
            </p>
          </div>
        ) : (
          filteredAndSortedShops.map((shop, index) => (
            <div
              key={shop.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ShopCard shop={shop} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
