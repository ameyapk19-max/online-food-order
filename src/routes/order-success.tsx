import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, FileText, User, Bike } from "lucide-react";
import { useState, useEffect } from "react";
import { z } from "zod";
import { InvoiceModal, type InvoiceOrder } from "@/components/InvoiceModal";
import { OrderTracker } from "@/components/OrderTracker";

const searchSchema = z.object({
  orderId: z.string().optional(),
  total: z.number().optional(),
});

export const Route = createFileRoute("/order-success")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Live Order Tracking — FoodHub" },
      { name: "description", content: "Track your FoodHub order status live." },
    ],
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { orderId, total } = Route.useSearch();
  const [showInvoice, setShowInvoice] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<InvoiceOrder | null>(null);

  useEffect(() => {
    if (orderId) {
      try {
        const raw = localStorage.getItem(`foodhub_order_${orderId}`);
        if (raw) {
          setCurrentOrder(JSON.parse(raw));
        } else {
          const listRaw = localStorage.getItem("foodhub_user_orders");
          if (listRaw) {
            const list = JSON.parse(listRaw);
            const found = list.find((o: InvoiceOrder) => o.id === orderId);
            if (found) setCurrentOrder(found);
          }
        }
      } catch (err) {
        console.warn("Could not retrieve order details:", err);
      }
    }
  }, [orderId]);

  const activeOrderId = orderId || "FH-DEMO123";
  const restaurantName = currentOrder?.restaurantName || "FoodHub Restaurant";
  const deliveryAddress = currentOrder?.deliveryAddress
    ? `${currentOrder.deliveryAddress.address}, ${currentOrder.deliveryAddress.city}`
    : "Vishrambag, Sangli";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Success Confirmation Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-emerald-50 border border-emerald-200 rounded-3xl p-6 text-emerald-900 gap-4 mb-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold">Order Placed Successfully!</h1>
            <p className="text-xs sm:text-sm text-emerald-700 mt-0.5">
              Thank you for ordering with FoodHub. Live tracking active below.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {currentOrder && (
            <button
              onClick={() => setShowInvoice(true)}
              className="flex items-center gap-1.5 rounded-xl bg-white border border-emerald-300 px-4 py-2.5 text-xs font-bold text-emerald-800 shadow-2xs hover:bg-emerald-600 hover:text-white transition"
            >
              <FileText className="h-4 w-4" />
              <span>Tax Invoice</span>
            </button>
          )}

          <Link
            to="/profile"
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-2xs hover:bg-emerald-700 transition"
          >
            <User className="h-4 w-4" />
            <span>My Profile</span>
          </Link>
        </div>
      </div>

      {/* Dynamic Live Order Tracker */}
      <OrderTracker
        orderId={activeOrderId}
        restaurantName={restaurantName}
        total={total || currentOrder?.total || 0}
        deliveryAddress={deliveryAddress}
      />

      {/* Navigation Shortcuts */}
      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/"
          className="rounded-full border border-border px-6 py-2.5 text-xs font-bold hover:bg-accent transition"
        >
          Return Home
        </Link>
        <Link
          to="/restaurants"
          className="rounded-full bg-[#fc8019] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#e67012] transition"
        >
          Browse Restaurants
        </Link>
      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        isOpen={showInvoice}
        onClose={() => setShowInvoice(false)}
        order={currentOrder}
      />
    </div>
  );
}