import { create } from 'zustand';
import { Product, User } from './services/api';

interface CartItem {
  product: Product;
  quantity: number;
}

interface AppState {
  user: User | null;
  cart: CartItem[];
  setUser: (user: User | null) => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  getCartTotal: () => number;
  clearCart: () => void;
}

type SetState = (
  partial: AppState | Partial<AppState> | ((state: AppState) => AppState | Partial<AppState>),
  replace?: boolean
) => void;

type GetState = () => AppState;

export const useStore = create<AppState>((set: SetState, get: GetState) => ({
  user: null,
  cart: [],

  setUser: (user: User | null) => set({ user }),

  addToCart: (product: Product, quantity: number) => {
    set((state: AppState) => {
      const existingItem = state.cart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return {
        cart: [...state.cart, { product, quantity }],
      };
    });
  },

  removeFromCart: (productId: string) => {
    set((state: AppState) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    }));
  },

  updateCartItemQuantity: (productId: string, quantity: number) => {
    set((state: AppState) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    }));
  },

  getCartTotal: () => {
    const state = get();
    return state.cart.reduce(
      (total: number, item: CartItem) => total + item.product.price * item.quantity,
      0
    );
  },

  clearCart: () => set({ cart: [] }),
}));
