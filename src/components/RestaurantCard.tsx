import { Link } from "@tanstack/react-router";
import type { Restaurant } from "@/data/restaurants";

export function RestaurantCard({
  restaurant,
  activeCategory,
}: {
  restaurant: Restaurant;
  activeCategory?: string | null;
}) {
  // If activeCategory is provided, display matching dish image (e.g. Idli dish photo) instead of generic restaurant cover
  const matchingDish = activeCategory
    ? restaurant.menu.find(
        (m) =>
          m.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
          m.name.toLowerCase().includes(activeCategory.toLowerCase())
      )
    : null;

  const displayImage = matchingDish?.image || restaurant.image;

  return (
    <Link
      to="/restaurants/$id"
      params={{ id: restaurant.id }}
      className="group flex flex-col overflow-hidden transition-transform duration-200 hover:scale-[0.97]"
    >
      {/* Image Container with Swiggy-style Gradient & Offer Banner */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted shadow-xs">
        <img
          src={displayImage}
          alt={matchingDish?.name || restaurant.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Offer Banner Text at Bottom Left */}
        {restaurant.offer ? (
          <span className="absolute bottom-2 left-3 text-lg font-extrabold uppercase tracking-tight text-white drop-shadow-md">
            {restaurant.offer}
          </span>
        ) : (
          <span className="absolute bottom-2 left-3 text-sm font-bold uppercase tracking-tight text-white drop-shadow-md">
            ₹{restaurant.deliveryFee.toFixed(2)} DELIVERY
          </span>
        )}
      </div>

      {/* Restaurant Info */}
      <div className="mt-3 px-1">
        <h3 className="truncate text-lg font-bold text-foreground tracking-tight flex items-center gap-1.5">
          {restaurant.isAd && (
            <span className="text-xs font-semibold text-muted-foreground/70 shrink-0">
              Ad
            </span>
          )}
          <span className="truncate">{restaurant.name}</span>
        </h3>

        {/* Rating and Delivery Time */}
        <div className="mt-1 flex items-center gap-1.5 text-sm font-bold text-foreground">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-700 text-white text-[11px] font-extrabold">
            ★
          </span>
          <span>{restaurant.rating}</span>
          <span>•</span>
          <span>{restaurant.deliveryTime}</span>
        </div>

        {/* Cuisines */}
        <p className="mt-1 truncate text-sm text-muted-foreground font-medium">
          {restaurant.cuisine}
        </p>

        {/* Location / Area */}
        {restaurant.location && (
          <p className="truncate text-sm text-muted-foreground">
            {restaurant.location}
          </p>
        )}
      </div>
    </Link>
  );
}