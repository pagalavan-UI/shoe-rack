import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Image as ImageIcon } from "lucide-react";

const fmt = (n: number) => n ? `₹${parseInt(String(n)).toLocaleString('en-IN')}` : "₹0";

const brandOptions = ["Nike", "Adidas", "Jordan", "Puma", "New Balance"];
const categoryOptions = ["Men", "Women", "Unisex"];
const availableSizes = [5, 6, 7, 8, 9, 10, 11, 12, 13];

type FormData = {
  name: string;
  brand: string;
  price: string;
  originalPrice: string;
  category: string;
  sizes: number[];
  colors: string;
  stock: string;
  imageUrl: string;
  description: string;
};

const initialForm: FormData = {
  name: "", brand: "Nike", price: "", originalPrice: "",
  category: "Unisex", sizes: [], colors: "", stock: "",
  imageUrl: "", description: "",
};

export default function AdminAddProduct() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [saved, setSaved] = useState(false);

  const handleSizeToggle = (size: number) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => { setSaved(false); setForm(initialForm); }, 2500);
  };

  const hasPreview = form.name || form.price || form.imageUrl;

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-black tracking-tight">Add New Product</h1>
        <p className="text-muted-foreground text-sm mt-1">Fill in the details to add a new sneaker</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Product Name *</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Air Jordan 1 Retro High OG"
              className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
              data-testid="input-product-name"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Brand</label>
              <select value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" data-testid="select-brand">
                {brandOptions.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" data-testid="select-category">
                {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Price (₹) *</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="14999" className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" data-testid="input-price" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">MRP (₹)</label>
              <input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} placeholder="18999" className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" data-testid="input-original-price" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Available Sizes (UK/IN)</label>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button key={size} type="button" onClick={() => handleSizeToggle(size)}
                  className={`w-10 h-10 rounded-xl text-sm font-semibold border transition-all ${form.sizes.includes(size) ? "bg-primary border-primary text-white" : "border-border text-muted-foreground hover:border-primary/50"}`}
                  data-testid={`button-size-${size}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Colours</label>
              <input value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} placeholder="Black, White, Red" className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" data-testid="input-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Stock *</label>
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="25" className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" data-testid="input-stock" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Image URL</label>
            <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://images.unsplash.com/..." className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" data-testid="input-image-url" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Describe the product..." className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors resize-none" data-testid="textarea-description" />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-4 font-bold rounded-2xl transition-all ${saved ? "bg-green-600 text-white" : "bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(255,77,77,0.3)]"}`}
            data-testid="button-add-product"
          >
            {saved ? "✓ Product Added!" : "Add Product"}
          </motion.button>
        </form>

        {/* Live Preview */}
        <div className="lg:sticky lg:top-24">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Live Preview</h2>
          <motion.div
            animate={{ opacity: hasPreview ? 1 : 0.4 }}
            className="bg-card border border-border rounded-2xl overflow-hidden"
            data-testid="card-product-preview"
          >
            <div className="aspect-square bg-muted relative overflow-hidden">
              {form.imageUrl ? (
                <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={48} className="text-muted-foreground opacity-30" />
                </div>
              )}
              {form.brand && <span className="absolute top-3 left-3 px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full">{form.brand}</span>}
            </div>
            <div className="p-5">
              <p className="text-xs text-primary font-semibold tracking-widest uppercase mb-1">{form.brand || "Brand"}</p>
              <h3 className="font-black text-lg mb-1">{form.name || "Product Name"}</h3>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                <span className="text-xs text-muted-foreground ml-1">New</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl font-black">{form.price ? fmt(parseInt(form.price)) : "₹0"}</span>
                {form.originalPrice && <span className="text-sm text-muted-foreground line-through">{fmt(parseInt(form.originalPrice))}</span>}
              </div>
              {form.sizes.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {form.sizes.map((s) => <span key={s} className="px-2 py-1 border border-border rounded-lg text-xs">{s}</span>)}
                </div>
              )}
              {form.description && <p className="text-xs text-muted-foreground leading-relaxed">{form.description}</p>}
              {form.stock && <p className="text-xs mt-2 font-semibold text-green-500">{parseInt(form.stock) > 5 ? "In Stock" : parseInt(form.stock) > 0 ? `Only ${form.stock} left!` : "Out of Stock"}</p>}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
