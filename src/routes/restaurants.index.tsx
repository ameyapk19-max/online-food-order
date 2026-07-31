import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { categoryItems, restaurants as defaultRestaurants } from "@/data/restaurants";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useRestaurantAuth } from "@/context/RestaurantAuthContext";

export const Route = createFileRoute("/restaurants/")({
  validateSearch: (search: Record<string, unknown>): { category?: string } => {
    return {
      category: typeof search.category === "string" ? search.category : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Restaurants — FoodHub" },
      { name: "description", content: "Browse all restaurants available on FoodHub." },
    ],
  }),
  component: RestaurantsPage,
});

function RestaurantsPage() {
  const { restaurantsList } = useRestaurantAuth();
  const restaurants = restaurantsList || defaultRestaurants;
  const { category: initialCategory } = Route.useSearch();
  const [q, setQ] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null);

  const filtered = restaurants.filter((r) => {
    const matchesSearch =
      !q ||
      r.name.toLowerCase().includes(q.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(q.toLowerCase());

    const matchesCategory =
      !selectedCategory ||
      r.categories.some(
        (cat) =>
          cat.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          selectedCategory.toLowerCase().includes(cat.toLowerCase())
      ) ||
      r.cuisine.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      r.menu.some(
        (m) =>
          m.name.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          m.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          m.description.toLowerCase().includes(selectedCategory.toLowerCase())
      );

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">
            {selectedCategory ? `${selectedCategory} Restaurants` : "All restaurants"}
          </h1>
          <p className="mt-1 text-muted-foreground">
            {selectedCategory
              ? `Found ${filtered.length} spots serving ${selectedCategory} in Sangli`
              : "Handpicked spots delivering right now."}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 sm:w-80 shadow-xs">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search restaurants or cuisines"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
            !selectedCategory
              ? "bg-[#fc8019] text-white"
              : "bg-secondary text-secondary-foreground hover:bg-muted"
          }`}
        >
          All
        </button>
        {categoryItems.map((cat) => {
          const isSelected = selectedCategory?.toLowerCase() === cat.name.toLowerCase();
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(isSelected ? null : cat.name)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                isSelected
                  ? "bg-[#fc8019] text-white shadow-xs"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Restaurant Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} activeCategory={selectedCategory} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center text-muted-foreground">
          <p className="text-lg">No restaurants match your search.</p>
          <button
            onClick={() => {
              setQ("");
              setSelectedCategory(null);
            }}
            className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}