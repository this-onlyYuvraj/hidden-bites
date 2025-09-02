// app/layout.tsx
import type { Metadata, Viewport } from "next"
import { Toaster as Sonner } from "@/components/ui/sonner"
import ClientProviders from "@/components/client-providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "FoodSpot - Discover Hidden Food Gems",
  description:
    "Find amazing food spots recommended by your community. Discover hidden and underrated shops near your area.",
  keywords: "food discovery, restaurants, food spots, hidden gems, local food",
  authors: [{ name: "FoodSpot Team" }],
  creator: "FoodSpot",
  publisher: "FoodSpot",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://foodspot.app",
    siteName: "FoodSpot",
    title: "FoodSpot - Discover Hidden Food Gems",
    description: "Find amazing food spots recommended by your community",
  },
  twitter: {
    card: "summary_large_image",
    title: "FoodSpot - Discover Hidden Food Gems",
    description: "Find amazing food spots recommended by your community",
  },
}

// ✅ Move viewport to separate export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://foodspot.app" />
      </head>
      <body>
        <ClientProviders>
          {children}
          <Sonner richColors position="top-right" />
        </ClientProviders>
      </body>
    </html>
  )
}
