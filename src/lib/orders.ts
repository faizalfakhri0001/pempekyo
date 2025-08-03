/** @format */

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import {
  Order,
  CartItem,
  ShippingInfo,
  PaymentOption,
} from '@/types/components';

const ordersCol = collection(db, 'orders');

export type OrderData = Omit<Order, 'id' | 'orderDate'> & {
  orderDate: Timestamp;
};

export async function createOrder(
  items: CartItem[],
  shippingInfo: ShippingInfo,
  paymentMethod: PaymentOption,
  metadata: Record<string, unknown> = {}
): Promise<string> {
  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const order: Omit<OrderData, 'id'> = {
    items,
    shippingInfo,
    paymentMethod,
    totalAmount,
    status: 'Pending',
    orderDate: serverTimestamp() as unknown as Timestamp,
    metadata,
  };

  const docRef = await addDoc(ordersCol, order);
  return docRef.id;
}

export async function listOrders(): Promise<Order[]> {
  const snapshot = await getDocs(ordersCol);
  return snapshot.docs.map((d) => {
    const data = d.data() as OrderData;
    return {
      id: d.id,
      ...data,
      orderDate: data.orderDate.toDate(),
    } as Order;
  });
}

export async function updateOrderStatus(
  id: string,
  status: Order['status']
): Promise<void> {
  const ref = doc(ordersCol, id);
  await updateDoc(ref, { status });
}
