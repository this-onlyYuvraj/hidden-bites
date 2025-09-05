"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { getCurrentLocation } from "@/components/currentLocation";
import { createShop } from "@/lib/create-shop";

export default function AddShopPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    type: "",
    speciality: "",
    priceRange: "",
    location: "",
    description: "",
    customType: "",
  });

  const [showCustomType, setShowCustomType] = useState(false);

  // For image upload
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  const priceRanges = ["₹30-100", "₹100-200", "₹200-400", "₹400-800", "₹800+"];

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (field === "type") {
      setShowCustomType(value === "Others");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    if (!res.ok) throw new Error("Failed to upload image");
    
    const result = await res.json();
    return result.secure_url; // Cloudinary hosted image URL
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("type", showCustomType ? form.customType : form.type);
      formData.append("location", form.location || "");
      formData.append("speciality", form.speciality);
      formData.append("priceRange", form.priceRange);
      formData.append("description", form.description);
      if (imageUrl) formData.append("image", imageUrl);

      // calling backend util
      await createShop(formData);

      toast.success("Shop Added Successfully!", {
        description: `${form.name} has been added to Hidden Bites.`,
      });

      router.push("/");
    } catch (err: any) {
      console.error("failed shop: ", err);
      toast.error("Failed to add shop", {
        description: err.message || "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6 pb-24">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="h-10 w-10 p-0"
          >
            <ArrowLeft className="h-5 w-5" />
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
              {/* Image uploading section */}
              <div className="space-y-2">
                <Label htmlFor="image">Shop Image (Optional)</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {previewUrl && (
                  <div className="mt-3">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Shop Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter shop name"
                  value={form.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select
                    onValueChange={(value) => handleInputChange("type", value)}
                  >
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
                        value={form.customType}
                        onChange={(e) =>
                          handleInputChange("customType", e.target.value)
                        }
                        className="animate-fade-in"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priceRange">Price Range *</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("priceRange", value)
                    }
                  >
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
                <Label htmlFor="speciality">Speciality *</Label>
                <Input
                  id="speciality"
                  placeholder="What are they famous for?"
                  value={form.speciality}
                  onChange={(e) =>
                    handleInputChange("speciality", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    placeholder="Area, City"
                    value={form.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    required
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={async () => {
                      try {
                        toast.loading("Fetching your location...");
                        const loc = await getCurrentLocation();
                        if (loc) {
                          handleInputChange("location", loc.address);
                          toast.success("Location added!");
                        }
                      } catch (err: any) {
                        toast.error(err.toString());
                      } finally {
                        toast.dismiss();
                      }
                    }}
                  >
                    Use Current
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us more about this place..."
                  value={form.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={3}
                />
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  className="w-1/2 cursor-pointer text-black bg-gradient-fab bg-primary hover:opacity-90 transition-opacity"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding Shop..." : "Add Shop"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
