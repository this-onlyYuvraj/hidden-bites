"use client";

import { cn } from "../../lib/utils";
import { Home, MapPin, Plus, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"


interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/" },
  { icon: MapPin, label: "Map", path: "/map" },
  { icon: Plus, label: "Add", path: "/shop/add" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-around py-2 px-4">
        <TooltipProvider>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <Link href={item.path}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex items-center gap-5 h-15 w-16 md:w-25 rounded-xl transition-colors",
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="h-20 w-20" />
                      <span className="text-md font-medium hidden md:block">
                        {item.label}
                      </span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>

      </div>
    </nav>
  );
}