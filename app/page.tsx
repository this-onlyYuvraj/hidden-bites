"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { Input } from "../components/ui/input";
import { Header } from "../components/layout/Header";
import { BottomNav } from "../components/layout/BottomNav";
import { ShopCard } from "../components/shop/ShopCard";
import { mockShops, mockUser } from "../data/mockShops";
import { SlidersHorizontal, Star, TrendingUp, Search } from "lucide-react";

type SortOption = "newest" | "topRated";

export default function HomePage() {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAndSortedShops = [...mockShops]
    .filter((shop) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        shop.name.toLowerCase().includes(query) ||
        shop.specialty.toLowerCase().includes(query) ||
        shop.location.toLowerCase().includes(query) ||
        shop.type.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === "topRated") {
        return b.rating - a.rating;
      }
      return 0; // For "newest", keep original order
    });

  const handleSortChange = (newSort: SortOption) => {
    if (newSort === sortBy) return;
    
    setIsLoading(true);
    setSortBy(newSort);
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  };

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

  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} />
      
      <div className="pb-24">
        {/* Search Bar - Sticky on mobile */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/50 mb-2">
          <div className="container px-4 py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brand-primary" />
              <Input
                placeholder="Search shops, specialties, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-brand-highlight/20 border-brand-highlight focus:border-brand-accent focus:ring-brand-accent/20 rounded-2xl shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="container px-4 py-6 space-y-6">
          {/* Welcome Header */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">
                Discover Hidden Gems
              </CardTitle>
              <p className="text-muted-foreground">
                Find amazing food spots recommended by your community
              </p>
            </CardHeader>
          </Card>

          {/* Sort Controls */}
          <Card className="shadow-card">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Sort by:</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={sortBy === "newest" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSortChange("newest")}
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Newest
                  </Button>
                  <Button
                    variant={sortBy === "topRated" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSortChange("topRated")}
                  >
                    <Star className="h-4 w-4 mr-1" />
                    Top Rated
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Show skeletons during loading
              Array.from({ length: 6 }, (_, i) => (
                <ShopCardSkeleton key={i} />
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

          {/* Stats */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-center">Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{mockShops.length}</div>
                  <div className="text-sm text-muted-foreground">Food Spots</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {mockShops.reduce((sum, shop) => sum + shop.reviewCount, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Reviews</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {(mockShops.reduce((sum, shop) => sum + shop.rating, 0) / mockShops.length).toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}