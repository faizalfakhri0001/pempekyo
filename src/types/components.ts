
export interface NavLink {
  href: string;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string; // Optional category
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number; // e.g., 1-5
  imageUrl?: string; // Optional
}

export interface User {
  id: string;
  name?: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface ShippingInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  additionalNotes?: string;
}

export enum PaymentMethodType {
  BANK_TRANSFER = 'Bank Transfer',
  E_WALLET = 'E-Wallet',
  COD = 'Cash On Delivery',
}

export interface PaymentOption {
  id: string;
  name: string;
  type: PaymentMethodType;
  icon?: React.ReactNode; // e.g. bank logo
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingInfo: ShippingInfo;
  paymentMethod: PaymentOption;
  totalAmount: number;
  promoCode?: string;
  discountAmount?: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderDate: Date;
  metadata?: Record<string, unknown>;
}
