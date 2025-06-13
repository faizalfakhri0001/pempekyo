/** @format */

"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { CartItem as CartItemType } from "@/types/components";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useCartStore } from "store/cartStore";
import { Input } from "../ui/input";
import { formatCurrency } from "@/lib/formatCurrency";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateItemQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateItemQuantity(item.id, newQuantity);
    } else if (newQuantity === 0) {
      removeItem(item.id);
    }
  };

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center space-x-4">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={80}
          height={80}
          className="rounded-md object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-500">{formatCurrency(item.price)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="px-2"
            disabled={item.quantity <= 1}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            className="w-12 h-8 text-center border-l border-r rounded-none focus:ring-0"
            min="1"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="px-2"
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
        <p className="font-semibold w-20 text-right">
          {formatCurrency(item.price * item.quantity)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700"
        >
          <TrashIcon className="h-5 w-5" />
          <span className="sr-only">Hapus</span>
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
