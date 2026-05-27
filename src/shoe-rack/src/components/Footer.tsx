import { Link } from "wouter";
import { ShoppingBag, Instagram, Twitter, Youtube } from "lucide-react";

const brands = ["Nike", "Adidas", "Jordan", "Puma", "New Balance"];
const shopLinks = [
  { label: "All Sneakers", href: "/shop" },
  { label: "Men", href: "/shop?category=Men" },
  { label: "Women", href: "/shop?category=Women" },
  { label: "New Arrivals", href: "/shop?tag=new" },
  { label: "Sale", href: "/shop?sale=true" },
];
const supportLinks = [
  { label: "Size Guide", href: "/support#size-guide" },
  { label: "Shipping Policy", href: "/support#shipping" },
  { label: "Returns & Exchanges", href: "/support#returns" },
  { label: "Track Order", href: "/profile" },
  { label: "Contact Us", href: "/support#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag size={20} className="text-primary" />
              <span className="font-bold text-base tracking-widest uppercase">Shoe Rack</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              The future is on your feet. Premium sneakers curated for those who move culture forward.
            </p>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Instagram size={15} />
              </button>
              <button className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Twitter size={15} />
              </button>
              <button className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Youtube size={15} />
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase mb-4">Shop</h4>
            <div className="flex flex-col gap-2">
              {shopLinks.map(({ label, href }) => (
                <Link key={label} href={href}>
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer block">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase mb-4">Brands</h4>
            <div className="flex flex-col gap-2">
              {brands.map((brand) => (
                <Link key={brand} href={`/shop?brand=${brand}`}>
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer block">{brand}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase mb-4">Support</h4>
            <div className="flex flex-col gap-2">
              {supportLinks.map(({ label, href }) => (
                <Link key={label} href={href}>
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer block">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">
            2024 Shoe Rack India. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
