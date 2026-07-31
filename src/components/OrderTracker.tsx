import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  Bike,
  Flame,
  ShoppingBag,
  Navigation,
  ChevronRight,
  ShieldCheck,
  X,
} from "lucide-react";

interface OrderTrackerProps {
  orderId: string;
  restaurantName?: string;
  total?: number;
  deliveryAddress?: string;
  onClose?: () => void;
}

const STAGES = [
  {
    title: "Order Placed & Confirmed",
    desc: "Restaurant has received your order.",
    time: "0–2 mins",
    icon: CheckCircle2,
    color: "text-emerald-600",
  },
  {
    title: "Preparing in Kitchen",
    desc: "Chef is freshly cooking your meal.",
    time: "10–15 mins",
    icon: Flame,
    color: "text-[#fc8019]",
  },
  {
    title: "On the Way",
    desc: "Rahul picked up your order & is riding over.",
    time: "10–12 mins",
    icon: Bike,
    color: "text-blue-600",
  },
  {
    title: "Arrived & Delivered",
    desc: "Order delivered safely to your doorstep.",
    time: "Delivered",
    icon: ShoppingBag,
    color: "text-emerald-700",
  },
];

export function OrderTracker({
  orderId,
  restaurantName = "FoodHub Partner Restaurant",
  total = 0,
  deliveryAddress = "Vishrambag, Sangli",
  onClose,
}: OrderTrackerProps) {
  const [currentStage, setCurrentStage] = useState(1); // Start at preparing stage
  const [minutesLeft, setMinutesLeft] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [callAlert, setCallAlert] = useState<string | null>(null);

  // Auto-advance stage every 12 seconds for live dummy simulation
  useEffect(() => {
    const stageTimer = setInterval(() => {
      setCurrentStage((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 12000);

    return () => clearInterval(stageTimer);
  }, []);

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prevSec) => {
        if (prevSec > 0) return prevSec - 1;
        setMinutesLeft((prevMin) => (prevMin > 0 ? prevMin - 1 : 0));
        return 59;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const progressPercent = ((currentStage + 1) / STAGES.length) * 100;

  const handleCallRider = () => {
    setCallAlert("Dialing Rahul Sharma (+91 98765 43210)...");
    setTimeout(() => setCallAlert(null), 4000);
  };

  return (
    <div className="w-full rounded-3xl border border-border bg-card shadow-lg overflow-hidden my-4">
      {/* Top Banner / Estimated Time */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#171e2e] text-white p-6 relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-1.5 text-white/70 hover:bg-white/20 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#fc8019] tracking-wider uppercase">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fc8019] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#fc8019]"></span>
              </span>
              LIVE ORDER TRACKING
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight">
              {currentStage === 3 ? "Order Delivered!" : "Arriving in 20–25 mins"}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Order ID: <span className="font-mono text-white">{orderId}</span> • {restaurantName}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/10 shrink-0">
            <Clock className="h-6 w-6 text-[#fc8019] animate-bounce" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Estimated Delivery</p>
              <p className="text-xl font-mono font-extrabold text-white">
                {currentStage === 3
                  ? "00:00"
                  : `${String(minutesLeft).padStart(2, "0")}:${String(secondsLeft).padStart(2, "0")}`}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar Line */}
        <div className="mt-6 w-full bg-white/15 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#fc8019] to-emerald-500 h-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Tracker Body */}
      <div className="p-6 space-y-6">
        {/* Stages Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isDone = idx <= currentStage;
            const isCurrent = idx === currentStage;

            return (
              <div
                key={stage.title}
                className={`rounded-2xl p-4 border transition-all ${
                  isCurrent
                    ? "border-[#fc8019] bg-[#fc8019]/5 ring-2 ring-[#fc8019]/20 shadow-xs"
                    : isDone
                    ? "border-emerald-200 bg-emerald-50/50"
                    : "border-border bg-muted/20 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold ${
                      isDone
                        ? isCurrent
                          ? "bg-[#fc8019] text-white animate-pulse"
                          : "bg-emerald-600 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  {isCurrent && (
                    <span className="rounded-full bg-[#fc8019] px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                      Active
                    </span>
                  )}
                </div>

                <h4 className="mt-3 text-xs font-extrabold text-foreground leading-snug">
                  {stage.title}
                </h4>
                <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Dummy Call Alert Notification */}
        {callAlert && (
          <div className="rounded-xl bg-emerald-600 text-white p-3 text-xs font-bold flex items-center justify-between shadow-md animate-pulse">
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> {callAlert}
            </span>
            <button onClick={() => setCallAlert(null)} className="text-white/80 hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* Interactive Simulated Map & Delivery Rider Info Grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Simulated Animated Map (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-border bg-slate-950 p-4 relative overflow-hidden min-h-[220px] flex flex-col justify-between text-white">
            {/* Map Grid Pattern background */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

            {/* Map Top overlay header */}
            <div className="relative z-10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 rounded-full bg-slate-900/90 px-3 py-1.5 border border-slate-700">
                <Navigation className="h-3.5 w-3.5 text-[#fc8019] animate-spin" />
                <span className="font-bold">Live GPS Signal Active</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Distance: 2.8 km</span>
            </div>

            {/* Route Simulation Visual */}
            <div className="relative z-10 my-6 px-4">
              <div className="flex items-center justify-between relative">
                {/* Connecting route line */}
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#fc8019]/60" />

                {/* Restaurant Marker */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fc8019] text-white shadow-lg ring-4 ring-[#fc8019]/30">
                    <Flame className="h-6 w-6" />
                  </div>
                  <span className="mt-1.5 text-[10px] font-bold text-slate-300 max-w-[90px] truncate text-center">
                    {restaurantName}
                  </span>
                </div>

                {/* Moving Rider Icon */}
                <div
                  className="relative z-20 flex flex-col items-center transition-all duration-1000 ease-in-out"
                  style={{
                    transform: `translateX(${(currentStage / 3) * 60 - 30}px)`,
                  }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl ring-4 ring-emerald-500/40 animate-pulse">
                    <Bike className="h-5 w-5" />
                  </div>
                  <span className="mt-1 text-[9px] font-extrabold text-emerald-400 bg-slate-900/80 px-2 py-0.5 rounded-full border border-emerald-500/40">
                    Rahul (Scooter)
                  </span>
                </div>

                {/* Customer Destination Marker */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg ring-4 ring-blue-600/30">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <span className="mt-1.5 text-[10px] font-bold text-slate-300 max-w-[90px] truncate text-center">
                    Your Address
                  </span>
                </div>
              </div>
            </div>

            {/* Address Footer */}
            <div className="relative z-10 flex items-center justify-between text-xs pt-3 border-t border-slate-800 text-slate-300">
              <span className="truncate">Delivering to: <strong className="text-white">{deliveryAddress}</strong></span>
              <span className="text-emerald-400 font-bold shrink-0">On Time Guaranteed</span>
            </div>
          </div>

          {/* Delivery Partner Card (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-5 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Delivery Executive
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="h-3 w-3" /> Vaccine Verified
                </span>
              </div>

              {/* Rider Profile Info */}
              <div className="mt-4 flex items-center gap-4">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                    alt="Delivery Executive Rahul"
                    className="h-14 w-14 rounded-2xl object-cover border-2 border-[#fc8019] shadow-sm"
                  />
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white text-[10px]">
                    ✓
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-foreground leading-snug">
                    Rahul Sharma
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                    <span className="font-bold text-amber-500">★ 4.9</span>
                    <span>•</span>
                    <span>1,240+ deliveries</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-mono mt-1">
                    TVS iQube • MH-10-EV-4821
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons: Call & Message */}
            <div className="mt-5 pt-4 border-t border-border grid grid-cols-2 gap-3">
              <button
                onClick={handleCallRider}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-extrabold text-white shadow-xs hover:bg-emerald-700 transition"
              >
                <Phone className="h-4 w-4" />
                <span>Call Rahul</span>
              </button>

              <button
                onClick={() => setCallAlert("Opening chat with Rahul Sharma...")}
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background py-2.5 text-xs font-extrabold text-foreground hover:bg-accent transition"
              >
                <MessageSquare className="h-4 w-4 text-[#fc8019]" />
                <span>Send Note</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
