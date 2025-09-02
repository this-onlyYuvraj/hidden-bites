"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Header } from "../../components/layout/Header";
import { BottomNav } from "../../components/layout/BottomNav";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; 
import { mockUser } from "../../data/mockShops";
import { ArrowLeft } from "lucide-react";

export default function AddShopPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    specialty: "",
    priceRange: "",
    location: "",
    description: "",
    customType: "",
  });
  const [showCustomType, setShowCustomType] = useState(false);

  const shopTypes = [
    "Food",
    "Tea",
    "Coffee",
    "Snacks",
    "Drinks",
    "Street Food",
    "South Indian",
    "North Indian",
    "Biryani",
    "Desserts",
    "Bakery",
    "Juice Bar",
    "Ice Cream",
    "Others",
  ];

  const priceRanges = [
    "₹30-100",
    "₹100-200",
    "₹200-400",
    "₹400-800",
    "₹800+",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Shop Added Successfully!", {
      description: `${formData.name} has been added to FoodSpot.`,
    });

    setIsSubmitting(false);
    router.push("/");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "type") {
      setShowCustomType(value === "Others");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} />
      
      <div className="container px-4 py-6 pb-24">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="h-15 w-15 p-0"
          >
            <ArrowLeft className="h-15 w-15" />
          </Button>
          <h1 className="text-2xl font-bold">Add New Shop</h1>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Share a Hidden Gem</CardTitle>
            <p className="text-sm text-muted-foreground">
              Help others discover amazing food spots in your area
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Shop Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter shop name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-card shadow-dropdown">
                      {shopTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {showCustomType && (
                    <div className="mt-2">
                      <Input
                        placeholder="Enter custom food type"
                        value={formData.customType}
                        onChange={(e) => handleInputChange("customType", e.target.value)}
                        className="animate-fade-in"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priceRange">Price Range *</Label>
                  <Select onValueChange={(value) => handleInputChange("priceRange", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent className="bg-card shadow-dropdown">
                      {priceRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty *</Label>
                <Input
                  id="specialty"
                  placeholder="What are they famous for?"
                  value={formData.specialty}
                  onChange={(e) => handleInputChange("specialty", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="Area, City"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us more about this place..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-fab hover:opacity-90 transition-opacity"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding Shop..." : "Add Shop"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
