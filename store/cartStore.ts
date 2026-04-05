import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ReactNode } from 'react';
import { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity: number }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

function withTotals(items: CartItem[]) {
  const sanitizedItems = items.filter((item) => item.quantity > 0);
  const totalItems = sanitizedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = sanitizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items: sanitizedItems,
    totalItems,
    totalPrice,
  };
}

export function CartProvider({ children }: CartProviderProps) {
  return children;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addItem: (newItem) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === newItem.id);

        if (existingItem) {
          const updatedItems = items.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );

          set(withTotals(updatedItems));
          return;
        }

        set(withTotals([...items, newItem as CartItem]));
      },
      updateQuantity: (id, quantity) => {
        const normalizedQuantity = Math.max(0, quantity);
        const updatedItems = get().items.map((item) =>
          item.id === id ? { ...item, quantity: normalizedQuantity } : item
        );

        set(withTotals(updatedItems));
      },
      removeItem: (id) => {
        const updatedItems = get().items.filter((item) => item.id !== id);
        set(withTotals(updatedItems));
      },
      clearCart: () => set(withTotals([])),
    }),
    {
      name: 'cart-storage',
    }
  )
);
