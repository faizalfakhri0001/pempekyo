/** @format */

import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../src/lib/firebase';

async function seed() {
  const products = [
    {
      name: 'Pempek Lenjer',
      description: 'Pempek ikan khas Palembang berbentuk panjang.',
      price: 15000,
      imageUrl: 'https://example.com/pempek-lenjer.jpg',
    },
    {
      name: 'Pempek Kapal Selam',
      description: 'Pempek isi telur rebus yang gurih.',
      price: 20000,
      imageUrl: 'https://example.com/pempek-kapal-selam.jpg',
    },
  ];

  const productIds: string[] = [];
  for (const p of products) {
    const docRef = await addDoc(collection(db, 'products'), p);
    productIds.push(docRef.id);
  }

  const order = {
    items: [
      {
        id: productIds[0],
        name: products[0].name,
        description: products[0].description,
        price: products[0].price,
        imageUrl: products[0].imageUrl,
        quantity: 2,
      },
    ],
    shippingInfo: {
      fullName: 'Contoh Customer',
      phone: '081234567890',
      address: 'Jl. Demang No. 1',
      city: 'Palembang',
      postalCode: '30111',
    },
    paymentMethod: {
      id: 'cod',
      name: 'Cash On Delivery',
      type: 'Cash On Delivery',
    },
    totalAmount: 2 * products[0].price,
    status: 'Pending',
    orderDate: new Date(),
  };

  await addDoc(collection(db, 'orders'), {
    ...order,
    orderDate: Timestamp.fromDate(order.orderDate),
  });

  console.log('Seeding selesai');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
