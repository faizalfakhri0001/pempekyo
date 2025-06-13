import { NavLink, Product, Testimonial, PaymentOption, PaymentMethodType } from "@/types/components";



export const APP_NAME = 'PempekYo';

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Beranda' },
  { href: '/menu', label: 'Menu' },
  { href: '/#tentang-kami', label: 'Tentang Kami' }, // Assuming about is a section
  { href: '/#kontak', label: 'Kontak' }, // Assuming contact is a section
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Pempek Kapal Selam',
    description: 'Pempek dengan telur ayam utuh di dalamnya',
    price: 25000,
    imageUrl: 'https://picsum.photos/seed/kapalselam/300/200',
  },
  {
    id: '2',
    name: 'Pempek Lenjer',
    description: 'Pempek berbentuk silinder panjang',
    price: 20000,
    imageUrl: 'https://picsum.photos/seed/lenjer/300/200',
  },
  {
    id: '3',
    name: 'Pempek Adaan',
    description: 'Pempek bulat kecil yang renyah di luar',
    price: 18000,
    imageUrl: 'https://picsum.photos/seed/adaan/300/200',
  },
  {
    id: '4',
    name: 'Pempek Kulit',
    description: 'Pempek dengan tambahan kulit ikan',
    price: 22000,
    imageUrl: 'https://picsum.photos/seed/kulit/300/200',
  },
   {
    id: '5',
    name: 'Pempek Keriting',
    description: 'Pempek berbentuk keriting yang unik',
    price: 23000,
    imageUrl: 'https://picsum.photos/seed/keriting/300/200',
  },
  {
    id: '6',
    name: 'Tekwan',
    description: 'Sup bola ikan khas Palembang',
    price: 28000,
    imageUrl: 'https://picsum.photos/seed/tekwan/300/200',
  },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Budi Hartono',
    role: 'Pelanggan Setia',
    comment: 'Pempeknya enak banget, rasa otentik Palembang. Kapal selamnya juara!',
    rating: 5,
    imageUrl: 'https://picsum.photos/seed/budi/100/100',
  },
  {
    id: '2',
    name: 'Siti Rahmawati',
    role: 'Food Blogger',
    comment: 'Sebagai food blogger, saya highly recommend PempekYo. Kualitas bahan dan rasa tidak diragukan lagi. Pengiriman juga cepat.',
    rating: 5,
    imageUrl: 'https://picsum.photos/seed/siti/100/100',
  },
  {
    id: '3',
    name: 'Agus Wijaya',
    role: 'Pelanggan Baru',
    comment: 'Baru pertama kali coba dan langsung jatuh cinta. Pasti akan pesan lagi. Proses pemesanan mudah, bahkan tanpa login.',
    rating: 4,
    imageUrl: 'https://picsum.photos/seed/agus/100/100',
  },
];

export const PAYMENT_OPTIONS: PaymentOption[] = [
  { id: 'bca', name: 'Bank BCA', type: PaymentMethodType.BANK_TRANSFER },
  { id: 'mandiri', name: 'Bank Mandiri', type: PaymentMethodType.BANK_TRANSFER },
  { id: 'bni', name: 'Bank BNI', type: PaymentMethodType.BANK_TRANSFER },
  { id: 'gopay', name: 'GoPay', type: PaymentMethodType.E_WALLET },
  { id: 'ovo', name: 'OVO', type: PaymentMethodType.E_WALLET },
  { id: 'dana', name: 'DANA', type: PaymentMethodType.E_WALLET },
  { id: 'shopeepay', name: 'ShopeePay', type: PaymentMethodType.E_WALLET },
  { id: 'cod', name: 'Cash On Delivery (COD)', type: PaymentMethodType.COD },
];

export const CITIES_KABUPATEN: string[] = [
  "Jakarta Pusat",
  "Jakarta Utara",
  "Jakarta Barat",
  "Jakarta Selatan",
  "Jakarta Timur",
  "Bandung",
  "Surabaya",
  "Medan",
  "Palembang",
  "Depok",
  "Bogor",
  "Tangerang",
  "Bekasi",
];
