"use client";

/* ═══════════════════════════════════════════════════════════════
   CART SYSTEM — سلة المشتريات
   Client-side cart persisted in localStorage.
   Prices shown here are display-only; the server recalculates
   all totals from lib/store-data.ts when the order is placed.
═══════════════════════════════════════════════════════════════ */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  productId: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  price: number;
  originalPrice: number;
  isMonthly?: boolean;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isReady: boolean;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
}

const STORAGE_KEY = "am_cart_v1";
const MAX_QTY = 10;

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(
            parsed.filter(
              (i) =>
                i &&
                typeof i.productId === "string" &&
                typeof i.qty === "number" &&
                i.qty > 0
            )
          );
        }
      }
    } catch {
      // corrupted storage — start with an empty cart
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage full/unavailable — cart still works in-memory
    }
  }, [items, isReady]);

  const addItem: CartContextValue["addItem"] = (item, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) }
            : i
        );
      }
      return [...prev, { ...item, qty: Math.min(MAX_QTY, Math.max(1, qty)) }];
    });
  };

  const removeItem = (productId: string) =>
    setItems((prev) => prev.filter((i) => i.productId !== productId));

  const setQty = (productId: string, qty: number) => {
    if (qty <= 0) return removeItem(productId);
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, qty: Math.min(MAX_QTY, qty) } : i
      )
    );
  };

  const clear = () => setItems([]);

  const { count, subtotal } = useMemo(
    () => ({
      count: items.reduce((s, i) => s + i.qty, 0),
      subtotal: items.reduce((s, i) => s + i.price * i.qty, 0),
    }),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, isReady, addItem, removeItem, setQty, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
