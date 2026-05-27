import { motion } from "framer-motion";
import { Heart, Star, ShoppingBag, Eye } from "lucide-react";
import { Link } from "wouter";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { toggleItem, isInWishlist } = useWishlist();
  const { addItem } = useCart();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: product.id, size: product.sizes[0] || 10, color: product.colors[0] });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      data-testid={`card-product-${product.id}`}
    >
      <Link href={`/product/${product.id}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="group relative bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:border-primary/30 hover:shadow-[0_0_30px_rgba(255,77,77,0.12)] transition-all duration-300"
        >
          <div className="relative overflow-hidden aspect-square bg-muted">
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className="flex items-center gap-1.5 bg-primary text-white px-3 py-2 rounded-full text-xs font-semibold shadow-lg"
                data-testid={`button-quick-add-${product.id}`}
              >
                <ShoppingBag size={12} />
                Quick Add
              </motion.button>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full cursor-pointer"
              >
                <Eye size={12} />
              </motion.div>
            </div>

            <button
              onClick={handleWishlist}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 transition-all"
              data-testid={`button-wishlist-${product.id}`}
            >
              <Heart
                size={14}
                className={inWishlist ? "fill-primary text-primary" : "text-muted-foreground"}
              />
            </button>

            {product.tags.includes("new") && !product.tags.includes("limited") && !product.originalPrice && (
              <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-white text-[9px] font-bold rounded-full tracking-wider uppercase">New</span>
            )}
            {product.tags.includes("limited") && (
              <span className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500 text-white text-[9px] font-bold rounded-full tracking-wider uppercase">Limited</span>
            )}
            {product.originalPrice && !product.tags.includes("limited") && (
              <span className="absolute top-2 left-2 px-2 py-0.5 bg-green-600 text-white text-[9px] font-bold rounded-full tracking-wider uppercase">Sale</span>
            )}
          </div>

          <div className="p-3">
            <p className="text-[10px] text-primary font-semibold tracking-widest uppercase mb-0.5">{product.brand}</p>
            <h3 className="font-semibold text-xs text-foreground truncate mb-1">{product.name}</h3>
            <div className="flex items-center gap-1 mb-1.5">
              <Star size={10} className="fill-amber-400 text-amber-400" />
              <span className="text-[10px] text-muted-foreground">{product.rating} ({product.reviewCount.toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-foreground">{fmt(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">{fmt(product.originalPrice)}</span>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
