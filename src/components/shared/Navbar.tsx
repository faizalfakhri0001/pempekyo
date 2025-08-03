/** @format */

'use client';
import { APP_NAME, NAV_LINKS } from '@/constants/components';
import { auth } from '@/lib/firebase';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../ui/button';

const Navbar: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuthStore();
  const { getTotalItems, isCartAnimating } = useCartStore();
  const router = useRouter();

  const totalCartItems = getTotalItems();

  const handleAuthAction = () => {
    if (isLoggedIn || !!auth.currentUser) {
      logout();
      router.push('/'); // Redirect to home after logout
    } else {
      router.push('/login');
    }
  };

  const handleRegisterAction = () => {
    router.push('/register');
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
          {user?.role === 'admin' && (
            <Link
              href="/admin"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Admin
            </Link>
          )}
        </nav>
        <div className="flex items-center space-x-3">
          <Link
            href="/checkout/cart"
            className={cn(
              'relative p-2 hover:bg-gray-100 rounded-full',
              isCartAnimating && 'animate-bounce'
            )}
          >
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {totalCartItems > 0 && (
              <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {totalCartItems}
              </span>
            )}
          </Link>
          {isLoggedIn || !!auth.currentUser ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 hidden sm:inline">
                Hi, {user?.name?.split(' ')[0] || 'User'}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAuthAction}
              >
                Keluar
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/login')}
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
