/** @format */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/formatCurrency';
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '@/lib/products';
import type { Product } from '@/types/components';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });
  const [page, setPage] = useState(1);
  const perPage = 5;

  const load = React.useCallback(async () => {
    const data = await getProducts();
    setProducts(data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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

    setForm({
      id: '',
      name: '',
      description: '',
      price: '',
      imageUrl: '',
    });
    load();
  };

  const handleEdit = React.useCallback((product: Product) => {
    setForm({
      id: product.id,
      name: product.name,
      description: product.description,
      price: String(product.price),
      imageUrl: product.imageUrl,
    });
  }, []);

  const handleDelete = React.useCallback(
    async (id: string) => {
      await deleteProduct(id);
      await load();
    },
    [load]
  );

  const pageCount = Math.ceil(products.length / perPage);
  const pagedProducts = products.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => formatCurrency(row.original.price),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="space-x-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleEdit(row.original)}
            >
              Edit
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(row.original.id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  const table = useReactTable({
    data: pagedProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-2 mb-6 max-w-md"
      >
        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
        />
        <Input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          required
        />
        <Input
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) =>
            setForm({ ...form, imageUrl: e.target.value })
          }
          required
        />
        <div className="space-x-2">
          <Button type="submit">
            {form.id ? 'Update' : 'Add'} Product
          </Button>
          {form.id && (
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setForm({
                  id: '',
                  name: '',
                  description: '',
                  price: '',
                  imageUrl: '',
                })
              }
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {pageCount > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              />
            </PaginationItem>
            {Array.from({ length: pageCount }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage((p) => Math.min(pageCount, p + 1))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
