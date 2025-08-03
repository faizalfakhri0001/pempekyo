/** @format */
'use client';

import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  deleteOrder,
  listOrders,
  updateOrderStatus,
} from '@/lib/orders';
import type { Order } from '@/types/components';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';
import { useDebounceEffect } from '@/hooks/useDebounceEffect';

const STATUSES: Order['status'][] = [
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 5;

  const load = React.useCallback(async () => {
    const data = await listOrders();
    setOrders(data);
  }, []);

  useDebounceEffect(() => {
    load();
  }, [load], 300);

  const handleStatusChange = React.useCallback(
    async (id: string, status: Order['status']) => {
      await updateOrderStatus(id, status);
      await load();
    },
    [load]
  );

  const handleDelete = React.useCallback(
    async (id: string) => {
      await deleteOrder(id);
      await load();
    },
    [load]
  );

  const pageCount = Math.ceil(orders.length / perPage);
  const pagedOrders = orders.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const columns = React.useMemo<ColumnDef<Order>[]>(
    () => [
      {
        header: 'Customer',
        accessorFn: (row) => row.shippingInfo.fullName,
      },
      {
        header: 'Total',
        accessorKey: 'totalAmount',
        cell: ({ row }) => formatCurrency(row.original.totalAmount),
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => (
          <Select
            value={row.original.status}
            onValueChange={(v) =>
              handleStatusChange(
                row.original.id,
                v as Order['status']
              )
            }
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ),
      },
      {
        header: 'Date',
        accessorKey: 'orderDate',
        cell: ({ row }) =>
          row.original.orderDate.toLocaleDateString('id-ID'),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(row.original.id)}
          >
            Delete
          </Button>
        ),
      },
    ],
    [handleDelete, handleStatusChange]
  );

  const table = useReactTable({
    data: pagedOrders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
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
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
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
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center"
              >
                Data masih kosong
              </TableCell>
            </TableRow>
          )}
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
