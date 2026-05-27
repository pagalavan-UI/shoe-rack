import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  Users,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: PlusCircle, label: "Add Product", href: "/admin/add-product" },
  { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
  { icon: Users, label: "Users", href: "/admin/users" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  const NavContent = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <>
      <nav className="flex-1 py-6 flex flex-col gap-1 px-2">
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = location === href || (href !== "/admin" && location.startsWith(href));
          return (
            <Link key={href} href={href} onClick={onLinkClick}>
              <div
                data-testid={`link-admin-${label.toLowerCase().replace(" ", "-")}`}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer ${
                  active
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon size={20} className="shrink-0" />
                {(!collapsed || onLinkClick) && (
                  <span className="text-sm font-medium whitespace-nowrap">{label}</span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="px-2 pb-6 border-t border-border pt-4">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <span className="text-primary text-xs font-bold">AD</span>
          </div>
          {(!collapsed || onLinkClick) && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">admin@shoerack.com</p>
            </div>
          )}
        </div>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all mt-1">
          <LogOut size={20} className="shrink-0" />
          {(!collapsed || onLinkClick) && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* ── Desktop Sidebar ── */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative flex-col bg-card border-r border-border overflow-hidden shrink-0 hidden md:flex"
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-border">
          {!collapsed && (
            <span className="font-bold text-lg tracking-widest text-primary">SHOE RACK</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors ml-auto"
            data-testid="button-toggle-sidebar"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        <NavContent />
      </motion.aside>

      {/* ── Mobile Drawer Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-4 h-16 border-b border-border">
                <span className="font-bold text-lg tracking-widest text-primary">SHOE RACK</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <NavContent onLinkClick={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <div className="flex-1 overflow-auto min-w-0">
        <header className="h-14 md:h-16 border-b border-border flex items-center px-4 md:px-6 gap-3 sticky top-0 bg-background/95 backdrop-blur-sm z-30">
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            data-testid="button-mobile-admin-menu"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-sm text-muted-foreground">Admin Panel</h1>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
