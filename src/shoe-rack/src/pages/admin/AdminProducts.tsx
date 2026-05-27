import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Edit2, Trash2, Filter } from "lucide-react";
import { MOCK_PRODUCTS, type Product } from "@/data/products";

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;
const brandOptions = ["All", "Nike", "Adidas", "Jordan", "Puma", "New Balance"];
const categoryOptions = ["All", "Men", "Women", "Unisex"];

function stockStatus(stock: number): { label: string; cls: string } {
  if (stock === 0) return { label: "Out of Stock", cls: "bg-red-600/20 text-red-400" };
  if (stock <= 5) return { label: "Low Stock", cls: "bg-amber-500/20 text-amber-400" };
  return { label: "In Stock", cls: "bg-green-600/20 text-green-500" };
}

export default function AdminProducts() {
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const filtered = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false;
    if (brandFilter !== "All" && p.brand !== brandFilter) return false;
    if (categoryFilter !== "All" && p.category !== categoryFilter) return false;
    return true;
  });

  const handleDelete = (id: string) => setProducts((prev) => prev.filter((p) => p.id !== id));

  return (
    <div>
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight">Products</h1>
          <p className="text-muted-foreground text-sm mt-1">{products.length} total products</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 md:gap-3 mb-5">
        <div className="relative flex-1 min-w-[160px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2 md:py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
            data-testid="input-product-search"
          />
        </div>
        <div className="relative">
          <Filter size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="pl-8 pr-7 py-2 md:py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary appearance-none cursor-pointer"
            data-testid="select-brand-filter"
          >
            {brandOptions.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 md:py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary appearance-none cursor-pointer"
          data-testid="select-category-filter"
        >
          {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                {["Product", "Brand", "Price", "Category", "Stock", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((product, i) => {
                  const { label, cls } = stockStatus(product.stock);
                  return (
                    <motion.tr
                      key={product.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-border hover:bg-muted/20 transition-colors"
                      data-testid={`row-product-${product.id}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium text-xs truncate max-w-[120px] md:max-w-[180px]">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{product.brand}</td>
                      <td className="px-4 py-3 font-bold text-xs">{fmt(product.price)}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{product.category}</td>
                      <td className="px-4 py-3 text-xs">{product.stock}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cls}`}>{label}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => setEditProduct(product)} className="p-1.5 rounded-lg bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 transition-colors" data-testid={`button-edit-${product.id}`}>
                            <Edit2 size={13} />
                          </button>
                          <button onClick={() => handleDelete(product.id)} className="p-1.5 rounded-lg bg-red-600/10 text-red-400 hover:bg-red-600/20 transition-colors" data-testid={`button-delete-${product.id}`}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground text-sm">No products match your search.</div>}
        </div>
      </div>

      <AnimatePresence>
        {editProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 px-0 sm:px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="bg-card border border-border rounded-t-3xl sm:rounded-2xl p-6 w-full sm:max-w-md"
            >
              <h2 className="font-black text-lg mb-4">Edit Product</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Name</label>
                  <input defaultValue={editProduct.name} className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary" data-testid="input-edit-name" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Price (₹)</label>
                    <input defaultValue={editProduct.price} type="number" className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary" data-testid="input-edit-price" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Stock</label>
                    <input defaultValue={editProduct.stock} type="number" className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary" data-testid="input-edit-stock" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setEditProduct(null)} className="flex-1 py-2.5 border border-border rounded-xl font-semibold text-sm hover:border-primary/50 transition-colors" data-testid="button-cancel-edit">Cancel</button>
                <button onClick={() => setEditProduct(null)} className="flex-1 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors" data-testid="button-save-edit">Save Changes</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
