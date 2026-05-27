import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, User, Menu, X, Sun, Moon, Search } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useDarkMode } from "@/hooks/useDarkMode";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Men", href: "/shop?category=Men" },
  { label: "Women", href: "/shop?category=Women" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { isDark, toggle } = useDarkMode();
  const [location] = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg" : "bg-background/80 backdrop-blur-md border-b border-border/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer" data-testid="link-logo">
            <ShoppingBag size={20} className="text-primary" />
            <span className="font-bold text-base md:text-lg tracking-[0.2em] uppercase text-foreground">
              Shoe Rack
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href}>
              <span
                data-testid={`link-nav-${label.toLowerCase()}`}
                className={`text-sm font-medium tracking-wide cursor-pointer transition-colors hover:text-primary ${
                  location === href.split("?")[0] ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            onClick={toggle}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            data-testid="button-dark-mode-toggle"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <Link href="/shop">
            <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground hidden md:flex" data-testid="button-search">
              <Search size={17} />
            </button>
          </Link>

          <Link href="/wishlist">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" data-testid="link-wishlist">
              <Heart size={17} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </button>
          </Link>

          <Link href="/cart">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" data-testid="link-cart">
              <ShoppingBag size={17} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </Link>

          <Link href="/profile">
            <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground hidden md:flex" data-testid="link-profile">
              <User size={17} />
            </button>
          </Link>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 md:hidden z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 h-full w-72 bg-card border-l border-border z-50 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <span className="font-bold tracking-widest uppercase text-primary">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-muted">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
                {[...navLinks, { label: "Profile", href: "/profile" }, { label: "Wishlist", href: "/wishlist" }, { label: "Cart", href: "/cart" }].map(({ label, href }) => (
                  <Link key={label} href={href}>
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-muted transition-colors cursor-pointer">
                      <span className="font-medium text-foreground">{label}</span>
                      {label === "Cart" && totalItems > 0 && (
                        <span className="px-2 py-0.5 bg-primary text-white text-xs font-bold rounded-full">{totalItems}</span>
                      )}
                      {label === "Wishlist" && wishlistItems.length > 0 && (
                        <span className="px-2 py-0.5 bg-primary text-white text-xs font-bold rounded-full">{wishlistItems.length}</span>
                      )}
                    </div>
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-border">
                <button onClick={toggle} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-muted hover:bg-muted/70 transition-colors text-sm font-medium">
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
