import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  User as UserIcon,
  ShoppingBag,
  FileText,
  MapPin,
  LogOut,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Edit2,
  Check,
  Bike,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getUserOrders } from "@/lib/firebase";
import { InvoiceModal, type InvoiceOrder } from "@/components/InvoiceModal";
import { VegNonVegLogo } from "@/components/VegNonVegLogo";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile & Orders — FoodHub" },
      { name: "description", content: "Manage your FoodHub account, view past orders, and download GST tax invoices." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<InvoiceOrder[]>([]);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<InvoiceOrder | null>(null);
  const [fetchingOrders, setFetchingOrders] = useState(true);

  // Editable display name state
  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState(user?.name || "");

  useEffect(() => {
    if (user?.name) {
      setUserName(user.name);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setFetchingOrders(false);
      return;
    }

    const loadOrders = async () => {
      setFetchingOrders(true);
      const localOrdersList: InvoiceOrder[] = [];

      // 1. Load locally cached orders from localStorage
      try {
        const raw = localStorage.getItem("foodhub_user_orders");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            localOrdersList.push(...parsed);
          }
        }
      } catch (err) {
        console.warn("Failed to load local orders:", err);
      }

      // 2. Load Firestore orders
      try {
        const remoteOrders = await getUserOrders(user.uid);
        if (remoteOrders && remoteOrders.length > 0) {
          // Merge remote orders, avoiding duplicates by id
          const existingIds = new Set(localOrdersList.map((o) => o.id));
          remoteOrders.forEach((ro) => {
            if (ro.id && !existingIds.has(ro.id)) {
              localOrdersList.push({
                id: ro.id,
                userName: ro.userName || user.name,
                userEmail: ro.userEmail || user.email,
                restaurantName: ro.restaurantName || "FoodHub Restaurant",
                items: ro.items || [],
                subtotal: ro.subtotal || 0,
                tax: ro.tax || 0,
                deliveryFee: ro.deliveryFee || 0,
                total: ro.total || 0,
                deliveryAddress: ro.deliveryAddress || {
                  address: "Vishrambag",
                  city: "Sangli",
                  zipCode: "416416",
                },
                paymentMethod: ro.paymentMethod || "Online Payment",
                status: ro.status || "completed",
                createdAt: ro.createdAt || new Date().toISOString(),
              });
            }
          });
        }
      } catch (err) {
        console.warn("Firestore orders fetch fallback:", err);
      }

      setOrders(localOrdersList);
      setFetchingOrders(false);
    };

    loadOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#fc8019] border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#fc8019]/10 text-[#fc8019]">
          <UserIcon className="h-10 w-10" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-foreground">Sign in to view your profile</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Log in to see your account details, track order history, and download tax invoices.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/login"
            className="rounded-full bg-[#fc8019] px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#e67012] transition"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="rounded-full border border-border px-6 py-2.5 text-sm font-bold text-foreground hover:bg-accent transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#171e2e] to-[#2d3748] text-white py-12 px-4 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#fc8019] text-white font-extrabold text-3xl shadow-lg border-2 border-white/20">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="rounded-lg bg-white/10 px-3 py-1 text-lg font-bold text-white border border-white/30 focus:outline-none"
                      />
                      <button
                        onClick={() => setIsEditingName(false)}
                        className="rounded-full bg-emerald-500 p-1.5 text-white hover:bg-emerald-600"
                        title="Save name"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl sm:text-3xl font-extrabold">{userName}</h1>
                      <button
                        onClick={() => setIsEditingName(true)}
                        className="text-white/60 hover:text-white transition"
                        title="Edit display name"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-white/80 mt-1">{user.email}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
                    <ShieldCheck className="h-3 w-3" /> Verified Member
                  </span>
                  <span className="text-xs text-white/50">• User ID: {user.uid.slice(0, 10)}...</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                navigate({ to: "/" });
              }}
              className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-red-500/20 hover:text-red-200 border border-white/10 transition"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT: Quick User Card / Address */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Saved Address
              </h2>
              <div className="flex items-start gap-3 text-xs">
                <MapPin className="h-5 w-5 text-[#fc8019] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground">Home Delivery Address</p>
                  <p className="text-muted-foreground mt-0.5">Vishrambag, Sangli, Maharashtra - 416416</p>
                  <span className="mt-2 inline-block text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Default Delivery Address
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Quick Shortcuts
              </h2>
              <div className="space-y-2 text-xs font-bold">
                <Link
                  to="/restaurants"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-accent transition"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-[#fc8019]" /> Browse Restaurants
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>

                <Link
                  to="/cart"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-accent transition"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-[#fc8019]" /> View Cart
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: Order History & Invoices (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Past Orders & Invoices</h2>
                <p className="text-xs text-muted-foreground">
                  View full order details and generate downloadable tax invoices.
                </p>
              </div>
              <span className="rounded-full bg-[#fc8019]/10 px-3 py-1 text-xs font-extrabold text-[#fc8019]">
                {orders.length} {orders.length === 1 ? "Order" : "Orders"}
              </span>
            </div>

            {fetchingOrders ? (
              <div className="flex py-12 justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#fc8019] border-t-transparent" />
              </div>
            ) : orders.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-bold text-foreground">No orders placed yet</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Once you place an order, it will appear here along with its downloadable GST tax invoice.
                </p>
                <Link
                  to="/restaurants"
                  className="mt-6 inline-block rounded-full bg-[#fc8019] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#e67012] transition"
                >
                  Order Now
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const formattedDate = order.createdAt
                    ? new Date(order.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "Recently";

                  return (
                    <div
                      key={order.id}
                      className="rounded-2xl border border-border bg-card p-5 shadow-2xs transition hover:shadow-md"
                    >
                      {/* Top Order Metadata */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border">
                        <div>
                          <h3 className="font-extrabold text-base text-foreground leading-snug">
                            {order.restaurantName}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                            <span className="font-mono font-semibold">ID: {order.id}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> {formattedDate}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                          </span>
                        </div>
                      </div>

                      {/* Item Summary */}
                      <div className="py-3 space-y-1.5">
                        {order.items.map((item, idx) => {
                          const isNonVeg =
                            item.name.toLowerCase().includes("chicken") ||
                            item.name.toLowerCase().includes("mutton") ||
                            item.name.toLowerCase().includes("egg");

                          return (
                            <div key={item.id || idx} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <VegNonVegLogo isVeg={!isNonVeg} />
                                <span className="font-medium text-foreground">
                                  {item.quantity} x {item.name}
                                </span>
                              </div>
                              <span className="font-mono text-muted-foreground">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Footer Actions & Buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border mt-1">
                        <div>
                          <span className="text-[11px] text-muted-foreground block">Total Amount Paid</span>
                          <span className="text-base font-extrabold text-[#fc8019] font-mono">
                            ₹{order.total.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            to="/order-success"
                            search={{ orderId: order.id, total: order.total }}
                            className="flex items-center gap-1.5 rounded-xl bg-[#fc8019] px-3.5 py-2 text-xs font-bold text-white shadow-2xs hover:bg-[#e67012] transition"
                          >
                            <Bike className="h-4 w-4" />
                            <span>Track Live Order</span>
                          </Link>

                          <button
                            onClick={() => setSelectedInvoiceOrder(order)}
                            className="flex items-center gap-1.5 rounded-xl border border-emerald-600 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-800 shadow-2xs hover:bg-emerald-600 hover:text-white transition"
                          >
                            <FileText className="h-4 w-4" />
                            <span>View Invoice</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invoice Modal Component */}
      <InvoiceModal
        isOpen={Boolean(selectedInvoiceOrder)}
        onClose={() => setSelectedInvoiceOrder(null)}
        order={selectedInvoiceOrder}
      />
    </div>
  );
}
