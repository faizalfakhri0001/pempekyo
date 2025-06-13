/** @format */

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../../store/cartStore";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import OrderSummary from "../../../components/checkout/OrderSummary";
import PaymentOptions from "../../../components/checkout/PaymentOptions";
import { PAYMENT_OPTIONS } from "../../../@/constants/components";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const useSimplePaymentStore = (): [
  string | undefined,
  (id: string | undefined) => void
] => {
  const [selectedPayment, setSelectedPaymentState] = useState<
    string | undefined
  >(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("checkoutPaymentOptionId") || undefined;
    }
    return undefined;
  });
  const setSelectedPayment = (id: string | undefined) => {
    setSelectedPaymentState(id);
    if (typeof window !== "undefined") {
      if (id) localStorage.setItem("checkoutPaymentOptionId", id);
      else localStorage.removeItem("checkoutPaymentOptionId");
    }
  };
  return [selectedPayment, setSelectedPayment];
};

export default function PaymentPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [selectedPaymentId, setSelectedPaymentId] = useSimplePaymentStore();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/checkout/cart"); // Redirect if cart is empty
    }
    // Also check if shipping info exists, redirect to /checkout/shipping if not.
    // This requires shipping info to be stored (e.g., in localStorage or Zustand store).
    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("checkoutShippingInfo")
    ) {
      router.replace("/checkout/shipping");
    }
  }, [items, router]);

  const handlePaymentSelect = (paymentId: string) => {
    setSelectedPaymentId(paymentId);
  };

  const handleCompleteOrder = () => {
    if (!selectedPaymentId) {
      alert("Silakan pilih metode pembayaran terlebih dahulu.");
      return;
    }
    setIsProcessing(true);
    // Simulate order processing
    console.log("Order details:", {
      items,
      shippingInfo:
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("checkoutShippingInfo") || "{}")
          : {},
      paymentMethod: PAYMENT_OPTIONS.find((p) => p.id === selectedPaymentId),
    });

    setTimeout(() => {
      alert("Pesanan berhasil! Terima kasih telah berbelanja.");
      clearCart();
      if (typeof window !== "undefined") {
        localStorage.removeItem("checkoutShippingInfo");
        localStorage.removeItem("checkoutPaymentOptionId");
      }
      router.push("/"); // Redirect to homepage
      setIsProcessing(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-10">Memuat atau keranjang kosong...</div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">Metode Pembayaran</h2>
            <PaymentOptions
              selectedPayment={selectedPaymentId}
              onPaymentSelect={handlePaymentSelect}
            />
          </CardContent>
        </Card>
        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={() => router.push("/checkout/shipping")}
          >
            <ChevronLeftIcon className="mr-2 h-4 w-4" /> Kembali ke Pengiriman
          </Button>
          <Button
            onClick={handleCompleteOrder}
            className="bg-green-600 hover:bg-green-700 text-white"
            size="lg"
            disabled={!selectedPaymentId || isProcessing}
          >
            {isProcessing ? (
              "Memproses Pesanan..."
            ) : (
              <>
                Selesaikan Pesanan <ChevronRightIcon className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="lg:col-span-1">
        <OrderSummary />
      </div>
    </div>
  );
}
