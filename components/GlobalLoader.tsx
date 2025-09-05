"use client"
//integrating loading state btw two pages
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { LoaderPinwheel } from "lucide-react";

//GlobalLoader for all pages
export function GlobalLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);

    //avoid delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname])

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <LoaderPinwheel className="h-12 w-12 animate-spin text-primary" />
    </div>
  )
}