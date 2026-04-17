import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Service, ServiceAddon } from "../types";

interface CartState {
  items: CartItem[];
  addItem: (
    service: Service,
    options?: {
      quantity?: number;
      selectedAddons?: ServiceAddon[];
      customInstructions?: string;
      fabricType?: string;
    },
  ) => void;
  removeItem: (serviceId: string) => void;
  updateQuantity: (serviceId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (service, options = {}) => {
        const {
          quantity = 1,
          selectedAddons = [],
          customInstructions = "",
          fabricType = "",
        } = options;

        set((state) => {
          const existing = state.items.find((i) => i.service.id === service.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.service.id === service.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                service,
                quantity,
                selectedAddons,
                customInstructions,
                fabricType,
              },
            ],
          };
        });
      },

      removeItem: (serviceId) => {
        set((state) => ({
          items: state.items.filter((i) => i.service.id !== serviceId),
        }));
      },

      updateQuantity: (serviceId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(serviceId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.service.id === serviceId ? { ...i, quantity } : i,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const addonTotal = item.selectedAddons.reduce(
            (sum, a) => sum + a.price,
            0,
          );
          return total + (item.service.priceMin + addonTotal) * item.quantity;
        }, 0);
      },

      getCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    { name: "stitchcraft-cart" },
  ),
);
