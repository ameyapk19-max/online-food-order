import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Store, ShieldCheck, ArrowRight, Lock, UtensilsCrossed, TrendingUp, CheckCircle } from "lucide-react";
import { useRestaurantAuth } from "@/context/RestaurantAuthContext";

export const Route = createFileRoute("/restaurant-login")({
  head: () => ({
    meta: [
      { title: "Restaurant Partner Login — FoodHub" },
      { name: "description", content: "Log in to your FoodHub restaurant partner portal to manage menus, prices, and orders." },
    ],
  }),
  component: RestaurantLoginPage,
});

function RestaurantLoginPage() {
  const { currentRestaurant, loginRestaurant, registerRestaurant, restaurantsList } = useRestaurantAuth();
  const navigate = useNavigate();

  const [selectedRestId, setSelectedRestId] = useState<string>(restaurantsList[0]?.id || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Registration state
  const [regName, setRegName] = useState("");
  const [regLocation, setRegLocation] = useState("");
  const [regCuisine, setRegCuisine] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  if (currentRestaurant) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-2xl font-bold">Already Logged In as Partner</h1>
        <p className="mt-2 text-muted-foreground">
          You are currently logged in as partner for <strong className="text-foreground">{currentRestaurant.name}</strong>.
        </p>
        <button
          onClick={() => navigate({ to: "/restaurant-dashboard" })}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#fc8019] px-6 py-3 font-semibold text-white transition hover:bg-[#e67012]"
        >
          Go to Partner Dashboard <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your registered partner email address.");
      return;
    }
    if (!password.trim()) {
      setErrorMessage("Please enter your account password.");
      return;
    }

    const targetId = selectedRestId || restaurantsList[0]?.id;
    if (targetId && loginRestaurant(targetId)) {
      navigate({ to: "/restaurant-dashboard" });
    } else {
      setErrorMessage("Invalid credentials or restaurant not found.");
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!regName.trim() || !regLocation.trim() || !regCuisine.trim() || !regEmail.trim() || !regPassword.trim()) {
      setErrorMessage("Please fill out all registration fields.");
      return;
    }

    const newId = registerRestaurant({
      name: regName.trim(),
      location: regLocation.trim(),
      cuisine: regCuisine.trim(),
      categories: regCuisine.split(",").map((c) => c.trim()),
    });

    if (newId) {
      navigate({ to: "/restaurant-dashboard" });
    }
  };

  return (
    <div className="min-h-[85vh] bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fc8019] text-white shadow-lg">
            <Store className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            FoodHub Partner Portal
          </h1>
          <p className="mt-2 text-base text-muted-foreground max-w-lg mx-auto">
            Log in to manage your restaurant profile, update dish prices, edit menus, and fulfill live orders.
          </p>
        </div>

        {/* Auth Box & Information Showcase */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Secure Login / Register Form */}
          <div className="lg:col-span-6 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex border-b border-border mb-6">
              <button
                onClick={() => {
                  setActiveTab("login");
                  setErrorMessage("");
                }}
                className={`flex-1 pb-3 font-semibold text-sm text-center border-b-2 transition ${
                  activeTab === "login"
                    ? "border-[#fc8019] text-[#fc8019]"
                    : "border-transparent text-muted-foreground"
                }`}
              >
                Partner Login
              </button>
              <button
                onClick={() => {
                  setActiveTab("register");
                  setErrorMessage("");
                }}
                className={`flex-1 pb-3 font-semibold text-sm text-center border-b-2 transition ${
                  activeTab === "register"
                    ? "border-[#fc8019] text-[#fc8019]"
                    : "border-transparent text-muted-foreground"
                }`}
              >
                Register Restaurant
              </button>
            </div>

            {errorMessage && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
                {errorMessage}
              </div>
            )}

            {activeTab === "login" ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                    Select Restaurant Account
                  </label>
                  <select
                    value={selectedRestId}
                    onChange={(e) => setSelectedRestId(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                  >
                    {restaurantsList.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.location || "Sangli"})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                    Partner Email
                  </label>
                  <input
                    type="email"
                    placeholder="owner@restaurant.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full rounded-xl bg-[#fc8019] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#e67012] flex items-center justify-center gap-2"
                >
                  <Lock className="h-4 w-4" /> Secure Partner Login
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sangli Special Dhaba"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                    Location / Area
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vishrambag, Sangli"
                    value={regLocation}
                    onChange={(e) => setRegLocation(e.target.value)}
                    required
                    className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                    Cuisine Specialization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. South Indian, Biryani, Fast Food"
                    value={regCuisine}
                    onChange={(e) => setRegCuisine(e.target.value)}
                    required
                    className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                    Partner Email
                  </label>
                  <input
                    type="email"
                    placeholder="owner@myrestaurant.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-input bg-[#background] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                    Create Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full rounded-xl bg-foreground py-3 text-sm font-bold text-background shadow-md transition hover:opacity-90 flex items-center justify-center gap-2"
                >
                  Register & Enter Dashboard
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Partner Portal Security & Feature Highlights */}
          <div className="lg:col-span-6 space-y-6 lg:pl-4">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-xs">
              <h2 className="text-xl font-extrabold text-foreground flex items-center gap-2">
                <Lock className="h-5 w-5 text-[#fc8019]" />
                Secure Restaurant Partner Access
              </h2>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                FoodHub Partner Portal is protected to ensure only authenticated restaurant owners and authorized managers can access order fulfillment and menu management tools.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 mb-3">
                  <UtensilsCrossed className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-foreground">Menu & Stock Control</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Add new dishes, update prices, adjust descriptions, and toggle item availability in real time.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 mb-3">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-foreground">Live Order Tracking</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Receive live incoming customer orders, manage cooking status, and coordinate quick dispatch.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4 sm:col-span-2 shadow-2xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 mb-3">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-foreground">Grow Your Sales in Sangli</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Reach thousands of hungry food lovers across Vishrambag, Sangli Central, and Miraj with FoodHub delivery partner services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
