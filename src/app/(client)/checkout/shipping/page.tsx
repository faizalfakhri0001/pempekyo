/** @format */

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OrderSummary from "@/components/checkout/OrderSummary";
import ShippingForm, {
  shippingSchema,
} from "@/components/checkout/ShippingForm";
import { ShippingInfo } from "@/types/components";
import { z } from "zod";
import { ChevronLeftIcon } from "lucide-react";

type ShippingFormValues = z.infer<typeof shippingSchema>;

// Store shipping info in zustand or localStorage if needed for persistence across refreshes
const useSimpleCheckoutStore = (): [
  ShippingInfo | null,
  (info: ShippingInfo) => void
] => {
  const [shippingInfo, setShippingInfoState] = useState<ShippingInfo | null>(
    () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("checkoutShippingInfo");
        try {
          return saved ? (JSON.parse(saved) as ShippingInfo) : null;
        } catch {
          return null;
        }
      }
      return null;
    }
  );

  const setShippingInfoToStore = (info: ShippingInfo) => {
    setShippingInfoState(info);
    if (typeof window !== "undefined") {
      localStorage.setItem("checkoutShippingInfo", JSON.stringify(info));
    }
  };
  return [shippingInfo, setShippingInfoToStore];
};

export default function ShippingPage() {
  const router = useRouter();
  const { items } = useCartStore();
  const [currentShippingInfo, setShippingInfoInStore] =
    useSimpleCheckoutStore();

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/checkout/cart");
    }
  }, [items, router]);

  const handleShippingSubmit = (data: ShippingFormValues) => {
    // Assuming ShippingFormValues is compatible with ShippingInfo
    // This is true if shippingSchema matches the structure of ShippingInfo type
    setShippingInfoInStore(data as ShippingInfo);
    router.push("/checkout/payment");
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-10">Memuat atau keranjang kosong...</div>
    );
  }

  // currentShippingInfo is ShippingInfo | null.
  // ShippingForm expects defaultValues?: Partial<ShippingFormValues>.
  // ShippingInfo is assignable to Partial<ShippingFormValues> if their structures are compatible.
  const defaultFormValues: Partial<ShippingFormValues> | undefined =
    currentShippingInfo ? currentShippingInfo : undefined;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">Informasi Pengiriman</h2>
            <ShippingForm
              onSubmitShipping={handleShippingSubmit}
              defaultValues={defaultFormValues}
            />
          </CardContent>
        </Card>
        <Button
          variant="outline"
          onClick={() => router.push("/checkout/cart")}
          className="mt-6"
        >
          <ChevronLeftIcon className="mr-2 h-4 w-4" /> Kembali ke Keranjang
        </Button>
      </div>
      <div className="lg:col-span-1">
        <OrderSummary />
      </div>
    </div>
  );
}
