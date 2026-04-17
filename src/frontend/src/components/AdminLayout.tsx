import { Link, useRouter } from "@tanstack/react-router";
import {
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Scissors,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";

const ADMIN_NAV = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Orders", to: "/admin/orders", icon: ShoppingBag },
  { label: "Services", to: "/admin/services", icon: Package },
  { label: "Customers", to: "/admin/customers", icon: Users },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
          <Scissors className="w-4 h-4 text-sidebar-primary-foreground" />
        </div>
        <div>
          <p className="font-display font-semibold text-sidebar-foreground text-sm leading-tight">
            StitchCraft
          </p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Admin Panel
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {ADMIN_NAV.map((item) => {
          const isActive =
            item.to === "/admin"
              ? currentPath === "/admin"
              : currentPath.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              data-ocid={`admin.nav.${item.label.toLowerCase()}.link`}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
              {isActive && (
                <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-70" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <button
          type="button"
          onClick={logout}
          data-ocid="admin.nav.logout.button"
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-smooth"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-sidebar border-r border-sidebar-border shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 flex flex-col w-60 bg-sidebar border-r border-sidebar-border lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            data-ocid="admin.mobile_menu.toggle"
            className="p-2 rounded-lg hover:bg-muted transition-smooth"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <p className="font-display font-semibold text-foreground text-sm">
            StitchCraft Admin
          </p>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-muted transition-smooth ml-auto opacity-0 pointer-events-none"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
