import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Store,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  MapPin,
  TrendingUp,
  Package,
  Edit2,
  Save,
  ShoppingBag,
  ExternalLink,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useRestaurantAuth } from "@/context/RestaurantAuthContext";

export const Route = createFileRoute("/restaurant-dashboard")({
  head: () => ({
    meta: [
      { title: "Partner Dashboard — FoodHub" },
      { name: "description", content: "Manage your restaurant menu items, dish prices, and live orders." },
    ],
  }),
  component: RestaurantDashboardPage,
});

function RestaurantDashboardPage() {
  const {
    currentRestaurant,
    logoutRestaurant,
    updateRestaurantDetails,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
  } = useRestaurantAuth();

  const navigate = useNavigate();

  // Tab State
  const [activeTab, setActiveTab] = useState<"menu" | "orders" | "settings">("menu");

  // New Item Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Dosa");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemImage, setNewItemImage] = useState("");

  // Editing Restaurant Settings State
  const [editFee, setEditFee] = useState(currentRestaurant?.deliveryFee.toString() || "35");
  const [editTime, setEditTime] = useState(currentRestaurant?.deliveryTime || "20-25 mins");
  const [editDesc, setEditDesc] = useState(currentRestaurant?.description || "");
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Live Orders Mock State
  const [mockOrders, setMockOrders] = useState([
    {
      id: "FH-8921",
      customer: "Rahul Sharma",
      items: ["Special Indori Sev Poha × 2", "Masala Kulhad Chai × 2"],
      total: 150,
      status: "Preparing",
      time: "5 mins ago",
    },
    {
      id: "FH-8918",
      customer: "Priya Patel",
      items: ["Executive Masala Dosa × 1", "Mango Lassi × 1"],
      total: 180,
      status: "Out for Delivery",
      time: "18 mins ago",
    },
    {
      id: "FH-8902",
      customer: "Amit Verma",
      items: ["Paneer Butter Masala × 1", "Butter Naan × 2"],
      total: 300,
      status: "Delivered",
      time: "42 mins ago",
    },
  ]);

  if (!currentRestaurant) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <Store className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-2xl font-bold">No Restaurant Logged In</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Please log in with a restaurant partner account to view the management dashboard.
        </p>
        <button
          onClick={() => navigate({ to: "/restaurant-login" })}
          className="mt-6 rounded-full bg-[#fc8019] px-6 py-2.5 font-bold text-white shadow-md hover:bg-[#e67012]"
        >
          Go to Partner Login
        </button>
      </div>
    );
  }

  const handleAddDishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) return;

    addMenuItem(currentRestaurant.id, {
      name: newItemName,
      price: parseFloat(newItemPrice) || 100,
      category: newItemCategory || "Dosa",
      description: newItemDesc || "Freshly prepared signature dish.",
      image:
        newItemImage ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      inStock: true,
    });

    setNewItemName("");
    setNewItemPrice("");
    setNewItemDesc("");
    setNewItemImage("");
    setShowAddModal(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateRestaurantDetails(currentRestaurant.id, {
      deliveryFee: parseFloat(editFee) || 35,
      deliveryTime: editTime,
      description: editDesc,
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setMockOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white py-8 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="mx-auto max-w-7xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={currentRestaurant.image}
              alt={currentRestaurant.name}
              className="h-16 w-16 rounded-2xl object-cover border-2 border-white/20 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#fc8019] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                  Partner Portal
                </span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5" /> Verified Store
                </span>
              </div>
              <h1 className="text-2xl font-bold sm:text-3xl mt-0.5">{currentRestaurant.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-300 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-[#fc8019]" /> {currentRestaurant.location || "Sangli"}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-[#fc8019]" /> {currentRestaurant.deliveryTime}
                </span>
                <span>•</span>
                <span>Fee: ₹{currentRestaurant.deliveryFee}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/restaurants/$id"
              params={{ id: currentRestaurant.id }}
              className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur hover:bg-white/20 transition"
            >
              <ExternalLink className="h-3.5 w-3.5" /> View Live Menu Page
            </Link>
            <button
              onClick={() => {
                logoutRestaurant();
                navigate({ to: "/restaurant-login" });
              }}
              className="flex items-center gap-1.5 rounded-full bg-red-600/80 px-4 py-2 text-xs font-semibold text-white hover:bg-red-600 transition"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
            <div className="flex items-center justify-between text-muted-foreground text-xs">
              <span>Total Menu Dishes</span>
              <Package className="h-4 w-4 text-[#fc8019]" />
            </div>
            <p className="mt-2 text-2xl font-extrabold text-foreground">{currentRestaurant.menu.length}</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
            <div className="flex items-center justify-between text-muted-foreground text-xs">
              <span>Active Orders</span>
              <ShoppingBag className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="mt-2 text-2xl font-extrabold text-foreground">{mockOrders.length}</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
            <div className="flex items-center justify-between text-muted-foreground text-xs">
              <span>Store Rating</span>
              <Sparkles className="h-4 w-4 text-amber-500" />
            </div>
            <p className="mt-2 text-2xl font-extrabold text-foreground">★ {currentRestaurant.rating}</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
            <div className="flex items-center justify-between text-muted-foreground text-xs">
              <span>Today's Revenue</span>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <p className="mt-2 text-2xl font-extrabold text-foreground">₹2,840</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 flex border-b border-border gap-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab("menu")}
            className={`pb-3 border-b-2 transition ${
              activeTab === "menu"
                ? "border-[#fc8019] text-[#fc8019]"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Menu & Dishes ({currentRestaurant.menu.length})
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 border-b-2 transition ${
              activeTab === "orders"
                ? "border-[#fc8019] text-[#fc8019]"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Live Orders ({mockOrders.length})
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-3 border-b-2 transition ${
              activeTab === "settings"
                ? "border-[#fc8019] text-[#fc8019]"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Store Settings
          </button>
        </div>

        {/* TAB 1: MENU MANAGEMENT */}
        {activeTab === "menu" && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-foreground">Manage Menu Dishes & Prices</h2>
                <p className="text-xs text-muted-foreground">
                  Update dish prices, toggle availability in real-time, or add new items.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1.5 rounded-full bg-[#fc8019] px-4 py-2 text-xs font-bold text-white shadow-md transition hover:bg-[#e67012]"
              >
                <Plus className="h-4 w-4" /> Add New Dish
              </button>
            </div>

            {/* Menu Dish Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {currentRestaurant.menu.map((dish) => (
                <div
                  key={dish.id}
                  className={`rounded-2xl border bg-card p-4 shadow-2xs transition flex flex-col justify-between ${
                    dish.inStock === false ? "opacity-60 border-dashed" : "border-border"
                  }`}
                >
                  <div className="flex gap-3">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="h-20 w-20 rounded-xl object-cover flex-none bg-muted"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="truncate font-bold text-sm text-foreground">{dish.name}</h3>
                      </div>
                      <span className="inline-block mt-0.5 rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground">
                        {dish.category}
                      </span>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {dish.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-muted-foreground">₹</span>
                      <input
                        type="number"
                        value={dish.price}
                        onChange={(e) =>
                          updateMenuItem(currentRestaurant.id, dish.id, {
                            price: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-20 rounded-lg border border-input px-2 py-1 text-sm font-extrabold text-[#fc8019] focus:outline-none focus:ring-1 focus:ring-[#fc8019]"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateMenuItem(currentRestaurant.id, dish.id, {
                            inStock: dish.inStock === false ? true : false,
                          })
                        }
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
                          dish.inStock === false
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                            : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                        }`}
                      >
                        {dish.inStock === false ? "Out of Stock" : "In Stock"}
                      </button>

                      <button
                        onClick={() => deleteMenuItem(currentRestaurant.id, dish.id)}
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600 transition"
                        title="Delete Item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LIVE ORDERS */}
        {activeTab === "orders" && (
          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-bold text-foreground">Live Incoming Orders</h2>
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-border bg-card p-5 shadow-2xs flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm text-[#fc8019]">{order.id}</span>
                    <span className="text-sm font-semibold text-foreground">{order.customer}</span>
                    <span className="text-xs text-muted-foreground">• {order.time}</span>
                  </div>
                  <ul className="mt-2 text-xs text-muted-foreground space-y-0.5">
                    {order.items.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs font-bold text-foreground">Total: ₹{order.total}</p>
                </div>

                <div className="flex items-center gap-2">
                  {["Preparing", "Out for Delivery", "Delivered"].map((st) => (
                    <button
                      key={st}
                      onClick={() => updateOrderStatus(order.id, st)}
                      className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                        order.status === st
                          ? "bg-[#fc8019] text-white shadow-xs"
                          : "bg-secondary text-secondary-foreground hover:bg-muted"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: STORE SETTINGS */}
        {activeTab === "settings" && (
          <div className="mt-6 max-w-xl rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-bold text-foreground mb-4">Edit Restaurant Profile</h2>
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                  Delivery Fee (₹)
                </label>
                <input
                  type="number"
                  value={editFee}
                  onChange={(e) => setEditFee(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                  Estimated Delivery Time
                </label>
                <input
                  type="text"
                  value={editTime}
                  onChange={(e) => setEditTime(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                  Store Description
                </label>
                <textarea
                  rows={3}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                />
              </div>

              {settingsSaved && (
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" /> Settings updated successfully!
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-[#fc8019] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#e67012]"
              >
                Save Restaurant Settings
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ADD DISH MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-3xl bg-card p-6 shadow-2xl border border-border">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">Add New Dish</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-muted-foreground hover:text-foreground font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddDishSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                  Dish Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Special Butter Paneer Dosa"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full rounded-xl border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="120"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    className="w-full rounded-xl border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="w-full rounded-xl border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                  >
                    <option value="Dosa">Dosa</option>
                    <option value="South Indian">South Indian</option>
                    <option value="North Indian">North Indian</option>
                    <option value="Poha">Poha</option>
                    <option value="Upma">Upma</option>
                    <option value="Idli">Idli</option>
                    <option value="Khichdi">Khichdi</option>
                    <option value="Poori">Poori</option>
                    <option value="Biryani">Biryani</option>
                    <option value="Burger">Burger</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Crispy fried with pure ghee and secret spices..."
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="w-full rounded-xl border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newItemImage}
                  onChange={(e) => setNewItemImage(e.target.value)}
                  className="w-full rounded-xl border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-full px-4 py-2 text-xs font-semibold hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#fc8019] px-5 py-2 text-xs font-bold text-white hover:bg-[#e67012]"
                >
                  Add Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
