import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, LogIn, MapPin, Package } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { useAuth } from "../hooks/use-auth";
import { useUserOrders } from "../hooks/use-backend";
import type { OrderStatus } from "../types";
import { ORDER_STATUS_LABELS } from "../types";

function LoginPrompt() {
  const { login } = useAuth();
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto px-6"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <LogIn className="w-9 h-9 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
          Sign In Required
        </h2>
        <p className="text-muted-foreground mb-8">
          Please sign in to view your orders.
        </p>
        <Button
          type="button"
          size="lg"
          onClick={login}
          data-ocid="orders.login_button"
          className="gap-2 shadow-elegant w-full sm:w-auto"
        >
          <LogIn className="w-4 h-4" />
          Sign In
        </Button>
      </motion.div>
    </div>
  );
}

const STATUS_OPTIONS: { value: "all" | OrderStatus; label: string }[] = [
  { value: "all", label: "All Orders" },
  { value: "received", label: ORDER_STATUS_LABELS.received },
  { value: "in_progress", label: ORDER_STATUS_LABELS.in_progress },
  { value: "stitching", label: ORDER_STATUS_LABELS.stitching },
  { value: "ready", label: ORDER_STATUS_LABELS.ready },
  { value: "delivered", label: ORDER_STATUS_LABELS.delivered },
  { value: "cancelled", label: ORDER_STATUS_LABELS.cancelled },
];

export default function AccountOrders() {
  const { isAuthenticated, isLoading, principal } = useAuth();
  const { data: orders = [], isLoading: ordersLoading } =
    useUserOrders(principal);
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const navigate = useNavigate();

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPrompt />;
  }

  return (
    <div>
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="My Orders"
            badge="Order History"
            subtitle="Track and manage all your tailoring orders."
          >
            <div className="flex items-center gap-3 -mt-2">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link
                  to="/account"
                  data-ocid="orders.account_link"
                  className="hover:text-foreground transition-colors"
                >
                  Account
                </Link>
                <span>/</span>
                <span className="text-foreground">Orders</span>
              </nav>
              <div className="ml-auto">
                <Select
                  value={statusFilter}
                  onValueChange={(v) =>
                    setStatusFilter(v as "all" | OrderStatus)
                  }
                >
                  <SelectTrigger
                    className="w-44 text-sm"
                    data-ocid="orders.status_filter"
                  >
                    <SelectValue placeholder="All Orders" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map(({ value, label }) => (
                      <SelectItem key={value} value={value} className="text-sm">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PageHeader>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {ordersLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div data-ocid="orders.empty_state">
            <EmptyState
              icon={Package}
              title={
                statusFilter === "all"
                  ? "No orders yet"
                  : `No ${ORDER_STATUS_LABELS[statusFilter as OrderStatus]} orders`
              }
              description={
                statusFilter === "all"
                  ? "Your tailoring orders will appear here once you place one."
                  : "No orders match this filter. Try a different status."
              }
              actionLabel={
                statusFilter === "all" ? "Browse Services" : "Clear Filter"
              }
              onAction={
                statusFilter === "all"
                  ? () => navigate({ to: "/services" })
                  : () => setStatusFilter("all")
              }
            />
          </div>
        ) : (
          <div className="space-y-4" data-ocid="orders.list">
            {filteredOrders.map((order, idx) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
                data-ocid={`orders.item.${idx + 1}`}
              >
                <div className="bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lifted p-5 transition-smooth">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Order info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-semibold text-foreground text-sm">
                          #{order.orderNumber}
                        </span>
                        <StatusBadge status={order.status} />
                      </div>
                      <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                        <span className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {order.items.length} item
                          {order.items.length !== 1 ? "s" : ""}
                        </span>
                        <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                          {order.items.map((i) => i.serviceName).join(", ")}
                        </span>
                      </div>
                    </div>

                    {/* Price + actions */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          ₹{order.totalAmount.toLocaleString("en-IN")}
                        </p>
                        {order.discountAmount > 0 && (
                          <p className="text-xs text-emerald-600">
                            −₹{order.discountAmount.toLocaleString("en-IN")}{" "}
                            saved
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to="/track"
                          data-ocid={`orders.track_button.${idx + 1}`}
                        >
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-1.5 text-xs"
                          >
                            <MapPin className="w-3 h-3" />
                            Track
                          </Button>
                        </Link>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-xs text-muted-foreground hover:text-foreground"
                          data-ocid={`orders.view_details_button.${idx + 1}`}
                          onClick={() =>
                            navigate({
                              to: "/track",
                              search: { orderId: order.id },
                            })
                          }
                        >
                          Details
                          <ChevronRight className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Summary row — only if there are orders */}
        {!ordersLoading && orders.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-6"
          >
            <div className="bg-muted/30 rounded-xl border border-border/40 p-5">
              <div className="flex flex-wrap items-center gap-6">
                <div className="text-center">
                  <p className="font-display text-xl font-semibold text-foreground">
                    {orders.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Orders</p>
                </div>
                <div className="h-8 w-px bg-border/60 hidden sm:block" />
                <div className="text-center">
                  <p className="font-display text-xl font-semibold text-foreground">
                    {
                      orders.filter((o) =>
                        (
                          [
                            "received",
                            "in_progress",
                            "stitching",
                            "ready",
                          ] as OrderStatus[]
                        ).includes(o.status),
                      ).length
                    }
                  </p>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
                <div className="h-8 w-px bg-border/60 hidden sm:block" />
                <div className="text-center">
                  <p className="font-display text-xl font-semibold text-foreground">
                    ₹
                    {orders
                      .reduce((sum, o) => sum + o.totalAmount, 0)
                      .toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
