import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../backend';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: bigint) => void;
  updateQuantity: (productId: bigint, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id.toString() === product.id.toString()
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id.toString() === product.id.toString()
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity }],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.product.id.toString() !== productId.toString()
          ),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) => item.product.id.toString() !== productId.toString()
              ),
            };
          }

          return {
            items: state.items.map((item) =>
              item.product.id.toString() === productId.toString()
                ? { ...item, quantity }
                : item
            ),
          };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((total, item) => {
          const priceInCents = Number(item.product.priceInCents);
          return total + (priceInCents * item.quantity);
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
      version: 1,
    }
  )
);
