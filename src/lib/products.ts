/** @format */

import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { Product } from '@/types/components';

const productsCol = collection(db, 'products');

export type ProductData = Omit<Product, 'id'>;

export async function getProducts(): Promise<Product[]> {
  const snapshot = await getDocs(productsCol);
  return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as ProductData) }));
}

export async function getProduct(id: string): Promise<Product | null> {
  const ref = doc(productsCol, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as ProductData) };
}

export async function addProduct(product: ProductData): Promise<string> {
  const docRef = await addDoc(productsCol, product);
  return docRef.id;
}

export async function updateProduct(
  id: string,
  product: Partial<ProductData>
): Promise<void> {
  const ref = doc(productsCol, id);
  await updateDoc(ref, product);
}

export async function deleteProduct(id: string): Promise<void> {
  const ref = doc(productsCol, id);
  await deleteDoc(ref);
}
