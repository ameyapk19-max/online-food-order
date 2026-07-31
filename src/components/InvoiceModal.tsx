import { Printer, X, FileText, CheckCircle2 } from "lucide-react";
import { VegNonVegLogo } from "./VegNonVegLogo";

export interface InvoiceOrder {
  id: string;
  createdAt?: string | number | Date;
  userName: string;
  userEmail: string;
  restaurantName: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  deliveryAddress: {
    address: string;
    city: string;
    zipCode: string;
  };
  paymentMethod: string;
  status?: string;
}

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: InvoiceOrder | null;
}

export function InvoiceModal({ isOpen, onClose, order }: InvoiceModalProps) {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

  const cgst = order.tax / 2;
  const sgst = order.tax / 2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white text-slate-900 shadow-2xl overflow-hidden my-8">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4 print:hidden">
          <div className="flex items-center gap-2 font-bold text-slate-800 text-sm sm:text-base">
            <FileText className="h-5 w-5 text-[#fc8019]" />
            <span>Tax Invoice — {order.id}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg bg-[#fc8019] px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#e67012]"
            >
              <Printer className="h-4 w-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div className="p-6 sm:p-8 space-y-6 text-sm" id="printable-invoice">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fc8019] text-white font-black text-lg">
                  F
                </div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900">FoodHub</span>
              </div>
              <p className="mt-1 text-xs text-slate-500 font-medium">
                FoodHub Food Services Pvt. Ltd.
              </p>
              <p className="text-xs text-slate-500">GSTIN: 27AAAAA0000A1Z5</p>
              <p className="text-xs text-slate-500">Vishrambag, Sangli, Maharashtra - 416416</p>
            </div>

            <div className="sm:text-right">
              <span className="inline-block rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                TAX INVOICE
              </span>
              <p className="text-xs font-semibold text-slate-700">Invoice No: <span className="font-mono text-slate-900">{order.id}</span></p>
              <p className="text-xs text-slate-500">Date: {formattedDate}</p>
              <p className="text-xs text-slate-500">Payment: <span className="font-medium text-slate-800">{order.paymentMethod}</span></p>
            </div>
          </div>

          {/* Customer & Restaurant Info */}
          <div className="grid sm:grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs">
            <div>
              <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">Billed To</p>
              <p className="font-bold text-slate-800 text-sm">{order.userName}</p>
              <p className="text-slate-600">{order.userEmail}</p>
              <p className="text-slate-600 mt-1">
                {order.deliveryAddress.address}, {order.deliveryAddress.city} - {order.deliveryAddress.zipCode}
              </p>
            </div>

            <div>
              <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">Fulfilling Restaurant</p>
              <p className="font-bold text-slate-800 text-sm">{order.restaurantName}</p>
              <p className="text-slate-600">Verified Partner Outlet</p>
              <p className="text-slate-600 mt-1">Order Status: <span className="font-bold text-emerald-600 uppercase">{order.status || "CONFIRMED"}</span></p>
            </div>
          </div>

          {/* Itemized Table */}
          <div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Price</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((item, index) => {
                  const isNonVeg =
                    item.name.toLowerCase().includes("chicken") ||
                    item.name.toLowerCase().includes("mutton") ||
                    item.name.toLowerCase().includes("egg");

                  return (
                    <tr key={item.id || index} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-mono text-slate-400">{index + 1}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-800">
                        <div className="flex items-center gap-2">
                          <VegNonVegLogo isVeg={!isNonVeg} />
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-center font-medium">{item.quantity}</td>
                      <td className="py-2.5 px-3 text-right font-mono">₹{item.price.toFixed(2)}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary & Tax Calculation */}
          <div className="flex flex-col sm:flex-row justify-between items-start pt-4 border-t border-slate-200 gap-4">
            <div className="text-xs text-slate-500 max-w-xs space-y-1">
              <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                <CheckCircle2 className="h-4 w-4" /> Paid in full
              </div>
              <p>Thank you for ordering with FoodHub!</p>
              <p className="text-[10px] text-slate-400 italic">This is a computer generated tax invoice and requires no physical signature.</p>
            </div>

            <div className="w-full sm:w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal (Items)</span>
                <span className="font-mono font-medium">₹{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>CGST (2.5%)</span>
                <span className="font-mono font-medium">₹{cgst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>SGST (2.5%)</span>
                <span className="font-mono font-medium">₹{sgst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee</span>
                <span className="font-mono font-medium">₹{order.deliveryFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between pt-2 border-t-2 border-slate-900 text-sm font-black text-slate-900">
                <span>Grand Total</span>
                <span className="font-mono text-base text-[#fc8019]">₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
