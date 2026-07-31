import { Link, useNavigate } from "@tanstack/react-router";
import {
  ShoppingCart,
  Search,
  Percent,
  HelpCircle,
  User as UserIcon,
  ChevronDown,
  LogOut,
  Store,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRestaurantAuth } from "@/context/RestaurantAuthContext";

export function Header() {
  const { user, logout } = useAuth();
  const { currentRestaurant, logoutRestaurant } = useRestaurantAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur shadow-xs">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
        {/* Left Section: Brand Logo & Location Selector */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 transition hover:scale-105">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fc8019] text-white shadow-md">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
          </Link>

          {/* Location Selector */}
          <div className="hidden items-center gap-2 sm:flex">
            <span className="cursor-pointer border-b-2 border-foreground font-bold text-foreground hover:text-[#fc8019] hover:border-[#fc8019] text-sm">
              Other
            </span>
            <span className="max-w-[220px] truncate text-xs text-muted-foreground">
              Sangli, Maharashtra, India
            </span>
            <ChevronDown className="h-4 w-4 text-[#fc8019]" />
          </div>
        </div>

        {/* Right Section: Navigation Links matching Swiggy header */}
        <nav className="flex items-center gap-6 sm:gap-8 text-sm font-medium text-foreground/80">
          <Link
            to="/restaurants"
            className="flex items-center gap-2 transition hover:text-[#fc8019]"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Link>

          <Link
            to="/restaurants"
            className="relative flex items-center gap-2 transition hover:text-[#fc8019]"
          >
            <Percent className="h-4 w-4" />
            <span>Offers</span>
            <span className="absolute -top-2.5 -right-6 rounded-full bg-[#fc8019] px-1.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
              NEW
            </span>
          </Link>

          {/* Restaurant Partner Link / Dashboard */}
          {currentRestaurant ? (
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs border border-emerald-200">
              <Link
                to="/restaurant-dashboard"
                className="flex items-center gap-1.5 font-bold text-emerald-800 hover:underline"
              >
                <Store className="h-3.5 w-3.5" />
                <span className="max-w-[120px] truncate">{currentRestaurant.name}</span>
              </Link>
              <button
                onClick={logoutRestaurant}
                title="Logout Partner"
                className="text-emerald-600 hover:text-red-600 font-bold ml-1"
              >
                ✕
              </button>
            </div>
          ) : (
            <Link
              to="/restaurant-login"
              className="hidden lg:flex items-center gap-1.5 transition hover:text-[#fc8019] text-xs font-semibold rounded-full border border-border px-2.5 py-1"
            >
              <Store className="h-3.5 w-3.5 text-[#fc8019]" />
              <span>Partner Login</span>
            </Link>
          )}

          {/* User Sign In / Profile */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-1.5 font-semibold text-foreground transition hover:text-[#fc8019]"
                title="View Profile & Orders"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fc8019] text-xs font-bold text-white">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="max-w-[100px] truncate">{user.name}</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate({ to: "/" });
                }}
                title="Logout"
                className="flex items-center gap-1 text-muted-foreground hover:text-destructive p-1"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 transition hover:text-[#fc8019]"
            >
              <UserIcon className="h-4 w-4" />
              <span>Sign In</span>
            </Link>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            className="flex items-center gap-2 transition hover:text-[#fc8019]"
          >
            <div className="relative flex items-center justify-center">
              <ShoppingCart className="h-5 w-5" />
              <span className="ml-1 font-bold text-foreground">{count}</span>
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#fc8019] px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </div>
            <span className="font-semibold text-foreground">Cart</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}