'use client';

import { LogIn, LogOut, Ticket, UserPlus } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export const Header = () => {
  const router = useRouter();
  const { isAuthenticated, initializing, logout, user } = useAuth();

  const goHome = () => router.push('/');
  const goAuth = () => router.push('/auth?mode=login');
  const goRegister = () => router.push('/auth?mode=register');
  const goBookings = () => router.push('/my-bookings');

  const initials = user?.userName 
    ? user.userName.split(" ").map((n: string) => n[0]).join("").toUpperCase()
    : user?.email?.[0]?.toUpperCase() || "U";
  
  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={goHome}
        >
          <Image
            src="/logo.png"
            alt="EventHub Logo"
            width={80}
            height={80}
          />
          <span className="font-bold text-xl">EventHub</span>
        </div>

        <div className="flex gap-2 items-center">
          {initializing ? null : isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={""} alt={"User"} />
                  <AvatarFallback>{ initials }</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={goBookings}>
                  <Ticket className="mr-2 h-4 w-4" />
                  My bookings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => { logout(); goHome(); }}
                  className="text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={goAuth}
              >
                <LogIn className="h-4 w-4" />
                Login
              </Button>
              <Button className="flex items-center gap-2" onClick={goRegister}>
                <UserPlus className="h-4 w-4" />
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}