"use client";

import {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    useMemo,
    useCallback,
} from "react";
import { CartItem } from "@/types/cart";

/* ================= TYPES ================= */

type CartAction =
    | { type: "ADD_ITEM"; payload: CartItem }
    | { type: "INCREASE_QTY"; payload: number }
    | { type: "DECREASE_QTY"; payload: number }
    | { type: "REMOVE_ITEM"; payload: number }
    | { type: "CLEAR_CART" };

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    increaseQty: (id: number) => void;
    decreaseQty: (id: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

/* ================= REDUCER ================= */

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.find(
                i =>
                    i.id === action.payload.id &&
                    i.size === action.payload.size
            );

            if (existing) {
                return state.map(i =>
                    i.id === action.payload.id && i.size === action.payload.size
                        ? { ...i, qty: i.qty + 1 }
                        : i
                );
            }

            return [...state, { ...action.payload, qty: 1 }];
        }

        case "INCREASE_QTY":
            return state.map(i =>
                i.id === action.payload ? { ...i, qty: i.qty + 1 } : i
            );

        case "DECREASE_QTY":
            return state.map(i =>
                i.id === action.payload && i.qty > 1
                    ? { ...i, qty: i.qty - 1 }
                    : i
            );

        case "REMOVE_ITEM":
            return state.filter(i => i.id !== action.payload);

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
    const [cart, dispatch] = useReducer(cartReducer, []);

    /* ========= MEMOIZED ACTIONS ========= */

    const addToCart = useCallback(
        (item: CartItem) =>
            dispatch({ type: "ADD_ITEM", payload: item }),
        []
    );

    const increaseQty = useCallback(
        (id: number) =>
            dispatch({ type: "INCREASE_QTY", payload: id }),
        []
    );

    const decreaseQty = useCallback(
        (id: number) =>
            dispatch({ type: "DECREASE_QTY", payload: id }),
        []
    );

    const removeFromCart = useCallback(
        (id: number) =>
            dispatch({ type: "REMOVE_ITEM", payload: id }),
        []
    );

    const clearCart = useCallback(
        () => dispatch({ type: "CLEAR_CART" }),
        []
    );

    /* ========= MEMOIZED CONTEXT VALUE ========= */

    const value = useMemo(
        () => ({
            cart,
            addToCart,
            increaseQty,
            decreaseQty,
            removeFromCart,
            clearCart,
        }),
        [cart, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart]
    );

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

/* ================= HOOK ================= */

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }
    return context;
};
