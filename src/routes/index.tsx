import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { categoryItems, restaurants as defaultRestaurants } from "@/data/restaurants";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useRestaurantAuth } from "@/context/RestaurantAuthContext";

const CATEGORY_SUBTITLES: Record<string, string> = {
  Idli: "Deliciously soft and healthy Idlis for an ideal breakfast.",
  Poha: "Light, fluffy and seasoned flattened rice snacks.",
  Dosa: "Crispy golden crepes served with piping hot sambar & chutneys.",
  Upma: "Warm and comforting semolina breakfast bowls.",
  Khichdi: "Wholesome, spiced rice and lentil porridge tempered with ghee.",
  "Pav Bhaji": "Mouthwatering spicy vegetable mash with buttery toasted pavs.",
  "Chole Bhature": "Crispy puffed bhatures served with rich Punjabi chole.",
  Cakes: "Freshly baked celebratory cakes, rich pastries & sweet desserts.",
  Poori: "Golden fluffy pooris served with flavorful potato curry.",
  Biryani: "Aromatic basmati rice cooked with fragrant spices and tender meats.",
  Burger: "Juicy patties layered with fresh veggies, cheese and sauces.",
  Pizza: "Cheesy oven-baked pizzas loaded with delicious toppings.",
  Desserts: "Indulgent sweets, ice cream sundaes and classic Indian mithai.",
};

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { restaurantsList } = useRestaurantAuth();
  const restaurants = restaurantsList || defaultRestaurants;
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const restaurantScrollRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Filter restaurants based on selected category (e.g., "Pav Bhaji", "Chole Bhature", "Idli")
  const displayedRestaurants = selectedCategory
    ? restaurants.filter((r) => {
        const cat = selectedCategory.toLowerCase();
        return (
          r.categories.some((c) => c.toLowerCase().includes(cat) || cat.includes(c.toLowerCase())) ||
          r.cuisine.toLowerCase().includes(cat) ||
          r.menu.some(
            (item) =>
              item.name.toLowerCase().includes(cat) ||
              item.category.toLowerCase().includes(cat) ||
              item.description.toLowerCase().includes(cat)
          )
        );
      })
    : restaurants;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:px-12">
      {/* SECTION 1: "What's on your mind?" */}
      <section className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              What's on your mind?
            </h2>
            {selectedCategory && (
              <p className="mt-1 text-sm font-medium text-[#fc8019]">
                {CATEGORY_SUBTITLES[selectedCategory] || `Showing top spots serving ${selectedCategory}`}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" /> Reset filter
              </button>
            )}
            <button
              onClick={() => scroll(categoryScrollRef, "left")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition hover:bg-muted"
              aria-label="Previous categories"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll(categoryScrollRef, "right")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition hover:bg-muted"
              aria-label="Next categories"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Categories Horizontal Carousel */}
        <div
          ref={categoryScrollRef}
          className="no-scrollbar mt-6 flex gap-6 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categoryItems.map((cat) => {
            const isSelected = selectedCategory?.toLowerCase() === cat.name.toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() =>
                  setSelectedCategory((prev) => (prev === cat.name ? null : cat.name))
                }
                className={`group flex flex-col items-center shrink-0 cursor-pointer transition hover:scale-105 ${
                  isSelected ? "scale-105" : ""
                }`}
              >
                <div
                  className={`h-28 w-28 overflow-hidden rounded-full bg-muted shadow-xs sm:h-32 sm:w-32 border-2 transition ${
                    isSelected ? "border-[#fc8019] ring-4 ring-[#fc8019]/20" : "border-transparent"
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>
                <span
                  className={`mt-3 text-sm font-semibold transition ${
                    isSelected ? "text-[#fc8019] font-bold" : "text-foreground/80 group-hover:text-foreground"
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Divider */}
      <hr className="my-8 border-border/60" />

      {/* SECTION 2: "Top restaurant chains in Sangli" */}
      <section className="mb-14">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {selectedCategory
              ? `${displayedRestaurants.length} Restaurants serving ${selectedCategory} in Sangli`
              : "Top restaurant chains in Sangli"}
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll(restaurantScrollRef, "left")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition hover:bg-muted"
              aria-label="Previous restaurants"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll(restaurantScrollRef, "right")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition hover:bg-muted"
              aria-label="Next restaurants"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Restaurant Grid */}
        {displayedRestaurants.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {displayedRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} activeCategory={selectedCategory} />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center py-12 rounded-2xl border border-dashed border-border bg-card">
            <p className="text-lg font-semibold">No restaurants found serving {selectedCategory}</p>
            <button
              onClick={() => setSelectedCategory(null)}
              className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
            >
              View all restaurants
            </button>
          </div>
        )}
      </section>

      {/* SECTION 3: Restaurants with online food delivery in Sangli */}
      {!selectedCategory && (
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Restaurants with online food delivery in Sangli
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {restaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}