/** @format */

"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/shared/ProductCard";
import { getProducts } from "@/lib/products";
import type { Product } from "@/types/components";

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
        Daftar Menu
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Pilih pempek favorit Anda dan tambahkan ke keranjang.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
