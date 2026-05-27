import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Check, CreditCard, Smartphone, Globe, ChevronRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { MOCK_PRODUCTS } from "@/data/products";

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;
const SHIPPING_COST = 999;
const FREE_THRESHOLD = 10000;

const steps = ["Shipping", "Payment", "Review"];

export default function Checkout() {
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const { items, clearCart } = useCart();
  const cartProducts = items.map((item) => ({
    ...item,
    product: MOCK_PRODUCTS.find((p) => p.id === item.id),
  })).filter((i) => i.product);

  const subtotal = cartProducts.reduce((acc, i) => acc + (i.product!.price * i.quantity), 0);
  const shipping = subtotal >= FREE_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    setSuccess(true);
    clearCart();
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Step indicator */}
        <div className="flex items-center gap-2 md:gap-4 mb-8 justify-center">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-1.5 md:gap-2">
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < step ? "bg-green-600 text-white" : i === step ? "bg-primary text-white" : "bg-muted text-muted-foreground"
              }`}>
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-xs md:text-sm font-semibold ${
                i === step ? "text-foreground" : "text-muted-foreground"
              }`}>{s}</span>
              {i < steps.length - 1 && <ChevronRight size={14} className="text-muted-foreground" />}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="shipping" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <h2 className="text-xl font-black mb-5">Shipping Address</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {[
                      { label: "First Name", id: "firstName", type: "text", placeholder: "Rahul" },
                      { label: "Last Name", id: "lastName", type: "text", placeholder: "Sharma" },
                      { label: "Email", id: "email", type: "email", placeholder: "rahul@example.com", full: true },
                      { label: "Phone", id: "phone", type: "tel", placeholder: "+91 98765 43210" },
                      { label: "Address", id: "address", type: "text", placeholder: "123, MG Road, Apartment 4B", full: true },
                      { label: "City", id: "city", type: "text", placeholder: "Mumbai" },
                      { label: "Pincode", id: "zip", type: "text", placeholder: "400001" },
                      { label: "State", id: "state", type: "text", placeholder: "Maharashtra" },
                    ].map(({ label, id, type, placeholder, full }) => (
                      <div key={id} className={full ? "col-span-1 sm:col-span-2" : ""}>
                        <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{label}</label>
                        <input
                          id={id}
                          type={type}
                          placeholder={placeholder}
                          className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                          data-testid={`input-${id}`}
                        />
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setStep(1)}
                    className="mt-5 w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(255,77,77,0.3)]"
                    data-testid="button-continue-to-payment"
                  >
                    Continue to Payment
                  </motion.button>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="payment" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <h2 className="text-xl font-black mb-5">Payment Method</h2>
                  <div className="space-y-3 mb-5">
                    {[
                      { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay", icon: CreditCard },
                      { id: "upi", label: "UPI", sub: "GPay, PhonePe, Paytm", icon: Smartphone },
                      { id: "netbanking", label: "Net Banking", sub: "All major Indian banks", icon: Globe },
                    ].map(({ id, label, sub, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setPaymentMethod(id)}
                        className={`w-full flex items-center gap-4 px-4 py-4 border-2 rounded-2xl transition-all text-left ${
                          paymentMethod === id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                        }`}
                        data-testid={`button-payment-${id}`}
                      >
                        <Icon size={20} className={paymentMethod === id ? "text-primary" : "text-muted-foreground"} />
                        <div>
                          <p className="font-semibold text-sm">{label}</p>
                          <p className="text-xs text-muted-foreground">{sub}</p>
                        </div>
                        {paymentMethod === id && <Check size={16} className="ml-auto text-primary" />}
                      </button>
                    ))}
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-3 mb-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Card Number</label>
                        <input type="text" placeholder="4111 1111 1111 1111" className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" data-testid="input-card-number" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Expiry</label>
                          <input type="text" placeholder="MM / YY" className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" data-testid="input-expiry" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">CVV</label>
                          <input type="text" placeholder="123" className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" data-testid="input-cvv" />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="mb-5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">UPI ID</label>
                      <input type="text" placeholder="yourname@gpay" className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={() => setStep(0)} className="flex-1 py-4 border border-border font-bold rounded-2xl hover:border-primary/50 transition-colors" data-testid="button-back-shipping">Back</button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setStep(2)}
                      className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-colors"
                      data-testid="button-review-order"
                    >
                      Review Order
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="review" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <h2 className="text-xl font-black mb-5">Review Your Order</h2>
                  <div className="space-y-3 mb-5">
                    {cartProducts.map(({ product, quantity, size }) => (
                      <div key={`${product!.id}-${size}`} className="flex gap-3 bg-card border border-border rounded-xl p-3">
                        <img src={product!.images[0]} alt={product!.name} className="w-14 h-14 object-cover rounded-lg" />
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{product!.name}</p>
                          <p className="text-xs text-muted-foreground">Size: US {size} · Qty: {quantity}</p>
                        </div>
                        <span className="font-bold text-sm">{fmt(product!.price * quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="flex-1 py-4 border border-border font-bold rounded-2xl hover:border-primary/50 transition-colors" data-testid="button-back-payment">Back</button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handlePlaceOrder}
                      className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(255,77,77,0.3)]"
                      data-testid="button-place-order"
                    >
                      Place Order
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 h-fit lg:sticky lg:top-24">
            <h3 className="font-black mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{fmt(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className={shipping === 0 ? "text-green-500 font-semibold" : ""}>{shipping === 0 ? "Free" : fmt(SHIPPING_COST)}</span></div>
              <div className="border-t border-border pt-2 flex justify-between font-black text-base"><span>Total</span><span>{fmt(total)}</span></div>
            </div>
            <p className="text-xs text-muted-foreground text-center">🔒 Secured by 256-bit SSL encryption</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-card border border-border rounded-3xl p-8 md:p-10 text-center max-w-sm w-full"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check size={36} className="text-green-500" />
              </motion.div>
              <h2 className="text-2xl font-black mb-2">Order Placed!</h2>
              <p className="text-muted-foreground mb-1 font-mono text-sm">Order #ORD-{Math.floor(Math.random() * 90000) + 10000}</p>
              <p className="text-sm text-muted-foreground mb-2">Estimated delivery in <span className="text-foreground font-semibold">3–5 business days</span></p>
              <p className="text-xs text-muted-foreground mb-6">You'll receive a confirmation SMS & email shortly.</p>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-colors"
                  data-testid="button-back-home"
                >
                  Back to Home
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
