
'use client';
import React from 'react';
import { cn } from '../../lib/utils';

interface CheckoutProgressProps {
  currentStep: number; // 1 for Keranjang, 2 for Pengiriman, 3 for Pembayaran
}

const steps = [
  { id: 1, label: 'Keranjang' },
  { id: 2, label: 'Pengiriman' },
  { id: 3, label: 'Pembayaran' },
];

const CheckoutProgress: React.FC<CheckoutProgressProps> = ({ currentStep }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center border-2',
                  currentStep >= step.id ? 'bg-gray-800 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-500'
                )}
              >
                {step.id}
              </div>
              <p
                className={cn(
                  'mt-2 text-sm text-center',
                  currentStep >= step.id ? 'text-gray-800 font-semibold' : 'text-gray-500'
                )}
              >
                {step.label}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-1 mx-2',
                  currentStep > step.id ? 'bg-gray-800' : 'bg-gray-300'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CheckoutProgress;
