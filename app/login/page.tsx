"use client";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Chrome, Star, Utensils } from "lucide-react";
import HB from "@/public/assets/HB.png";
import { login } from "@/lib/auth-actions";
import Image from "next/image";

export default function LoginPage() {



  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[45vh] overflow-hidden">
        <div className="relative flex h-full items-center justify-center px-4">
          <div className="text-center ">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Image src={HB.src} alt="Logo" className="w-25 h-25 mb-[-15px]" />
              <h1 className="text-5xl text-primary" style={{fontFamily:"waterlily"}}>HiddenBites</h1>
            </div>
            <p className="text-lg  max-w-md mb-15">
              Discover hidden gems and underrated food spots in your
              neighborhood
            </p>
          </div>
        </div>
      </div>

      {/* Login Card */}
      <div className="flex justify-center px-4 -mt-16 relative z-10">
        <Card className="w-full max-w-md bg-card shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to discover amazing food spots and share your own finds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={login}
              size="lg"
              className="w-full hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Chrome className="mr-2 text-black h-5 w-5" />
              <span className="text-black">Continue with Google</span>
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <div className="container px-4 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Utensils className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Discover Hidden Gems</h3>
            <p className="text-sm text-muted-foreground">
              Find amazing local food spots that others have discovered
            </p>
          </div>

          <div className="text-center space-y-2">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Chrome className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Share Your Finds</h3>
            <p className="text-sm text-muted-foreground">
              Add your favorite spots and help others discover great food
            </p>
          </div>

          <div className="text-center space-y-2">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Rate & Review</h3>
            <p className="text-sm text-muted-foreground">
              Share your experiences and read reviews from fellow food lovers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
