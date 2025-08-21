'use client';

import { LogIn, LogOut, UserPlus } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export const Header = () => {
  const router = useRouter();
  const { isAuthenticated, initializing, logout } = useAuth();

  const goHome = () => router.push('/');
  const goAuth = () => router.push('/auth?mode=login');
  const goRegister = () => router.push('/auth?mode=register');

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
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
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => { logout(); goHome(); }}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
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