/** @format */

'use client';
import CartItem from '@/components/checkout/CartItem';
import OrderSummary from '@/components/checkout/OrderSummary';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cartStore';
import { ChevronRightIcon, ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function CartPage() {
  const { items, applyPromoCode, clearCart } = useCartStore();
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<string | null>(
    null
  );
  const router = useRouter();

  const handleApplyPromo = () => {
    const isValid = applyPromoCode(promoInput);
    if (isValid) {
      setPromoMessage('Kode promo berhasil diterapkan!');
    } else {
      setPromoMessage('Kode promo tidak valid.');
    }
    setTimeout(() => setPromoMessage(null), 3000); // Clear message after 3 seconds
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingCartIcon className="h-24 w-24 mx-auto text-gray-300 mb-6" />
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Keranjang Belanja Anda Kosong
        </h2>
        <p className="text-gray-500 mb-8">
          Tambahkan beberapa pempek lezat ke keranjang Anda!
        </p>
        <Button
          asChild
          size="lg"
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900"
        >
          <Link href="/">Kembali ke Menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Keranjang Belanja ({items.length} item)
            </h2>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex w-full sm:w-auto gap-2">
                <Input
                  type="text"
                  placeholder="Kode Promo"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="max-w-xs"
                />
                <Button
                  onClick={handleApplyPromo}
                  className="bg-gray-700 hover:bg-gray-800 text-white"
                >
                  Gunakan
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-600 border-red-500 hover:bg-red-50"
              >
                Kosongkan Keranjang
              </Button>
            </div>
            {promoMessage && (
              <p
                className={`mt-2 text-sm ${
                  promoMessage.includes('berhasil')
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {promoMessage}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <OrderSummary />
        <Button
          className="w-full mt-6 bg-gray-800 hover:bg-gray-900 text-white"
          size="lg"
          onClick={() => router.push('/checkout/shipping')}
        >
          Lanjut ke Pengiriman{' '}
          <ChevronRightIcon className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
