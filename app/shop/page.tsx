"use client";

import { useEffect, useState } from "react";
import { ShopCard } from "@/components/shop/ShopCard";
import { Shop } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, Search } from "lucide-react";

type SortOption = "newest" | "topRated";

export default function ShopsPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchShops() {
      try {
        const res = await fetch("/api/shops");
        const data: Shop[] = await res.json();
        setShops(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchShops();
  }, []);

  const filteredAndSortedShops = [...shops]
    .filter((shop) => {
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
    });

  const handleSortChange = (newSort: SortOption) => {
    if (newSort !== sortBy) setSortBy(newSort);
  };

  const ShopCardSkeleton = () => (
    <div className="h-52 rounded-lg bg-muted animate-pulse" />
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Sticky Search Bar */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/50 mb-4">
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

      {/* Sort Controls and add btn*/}
      <div className="flex justify-between flex-col md:flex-row gap-4 mb-6 px-4">
        <div className="flex gap-2">
          <Button
            variant={sortBy === "newest" ? "default" : "outline"}
            onClick={() => handleSortChange("newest")}
          >
            <TrendingUp className="h-4 w-4 mr-1" /> Newest
          </Button>
          <Button
            variant={sortBy === "topRated" ? "default" : "outline"}
            onClick={() => handleSortChange("topRated")}
          >
            <Star className="h-4 w-4 mr-1" /> Top Rated
          </Button>
        </div>
        <div>
          <Button asChild>
            <a href="/shop/add" className="px-4 py-4 text-md rounded-xl bg-primary hover:bg-primary/90 text-white shadow-md">
              Add Shop
            </a>
          </Button>
        </div>
      </div>

      {/* Shop Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <ShopCardSkeleton key={i} />)
          : filteredAndSortedShops.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground mb-2">No shops found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search terms
              </p>
            </div>
          ) : (
            filteredAndSortedShops.map((shop, i) => (
              <div
                key={shop.id}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <ShopCard shop={shop} />
              </div>
            ))
          )}
      </div>
    </div>
  );
}
