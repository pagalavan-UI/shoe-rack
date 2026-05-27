import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { MOCK_PRODUCTS } from "@/data/products";

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export default function Wishlist() {
  const { items, toggleItem } = useWishlist();
  const { addItem } = useCart();

  const wishlistProducts = items
    .map((id) => MOCK_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof MOCK_PRODUCTS;

  if (wishlistProducts.length === 0) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <Heart size={56} className="text-muted-foreground mx-auto mb-4 opacity-30" />
          <h2 className="text-2xl font-black mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6 text-sm">Save items you love to find them later.</p>
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors"
              data-testid="button-browse-shop"
            >
              Browse Shop
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1">Wishlist</h1>
        <p className="text-muted-foreground mb-6 md:mb-8 text-sm">{wishlistProducts.length} saved items</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          <AnimatePresence>
            {wishlistProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-[0_0_20px_rgba(255,77,77,0.1)] transition-all"
                data-testid={`card-wishlist-${product.id}`}
              >
                <Link href={`/product/${product.id}`}>
                  <div className="relative overflow-hidden aspect-square bg-muted">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => { e.preventDefault(); toggleItem(product.id); }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-primary/90 text-white"
                      data-testid={`button-remove-wishlist-${product.id}`}
                    >
                      <Heart size={13} className="fill-white" />
                    </button>
                  </div>
                </Link>
                <div className="p-3">
                  <p className="text-[10px] text-primary font-semibold tracking-widest uppercase mb-0.5">{product.brand}</p>
                  <h3 className="font-semibold text-xs truncate mb-1">{product.name}</h3>
                  <p className="font-black text-sm mb-2">{fmt(product.price)}</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => addItem({ id: product.id, size: product.sizes[0], color: product.colors[0] })}
                    className="w-full py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-primary hover:text-white transition-all"
                    data-testid={`button-move-to-cart-${product.id}`}
                  >
                    <ShoppingBag size={12} />
                    Move to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
