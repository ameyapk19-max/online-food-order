import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — FoodHub" },
      { name: "description", content: "Review the items in your FoodHub cart before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const navigate = useNavigate();
  const deliveryFee = items.length ? 35 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add some delicious items from our restaurants to get started.</p>
        <Link
          to="/restaurants"
          className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Browse restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Your cart</h1>
      <p className="mt-1 text-sm text-muted-foreground">From {items[0].restaurantName}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-3">
              <img src={item.image} alt={item.name} className="h-20 w-20 flex-none rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="truncate font-semibold">{item.name}</h3>
                  <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)} each</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="inline-flex items-center rounded-full border border-border">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center hover:bg-accent"
                      aria-label="Decrease"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center hover:bg-accent"
                      aria-label="Increase"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>₹{subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd>₹{deliveryFee.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tax</dt>
              <dd>₹{tax.toFixed(2)}</dd>
            </div>
            <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-bold">
              <dt>Total</dt>
              <dd>₹{total.toFixed(2)}</dd>
            </div>
          </dl>
          <button
            onClick={() => navigate({ to: "/checkout" })}
            className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Proceed to checkout
          </button>
        </aside>
      </div>
    </div>
  );
}