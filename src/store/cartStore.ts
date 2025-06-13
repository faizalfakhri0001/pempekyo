
'use client';
import { CartItem, Product } from '@/types/components';
import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  promoCode: string | null;
  discount: number;
  applyPromoCode: (code: string) => boolean; // Returns true if valid
  getShippingCost: () => number; // Placeholder
  getGrandTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      discount: 0,
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      updateItemQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) => (item.id === productId ? { ...item, quantity } : item))
            .filter((item) => item.quantity > 0), // Remove if quantity is 0 or less
        })),
      clearCart: () => set({ items: [], promoCode: null, discount: 0 }),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
      applyPromoCode: (code) => {
        if (code.toUpperCase() === 'HEMAT10') {
          const subtotal = get().getTotalPrice();
          const discountAmount = subtotal * 0.10; // 10% discount
          set({ promoCode: code, discount: discountAmount });
          return true;
        }
        set({ promoCode: null, discount: 0 }); // Reset if invalid
        return false;
      },
      getShippingCost: () => {
        // Basic placeholder logic
        const itemCount = get().getTotalItems();
        if (itemCount === 0) return 0;
        return 15000; // Flat shipping rate
      },
      getGrandTotal: () => {
        const subtotal = get().getTotalPrice();
        const shipping = get().getShippingCost();
        const discountAmount = get().discount;
        return subtotal + shipping - discountAmount;
      }
    }),
    {
      name: 'Pempekyo-cart-storage', // Name for localStorage key
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);
