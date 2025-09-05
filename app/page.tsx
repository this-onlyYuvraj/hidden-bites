"use client";

import { useEffect, useState } from "react";
import { ShopCard } from "@/components/shop/ShopCard";
import { Shop } from "@/lib/types"; // your Shop type
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Star, TrendingUp, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BottomNav } from "@/components/layout/BottomNav";

type SortOption = "newest" | "topRated";

export default function HomePage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch shops from API
  useEffect(() => {
    async function fetchShops() {
      try {
        const res = await fetch("/api/shops");
        const data: Shop[] = await res.json();
        setShops(data);
      } catch (err) {
        console.error("Failed to load shops:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchShops();
  }, []);

  // Filter, sort, and limit to 6 shops
  const filteredAndSortedShops = [...shops]
    .filter((shop) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        shop.name.toLowerCase().includes(q) ||
        shop.specialty.toLowerCase().includes(q) ||
        shop.type.toLowerCase().includes(q) ||
        shop.location?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "topRated") return b.rating - a.rating;
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    })
    .slice(0, 6);

  const handleSortChange = (newSort: SortOption) => {
    if (newSort !== sortBy) setSortBy(newSort);
  };

  const ShopCardSkeleton = () => (
    <div className="h-52 rounded-lg bg-muted animate-pulse" />
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Search Bar */}
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
        {/* Header */}
        <Card className="bg-gradient-card shadow-card">
          <div className="flex items-center justify-between p-6">
            <div>
              <CardTitle className="text-2xl">Discover Hidden Gems</CardTitle>
              <p className="text-muted-foreground">
                Find amazing food spots recommended by your community
              </p>
            </div>
            <Button asChild>
              <a href="/shop/add" className="px-4 py-6 text-lg rounded-xl bg-primary hover:bg-primary/90 text-white shadow-md">
                Add Shop
              </a>
            </Button>
          </div>
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
                  <TrendingUp className="h-3 w-3 mr-1" /> Newest
                </Button>
                <Button
                  variant={sortBy === "topRated" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSortChange("topRated")}
                >
                  <Star className="h-4 w-4 mr-1" /> Top Rated
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <ShopCardSkeleton key={i} />)
            : filteredAndSortedShops.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground mb-2">No shops found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search terms or browse all shops
                </p>
              </div>
            ) : (
              filteredAndSortedShops.map((shop, i) => (
                <div key={shop.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
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
                <div className="text-2xl font-bold text-primary">{shops.length}</div>
                <div className="text-sm text-muted-foreground">Food Spots</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {shops.reduce((sum, shop) => sum + shop.reviewCount, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {shops.length > 0
                    ? (shops.reduce((sum, shop) => sum + shop.rating, 0) / shops.length).toFixed(1)
                    : 0}
                </div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
