import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { Eye, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { StatusBadge } from "../../components/StatusBadge";
import { useAuth } from "../../hooks/use-auth";
import { useOrders } from "../../hooks/use-backend";
import type { Order, OrderStatus } from "../../types";
import { ORDER_STATUS_LABELS } from "../../types";

const STATUS_FILTERS: { label: string; value: OrderStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Received", value: "received" },
  { label: "In Progress", value: "in_progress" },
  { label: "Stitching", value: "stitching" },
  { label: "Ready", value: "ready" },
  { label: "Delivered", value: "delivered" },
];

const ALL_STATUSES: OrderStatus[] = [
  "received",
  "in_progress",
  "stitching",
  "ready",
  "delivered",
  "cancelled",
];

function useUpdateOrderStatus() {
  return (orderId: string, status: OrderStatus) => {
    // TODO: replace with actor.updateOrderStatus(orderId, status)
    console.log("Update order", orderId, "to", status);
  };
}

function OrderDetailModal({
  order,
  onClose,
}: {
  order: Order | null;
  onClose: () => void;
}) {
  if (!order) return null;
  return (
    <Dialog open={!!order} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-lg max-h-[80vh] overflow-y-auto"
        data-ocid="admin.orders.detail.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">
            Order #{order.orderNumber}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5 pt-2">
          <div className="flex items-center justify-between">
            <StatusBadge status={order.status} />
            <span className="text-sm text-muted-foreground">
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Items
            </h3>
            <div className="space-y-2">
              {order.items.length === 0 ? (
                <p className="text-sm text-muted-foreground">No items</p>
              ) : (
                order.items.map((item, i) => (
                  <div
                    key={`${item.serviceId}-${i}`}
                    className="flex items-center justify-between p-3 bg-muted/40 rounded-lg text-sm"
                  >
                    <div>
                      <p className="font-medium">{item.serviceName}</p>
                      {item.fabricType && (
                        <p className="text-xs text-muted-foreground">
                          Fabric: {item.fabricType}
                        </p>
                      )}
                    </div>
                    <span className="font-semibold">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Delivery Address */}
          {order.deliveryAddress?.fullName && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Delivery Address
              </h3>
              <div className="p-3 bg-muted/40 rounded-lg text-sm text-muted-foreground space-y-0.5">
                <p className="font-medium text-foreground">
                  {order.deliveryAddress.fullName}
                </p>
                <p>{order.deliveryAddress.phone}</p>
                <p>{order.deliveryAddress.addressLine1}</p>
                {order.deliveryAddress.addressLine2 && (
                  <p>{order.deliveryAddress.addressLine2}</p>
                )}
                <p>
                  {order.deliveryAddress.city}, {order.deliveryAddress.state} —{" "}
                  {order.deliveryAddress.pincode}
                </p>
              </div>
            </div>
          )}

          {/* Coupon */}
          {order.couponCode && (
            <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm">
              <span className="text-muted-foreground">
                Coupon applied: <strong>{order.couponCode}</strong>
              </span>
              <span className="text-emerald-600 font-semibold">
                -₹{order.discountAmount.toLocaleString("en-IN")}
              </span>
            </div>
          )}

          {/* Total */}
          <div className="flex items-center justify-between pt-2 border-t border-border text-sm font-semibold">
            <span>Total</span>
            <span className="text-lg">
              ₹{order.totalAmount.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Notes */}
          {order.notes && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">
                Notes
              </h3>
              <p className="text-sm text-muted-foreground p-3 bg-muted/40 rounded-lg">
                {order.notes}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={onClose}
            data-ocid="admin.orders.detail.close_button"
            className="px-4 py-2 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-smooth"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminOrders() {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAuth();
  const { data: orders, isLoading: ordersLoading } = useOrders();
  const updateStatus = useUpdateOrderStatus();

  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [localStatuses, setLocalStatuses] = useState<
    Record<string, OrderStatus>
  >({});

  useEffect(() => {
    if (!isLoading && !isAdmin) navigate({ to: "/account" });
  }, [isAdmin, isLoading, navigate]);

  if (isLoading || !isAdmin) return null;

  const allOrders = orders ?? [];
  const filtered =
    filter === "all" ? allOrders : allOrders.filter((o) => o.status === filter);

  function handleStatusChange(orderId: string, status: OrderStatus) {
    setLocalStatuses((prev) => ({ ...prev, [orderId]: status }));
    updateStatus(orderId, status);
  }

  function getStatus(order: Order): OrderStatus {
    return localStatuses[order.id] ?? order.status;
  }

  return (
    <div className="space-y-6" data-ocid="admin.orders.page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="text-2xl font-display font-bold text-foreground">
          Orders Management
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {allOrders.length} total orders
        </p>
      </motion.div>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="flex flex-wrap gap-2"
        data-ocid="admin.orders.filter"
      >
        {STATUS_FILTERS.map((f) => (
          <button
            type="button"
            key={f.value}
            onClick={() => setFilter(f.value)}
            data-ocid={`admin.orders.filter.${f.value}.tab`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-smooth border ${
              filter === f.value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {f.label}
            {f.value !== "all" && (
              <span className="ml-1.5 opacity-60 text-xs">
                ({allOrders.filter((o) => o.status === f.value).length})
              </span>
            )}
          </button>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
        data-ocid="admin.orders.table"
      >
        <div className="overflow-x-auto">
          {ordersLoading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 text-center"
              data-ocid="admin.orders.empty_state"
            >
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
                <X className="w-6 h-6 text-muted-foreground/50" />
              </div>
              <p className="font-medium text-foreground">No orders found</p>
              <p className="text-sm text-muted-foreground mt-1">
                {filter !== "all"
                  ? `No orders with status "${ORDER_STATUS_LABELS[filter]}"`
                  : "No orders yet"}
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground whitespace-nowrap">
                    Order ID
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                    Customer
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                    Items
                  </th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">
                    Total
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground whitespace-nowrap">
                    Date
                  </th>
                  <th className="text-center px-5 py-3 font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order, i) => (
                  <tr
                    key={order.id}
                    data-ocid={`admin.orders.item.${i + 1}`}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground whitespace-nowrap">
                      #{order.orderNumber}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">
                        {order.userId.slice(0, 10)}…
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""}
                    </td>
                    <td className="px-5 py-3.5 text-right font-semibold text-foreground whitespace-nowrap">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={getStatus(order)}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value as OrderStatus,
                          )
                        }
                        data-ocid={`admin.orders.status.${i + 1}.select`}
                        className="text-xs border border-border rounded-lg px-2 py-1 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
                      >
                        {ALL_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {ORDER_STATUS_LABELS[s]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        data-ocid={`admin.orders.view.${i + 1}.button`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 text-xs font-medium transition-smooth"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
