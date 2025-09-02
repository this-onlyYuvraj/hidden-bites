"use client";

import { cn } from "../../lib/utils";
import { Home, MapPin, Plus, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  isSpecial?: boolean;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/" },
  { icon: MapPin, label: "Map", path: "/map" },
  { icon: Plus, label: "Add", path: "/add", isSpecial: true },
  { icon: User, label: "Profile", path: "/profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          if (item.isSpecial) {
            return (
              <Link key={item.path} href={item.path}>
                <Button
                  size="lg"
                  className="h-12 w-12 rounded-full bg-gradient-fab shadow-fab hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Button>
              </Link>
            );
          }

          return (
            <Link key={item.path} href={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  "flex flex-col items-center gap-1 h-16 w-16 rounded-xl transition-colors",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}