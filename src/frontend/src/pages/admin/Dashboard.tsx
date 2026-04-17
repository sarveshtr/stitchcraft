import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  IndianRupee,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { StatusBadge } from "../../components/StatusBadge";
import { useAuth } from "../../hooks/use-auth";
import { useAdminStats, useOrders } from "../../hooks/use-backend";

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  prefix,
  delay,
}: {
  label: string;
  value: number | undefined;
  icon: React.ElementType;
  color: string;
  prefix?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-card rounded-2xl border border-border p-6 flex items-center gap-5 shadow-sm"
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        {value === undefined ? (
          <Skeleton className="h-7 w-24 mt-1" />
        ) : (
          <p className="text-2xl font-display font-bold text-foreground mt-0.5">
            {prefix}
            {value.toLocaleString("en-IN")}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAuth();
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: orders, isLoading: ordersLoading } = useOrders();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate({ to: "/account" });
    }
  }, [isAdmin, isLoading, navigate]);

  if (isLoading || !isAdmin) return null;

  const recentOrders = (orders ?? []).slice(0, 10);

  return (
    <div className="space-y-8" data-ocid="admin.dashboard.page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Welcome back — here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/60 rounded-lg px-3 py-1.5">
          <TrendingUp className="w-3.5 h-3.5" />
          Live overview
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        data-ocid="admin.dashboard.stats"
      >
        <StatCard
          label="Total Orders"
          value={statsLoading ? undefined : stats?.totalOrders}
          icon={ShoppingBag}
          color="bg-primary/10 text-primary"
          delay={0.05}
        />
        <StatCard
          label="Total Revenue"
          value={statsLoading ? undefined : stats?.totalRevenue}
          icon={IndianRupee}
          color="bg-emerald-100 text-emerald-600"
          prefix="₹"
          delay={0.1}
        />
        <StatCard
          label="Pending Orders"
          value={statsLoading ? undefined : stats?.pendingOrders}
          icon={Clock}
          color="bg-amber-100 text-amber-600"
          delay={0.15}
        />
        <StatCard
          label="Customers"
          value={statsLoading ? undefined : stats?.totalCustomers}
          icon={Users}
          color="bg-violet-100 text-violet-600"
          delay={0.2}
        />
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
        data-ocid="admin.dashboard.recent_orders"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-display font-semibold text-foreground">
            Recent Orders
          </h2>
          <button
            type="button"
            onClick={() => navigate({ to: "/admin/orders" })}
            data-ocid="admin.dashboard.view_orders.link"
            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            View all
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          {ordersLoading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton only
                <Skeleton key={i} className="h-10 w-full rounded-lg" />
              ))}
            </div>
          ) : recentOrders.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="admin.dashboard.orders.empty_state"
            >
              <ShoppingBag className="w-10 h-10 text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground text-sm">No orders yet</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">
                    Order ID
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">
                    Customer
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-right px-6 py-3 font-medium text-muted-foreground">
                    Total
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr
                    key={order.id}
                    data-ocid={`admin.dashboard.orders.item.${i + 1}`}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-6 py-3.5 font-mono text-xs text-muted-foreground">
                      #{order.orderNumber}
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">
                        {order.userId.slice(0, 12)}…
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-3.5 text-right font-semibold text-foreground">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-3.5 text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="flex flex-wrap gap-3"
        data-ocid="admin.dashboard.quick_actions"
      >
        <button
          type="button"
          onClick={() => navigate({ to: "/admin/orders" })}
          data-ocid="admin.dashboard.manage_orders.button"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-smooth shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          Manage Orders
        </button>
        <button
          type="button"
          onClick={() => navigate({ to: "/admin/services" })}
          data-ocid="admin.dashboard.manage_services.button"
          className="flex items-center gap-2 px-5 py-2.5 bg-card border border-border text-foreground rounded-xl font-medium text-sm hover:bg-muted/60 transition-smooth shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          Manage Services
        </button>
      </motion.div>
    </div>
  );
}
