import { motion } from "framer-motion";
import { Package, ShoppingBag, DollarSign, Users, TrendingUp, ArrowUpRight } from "lucide-react";
import { MOCK_ORDERS } from "@/data/orders";
import { MOCK_PRODUCTS } from "@/data/products";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const revenueData = [
  { month: "Jul", revenue: 1840000 },
  { month: "Aug", revenue: 2210000 },
  { month: "Sep", revenue: 1980000 },
  { month: "Oct", revenue: 2750000 },
  { month: "Nov", revenue: 3120000 },
  { month: "Dec", revenue: 3890000 },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-green-600/20 text-green-500",
  Shipped: "bg-blue-600/20 text-blue-400",
  Processing: "bg-amber-500/20 text-amber-400",
  Cancelled: "bg-red-600/20 text-red-400",
};

export default function AdminDashboard() {
  const totalRevenue = MOCK_ORDERS.reduce((acc, o) => acc + o.total, 0);
  const stats = [
    { label: "Total Products", value: MOCK_PRODUCTS.length, icon: Package, change: "+12%", color: "text-blue-400" },
    { label: "Total Orders", value: MOCK_ORDERS.length, icon: ShoppingBag, change: "+8%", color: "text-amber-400" },
    { label: "Revenue", value: fmt(totalRevenue), icon: DollarSign, change: "+24%", color: "text-green-400" },
    { label: "Active Users", value: "4,891", icon: Users, change: "+6%", color: "text-purple-400" },
  ];

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-black tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of your store performance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {stats.map(({ label, value, icon: Icon, change, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-card border border-border rounded-2xl p-4 md:p-5"
            data-testid={`card-stat-${label.toLowerCase().replace(/ /g, "-")}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-1.5 md:p-2 rounded-xl bg-muted">
                <Icon size={16} className={color} />
              </div>
              <span className="text-xs font-bold text-green-500 flex items-center gap-0.5">
                <ArrowUpRight size={11} />{change}
              </span>
            </div>
            <p className="text-xl md:text-2xl font-black text-foreground">{value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">{label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-card border border-border rounded-2xl p-4 md:p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={15} className="text-primary" />
            <h2 className="font-bold text-sm md:text-base">Monthly Revenue (₹)</h2>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={revenueData} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 15%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "hsl(0 0% 60%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(0 0% 60%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(0 0% 5%)", border: "1px solid hsl(0 0% 15%)", borderRadius: 12, color: "hsl(0 0% 96%)" }}
                formatter={(v: number) => [fmt(v), "Revenue"]}
              />
              <Bar dataKey="revenue" fill="hsl(0 100% 65%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-2xl p-4 md:p-6"
        >
          <h2 className="font-bold mb-4 text-sm md:text-base">Recent Orders</h2>
          <div className="space-y-3">
            {MOCK_ORDERS.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold">{order.id}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[100px]">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold">{fmt(order.total)}</p>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${statusColors[order.status]}`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 md:mt-6 bg-card border border-border rounded-2xl overflow-hidden"
      >
        <div className="p-4 md:p-6 border-b border-border">
          <h2 className="font-bold text-sm md:text-base">All Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                {["Order ID", "Customer", "Date", "Items", "Total", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 md:px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_ORDERS.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.04 }}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                  data-testid={`row-order-${order.id}`}
                >
                  <td className="px-4 md:px-6 py-3 font-mono text-xs font-semibold text-primary">{order.id}</td>
                  <td className="px-4 md:px-6 py-3">
                    <p className="font-medium text-xs">{order.customerName}</p>
                    <p className="text-[10px] text-muted-foreground">{order.customerEmail}</p>
                  </td>
                  <td className="px-4 md:px-6 py-3 text-muted-foreground text-xs">{order.date}</td>
                  <td className="px-4 md:px-6 py-3 text-xs">{order.items}</td>
                  <td className="px-4 md:px-6 py-3 font-bold text-xs">{fmt(order.total)}</td>
                  <td className="px-4 md:px-6 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>{order.status}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
