// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Toaster as Sonner } from "@/components/ui/sonner";
import ClientProviders from "@/components/client-providers";
import "./globals.css";
import { Roboto } from "next/font/google";
import { auth } from "@/auth";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { GlobalLoader } from "@/components/GlobalLoader";
import { ThemeProvider } from "next-themes";
import Script from "next/script";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Hidden Bites - Discover Hidden Food Gems",
  description:
    "Find amazing food spots recommended by your community. Discover hidden and underrated shops near your area.",
  keywords: "food discovery, restaurants, food spots, hidden gems, local food",
  authors: [{ name: "HiddenBites Team" }],
  creator: "HiddenBites",
  publisher: "HiddenBites",
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
    url: "https://hidden-bites.vercel.app", 
    siteName: "HiddenBites",
    title: "HiddenBites - Discover Hidden Food Gems",
    description: "Find amazing food spots recommended by your community",
  },
  twitter: {
    card: "summary_large_image",
    title: "HiddenBites - Discover Hidden Food Gems",
    description: "Find amazing food spots recommended by your community",
  },
};

// ✅ Move viewport to separate export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" className={roboto.className} suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://hidden-bites.vercel.app" />
      </head>
      <body>
        <ClientProviders>
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
            strategy="beforeInteractive"
          />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <GlobalLoader />
            <Header session={session} />
            {children}
            <BottomNav />
            <Sonner richColors position="top-right" />
          </ThemeProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
