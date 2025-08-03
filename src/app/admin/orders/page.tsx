/** @format */

import { listOrders } from '@/lib/orders';
import OrdersClient from './client';

export default async function AdminOrdersPage() {
  const orders = await listOrders();
  return <OrdersClient initialOrders={orders} />;
}

