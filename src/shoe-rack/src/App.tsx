import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "@/hooks/useCart";
import { WishlistProvider } from "@/hooks/useWishlist";
import { DarkModeProvider } from "@/hooks/useDarkMode";
import UserLayout from "@/layouts/UserLayout";
import AdminLayout from "@/layouts/AdminLayout";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Wishlist from "@/pages/Wishlist";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminAddProduct from "@/pages/admin/AdminAddProduct";
import AdminOrders from "@/pages/admin/AdminOrders";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/admin/products" component={() => <AdminLayout><AdminProducts /></AdminLayout>} />
        <Route path="/admin/add-product" component={() => <AdminLayout><AdminAddProduct /></AdminLayout>} />
        <Route path="/admin/orders" component={() => <AdminLayout><AdminOrders /></AdminLayout>} />
        <Route path="/admin" component={() => <AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/shop" component={() => <UserLayout><Shop /></UserLayout>} />
        <Route path="/product/:id" component={() => <UserLayout><ProductDetail /></UserLayout>} />
        <Route path="/cart" component={() => <UserLayout><Cart /></UserLayout>} />
        <Route path="/checkout" component={() => <UserLayout><Checkout /></UserLayout>} />
        <Route path="/wishlist" component={() => <UserLayout><Wishlist /></UserLayout>} />
        <Route path="/profile" component={() => <UserLayout><Profile /></UserLayout>} />
        <Route path="/" component={() => <UserLayout><Home /></UserLayout>} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DarkModeProvider>
          <CartProvider>
            <WishlistProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
              </WouterRouter>
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </DarkModeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
