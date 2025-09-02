"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import HiddenBites from "@/public/assets/HB.png"

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
}

export function Header({ user }: HeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Handle logout logic here
    router.push("/login");
  };

  return (
    <header className="top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between pr-4 pt-5 mb-5">
        {/* Logo */}
        <div className="flex gap-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-xl font-bold text-primary hover:bg-transparent"
            >
              <img
                src={HiddenBites.src}
                alt="Logo"
                className="h-20 w-20 md:h-25 md:w-25" />
            </Button>
          </Link>
          <h1 style={{fontFamily:"waterlily, sans-serif"}} className="text-2xl text-primary">Hidden Bites</h1>
        </div>
        {/* User Menu */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-11 w-11 md:h-15 md:w-15">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-card shadow-dropdown"
              align="end"
              forceMount
            >
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <Button variant="default">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}