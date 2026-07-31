import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  CreditCard,
  Lock,
  MapPin,
  Loader2,
  CheckCircle2,
  UserCheck,
  Building,
  HelpCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRestaurantAuth } from "@/context/RestaurantAuthContext";
import { createOrder } from "@/lib/firebase";
import { VegNonVegLogo } from "@/components/VegNonVegLogo";
import { restaurants as defaultRestaurants } from "@/data/restaurants";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout — FoodHub" },
      { name: "description", content: "Complete your FoodHub order with Swiggy-style secure checkout." },
    ],
  }),
  component: CheckoutPage,
});

function formatCard(v: string) {
  return v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function CheckoutPage() {
  const { items, subtotal, updateQuantity, clear } = useCart();
  const { user } = useAuth();
  const { restaurantsList } = useRestaurantAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Sangli");
  const [zipCode, setZipCode] = useState("416416");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [noContactDelivery, setNoContactDelivery] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod" | "upi">("cod");
  const [processing, setProcessing] = useState(false);

  // Restaurant details for bill summary header
  const firstItem = items[0];
  const allRestaurants = restaurantsList || defaultRestaurants;
  const restaurantInfo = allRestaurants.find((r) => r.id === firstItem?.restaurantId) || {
    name: firstItem?.restaurantName || "FoodHub Restaurant",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80",
    location: "Vishrambag, Sangli",
    deliveryFee: 35,
  };

  const deliveryFee = items.length ? (restaurantInfo.deliveryFee || 35) : 0;
  const tax = subtotal * 0.05; // 5% GST
  const total = subtotal + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">Add items from restaurants to proceed with checkout.</p>
        <Link to="/restaurants" className="mt-6 inline-block rounded-full bg-[#fc8019] px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#e67012]">
          Browse Restaurants
        </Link>
      </div>
    );
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Order placement requires login! Please log in or sign up to complete your order.");
      navigate({ to: "/login" });
      return;
    }

    setProcessing(true);

    const orderData = {
      userId: user.uid,
      userEmail: user.email,
      userName: name || user.name || "Foodie User",
      restaurantName: restaurantInfo.name,
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      subtotal: Number(subtotal.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      deliveryFee: Number(deliveryFee.toFixed(2)),
      total: Number(total.toFixed(2)),
      deliveryAddress: {
        address: address || "Vishrambag, Sangli",
        city: city || "Sangli",
        zipCode: zipCode || "416416",
      },
      paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "upi" ? "UPI Payment" : `Card ending in ${card.slice(-4) || "4242"}`,
      suggestions,
      noContactDelivery,
    };

    // Save to Firestore
    const createdId = await createOrder(orderData);
    const orderId = createdId || "FH-" + Math.random().toString(36).slice(2, 8).toUpperCase();

    // Persist full order details in localStorage for Profile & Invoice rendering
    const fullOrderObj = {
      ...orderData,
      id: orderId,
      createdAt: new Date().toISOString(),
      status: "completed",
    };

    try {
      const existing = localStorage.getItem("foodhub_user_orders");
      const ordersList = existing ? JSON.parse(existing) : [];
      localStorage.setItem("foodhub_user_orders", JSON.stringify([fullOrderObj, ...ordersList]));
      localStorage.setItem(`foodhub_order_${orderId}`, JSON.stringify(fullOrderObj));
    } catch (err) {
      console.warn("Failed to persist order locally:", err);
    }

    clear();
    setProcessing(false);
    navigate({ to: "/order-success", search: { orderId, total: Number(total.toFixed(2)) } });
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      {/* Top Secure Checkout Bar */}
      <div className="border-b border-border bg-white py-4 px-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fc8019] text-white shadow-sm font-black text-xl">
                F
              </div>
            </Link>
            <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-foreground/80">
              SECURE CHECKOUT
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold">
            <span className="hidden sm:flex items-center gap-1 text-muted-foreground">
              <HelpCircle className="h-4 w-4" /> Help
            </span>
            {user ? (
              <span className="flex items-center gap-1.5 font-bold text-foreground">
                <UserCheck className="h-4 w-4 text-emerald-600" /> {user.name}
              </span>
            ) : (
              <Link to="/login" className="text-[#fc8019] hover:underline">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* LEFT SIDE: Progressive Swiggy Checkout Steps (8 Cols) */}
          <div className="space-y-6 lg:col-span-7">
            {/* STEP 1: ACCOUNT (Logged In vs Guest Condition) */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs">
              <div className="flex items-start gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-white shadow-xs ${user ? "bg-emerald-600" : "bg-black"}`}>
                  {user ? <CheckCircle2 className="h-5 w-5" /> : <Building className="h-5 w-5" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-foreground">Account</h2>
                    {user && (
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Logged In ✓
                      </span>
                    )}
                  </div>

                  {/* CRITICAL CONDITION: Show user email if logged in; Show Login/Signup buttons ONLY if guest */}
                  {user ? (
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p className="font-semibold text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        To place your order now, log in to your existing account or sign up.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Link
                          to="/login"
                          className="rounded-lg border-2 border-[#fc8019] px-6 py-2 text-xs font-bold uppercase text-[#fc8019] transition hover:bg-[#fc8019] hover:text-white"
                        >
                          Have an account? LOG IN
                        </Link>
                        <Link
                          to="/signup"
                          className="rounded-lg bg-emerald-600 px-6 py-2 text-xs font-bold uppercase text-white shadow-xs transition hover:bg-emerald-700"
                        >
                          New to FoodHub? SIGN UP
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* STEP 2: DELIVERY ADDRESS */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black font-bold text-white shadow-xs">
                  <MapPin className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <h2 className="text-lg font-bold text-foreground">Delivery address</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Where should we deliver your order?</p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <label className="block sm:col-span-2">
                      <span className="text-xs font-bold text-foreground uppercase tracking-wider">Street Address *</span>
                      <input
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. Flat 302, Rajwada Residency, Vishrambag"
                        className="mt-1 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-bold text-foreground uppercase tracking-wider">City</span>
                      <input
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-bold text-foreground uppercase tracking-wider">Pincode</span>
                      <input
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: PAYMENT */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black font-bold text-white shadow-xs">
                  <CreditCard className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <h2 className="text-lg font-bold text-foreground">Payment</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Select payment method to complete order</p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`flex-1 min-w-[120px] rounded-xl border p-3 text-xs font-bold text-center transition ${
                        paymentMethod === "cod" ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-border bg-background"
                      }`}
                    >
                      Cash on Delivery (COD)
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`flex-1 min-w-[120px] rounded-xl border p-3 text-xs font-bold text-center transition ${
                        paymentMethod === "upi" ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-border bg-background"
                      }`}
                    >
                      UPI / GPay / PhonePe
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`flex-1 min-w-[120px] rounded-xl border p-3 text-xs font-bold text-center transition ${
                        paymentMethod === "card" ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-border bg-background"
                      }`}
                    >
                      Credit / Debit Card
                    </button>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="mt-4 space-y-3 pt-3 border-t border-border">
                      <label className="block">
                        <span className="text-xs font-bold uppercase tracking-wider">Cardholder Name</span>
                        <input
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                        />
                      </label>

                      <label className="block">
                        <span className="text-xs font-bold uppercase tracking-wider">Card Number</span>
                        <input
                          required
                          value={card}
                          onChange={(e) => setCard(formatCard(e.target.value))}
                          placeholder="4242 4242 4242 4242"
                          className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                        />
                      </label>

                      <div className="grid grid-cols-2 gap-3">
                        <label className="block">
                          <span className="text-xs font-bold uppercase tracking-wider">Expiry</span>
                          <input
                            required
                            value={expiry}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                              setExpiry(v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v);
                            }}
                            placeholder="MM/YY"
                            className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                          />
                        </label>

                        <label className="block">
                          <span className="text-xs font-bold uppercase tracking-wider">CVV</span>
                          <input
                            required
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            placeholder="123"
                            className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fc8019]"
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  <p className="mt-4 flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Lock className="h-3 w-3 text-emerald-600" /> Secure 256-bit SSL Encrypted Payment
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Swiggy Bill Details & Cart Summary (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sticky top-24">
              {/* Restaurant Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <img
                  src={restaurantInfo.image}
                  alt={restaurantInfo.name}
                  className="h-12 w-12 rounded-xl object-cover border border-border flex-none"
                />
                <div>
                  <h3 className="font-bold text-sm text-foreground leading-snug">{restaurantInfo.name}</h3>
                  <p className="text-xs text-muted-foreground">{restaurantInfo.location}</p>
                </div>
              </div>

              {/* Items List with Quantity Controller */}
              <div className="mt-4 space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map((i) => {
                  const isNonVeg =
                    i.name.toLowerCase().includes("chicken") ||
                    i.name.toLowerCase().includes("mutton") ||
                    i.name.toLowerCase().includes("egg");

                  return (
                    <div key={i.id} className="flex items-center justify-between text-xs py-1">
                      <div className="flex items-center gap-2 min-w-0 flex-1 pr-2">
                        <VegNonVegLogo isVeg={!isNonVeg} />
                        <span className="truncate font-semibold text-foreground">{i.name}</span>
                      </div>

                      {/* Swiggy Quantity Controller */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center gap-2 rounded-lg border border-emerald-600 bg-white px-2 py-0.5 font-bold text-emerald-700">
                          <button
                            type="button"
                            onClick={() => updateQuantity(i.id, i.quantity - 1)}
                            className="hover:text-emerald-900 px-0.5"
                          >
                            -
                          </button>
                          <span>{i.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(i.id, i.quantity + 1)}
                            className="hover:text-emerald-900 px-0.5"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-extrabold text-foreground w-12 text-right">
                          ₹{i.price * i.quantity}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Suggestions Box */}
              <div className="mt-4 pt-3 border-t border-border">
                <input
                  type="text"
                  placeholder="“Any suggestions? We will pass it on...”"
                  value={suggestions}
                  onChange={(e) => setSuggestions(e.target.value)}
                  className="w-full rounded-xl border border-input bg-muted/30 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#fc8019]"
                />
              </div>

              {/* No-contact Delivery Checkbox */}
              <div className="mt-3 rounded-xl border border-border p-3 bg-muted/10">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={noContactDelivery}
                    onChange={(e) => setNoContactDelivery(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <span className="font-bold text-foreground">Opt in for No-contact Delivery</span>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                      Unwell, or avoiding contact? Please select no-contact delivery. Partner will safely place the order outside your door.
                    </p>
                  </div>
                </label>
              </div>

              {/* Bill Details Breakdown (Swiggy format) */}
              <div className="mt-4 pt-4 border-t border-border">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Bill Details
                </h4>

                <dl className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Item Total</dt>
                    <dd className="font-semibold text-foreground">₹{subtotal.toFixed(0)}</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Delivery Fee | 3.5 kms</dt>
                    <dd className="font-semibold text-foreground">₹{deliveryFee}</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">GST & Other Charges</dt>
                    <dd className="font-semibold text-foreground">₹{tax.toFixed(2)}</dd>
                  </div>

                  <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-extrabold text-foreground">
                    <dt>TO PAY</dt>
                    <dd className="text-lg text-foreground">₹{total.toFixed(0)}</dd>
                  </div>
                </dl>
              </div>

              {/* Pay Button / Authentication Notice */}
              {!user && (
                <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 flex items-start gap-2">
                  <span className="font-bold shrink-0">⚠️</span>
                  <p>
                    <span className="font-bold">Login required:</span> You must be logged in to place an order. Click below to sign in or create an account.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={processing}
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-extrabold text-white shadow-md transition disabled:opacity-60 ${
                  user ? "bg-emerald-600 hover:bg-emerald-700" : "bg-[#fc8019] hover:bg-[#e67012]"
                }`}
              >
                {processing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : user ? (
                  `PROCEED TO PAY ₹${total.toFixed(0)}`
                ) : (
                  `LOG IN TO PLACE ORDER ₹${total.toFixed(0)}`
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}