import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clock, Star, ArrowLeft, Search } from "lucide-react";
import { getRestaurant, type Restaurant } from "@/data/restaurants";
import { useCart } from "@/context/CartContext";
import { useRestaurantAuth } from "@/context/RestaurantAuthContext";
import { VegNonVegLogo } from "@/components/VegNonVegLogo";

export const Route = createFileRoute("/restaurants/$id")({
  loader: ({ params }) => {
    const restaurant = getRestaurant(params.id);
    if (!restaurant) throw notFound();
    return { restaurant };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.restaurant.name} — FoodHub` : "Restaurant — FoodHub" },
      { name: "description", content: loaderData?.restaurant.description ?? "Restaurant on FoodHub" },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Restaurant not found</h1>
      <Link to="/restaurants" className="mt-4 inline-block text-primary underline">
        Back to restaurants
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: RestaurantDetail,
});

function RestaurantDetail() {
  const { restaurant: initialRestaurant } = Route.useLoaderData() as { restaurant: Restaurant };
  const { restaurantsList } = useRestaurantAuth();
  const restaurant = restaurantsList.find((r) => r.id === initialRestaurant.id) || initialRestaurant;
  const { addItem, updateQuantity, items } = useCart();
  const [activeCat, setActiveCat] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegFilter, setVegFilter] = useState<"all" | "veg" | "nonveg">("all");

  const categories = useMemo(() => {
    const set = new Set(restaurant.menu.map((m) => m.category));
    return ["All", ...Array.from(set)];
  }, [restaurant]);

  const menu = restaurant.menu.filter((m) => {
    const isNonVeg =
      m.isVeg === false ||
      m.name.toLowerCase().includes("chicken") ||
      m.name.toLowerCase().includes("mutton") ||
      m.name.toLowerCase().includes("egg") ||
      m.name.toLowerCase().includes("fish");

    const matchesVeg =
      vegFilter === "all" ||
      (vegFilter === "veg" && !isNonVeg) ||
      (vegFilter === "nonveg" && isNonVeg);

    const matchesCat = activeCat === "All" || m.category === activeCat;
    const matchesSearch =
      !searchQuery ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch && matchesVeg;
  });

  return (
    <div className="bg-background pb-20">
      {/* Hero Header */}
      <div className="relative h-64 w-full sm:h-80">
        <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-4 pb-6 text-white sm:px-6 lg:px-8">
          <Link to="/restaurants" className="mb-3 inline-flex items-center gap-1 text-sm font-semibold opacity-90 hover:opacity-100 transition">
            <ArrowLeft className="h-4 w-4" /> Back to restaurants
          </Link>
          <h1 className="text-3xl font-extrabold sm:text-4xl tracking-tight">{restaurant.name}</h1>
          <p className="mt-1 text-white/80 text-sm">{restaurant.cuisine}</p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-bold">
            <span className="inline-flex items-center gap-1 bg-emerald-700 text-white px-2 py-0.5 rounded-md">
              <Star className="h-3.5 w-3.5 fill-white text-white" /> {restaurant.rating}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-[#fc8019]" /> {restaurant.deliveryTime}
            </span>
            <span>•</span>
            <span>₹{restaurant.deliveryFee.toFixed(0)} delivery</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="max-w-2xl text-sm text-muted-foreground">{restaurant.description}</p>

        {/* Search & Category Bar */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
          {/* Category Filter Pills */}
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={
                  "shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition " +
                  (activeCat === c
                    ? "bg-[#fc8019] text-white shadow-xs"
                    : "bg-secondary text-secondary-foreground hover:bg-muted")
                }
              >
                {c}
              </button>
            ))}
          </div>

          {/* Veg / Non-Veg Toggle & Search */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-border bg-card p-1 text-xs font-bold shadow-2xs">
              <button
                onClick={() => setVegFilter("all")}
                className={`rounded-full px-3 py-1 transition ${
                  vegFilter === "all" ? "bg-[#fc8019] text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setVegFilter("veg")}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 transition ${
                  vegFilter === "veg" ? "bg-emerald-600 text-white shadow-xs" : "text-muted-foreground hover:text-emerald-700"
                }`}
              >
                <VegNonVegLogo isVeg={true} /> Veg
              </button>
              <button
                onClick={() => setVegFilter("nonveg")}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 transition ${
                  vegFilter === "nonveg" ? "bg-red-600 text-white shadow-xs" : "text-muted-foreground hover:text-red-700"
                }`}
              >
                <VegNonVegLogo isVeg={false} /> Non-Veg
              </button>
            </div>

            {/* Search Box */}
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs sm:w-56">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search in menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Menu Items List - Swiggy Exact Alignment */}
        <div className="mt-6 divide-y divide-border/70">
          {menu.map((item) => {
            const inCart = items.find((i) => i.id === item.id);
            const isNonVeg =
              item.isVeg === false ||
              item.name.toLowerCase().includes("chicken") ||
              item.name.toLowerCase().includes("mutton") ||
              item.name.toLowerCase().includes("fish");

            return (
              <div
                key={item.id}
                className="flex items-start justify-between gap-6 py-6 transition hover:bg-muted/20 px-2 rounded-2xl"
              >
                {/* Left Side: Dish Info */}
                <div className="flex-1 min-w-0 pr-2">
                  {/* Veg / Non-Veg Indicator + Bestseller Tag */}
                  <div className="flex items-center gap-2 mb-1">
                    <VegNonVegLogo isVeg={!isNonVeg} />
                    {(item.isBestseller || item.price >= 110 || restaurant.rating >= 4.3) && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Bestseller
                      </span>
                    )}
                  </div>

                  {/* Dish Title */}
                  <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug">
                    {item.name}
                  </h3>

                  {/* Price */}
                  <p className="mt-0.5 text-sm sm:text-base font-extrabold text-foreground/90">
                    ₹{item.price}
                  </p>

                  {/* Rating & Reviews (Swiggy format) */}
                  <div className="mt-1.5 flex items-center gap-1 text-xs font-bold text-emerald-700">
                    <Star className="h-3 w-3 fill-emerald-600 text-emerald-600" />
                    <span>{(item.rating || 4.2).toFixed(1)}</span>
                    <span className="text-muted-foreground font-normal">({item.ratingCount || 15})</span>
                  </div>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>

                {/* Right Side: Image + Floating Swiggy ADD Button */}
                <div className="relative flex-none">
                  <div className="h-28 sm:h-32 w-32 sm:w-36 overflow-hidden rounded-2xl bg-muted shadow-xs">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Floating Swiggy Pill ADD Button */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                    {inCart ? (
                      <div className="flex items-center gap-3 rounded-xl border border-emerald-600 bg-white px-3 py-1.5 text-xs font-black text-emerald-600 shadow-md">
                        <button
                          onClick={() => updateQuantity(item.id, inCart.quantity - 1)}
                          className="text-emerald-700 hover:text-emerald-900 font-bold px-1"
                        >
                          -
                        </button>
                        <span className="font-extrabold text-emerald-700">{inCart.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, inCart.quantity + 1)}
                          className="text-emerald-700 hover:text-emerald-900 font-bold px-1"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addItem(item, restaurant.id, restaurant.name)}
                        className="rounded-xl border border-gray-200 bg-white px-7 py-1.5 text-xs font-extrabold uppercase text-emerald-600 shadow-md transition hover:bg-emerald-50 hover:shadow-lg active:scale-95"
                      >
                        ADD
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {menu.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              <p className="text-base font-semibold">No dishes match your filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}