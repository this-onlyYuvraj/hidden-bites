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
import { LogOut, Sun, Moon } from "lucide-react";
import Link from "next/link";
import HiddenBites from "@/public/assets/HB.png";

import { logout } from "@/lib/auth-actions";
import { Session } from "next-auth";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Header({ session }: { session: Session | null }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // prevent hydration mismatch
  useEffect(() => setMounted(true), []);

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
              <Image
                width={100}
                height={100}
                src={HiddenBites}
                alt="Logo"
                className="h-20 w-20 md:h-25 md:w-25"
              />
            </Button>
          </Link>
          <h1
            style={{ fontFamily: "waterlily, sans-serif" }}
            className="text-3xl text-primary"
          >
            Hidden Bites
          </h1>
        </div>

        <div className="flex items-center gap-5">
          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 md:h-15 md:w-15 rounded-full border-2 "
              onClick={() =>
                setTheme(theme === "light" ? "dark" : "light")
              }
            >
              {theme === "light" ? (
                <Moon className="h-10 w-10 md:h-15 md:w-15 text-primary hover:text-white" />
              ) : (
                <Sun className="h-10 w-10 md:h-15 md:w-15  text-yellow-400 hover:text-white" />
              )}
            </Button>
          )}

          {/* Session Menu */}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full cursor-pointer"
                >
                  <Avatar className="h-11 w-11 md:h-15 md:w-15">
                    <AvatarImage
                      src={session.user?.image ?? undefined}
                      alt={session.user?.name ?? undefined}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {session.user?.name?.charAt(0)?.toUpperCase() ?? ""}
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
                    <p className="font-medium text-sm">
                      {session.user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={"/profile"}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="default" className="text-white">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
