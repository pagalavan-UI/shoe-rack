import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, ShoppingBag, Zap, ChevronRight, Check } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import ProductCard from "@/components/ProductCard";

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export default function ProductDetail() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const product = MOCK_PRODUCTS.find((p) => p.id === params.id);

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("Description");
  const [added, setAdded] = useState(false);

  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  if (!product) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Product not found.</p>
          <Link href="/shop"><span className="text-primary font-semibold cursor-pointer">Back to Shop</span></Link>
        </div>
      </div>
    );
  }

  const related = MOCK_PRODUCTS.filter((p) => p.id !== product.id && p.brand === product.brand).slice(0, 4);
  const inWishlist = isInWishlist(product.id);
  const images = product.images.length >= 3 ? product.images : [product.images[0], product.images[0], product.images[0]];

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({ id: product.id, size: selectedSize, color: product.colors[selectedColor] });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) return;
    addItem({ id: product.id, size: selectedSize, color: product.colors[selectedColor] });
    navigate("/checkout");
  };

  return (
    <div className="pt-14 md:pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 md:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5 overflow-x-auto">
          <Link href="/"><span className="hover:text-primary cursor-pointer whitespace-nowrap">Home</span></Link>
          <ChevronRight size={11} />
          <Link href="/shop"><span className="hover:text-primary cursor-pointer whitespace-nowrap">Shop</span></Link>
          <ChevronRight size={11} />
          <span className="text-foreground truncate">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 mb-12 md:mb-16">
          {/* Images */}
          <div className="space-y-2 md:space-y-3">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              className="aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-card border border-border"
            >
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-primary" : "border-border"
                  }`}
                  data-testid={`button-image-thumb-${i}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block">{product.brand}</span>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-3">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-muted"} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount.toLocaleString()} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-3xl md:text-4xl font-black">{fmt(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{fmt(product.originalPrice)}</span>
                  <span className="px-2 py-0.5 bg-green-600/20 text-green-500 text-xs font-bold rounded-full">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* EMI hint */}
            <p className="text-xs text-muted-foreground mb-5 bg-muted/40 border border-border rounded-lg px-3 py-2">
              💳 No Cost EMI from <span className="font-semibold text-foreground">₹{Math.ceil(product.price / 6).toLocaleString('en-IN')}/mo</span> for 6 months
            </p>

            {/* Colors */}
            <div className="mb-5">
              <p className="text-sm font-semibold mb-2">Colour: <span className="font-normal text-muted-foreground">{product.colors[selectedColor]}</span></p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color, i) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedColor === i ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                    data-testid={`button-color-${color.toLowerCase()}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">Size: <span className="font-normal text-muted-foreground">{selectedSize ? `UK/IN ${selectedSize}` : "Select size"}</span></p>
                <span className="text-xs text-primary cursor-pointer hover:underline">Size Guide</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-sm font-semibold border transition-all ${
                      selectedSize === size
                        ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(255,77,77,0.4)]"
                        : "border-border text-foreground hover:border-primary/50 hover:text-primary"
                    }`}
                    data-testid={`button-size-${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && <p className="text-xs text-muted-foreground mt-2">Please select a size to continue</p>}
            </div>

            {/* Stock */}
            {product.stock <= 5 && (
              <p className="text-xs text-amber-500 font-semibold mb-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Only {product.stock} left — order soon!
              </p>
            )}

            {/* CTAs */}
            <div className="flex gap-2.5 mb-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`flex-1 py-3.5 md:py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all text-sm md:text-base ${
                  added ? "bg-green-600 text-white" :
                  selectedSize ? "bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(255,77,77,0.3)]" : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
                data-testid="button-add-to-cart"
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                      <Check size={16} /> Added!
                    </motion.span>
                  ) : (
                    <motion.span key="bag" className="flex items-center gap-2">
                      <ShoppingBag size={16} /> Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleItem(product.id)}
                className={`p-3.5 md:p-4 rounded-2xl border transition-all ${
                  inWishlist ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
                data-testid="button-wishlist"
              >
                <Heart size={18} className={inWishlist ? "fill-primary" : ""} />
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleBuyNow}
              disabled={!selectedSize}
              className={`w-full py-3.5 md:py-4 rounded-2xl font-bold flex items-center justify-center gap-2 border transition-all text-sm md:text-base ${
                selectedSize
                  ? "border-foreground text-foreground hover:bg-foreground hover:text-background"
                  : "border-border text-muted-foreground cursor-not-allowed"
              }`}
              data-testid="button-buy-now"
            >
              <Zap size={16} />
              Buy Now — {fmt(product.price)}
            </motion.button>

            {/* Trust badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
              {["✅ 100% Authentic", "🚚 Free Delivery over ₹10,000", "↩️ Easy 30-Day Returns"].map((badge) => (
                <div key={badge} className="text-center text-[10px] text-muted-foreground bg-muted/40 rounded-xl px-2 py-2 leading-tight">{badge}</div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-5 overflow-x-auto">
          <div className="flex gap-4 md:gap-6 min-w-max">
            {["Description", "Details", "Reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`tab-${tab.toLowerCase()}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12 md:mb-16">
          {activeTab === "Description" && (
            <p className="text-muted-foreground leading-relaxed max-w-2xl text-sm md:text-base">{product.description}</p>
          )}
          {activeTab === "Details" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg">
              {[
                ["Brand", product.brand], ["Category", product.category],
                ["Available Sizes", product.sizes.join(", ")],
                ["Colours", product.colors.join(", ")],
                ["Stock", `${product.stock} units`],
                ["Shipping", "Free above ₹10,000"],
              ].map(([k, v]) => (
                <div key={String(k)}>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{k}</p>
                  <p className="text-sm font-medium mt-0.5">{v}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === "Reviews" && (
            <div className="space-y-3 max-w-2xl">
              {[
                { name: "Karan M.", rating: 5, text: "Absolutely love these. Perfect fit, arrived in 2 days. 100% authentic, no doubt." },
                { name: "Sneha R.", rating: 4, text: "Great pair, colour is exactly as shown. Comfortable from day one. Highly recommend!" },
                { name: "Vicky T.", rating: 5, text: "Ordered for ₹14,999 and these are worth every rupee. Premium quality packaging too." },
              ].map((r, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex gap-0.5 mb-1">
                    {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={12} className="fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-sm text-muted-foreground">{r.text}</p>
                  <p className="text-xs font-semibold mt-2">{r.name}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {related.length > 0 && (
          <section>
            <h2 className="text-xl md:text-2xl font-black mb-5 tracking-tight">More from {product.brand}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
