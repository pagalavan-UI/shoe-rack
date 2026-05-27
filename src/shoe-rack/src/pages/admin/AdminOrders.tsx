import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { MOCK_ORDERS, type Order } from "@/data/orders";

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;
const statusOptions = ["All", "Delivered", "Shipped", "Processing", "Cancelled"];

const statusColors: Record<string, string> = {
  Delivered: "bg-green-600/20 text-green-500 border-green-600/30",
  Shipped: "bg-blue-600/20 text-blue-400 border-blue-600/30",
  Processing: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Cancelled: "bg-red-600/20 text-red-400 border-red-600/30",
};

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = MOCK_ORDERS.filter((o: Order) => {
    if (statusFilter !== "All" && o.status !== statusFilter) return false;
    if (search && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.customerName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const statusCounts = statusOptions.slice(1).reduce<Record<string, number>>((acc, s) => {
    acc[s] = MOCK_ORDERS.filter((o) => o.status === s).length;
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-black tracking-tight">Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">{MOCK_ORDERS.length} total orders</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-5">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setStatusFilter(statusFilter === status ? "All" : status)}
            className={`px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl border text-left transition-all ${
              statusFilter === status ? statusColors[status] : "bg-card border-border hover:border-primary/30"
            }`}
            data-testid={`button-status-filter-${status.toLowerCase()}`}
          >
            <p className="text-xl md:text-2xl font-black">{count}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">{status}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 md:gap-3 mb-5">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID or customer..."
            className="w-full pl-9 pr-4 py-2 md:py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
            data-testid="input-order-search"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 md:py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary appearance-none cursor-pointer"
          data-testid="select-status-filter"
        >
          {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                {["Order ID", "Customer", "Date", "Items", "Total", "Status", ""].map((h, i) => (
                  <th key={i} className="text-left px-4 md:px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => (
                <>
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-border hover:bg-muted/20 transition-colors"
                    data-testid={`row-order-${order.id}`}
                  >
                    <td className="px-4 md:px-5 py-3 font-mono text-xs font-bold text-primary">{order.id}</td>
                    <td className="px-4 md:px-5 py-3">
                      <p className="font-medium text-xs">{order.customerName}</p>
                      <p className="text-[10px] text-muted-foreground">{order.customerEmail}</p>
                    </td>
                    <td className="px-4 md:px-5 py-3 text-muted-foreground text-xs">{order.date}</td>
                    <td className="px-4 md:px-5 py-3 text-xs">{order.items}</td>
                    <td className="px-4 md:px-5 py-3 font-black text-xs">{fmt(order.total)}</td>
                    <td className="px-4 md:px-5 py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColors[order.status]}`}>{order.status}</span>
                    </td>
                    <td className="px-4 md:px-5 py-3">
                      <button
                        onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        data-testid={`button-expand-${order.id}`}
                      >
                        <ChevronDown size={14} className={`transition-transform ${expanded === order.id ? "rotate-180" : ""}`} />
                      </button>
                    </td>
                  </motion.tr>
                  {expanded === order.id && (
                    <tr key={`${order.id}-expanded`} className="bg-muted/20">
                      <td colSpan={7} className="px-4 md:px-5 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 text-sm">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Customer</p>
                            <p className="font-medium text-xs">{order.customerName}</p>
                            <p className="text-muted-foreground text-xs">{order.customerEmail}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Order Info</p>
                            <p className="text-xs">{order.items} item{order.items > 1 ? "s" : ""} · {fmt(order.total)}</p>
                            <p className="text-muted-foreground text-xs">Placed on {order.date}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Update Status</p>
                            <select className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs focus:outline-none focus:border-primary transition-colors" data-testid={`select-update-status-${order.id}`}>
                              {statusOptions.slice(1).map((s) => (
                                <option key={s} value={s} selected={s === order.status}>{s}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground text-sm">No orders match your filters.</div>}
        </div>
      </div>
    </div>
  );
}
