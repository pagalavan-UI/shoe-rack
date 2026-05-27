import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { MOCK_PRODUCTS } from "@/data/products";

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;
const FREE_SHIPPING_THRESHOLD = 10000;
const SHIPPING_COST = 999;

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();

  const cartProducts = items.map((item) => ({
    ...item,
    product: MOCK_PRODUCTS.find((p) => p.id === item.id),
  })).filter((item) => item.product !== undefined);

  const subtotal = cartProducts.reduce((acc, item) => acc + (item.product!.price * item.quantity), 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag size={56} className="text-muted-foreground mx-auto mb-4 opacity-30" />
          <h2 className="text-2xl font-black mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6 text-sm">Start shopping to add items to your cart.</p>
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors"
              data-testid="button-start-shopping"
            >
              Start Shopping
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">Your Cart</h1>
          <button onClick={clearCart} className="text-xs md:text-sm text-muted-foreground hover:text-destructive transition-colors" data-testid="button-clear-cart">
            Clear all
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <div className="md:col-span-2 space-y-3 md:space-y-4">
            <AnimatePresence>
              {cartProducts.map(({ product, quantity, size, color, id }) => (
                <motion.div
                  key={`${id}-${size}`}
                  layout
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3 md:gap-4 bg-card border border-border rounded-2xl p-3 md:p-4"
                  data-testid={`card-cart-item-${id}`}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-muted shrink-0">
                    <img src={product!.images[0]} alt={product!.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-primary font-semibold tracking-widest uppercase">{product!.brand}</p>
                    <h3 className="font-semibold text-sm truncate">{product!.name}</h3>
                    <div className="flex gap-2 text-xs text-muted-foreground mt-0.5">
                      <span>Size: US {size}</span>
                      {color && <span>· {color}</span>}
                    </div>
                    <div className="flex items-center justify-between mt-2 md:mt-3">
                      <div className="flex items-center gap-1.5 bg-muted rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(id, size, quantity - 1)}
                          className="p-1 md:p-1.5 rounded-lg hover:bg-background transition-colors"
                          data-testid={`button-decrease-${id}`}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-semibold w-5 text-center">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(id, size, quantity + 1)}
                          className="p-1 md:p-1.5 rounded-lg hover:bg-background transition-colors"
                          data-testid={`button-increase-${id}`}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <span className="font-bold text-sm">{fmt(product!.price * quantity)}</span>
                        <button
                          onClick={() => removeItem(id, size)}
                          className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                          data-testid={`button-remove-${id}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-5 md:p-6 h-fit md:sticky md:top-24"
          >
            <h2 className="font-black text-lg mb-5">Order Summary</h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                <span className="font-semibold">{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className={shipping === 0 ? "text-green-500 font-semibold" : "font-semibold"}>
                  {shipping === 0 ? "Free" : fmt(SHIPPING_COST)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground bg-primary/5 border border-primary/10 rounded-lg px-3 py-2">
                  Add {fmt(FREE_SHIPPING_THRESHOLD - subtotal)} more for free delivery
                </p>
              )}
              <div className="border-t border-border pt-3 flex justify-between font-black text-lg">
                <span>Total</span>
                <motion.span key={total} initial={{ scale: 1.1 }} animate={{ scale: 1 }}>
                  {fmt(total)}
                </motion.span>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Promo / coupon code"
                className="flex-1 px-3 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                data-testid="input-promo-code"
              />
              <button className="px-3 py-2 border border-border rounded-xl text-sm font-semibold hover:border-primary hover:text-primary transition-colors whitespace-nowrap">
                Apply
              </button>
            </div>

            <Link href="/checkout">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(255,77,77,0.3)]"
                data-testid="button-checkout"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </motion.button>
            </Link>

            <Link href="/shop">
              <button className="w-full mt-3 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="button-continue-shopping">
                Continue Shopping
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
