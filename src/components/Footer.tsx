import { Link } from "@tanstack/react-router";
import { Store, ShieldCheck, PhoneCall, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#02060c] text-white">
      {/* Top Banner: App Download CTA */}
      <div className="border-b border-zinc-800 bg-zinc-900/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              For better experience, download the FoodHub app now
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Order food online from local restaurants in Sangli with live GPS tracking.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Play Store Badge */}
            <div className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-black/60 px-4 py-2 text-white hover:border-[#fc8019] transition cursor-pointer">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path d="M3 20.5v-17c0-.55.45-1 1-1h.24l9.53 9.53L4.24 21.5H4c-.55 0-1-.45-1-1zm1.41-16L13 13.09l-2.47-2.47L4.41 4.5zM14.5 14.59L17.59 17.68 15.5 19.77l-4.59-4.59 3.59-3.59zM19.18 12l-2.27 2.27 2.27 2.27 1.41-1.41L19.18 12z" />
              </svg>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-zinc-400">GET IT ON</p>
                <p className="text-xs font-bold text-white">Google Play</p>
              </div>
            </div>

            {/* App Store Badge */}
            <div className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-black/60 px-4 py-2 text-white hover:border-[#fc8019] transition cursor-pointer">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.43c.64-.78 1.08-1.85.96-2.93-.93.04-2.06.62-2.73 1.4-.59.69-1.11 1.79-.97 2.85 1.05.08 2.1-.54 2.74-1.32z" />
              </svg>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-zinc-400">Download on the</p>
                <p className="text-xs font-bold text-white">App Store</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Column 1: Brand & Partner Links */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fc8019] text-white shadow-md font-black text-xl">
                F
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Food<span className="text-[#fc8019]">Hub</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Order food from the best local restaurants in Sangli & Miraj with lightning-fast delivery.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
                <ShieldCheck className="h-3.5 w-3.5" /> 100% Safe & Hygienic
              </span>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#" className="hover:text-[#fc8019] transition">About Us</a></li>
              <li><a href="#" className="hover:text-[#fc8019] transition">FoodHub Corporate</a></li>
              <li><a href="#" className="hover:text-[#fc8019] transition">Careers</a></li>
              <li><a href="#" className="hover:text-[#fc8019] transition">Team</a></li>
              <li><a href="#" className="hover:text-[#fc8019] transition">FoodHub One</a></li>
              <li><a href="#" className="hover:text-[#fc8019] transition">FoodHub Instamart</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Us & Partner Portal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact & Partner</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#" className="hover:text-[#fc8019] transition">Help & Support</a></li>
              <li>
                <Link to="/restaurant-login" className="text-[#fc8019] font-bold hover:underline flex items-center gap-1">
                  <Store className="h-3.5 w-3.5" /> Partner with Us
                </Link>
              </li>
              <li>
                <Link to="/restaurant-dashboard" className="text-zinc-300 font-semibold hover:text-[#fc8019] transition">
                  Restaurant Dashboard
                </Link>
              </li>
              <li><a href="#" className="hover:text-[#fc8019] transition">Ride with Us</a></li>
            </ul>
          </div>

          {/* Column 4: We deliver to */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">We deliver to</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><span className="text-zinc-200 font-semibold">Sangli</span></li>
              <li><span className="text-zinc-200 font-semibold">Miraj</span></li>
              <li><span className="text-zinc-200 font-semibold">Vishrambag</span></li>
              <li><a href="#" className="hover:text-[#fc8019] transition">Pune</a></li>
              <li><a href="#" className="hover:text-[#fc8019] transition">Mumbai</a></li>
              <li><a href="#" className="hover:text-[#fc8019] transition">Bangalore</a></li>
            </ul>
          </div>

          {/* Column 5: Legal & Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#" className="hover:text-[#fc8019] transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-[#fc8019] transition">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-[#fc8019] transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#fc8019] transition">Investor Relations</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Line & Copyright */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} FoodHub Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-[#fc8019]" /> Sangli, Maharashtra</span>
            <span>•</span>
            <span className="flex items-center gap-1"><PhoneCall className="h-3.5 w-3.5 text-[#fc8019]" /> 1800-FOOD-HUB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
