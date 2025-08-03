# Dashboard Admin

Dokumen ini menjelaskan persyaratan peran admin, cara mengakses dashboard admin, serta alur CRUD produk dan pesanan.

## Persyaratan Peran Admin
- Pengguna harus memiliki atribut `role` bernilai `admin` pada koleksi `users` di Firestore.
- Atribut ini dapat ditentukan saat registrasi atau diperbarui secara manual oleh pengelola basis data.
- Setelah login, hanya pengguna dengan peran admin yang akan melihat tautan "Admin" pada navbar.

## Cara Mengakses Dashboard
1. Login menggunakan akun yang memiliki peran admin.
2. Buka route `/admin` atau klik tautan "Admin" pada navbar.
3. Dashboard menampilkan sidebar dengan menu **Products** dan **Orders** untuk mengelola konten.

## Alur CRUD Produk
1. Buka menu **Products** di `/admin/products` untuk melihat daftar produk yang tersimpan.
2. Gunakan form di bagian atas untuk membuat produk baru. Setelah disimpan, produk akan muncul pada daftar.
3. Klik tombol **Edit** pada salah satu produk untuk memuat data ke form, lakukan perubahan, lalu simpan untuk memperbarui.
4. Klik tombol **Delete** untuk menghapus produk dari daftar.
5. Operasi di atas memanfaatkan fungsi `addProduct`, `getProducts`, `updateProduct`, dan `deleteProduct` pada `src/lib/products.ts`.

## Alur CRUD Pesanan
1. Buka menu **Orders** di `/admin/orders` untuk melihat daftar pesanan.
2. Pesanan dibuat secara otomatis ketika pelanggan melakukan checkout; admin tidak membuat pesanan secara manual.
3. Gunakan fungsi `listOrders` di `src/lib/orders.ts` untuk menampilkan pesanan dan `updateOrderStatus` untuk memperbarui status pesanan.
4. Penghapusan pesanan tidak disediakan, namun dapat ditambahkan sesuai kebutuhan.
