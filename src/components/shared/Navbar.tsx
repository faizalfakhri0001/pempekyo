/** @format */

"use client";
import React from "react";
import Link from "next/link";
import { NAV_LINKS, APP_NAME } from "@/constants/components";
import { Button } from "../ui/button";
import { useAuthStore } from "../../store/authStore";
import { useCartStore } from "../../store/cartStore";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";

const Navbar: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const router = useRouter();

  const totalCartItems = getTotalItems();

  const handleAuthAction = () => {
    if (isLoggedIn) {
      logout();
      router.push("/"); // Redirect to home after logout
    } else {
      router.push("/login");
    }
  };

  const handleRegisterAction = () => {
    router.push("/register");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          {APP_NAME}
        </Link>
        <nav className="hidden items-center space-x-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-3">
          <Link
            href="/checkout/cart"
            className="relative p-2 hover:bg-gray-100 rounded-full"
          >
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {totalCartItems > 0 && (
              <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {totalCartItems}
              </span>
            )}
          </Link>
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 hidden sm:inline">
                Hi, {user?.name?.split(" ")[0] || "User"}
              </span>
              <Button variant="outline" size="sm" onClick={handleAuthAction}>
                Keluar
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/login")}
              >
                Masuk
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleRegisterAction}
                className="bg-gray-800 hover:bg-gray-900 text-white"
              >
                Daftar
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
