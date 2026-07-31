import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { MenuItem } from "@/data/restaurants";

export interface CartItem extends MenuItem {
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: MenuItem, restaurantId: string, restaurantName: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  subtotal: number;
  count: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "foodhub_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem: CartContextValue["addItem"] = (item, restaurantId, restaurantName) => {
    setItems((prev) => {
      // If cart has items from a different restaurant, replace
      if (prev.length && prev[0].restaurantId !== restaurantId) {
        return [{ ...item, quantity: 1, restaurantId, restaurantName }];
      }
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1, restaurantId, restaurantName }];
    });
  };

  const removeItem = (id: string) => setItems((p) => p.filter((i) => i.id !== id));
  const updateQuantity = (id: string, quantity: number) =>
    setItems((p) =>
      quantity <= 0
        ? p.filter((i) => i.id !== id)
        : p.map((i) => (i.id === id ? { ...i, quantity } : i)),
    );
  const clear = () => setItems([]);

  const { subtotal, count } = useMemo(() => {
    return {
      subtotal: items.reduce((s, i) => s + i.price * i.quantity, 0),
      count: items.reduce((s, i) => s + i.quantity, 0),
    };
  }, [items]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clear, subtotal, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}