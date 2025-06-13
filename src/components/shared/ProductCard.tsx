/** @format */

"use client";
import React from "react";
import Image from "next/image";
import { Product } from "../../types/components";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { useCartStore } from "../../store/cartStore";
import { formatCurrency } from "@/lib/formatCurrency";
import { ShoppingCartIcon } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product);
    // Optionally, show a toast notification here
  };

  return (
    <Card className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold text-gray-800 mb-1">
          {product.name}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 h-10 overflow-hidden text-ellipsis">
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <p className="text-lg font-bold text-gray-900">
          {formatCurrency(product.price)}
        </p>
        <Button
          size="sm"
          onClick={handleAddToCart}
          className="bg-gray-800 hover:bg-gray-900 text-white"
        >
          <ShoppingCartIcon className="h-4 w-4 mr-2" />
          Tambah
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
