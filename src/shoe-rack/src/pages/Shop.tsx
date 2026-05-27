import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { useSearch } from "wouter";
import { MOCK_PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const brands = ["All", "Nike", "Adidas", "Jordan", "Puma", "New Balance"];
const categories = ["All", "Men", "Women", "Unisex"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹9,999", min: 0, max: 9999 },
  { label: "₹9,999–₹14,999", min: 9999, max: 14999 },
  { label: "₹14,999–₹18,999", min: 14999, max: 18999 },
  { label: "Over ₹18,999", min: 18999, max: Infinity },
];

export default function Shop() {
  const searchStr = useSearch();

  const [selectedBrand, setSelectedBrand] = useState(() => {
    const p = new URLSearchParams(searchStr);
    return p.get("brand") || "All";
  });
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const p = new URLSearchParams(searchStr);
    return p.get("category") || "All";
  });
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [searchQ, setSearchQ] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const p = new URLSearchParams(searchStr);
    const brand = p.get("brand");
    const cat = p.get("category");
    if (brand) setSelectedBrand(brand);
    if (cat) setSelectedCategory(cat);
  }, [searchStr]);

  const filtered = useMemo(() => {
    const p = new URLSearchParams(searchStr);
    const tagFilter = p.get("tag");
    const saleFilter = p.get("sale");

    let result = MOCK_PRODUCTS.filter((prod) => {
      if (selectedBrand !== "All" && prod.brand !== selectedBrand) return false;
      if (selectedCategory !== "All" && prod.category !== selectedCategory) return false;
      if (tagFilter && !prod.tags.includes(tagFilter)) return false;
      if (saleFilter === "true" && !prod.originalPrice) return false;
      const pr = priceRanges[selectedPrice];
      if (prod.price < pr.min || prod.price > pr.max) return false;
      if (searchQ && !prod.name.toLowerCase().includes(searchQ.toLowerCase()) && !prod.brand.toLowerCase().includes(searchQ.toLowerCase())) return false;
      return true;
    });

    if (sortBy === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [selectedBrand, selectedCategory, selectedPrice, searchQ, sortBy, searchStr]);

  const clearAll = () => {
    setSelectedBrand("All");
    setSelectedCategory("All");
    setSelectedPrice(0);
    setSearchQ("");
    setSortBy("default");
  };

  const activeFilterCount = (selectedBrand !== "All" ? 1 : 0) + (selectedCategory !== "All" ? 1 : 0) + (selectedPrice !== 0 ? 1 : 0);

  return (
    <div className="pt-14 md:pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 md:py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">All Sneakers</h1>
            <p className="text-muted-foreground text-xs mt-0.5">{filtered.length} products found</p>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="hidden sm:block px-3 py-2 bg-card border border-border rounded-xl text-xs font-medium focus:outline-none focus:border-primary transition-colors"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Search + Filter row */}
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search sneakers, brands..."
              className="w-full pl-10 pr-9 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
              data-testid="input-search"
            />
            {searchQ && (
              <button onClick={() => setSearchQ("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter button — always visible on mobile */}
          <button
            onClick={() => setFilterOpen(true)}
            className="md:hidden relative flex items-center gap-1.5 px-4 py-3 bg-card border border-border rounded-xl text-sm font-semibold hover:border-primary/50 transition-colors shrink-0"
            data-testid="button-toggle-filters"
          >
            <SlidersHorizontal size={15} />
            <span className="hidden sm:inline">Filter</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Sort Row — visible only on mobile */}
        <div className="md:hidden mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2.5 bg-card border border-border rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-colors"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Category tabs — simple pill row, desktop only */}
        <div className="hidden md:flex gap-2 mb-5 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                selectedCategory === c
                  ? "bg-primary text-white border-primary"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
          <div className="w-px bg-border mx-1 self-stretch" />
          {brands.filter(b => b !== "All").map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(selectedBrand === b ? "All" : b)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                selectedBrand === b
                  ? "bg-primary/10 text-primary border-primary/40"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
              data-testid={`filter-brand-${b.toLowerCase()}`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Active filter pills */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-4">
            {selectedBrand !== "All" && (
              <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-semibold flex items-center gap-1.5">
                {selectedBrand}
                <button onClick={() => setSelectedBrand("All")}><X size={11} /></button>
              </span>
            )}
            {selectedCategory !== "All" && (
              <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-semibold flex items-center gap-1.5">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("All")}><X size={11} /></button>
              </span>
            )}
            {selectedPrice !== 0 && (
              <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-semibold flex items-center gap-1.5">
                {priceRanges[selectedPrice].label}
                <button onClick={() => setSelectedPrice(0)}><X size={11} /></button>
              </span>
            )}
            <button onClick={clearAll} className="text-xs text-muted-foreground hover:text-foreground underline">
              Clear all
            </button>
          </div>
        )}

        <div className="flex gap-6 md:gap-8">
          {/* Sidebar — desktop only */}
          <aside className="w-44 shrink-0 hidden md:block">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Brand</h3>
                <div className="flex flex-col gap-0.5">
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBrand(b)}
                      className={`text-sm text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedBrand === b ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                      data-testid={`filter-brand-${b.toLowerCase()}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Category</h3>
                <div className="flex flex-col gap-0.5">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`text-sm text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === c ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Price Range</h3>
                <div className="flex flex-col gap-0.5">
                  {priceRanges.map((pr, i) => (
                    <button
                      key={pr.label}
                      onClick={() => setSelectedPrice(i)}
                      className={`text-xs text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedPrice === i ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {pr.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Sort By</h3>
                <div className="flex flex-col gap-0.5">
                  {[["default", "Default"], ["price-asc", "Price: Low–High"], ["price-desc", "Price: High–Low"], ["rating", "Top Rated"]].map(([val, lbl]) => (
                    <button
                      key={val}
                      onClick={() => setSortBy(val)}
                      className={`text-xs text-left px-3 py-2 rounded-lg transition-colors ${
                        sortBy === val ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">No products match your filters.</p>
                <button onClick={clearAll} className="text-sm text-primary font-semibold underline">Clear all filters</button>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
                <AnimatePresence>
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* ── MOBILE FILTER BOTTOM SHEET ── */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setFilterOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
              className="fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-3xl z-50 md:hidden"
            >
              {/* Handle bar */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-border" />
              </div>

              <div className="flex items-center justify-between px-5 pb-3 border-b border-border">
                <h3 className="font-black text-lg">Filters</h3>
                <div className="flex items-center gap-3">
                  {activeFilterCount > 0 && (
                    <button onClick={clearAll} className="text-sm text-primary font-semibold">Clear All</button>
                  )}
                  <button onClick={() => setFilterOpen(false)} className="p-1.5 rounded-xl hover:bg-muted transition-colors">
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[70vh] px-5 py-4 space-y-6">
                {/* Category */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Category</p>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCategory(c)}
                        className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                          selectedCategory === c
                            ? "bg-primary text-white border-primary"
                            : "border-border text-foreground hover:border-primary/40"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Brand</p>
                  <div className="grid grid-cols-2 gap-2">
                    {brands.map((b) => (
                      <button
                        key={b}
                        onClick={() => setSelectedBrand(b)}
                        className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                          selectedBrand === b
                            ? "bg-primary text-white border-primary"
                            : "border-border text-foreground hover:border-primary/40"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Price Range</p>
                  <div className="flex flex-col gap-2">
                    {priceRanges.map((pr, i) => (
                      <button
                        key={pr.label}
                        onClick={() => setSelectedPrice(i)}
                        className={`py-3 px-4 rounded-xl text-sm font-semibold border text-left transition-all ${
                          selectedPrice === i
                            ? "bg-primary text-white border-primary"
                            : "border-border text-foreground hover:border-primary/40"
                        }`}
                      >
                        {pr.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Sort By</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[["default", "Default"], ["price-asc", "Lowest Price"], ["price-desc", "Highest Price"], ["rating", "Top Rated"]].map(([val, lbl]) => (
                      <button
                        key={val}
                        onClick={() => setSortBy(val)}
                        className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                          sortBy === val
                            ? "bg-primary text-white border-primary"
                            : "border-border text-foreground hover:border-primary/40"
                        }`}
                      >
                        {lbl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 pb-6 pt-3 border-t border-border">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setFilterOpen(false)}
                  className="w-full py-4 bg-primary text-white font-black rounded-2xl text-base shadow-[0_0_20px_rgba(255,77,77,0.3)]"
                >
                  Show {filtered.length} Results
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
