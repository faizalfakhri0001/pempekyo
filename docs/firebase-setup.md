# Integrasi Firebase

Dokumen ini menjelaskan langkah umum untuk menghubungkan proyek ini dengan Firebase.

## 1. Membuat Proyek Firebase
1. Kunjungi [console.firebase.google.com](https://console.firebase.google.com/) dan buat proyek baru.
2. Tambahkan aplikasi Web pada proyek tersebut untuk mendapatkan konfigurasi SDK.

## 2. Instal Dependensi
Jalankan perintah berikut di dalam folder proyek:

```bash
npm install firebase
```

## 3. Menyiapkan Konfigurasi
1. Salin file `.env.example` menjadi `.env.local`.
2. Isi setiap variabel dengan nilai dari konfigurasi Firebase Web yang Anda dapatkan pada langkah pembuatan proyek.

## 4. Membuat `src/lib/firebase.ts`
File ini sudah dibuat untuk melakukan inisialisasi Firebase.

```ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
```

## 5. Autentikasi
File `src/lib/auth.ts` berisi helper untuk proses registrasi dan login
menggunakan Firebase Authentication serta menyimpan data pengguna ke Firestore.
Isi dasarnya seperti berikut:

```ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export interface RegisterDetails {
  email: string;
  password: string;
  name: string;
  [key: string]: unknown;
}

export async function register(details: RegisterDetails) {
  const cred = await createUserWithEmailAndPassword(auth, details.email, details.password);
  await setDoc(doc(db, 'users', cred.user.uid), {
    name: details.name,
    email: details.email,
    ...details,
    password: undefined,
  });
  return cred;
}

export async function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
```

## 6. Menyimpan Data Produk
Data produk dapat disimpan di koleksi `products` pada Firestore.

```ts
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function addProduct(product: Product) {
  await addDoc(collection(db, 'products'), product);
}
```

Dengan mengikuti langkah di atas, Anda dapat menyimpan data pengguna serta produk ke Firestore dan menggunakan Firebase Authentication untuk proses login maupun pendaftaran.
