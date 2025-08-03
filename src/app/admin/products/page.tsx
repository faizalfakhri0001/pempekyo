"use client";
import React, { useEffect, useState } from "react";
import type { Product } from "@/types/components";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const load = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, name, description, price, imageUrl } = form;
    const payload = {
      name,
      description,
      price: Number(price),
      imageUrl,
    };

    if (id) {
      await updateProduct(id, payload);
    } else {
      await addProduct(payload);
    }

    setForm({ id: "", name: "", description: "", price: "", imageUrl: "" });
    load();
  };

  const handleEdit = (product: Product) => {
    setForm({
      id: product.id,
      name: product.name,
      description: product.description,
      price: String(product.price),
      imageUrl: product.imageUrl,
    });
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    load();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6 max-w-md">
        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <Input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <Input
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          required
        />
        <div className="space-x-2">
          <Button type="submit">
            {form.id ? "Update" : "Add"} Product
          </Button>
          {form.id && (
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setForm({ id: "", name: "", description: "", price: "", imageUrl: "" })
              }
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
      <ul className="space-y-2">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex items-center justify-between border p-2 rounded"
          >
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-gray-600">{product.price}</p>
            </div>
            <div className="space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleEdit(product)}
              >
                Edit
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
