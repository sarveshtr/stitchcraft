import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import {
  ChevronDown,
  Menu,
  Scissors,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useCartStore } from "../store/cart";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Custom Stitching", to: "/custom-stitching" },
  { label: "Gallery", to: "/gallery" },
  { label: "Track Order", to: "/track" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = useCartStore((s) => s.getCount());
  const { isAuthenticated, login, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change
  const currentPath = router.state.location.pathname;
  // biome-ignore lint/correctness/useExhaustiveDependencies: close menu on path change
  useEffect(() => {
    setMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  return (
    <header
      className={`sticky top-0 z-50 transition-smooth ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-elegant border-b border-border"
          : "bg-card border-b border-border"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            to="/"
            data-ocid="nav.logo.link"
            className="flex items-center gap-2.5 transition-smooth hover:opacity-80"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Scissors className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground tracking-tight">
              StitchCraft
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-smooth"
                activeProps={{ className: "text-primary bg-primary/5" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link
              to="/cart"
              data-ocid="nav.cart.link"
              className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center"
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </motion.span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative group hidden md:block">
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-smooth"
                  data-ocid="nav.account.button"
                >
                  <User className="w-4 h-4" />
                  Account
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className="absolute right-0 top-full mt-1 w-44 bg-card border border-border rounded-xl shadow-lifted opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth py-1">
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    data-ocid="nav.account_profile.link"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/account/orders"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    data-ocid="nav.account_orders.link"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/account/measurements"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    data-ocid="nav.account_measurements.link"
                  >
                    Measurements
                  </Link>
                  <div className="border-t border-border my-1" />
                  <button
                    type="button"
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors"
                    data-ocid="nav.logout.button"
                  >
                    Log out
                  </button>
                </div>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={login}
                data-ocid="nav.login.button"
                className="hidden md:flex transition-smooth"
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="nav.mobile_menu.toggle"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-card overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth"
                  activeProps={{ className: "text-primary bg-primary/5" }}
                  data-ocid={`mobile.nav.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-border">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/account"
                      className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth"
                    >
                      My Account
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      className="block w-full text-left px-4 py-2.5 text-sm font-medium text-destructive hover:bg-muted rounded-lg transition-smooth"
                      data-ocid="mobile.nav.logout.button"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <Button
                    className="w-full mt-1"
                    onClick={login}
                    data-ocid="mobile.nav.login.button"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Scissors className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-semibold text-foreground">
                StitchCraft
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bespoke tailoring crafted with love. Your vision, our expertise.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5">
              {[
                "Blouse Stitching",
                "Suit Stitching",
                "Lehenga Stitching",
                "Custom Design",
              ].map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Gallery", to: "/gallery" },
                { label: "Track Order", to: "/track" },
                { label: "Contact", to: "/contact" },
                { label: "Reviews", to: "/reviews" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>📍 123 Fashion Street, Mumbai</li>
              <li>📞 +91 98765 43210</li>
              <li>✉️ hello@stitchcraft.in</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} StitchCraft. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with love using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
