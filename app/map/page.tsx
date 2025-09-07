"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ShopCard } from "../../components/shop/ShopCard";
import { ArrowLeft, MapPin, Navigation } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MapPage() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [nearbyShops, setNearbyShops] = useState<any[]>([]);

  //fetching all shops initially
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await fetch("/api/shops");
        const data = await res.json();
        setNearbyShops(data); // all shops initially
      } catch (err) {
        console.error("Failed to fetch shops", err);
      }
    };
    fetchShops();
  }, []);

  const handleMapClick = (location: string) => {
    setSelectedLocation(location);
    // Simulate finding nearby shops
    const shuffled = [...nearbyShops].sort(() => 0.5 - Math.random());
    setNearbyShops(shuffled.slice(0, 3));
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="min-h-screen bg-background relative">
        {/* Overlay to blur everything behind */}
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-lg h-1/2 p-8 w-11/12 max-w-md text-center z-50 flex items-center justify-center">
            <p className="text-lg font-semibold text-gray-900">
              This feature is under development
            </p>
          </div>
        </div>
        <div className="pb-24">
          <div className="container px-4 py-6 space-y-6">
            {/* Map Header */}
            <Button
              variant="link"
              size="sm"
              onClick={() => router.back()}
              className="h-5 w-15 p-0"
            >
              <ArrowLeft className="h-15 w-15" />
            </Button>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Discover Nearby
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Tap anywhere on the map to find the best food spots in that
                  area
                </p>
              </CardHeader>
            </Card>

            {/* Interactive Map Simulation */}
            <Card className="shadow-card">
              <CardContent className="p-0">
                <div className="relative h-80 bg-gradient-to-br from-brand-highlight/20 to-secondary/30 rounded-lg overflow-hidden">
                  {/* Simulated Map Background */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,155,0,0.1),transparent_50%)] opacity-50" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,233,0,0.1),transparent_50%)] opacity-50" />

                  {/* Interactive Areas */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-8">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleMapClick("MG Road Area")}
                        className="h-20 w-32 bg-white/80 hover:bg-white/90 shadow-lg"
                      >
                        <div className="text-center">
                          <MapPin className="h-5 w-5 mx-auto mb-1" />
                          <span className="text-sm">MG Road</span>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleMapClick("FC Road Area")}
                        className="h-20 w-32 bg-white/80 hover:bg-white/90 shadow-lg"
                      >
                        <div className="text-center">
                          <MapPin className="h-5 w-5 mx-auto mb-1" />
                          <span className="text-sm">FC Road</span>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleMapClick("Koregaon Park")}
                        className="h-20 w-32 bg-white/80 hover:bg-white/90 shadow-lg"
                      >
                        <div className="text-center">
                          <MapPin className="h-5 w-5 mx-auto mb-1" />
                          <span className="text-sm">Koregaon Park</span>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleMapClick("Camp Area")}
                        className="h-20 w-32 bg-white/80 hover:bg-white/90 shadow-lg"
                      >
                        <div className="text-center">
                          <MapPin className="h-5 w-5 mx-auto mb-1" />
                          <span className="text-sm">Camp Area</span>
                        </div>
                      </Button>
                    </div>
                  </div>

                  {/* Current Location Indicator */}
                  <div className="absolute top-4 left-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/90 hover:bg-white shadow-lg"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      My Location
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results in grid*/}
            {selectedLocation && (
              <Card className="shadow-card animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Best Spots near {selectedLocation}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Top-rated food spots based on community reviews
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {nearbyShops.length > 0 ? (
                      nearbyShops.map((shop) => (
                        <div key={shop.id} className="animate-scale-in">
                          <ShopCard shop={shop} />
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-6">
                        No shops found nearby
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Instructions */}
            {!selectedLocation && (
              <Card className="shadow-card">
                <CardContent className="pt-6 text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">
                    Find Food Spots Anywhere
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Tap on any area on the map above to discover the best food
                    spots with great reviews in that location.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
