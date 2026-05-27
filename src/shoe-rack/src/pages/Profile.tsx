import { motion } from "framer-motion";
import { User, Package, MapPin, Star } from "lucide-react";
import { MOCK_ORDERS } from "@/data/orders";

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const mockUser = {
  name: "Arjun Mehta",
  email: "arjun.mehta@example.com",
  memberSince: "Jan 2022",
  totalOrders: 12,
  totalSpent: 189000,
};

const statusColors: Record<string, string> = {
  Delivered: "bg-green-600/20 text-green-500",
  Shipped: "bg-blue-600/20 text-blue-400",
  Processing: "bg-amber-500/20 text-amber-400",
  Cancelled: "bg-destructive/20 text-destructive",
};

const savedAddresses = [
  { label: "Home", address: "B-42, Sector 18, Noida, Uttar Pradesh - 201301" },
  { label: "Work", address: "Tower 4, DLF Cyber City, Gurgaon, Haryana - 122002" },
];

export default function Profile() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-6 md:mb-8">My Profile</h1>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 space-y-4"
          >
            <div className="bg-card border border-border rounded-2xl p-5 md:p-6 text-center" data-testid="card-profile">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <User size={28} className="text-primary" />
              </div>
              <h2 className="font-black text-lg md:text-xl mb-1">{mockUser.name}</h2>
              <p className="text-muted-foreground text-sm mb-3">{mockUser.email}</p>
              <div className="flex items-center justify-center gap-1 text-xs text-amber-400 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} className="fill-amber-400" />
                ))}
                <span className="text-muted-foreground ml-1">Premium Member</span>
              </div>
              <div className="border-t border-border pt-4 grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-black">{mockUser.totalOrders}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Orders</p>
                </div>
                <div>
                  <p className="text-xl font-black">{fmt(mockUser.totalSpent)}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Spent</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Member since {mockUser.memberSince}</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={15} className="text-primary" />
                <h3 className="font-bold text-sm">Saved Addresses</h3>
              </div>
              <div className="space-y-3">
                {savedAddresses.map((addr) => (
                  <div key={addr.label} className="border border-border rounded-xl p-3">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">{addr.label}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{addr.address}</p>
                  </div>
                ))}
                <button className="w-full py-2 border border-dashed border-border rounded-xl text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                  + Add New Address
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2"
          >
            <div className="bg-card border border-border rounded-2xl p-5 md:p-6">
              <div className="flex items-center gap-2 mb-5">
                <Package size={15} className="text-primary" />
                <h3 className="font-black text-lg">Order History</h3>
              </div>
              <div className="space-y-2.5">
                {MOCK_ORDERS.map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex flex-wrap items-center justify-between gap-2 p-3 md:p-4 border border-border rounded-xl hover:border-primary/20 transition-colors"
                    data-testid={`row-order-${order.id}`}
                  >
                    <div>
                      <p className="font-semibold text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.date} · {order.items} item{order.items > 1 ? "s" : ""}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">{fmt(order.total)}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
