import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star, TrendingUp, Zap, Award, Gift, Play } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const brands = ["Nike", "Adidas", "Jordan", "Puma", "New Balance"];

const testimonials = [
  { name: "Rohan V.", text: "Shoe Rack is where I get every drop. The selection is unmatched and delivery is lightning fast.", rating: 5, shoe: "Air Jordan 1 OG" },
  { name: "Priya S.", text: "Premium quality, real authentication, and the best sneaker UI I've ever used.", rating: 5, shoe: "Nike Dunk Low" },
  { name: "Aryan C.", text: "The limited edition releases here hit before anyone else. My go-to for grails.", rating: 5, shoe: "Yeezy 350 V2" },
];

const productSections = [
  { label: "Trending Now", tag: "trending", icon: TrendingUp },
  { label: "Best Sellers", tag: "bestseller", icon: Gift },
  { label: "Limited Drops", tag: "limited", icon: Award },
  { label: "New Arrivals", tag: "new", icon: Zap },
];

const categories = [
  { label: "Men's", sub: "Bold & Classic", href: "/shop?category=Men", img: "https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=800" },
  { label: "Women's", sub: "Style & Comfort", href: "/shop?category=Women", img: "https://images.unsplash.com/photo-1584735175315-9d5df23be3da?w=800" },
  { label: "Running", sub: "Performance", href: "/shop?tag=running", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800" },
  { label: "Limited", sub: "Exclusive Drops", href: "/shop?tag=limited", img: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800" },
  { label: "Unisex", sub: "For Everyone", href: "/shop?category=Unisex", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800" },
  { label: "Sale", sub: "Up to 40% Off", href: "/shop?sale=true", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800" },
];

export default function Home() {
  return (
    <div className="pt-14 md:pt-16">

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-card">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_50%,rgba(255,77,77,0.1),transparent_60%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 items-center w-full py-12 md:py-20">
          {/* Text — always first on both mobile and desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left order-2 md:order-1"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3 md:mb-4"
            >
              New Season 2024 — India
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              THE FUTURE
              <br />
              <span className="text-primary">IS ON YOUR</span>
              <br />
              FEET
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-sm md:text-base mb-7 max-w-sm mx-auto md:mx-0"
            >
              Premium sneakers from the world's most iconic brands. Authenticated, curated, delivered across India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3 justify-center md:justify-start flex-wrap"
            >
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 bg-primary text-white font-bold rounded-full flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-[0_0_30px_rgba(255,77,77,0.4)] text-sm"
                  data-testid="button-shop-now"
                >
                  Shop Now <ArrowRight size={16} />
                </motion.button>
              </Link>
              <Link href="/shop?tag=limited">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 border border-border font-bold rounded-full flex items-center gap-2 hover:border-primary/50 hover:text-primary transition-colors text-sm"
                  data-testid="button-explore"
                >
                  Limited Drops <Award size={16} />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-8 mt-8 justify-center md:justify-start"
            >
              {[{ value: "10K+", label: "Products" }, { value: "50K+", label: "Customers" }, { value: "100%", label: "Authentic" }].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-xl md:text-2xl font-black">{value}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image — below text on mobile, right side on desktop */}
          <motion.div
            className="flex justify-center order-1 md:order-2"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[70px] scale-75" />
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700"
                alt="Featured Sneaker"
                className="relative z-10 w-64 sm:w-72 md:w-full max-w-md object-contain drop-shadow-2xl rounded-3xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── VIDEO SECTION ── */}
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10 pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="text-center text-white px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.4em] uppercase text-primary mb-2"
            >
              Feel Every Step
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              BUILT TO<br /><span className="text-primary">DOMINATE</span>
            </motion.h2>
          </div>
        </div>
        <div className="relative w-full aspect-video max-h-[65vh]">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/jWmVBPtCHaQ?autoplay=1&mute=1&loop=1&controls=0&rel=0&playlist=jWmVBPtCHaQ&modestbranding=1"
            title="Shoe Rack"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ border: "none", opacity: 0.5 }}
          />
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-full shadow-[0_0_25px_rgba(255,77,77,0.5)] text-sm"
            >
              <Play size={14} fill="white" />
              Shop the Look
            </motion.button>
          </Link>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-12 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-8"
          >
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-1">Browse by</p>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight">Shop Categories</h2>
          </motion.div>

          {/* Responsive grid — 2 cols mobile, 3 cols sm+ */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
            {categories.map(({ label, sub, href, img }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Link href={href}>
                  <div className="relative aspect-[4/3] sm:aspect-[3/4] overflow-hidden">
                    <img
                      src={img}
                      alt={label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                      <p className="text-[10px] text-primary font-bold tracking-wider uppercase mb-0.5">{sub}</p>
                      <h3 className="text-white font-black text-base md:text-xl tracking-tight">{label}</h3>
                      <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xs font-semibold">Shop Now</span>
                        <ArrowRight size={12} className="text-primary" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SECTIONS ── */}
      {productSections.map(({ label, tag, icon: Icon }) => {
        const products = MOCK_PRODUCTS.filter((p) => p.tags.includes(tag)).slice(0, 4);
        if (products.length === 0) return null;
        return (
          <section key={tag} className="py-10 md:py-14 px-4 sm:px-6 border-t border-border/40">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-5 md:mb-6">
                <div className="flex items-center gap-2">
                  <Icon size={16} className="text-primary" />
                  <h2 className="text-xl md:text-2xl font-black tracking-tight">{label}</h2>
                </div>
                <Link href={`/shop?tag=${tag}`}>
                  <span className="text-sm text-primary font-semibold flex items-center gap-1 cursor-pointer hover:gap-2 transition-all">
                    View All <ArrowRight size={13} />
                  </span>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {products.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── BRANDS ── */}
      <section className="py-10 md:py-14 px-4 sm:px-6 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-xl md:text-2xl font-black mb-6 tracking-tight">Featured Brands</h2>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {brands.map((brand, i) => (
              <Link key={brand} href={`/shop?brand=${brand}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.06 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="px-5 py-3 md:px-8 md:py-4 border border-border rounded-2xl bg-background cursor-pointer hover:border-primary/40 hover:shadow-[0_0_15px_rgba(255,77,77,0.1)] transition-all"
                >
                  <span className="font-black text-sm md:text-base tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors">
                    {brand}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-gradient-to-r from-primary/10 via-card to-amber-500/5 border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Limited Time Offer</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-3 leading-tight">
              Up to <span className="text-primary">40% Off</span><br />Adidas Collection
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">Starting at <span className="text-foreground font-bold">{fmt(8999)}</span></p>
            <Link href="/shop?brand=Adidas">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors text-sm"
                data-testid="button-promo-shop"
              >
                Shop Adidas
              </motion.button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center"
          >
            <motion.img
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500"
              alt="Promo Shoe"
              className="w-48 md:w-64 rounded-2xl object-cover shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-10 md:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl md:text-2xl font-black mb-6 text-center tracking-tight">What People Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-4 md:p-5"
              >
                <div className="flex gap-0.5 mb-2.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-primary">{t.shoe}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-10 md:py-14 px-4 sm:px-6 bg-card border-t border-border">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl font-black mb-2 tracking-tight">Stay in the Loop</h2>
            <p className="text-muted-foreground mb-5 text-sm">Get early access to drops and exclusive deals.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background border border-border rounded-full text-sm focus:outline-none focus:border-primary transition-colors"
                data-testid="input-newsletter-email"
              />
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="px-5 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors text-sm whitespace-nowrap"
                data-testid="button-newsletter-subscribe"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
