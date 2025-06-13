/** @format */

"use client";
import React from "react";
import { useCartStore } from "../../store/cartStore";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency } from "@/lib/formatCurrency";

interface OrderSummaryProps {
  showEstimate?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ showEstimate = true }) => {
  const {
    items,
    getTotalPrice,
    promoCode,
    discount,
    getShippingCost,
    getGrandTotal,
  } = useCartStore();

  const subtotal = getTotalPrice();
  const shippingCost = getShippingCost();
  const grandTotal = getGrandTotal();

  if (items.length === 0 && !showEstimate) {
    // Don't show if cart empty unless it's a generic estimate view
    return null;
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Ringkasan Pesanan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.quantity}x {item.name}
            </span>
            <span>{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
        <hr />
        <div className="flex justify-between font-medium">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Biaya Pengiriman</span>
          <span>{formatCurrency(shippingCost)}</span>
        </div>
        {promoCode && discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Diskon ({promoCode})</span>
            <span>- {formatCurrency(discount)}</span>
          </div>
        )}
        <hr />
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
        {showEstimate && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md text-xs text-gray-600">
            <p>
              <strong>Estimasi Pengiriman</strong>
            </p>
            <p>
              Pesanan akan diantar dalam waktu 30-60 menit setelah pembayaran
              berhasil.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
