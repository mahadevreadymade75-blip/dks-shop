"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { CartItem } from "@/types/cart";

/* ================= TYPES ================= */

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "INCREASE_QTY"; payload: { id: number; size?: string } }
  | { type: "DECREASE_QTY"; payload: { id: number; size?: string } }
  | { type: "REMOVE_ITEM"; payload: { id: number; size?: string } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  increaseQty: (id: number, size?: string) => void;
  decreaseQty: (id: number, size?: string) => void;
  removeFromCart: (id: number, size?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isEmpty: boolean;
}

/* ================= CONSTANTS ================= */

const CART_STORAGE_KEY = "dks-handloom-cart";

/* ================= HELPER FUNCTIONS ================= */

const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return [];
  }
};

const saveCartToStorage = (cart: CartItem[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

/* ================= REDUCER ================= */

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "LOAD_CART":
      return action.payload;

    case "ADD_ITEM": {
      const existing = state.find(
        (i) => i.id === action.payload.id && i.size === action.payload.size,
      );

      if (existing) {
        return state.map((i) =>
          i.id === action.payload.id && i.size === action.payload.size
            ? {
                ...i,
                qty: i.qty + (action.payload.qty || 1), // ✅ Use payload qty if provided
                // ✅ Preserve or update originalPrice if it exists
                originalPrice: action.payload.originalPrice ?? i.originalPrice,
              }
            : i,
        );
      }

      // ✅ When adding new item, use qty from payload or default to 1
      return [
        ...state,
        {
          ...action.payload,
          qty: action.payload.qty || 1,
        },
      ];
    }

    case "INCREASE_QTY":
      return state.map((i) =>
        i.id === action.payload.id && i.size === action.payload.size
          ? { ...i, qty: i.qty + 1 }
          : i,
      );

    case "DECREASE_QTY":
      return state
        .map((i) =>
          i.id === action.payload.id && i.size === action.payload.size
            ? { ...i, qty: i.qty - 1 }
            : i,
        )
        .filter((i) => i.qty > 0); // Auto-remove if qty becomes 0

    case "REMOVE_ITEM":
      return state.filter(
        (i) => !(i.id === action.payload.id && i.size === action.payload.size),
      );

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

/* ================= CONTEXT ================= */

const CartContext = createContext<CartContextType | undefined>(undefined);

/* ================= PROVIDER ================= */

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    // Lazy initialization - load cart from localStorage on mount
    return loadCartFromStorage();
  });

  /* ========= SYNC CART TO LOCALSTORAGE ========= */

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  /* ========= MEMOIZED ACTIONS ========= */

  const addToCart = useCallback(
    (item: CartItem) => dispatch({ type: "ADD_ITEM", payload: item }),
    [],
  );

  const increaseQty = useCallback(
    (id: number, size?: string) =>
      dispatch({ type: "INCREASE_QTY", payload: { id, size } }),
    [],
  );

  const decreaseQty = useCallback(
    (id: number, size?: string) =>
      dispatch({ type: "DECREASE_QTY", payload: { id, size } }),
    [],
  );

  const removeFromCart = useCallback(
    (id: number, size?: string) =>
      dispatch({ type: "REMOVE_ITEM", payload: { id, size } }),
    [],
  );

  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);

  /* ========= MEMOIZED COMPUTED VALUES ========= */

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart],
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart],
  );

  const isEmpty = useMemo(() => cart.length === 0, [cart.length]);

  /* ========= MEMOIZED CONTEXT VALUE ========= */

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice,
      isEmpty,
    }),
    [
      cart,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice,
      isEmpty,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/* ================= HOOK ================= */

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
