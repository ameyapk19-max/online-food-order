import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { restaurants as initialRestaurants, type Restaurant, type MenuItem } from "@/data/restaurants";

export interface RestaurantPartnerUser {
  restaurantId: string;
  name: string;
  email: string;
}

interface RestaurantAuthContextValue {
  currentRestaurant: Restaurant | null;
  partnerUser: RestaurantPartnerUser | null;
  restaurantsList: Restaurant[];
  loginRestaurant: (restaurantId: string) => boolean;
  logoutRestaurant: () => void;
  registerRestaurant: (newRest: Partial<Restaurant> & { name: string; cuisine: string; location: string }) => string;
  updateRestaurantDetails: (id: string, updates: Partial<Restaurant>) => void;
  addMenuItem: (restaurantId: string, item: Omit<MenuItem, "id">) => void;
  updateMenuItem: (restaurantId: string, itemId: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (restaurantId: string, itemId: string) => void;
}

const RestaurantAuthContext = createContext<RestaurantAuthContextValue | null>(null);

const RESTAURANT_AUTH_KEY = "foodhub_partner_session";
const RESTAURANTS_DATA_KEY = "foodhub_restaurants_data_v6";

export function RestaurantAuthProvider({ children }: { children: ReactNode }) {
  const [restaurantsList, setRestaurantsList] = useState<Restaurant[]>(() => {
    try {
      const saved = localStorage.getItem(RESTAURANTS_DATA_KEY);
      if (saved) {
        const parsed: Restaurant[] = JSON.parse(saved);
        // Merge missing default restaurants and new default menu items into cached list
        const merged = initialRestaurants.map((initR) => {
          const existing = parsed.find((p) => p.id === initR.id);
          if (!existing) return initR;

          const existingItemIds = new Set(existing.menu.map((m) => m.id));
          const newMenuItems = initR.menu.filter((m) => !existingItemIds.has(m.id));

          const mergedCategories = Array.from(
            new Set([...existing.categories, ...initR.categories])
          );

          return {
            ...existing,
            categories: mergedCategories,
            cuisine: existing.cuisine.includes(initR.cuisine.split(",")[0])
              ? existing.cuisine
              : `${existing.cuisine}, ${initR.cuisine}`,
            menu: [...existing.menu, ...newMenuItems],
          };
        });

        const initIds = new Set(initialRestaurants.map((r) => r.id));
        const customRestaurants = parsed.filter((p) => !initIds.has(p.id));

        return [...merged, ...customRestaurants];
      }
    } catch {}
    return initialRestaurants;
  });

  const [partnerUser, setPartnerUser] = useState<RestaurantPartnerUser | null>(() => {
    try {
      const saved = localStorage.getItem(RESTAURANT_AUTH_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });

  useEffect(() => {
    try {
      localStorage.setItem(RESTAURANTS_DATA_KEY, JSON.stringify(restaurantsList));
    } catch {}
  }, [restaurantsList]);

  useEffect(() => {
    try {
      if (partnerUser) {
        localStorage.setItem(RESTAURANT_AUTH_KEY, JSON.stringify(partnerUser));
      } else {
        localStorage.removeItem(RESTAURANT_AUTH_KEY);
      }
    } catch {}
  }, [partnerUser]);

  const currentRestaurant =
    restaurantsList.find((r) => r.id === partnerUser?.restaurantId) || null;

  const loginRestaurant = (restaurantId: string): boolean => {
    const target = restaurantsList.find((r) => r.id === restaurantId);
    if (!target) return false;

    setPartnerUser({
      restaurantId: target.id,
      name: `${target.name} Partner`,
      email: `owner@${target.id}.foodhub.com`,
    });
    return true;
  };

  const logoutRestaurant = () => {
    setPartnerUser(null);
  };

  const registerRestaurant = (
    newRest: Partial<Restaurant> & { name: string; cuisine: string; location: string }
  ): string => {
    const id = `hotel-${Date.now()}`;
    const created: Restaurant = {
      id,
      name: newRest.name,
      cuisine: newRest.cuisine,
      location: newRest.location,
      rating: 4.5,
      deliveryTime: "20-25 mins",
      deliveryFee: 30,
      image:
        newRest.image ||
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      description: newRest.description || `Welcome to ${newRest.name} on FoodHub.`,
      categories: newRest.categories || ["General"],
      menu: newRest.menu || [],
    };

    setRestaurantsList((prev) => [created, ...prev]);
    loginRestaurant(id);
    return id;
  };

  const updateRestaurantDetails = (id: string, updates: Partial<Restaurant>) => {
    setRestaurantsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  };

  const addMenuItem = (restaurantId: string, item: Omit<MenuItem, "id">) => {
    const newItem: MenuItem = {
      ...item,
      id: `item-${Date.now()}`,
      inStock: item.inStock !== false,
    };

    setRestaurantsList((prev) =>
      prev.map((r) => {
        if (r.id === restaurantId) {
          const updatedCategories = r.categories.includes(item.category)
            ? r.categories
            : [...r.categories, item.category];
          return {
            ...r,
            categories: updatedCategories,
            menu: [...r.menu, newItem],
          };
        }
        return r;
      })
    );
  };

  const updateMenuItem = (
    restaurantId: string,
    itemId: string,
    updates: Partial<MenuItem>
  ) => {
    setRestaurantsList((prev) =>
      prev.map((r) => {
        if (r.id === restaurantId) {
          return {
            ...r,
            menu: r.menu.map((m) => (m.id === itemId ? { ...m, ...updates } : m)),
          };
        }
        return r;
      })
    );
  };

  const deleteMenuItem = (restaurantId: string, itemId: string) => {
    setRestaurantsList((prev) =>
      prev.map((r) => {
        if (r.id === restaurantId) {
          return {
            ...r,
            menu: r.menu.filter((m) => m.id !== itemId),
          };
        }
        return r;
      })
    );
  };

  return (
    <RestaurantAuthContext.Provider
      value={{
        currentRestaurant,
        partnerUser,
        restaurantsList,
        loginRestaurant,
        logoutRestaurant,
        registerRestaurant,
        updateRestaurantDetails,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
      }}
    >
      {children}
    </RestaurantAuthContext.Provider>
  );
}

export function useRestaurantAuth() {
  const ctx = useContext(RestaurantAuthContext);
  if (!ctx) {
    throw new Error("useRestaurantAuth must be used within a RestaurantAuthProvider");
  }
  return ctx;
}
