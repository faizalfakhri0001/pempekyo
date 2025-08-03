
'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import CheckoutProgress from '@/components/checkout/CheckoutProgress';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  let currentStep = 1;
  if (pathname.includes('/checkout/shipping')) {
    currentStep = 2;
  } else if (pathname.includes('/checkout/payment')) {
    currentStep = 3;
  } else if (pathname.includes('/checkout/cart')) {
    currentStep = 1;
  }
  // Add more steps if needed, e.g. /checkout/confirmation -> currentStep = 4

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>
      <CheckoutProgress currentStep={currentStep} />
      {children}
    </div>
  );
}
