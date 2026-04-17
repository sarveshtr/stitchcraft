import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useSearch } from "@tanstack/react-router";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Package,
  Scissors,
  Search,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Order, OrderStatus } from "../types";
import { ORDER_STATUS_LABELS } from "../types";

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_ORDERS: Record<string, Order> = {
  "ORD-2026-1001": {
    id: "ORD-2026-1001",
    orderNumber: "ORD-2026-1001",
    userId: "u1",
    status: "stitching",
    totalAmount: 3800,
    couponCode: "",
    discountAmount: 0,
    deliveryAddress: {
      fullName: "Priya Sharma",
      phone: "9876543210",
      addressLine1: "42, Rose Garden Colony",
      addressLine2: "",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    measurementId: "m1",
    tailorId: "t1",
    notes: "",
    createdAt: "2026-04-10T09:00:00Z",
    updatedAt: "2026-04-14T11:30:00Z",
    items: [
      {
        serviceId: "1",
        serviceName: "Blouse Stitching",
        price: 1800,
        quantity: 1,
        addons: [{ id: "a1", name: "Embroidery", price: 500 }],
        customInstructions: "Square neck, short sleeves",
        fabricType: "Pure Silk",
      },
      {
        serviceId: "5",
        serviceName: "Kids Clothing",
        price: 2000,
        quantity: 1,
        addons: [],
        customInstructions: "Frock style, age 6",
        fabricType: "Cotton",
      },
    ],
  },
  "ORD-2026-0988": {
    id: "ORD-2026-0988",
    orderNumber: "ORD-2026-0988",
    userId: "u2",
    status: "delivered",
    totalAmount: 6200,
    couponCode: "BLOOM10",
    discountAmount: 620,
    deliveryAddress: {
      fullName: "Meera Patel",
      phone: "9988776655",
      addressLine1: "15B, Andheri West",
      addressLine2: "Near Station",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400058",
    },
    measurementId: "m2",
    tailorId: "t2",
    notes: "",
    createdAt: "2026-03-28T10:00:00Z",
    updatedAt: "2026-04-06T16:00:00Z",
    items: [
      {
        serviceId: "3",
        serviceName: "Lehenga Stitching",
        price: 6820,
        quantity: 1,
        addons: [{ id: "a5", name: "Heavy Embroidery", price: 2000 }],
        customInstructions: "Bridal, deep pink color theme",
        fabricType: "Raw Silk",
      },
    ],
  },
};

async function fetchTrackOrder(orderId: string): Promise<Order | null> {
  await new Promise((r) => setTimeout(r, 900));
  return MOCK_ORDERS[orderId.trim().toUpperCase()] ?? null;
}

// ─── Timeline config ──────────────────────────────────────────────────────────

type TimelineStep = {
  status: OrderStatus;
  label: string;
  icon: React.ReactNode;
  description: string;
};

const TIMELINE_STEPS: TimelineStep[] = [
  {
    status: "received",
    label: "Order Received",
    icon: <Package className="w-5 h-5" />,
    description: "We've received your order and are reviewing the details.",
  },
  {
    status: "in_progress",
    label: "In Progress",
    icon: <Clock className="w-5 h-5" />,
    description: "Your fabric and materials are being prepared.",
  },
  {
    status: "stitching",
    label: "Stitching",
    icon: <Scissors className="w-5 h-5" />,
    description: "Our expert tailors are crafting your garment.",
  },
  {
    status: "ready",
    label: "Ready for Pickup / Dispatch",
    icon: <CheckCircle2 className="w-5 h-5" />,
    description: "Your order is stitched and quality checked.",
  },
  {
    status: "delivered",
    label: "Delivered",
    icon: <Truck className="w-5 h-5" />,
    description: "Your garment has been delivered. Enjoy!",
  },
];

const STATUS_ORDER: OrderStatus[] = [
  "received",
  "in_progress",
  "stitching",
  "ready",
  "delivered",
];

function getStepState(
  stepStatus: OrderStatus,
  currentStatus: OrderStatus,
): "completed" | "current" | "upcoming" {
  if (currentStatus === "cancelled") return "upcoming";
  const stepIdx = STATUS_ORDER.indexOf(stepStatus);
  const currentIdx = STATUS_ORDER.indexOf(currentStatus);
  if (stepIdx < currentIdx) return "completed";
  if (stepIdx === currentIdx) return "current";
  return "upcoming";
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TrackPageHeader() {
  return (
    <div className="text-center mb-10">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase mb-3">
          <span className="w-6 h-px bg-primary/40" />
          Order Status
          <span className="w-6 h-px bg-primary/40" />
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Track Your Order
        </h1>
        <p className="mt-3 text-muted-foreground text-base max-w-md mx-auto">
          Enter your Order ID to instantly check the status and details of your
          tailoring order.
        </p>
      </motion.div>
    </div>
  );
}

function SearchForm({
  value,
  onChange,
  onSubmit,
  onQuickFill,
  isLoading,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onQuickFill: (id: string) => void;
  isLoading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="max-w-xl mx-auto"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex gap-3 items-center"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            data-ocid="track.search_input"
            type="text"
            placeholder="e.g. ORD-2026-1001"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-10 h-12 text-base rounded-xl border-border bg-card shadow-sm focus-visible:ring-primary/30"
          />
        </div>
        <Button
          type="submit"
          data-ocid="track.submit_button"
          disabled={isLoading || !value.trim()}
          className="h-12 px-7 rounded-xl font-semibold text-sm shadow-sm transition-all duration-200 disabled:opacity-60"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Tracking…
            </span>
          ) : (
            "Track"
          )}
        </Button>
      </form>
      <p className="text-center text-xs text-muted-foreground mt-3">
        Try{" "}
        <button
          type="button"
          className="text-primary hover:underline font-medium"
          onClick={() => onQuickFill("ORD-2026-1001")}
        >
          ORD-2026-1001
        </button>{" "}
        or{" "}
        <button
          type="button"
          className="text-primary hover:underline font-medium"
          onClick={() => onQuickFill("ORD-2026-0988")}
        >
          ORD-2026-0988
        </button>
      </p>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <div
      data-ocid="track.loading_state"
      className="max-w-2xl mx-auto space-y-6 mt-10"
    >
      <Skeleton className="h-24 w-full rounded-2xl" />
      <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-52" />
            </div>
          </div>
        ))}
      </div>
      <Skeleton className="h-40 w-full rounded-2xl" />
    </div>
  );
}

function NotFoundState() {
  return (
    <motion.div
      data-ocid="track.error_state"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-md mx-auto mt-10 text-center bg-card rounded-2xl border border-border p-10 shadow-sm"
    >
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Order Not Found
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        We couldn't find an order matching that ID. Please double-check your
        Order ID and try again.
      </p>
    </motion.div>
  );
}

function OrderStatusBanner({ order }: { order: Order }) {
  const isCancelled = order.status === "cancelled";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "rounded-2xl border p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
        isCancelled
          ? "bg-destructive/5 border-destructive/20"
          : "bg-gradient-to-r from-primary/5 to-accent/10 border-primary/20",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            isCancelled ? "bg-destructive/10" : "bg-primary/10",
          )}
        >
          <ShoppingBag
            className={cn(
              "w-5 h-5",
              isCancelled ? "text-destructive" : "text-primary",
            )}
          />
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-medium">Order ID</p>
          <p className="font-bold text-foreground tracking-wide">
            {order.orderNumber}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>
            Placed{" "}
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
          <span>₹{order.totalAmount.toLocaleString("en-IN")}</span>
        </div>
        <Badge
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold border",
            isCancelled
              ? "bg-destructive/10 text-destructive border-destructive/20"
              : "bg-primary/10 text-primary border-primary/20",
          )}
        >
          {ORDER_STATUS_LABELS[order.status]}
        </Badge>
      </div>
    </motion.div>
  );
}

function StatusTimeline({ order }: { order: Order }) {
  const isCancelled = order.status === "cancelled";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-sm"
    >
      <h2 className="font-semibold text-foreground mb-6 text-base">
        Order Progress
      </h2>

      {isCancelled && (
        <div className="mb-5 flex items-center gap-2 bg-destructive/5 border border-destructive/20 rounded-xl px-4 py-3 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          This order has been cancelled.
        </div>
      )}

      <ol className="relative">
        {TIMELINE_STEPS.map((step, index) => {
          const state = getStepState(step.status, order.status);
          const isLast = index === TIMELINE_STEPS.length - 1;

          return (
            <motion.li
              key={step.status}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.15 + index * 0.07 }}
              className={cn("flex gap-4", !isLast && "pb-6")}
            >
              {/* Icon + connector */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
                    state === "completed" &&
                      "bg-green-100 text-green-600 shadow-sm",
                    state === "current" &&
                      "bg-primary/10 text-primary shadow-md ring-4 ring-primary/10",
                    state === "upcoming" && "bg-muted text-muted-foreground",
                  )}
                >
                  {state === "completed" ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      "w-0.5 flex-1 mt-1 rounded-full transition-colors duration-300",
                      state === "completed" ? "bg-green-200" : "bg-border",
                    )}
                  />
                )}
              </div>

              {/* Text */}
              <div className="pt-1.5 pb-1 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <span
                    className={cn(
                      "font-semibold text-sm",
                      state === "completed" && "text-green-700",
                      state === "current" && "text-primary",
                      state === "upcoming" && "text-muted-foreground",
                    )}
                  >
                    {step.label}
                  </span>
                  {state === "current" && (
                    <span className="inline-flex items-center gap-1 text-xs bg-primary/5 text-primary border border-primary/20 rounded-full px-2 py-0.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Current
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    "text-xs leading-relaxed",
                    state === "upcoming"
                      ? "text-muted-foreground/50"
                      : "text-muted-foreground",
                  )}
                >
                  {step.description}
                </p>
                {state === "current" && (
                  <p className="text-xs text-primary/70 mt-1 font-medium">
                    Updated{" "}
                    {new Date(order.updatedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}
                {state === "completed" && (
                  <p className="text-xs text-green-600 mt-1 font-medium">
                    Completed
                  </p>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </motion.div>
  );
}

function OrderItems({ order }: { order: Order }) {
  const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-sm"
    >
      <h2 className="font-semibold text-foreground mb-4 text-base">
        Order Items
      </h2>
      <ul className="space-y-3">
        {order.items.map((item, idx) => (
          <li
            key={`${item.serviceId}-${idx}`}
            data-ocid={`track.item.${idx + 1}`}
            className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Scissors className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <span className="font-medium text-sm text-foreground truncate">
                  {item.serviceName}{" "}
                  {item.quantity > 1 && (
                    <span className="text-muted-foreground font-normal">
                      ×{item.quantity}
                    </span>
                  )}
                </span>
                <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
              {item.fabricType && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Fabric: {item.fabricType}
                </p>
              )}
              {item.addons.length > 0 && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Add-ons: {item.addons.map((a) => a.name).join(", ")}
                </p>
              )}
              {item.customInstructions && (
                <p className="text-xs text-muted-foreground/70 mt-0.5 italic truncate">
                  "{item.customInstructions}"
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-border space-y-1.5">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        {order.discountAmount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>
              Discount{order.couponCode ? ` (${order.couponCode})` : ""}
            </span>
            <span>−₹{order.discountAmount.toLocaleString("en-IN")}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-foreground text-base pt-1">
          <span>Total</span>
          <span>₹{order.totalAmount.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </motion.div>
  );
}

function DeliveryInfo({ order }: { order: Order }) {
  const addr = order.deliveryAddress;
  if (!addr?.fullName) return null;

  const estimatedDelivery = new Date(order.createdAt);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 14);
  const isDelivered = order.status === "delivered";
  const isCancelled = order.status === "cancelled";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.28 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-sm"
    >
      <h2 className="font-semibold text-foreground mb-4 text-base">
        Delivery Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <p className="text-xs text-muted-foreground mb-1 font-medium">
            Deliver To
          </p>
          <p className="text-sm font-semibold text-foreground">
            {addr.fullName}
          </p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {addr.addressLine1}
            {addr.addressLine2 ? `, ${addr.addressLine2}` : ""}
            <br />
            {addr.city}, {addr.state} — {addr.pincode}
          </p>
          <p className="text-xs text-muted-foreground mt-1">📞 {addr.phone}</p>
        </div>
        {!isCancelled && (
          <div>
            <p className="text-xs text-muted-foreground mb-1 font-medium">
              {isDelivered ? "Delivered On" : "Estimated Delivery"}
            </p>
            <p
              className={cn(
                "text-sm font-semibold flex items-center gap-1.5",
                isDelivered ? "text-green-600" : "text-primary",
              )}
            >
              <Calendar className="w-4 h-4" />
              {isDelivered
                ? new Date(order.updatedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : estimatedDelivery.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
            </p>
            {!isDelivered && (
              <p className="text-xs text-muted-foreground mt-1">
                Approximate — may vary
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function TrackOrder() {
  const searchParams = useSearch({ strict: false }) as { orderId?: string };
  const [inputValue, setInputValue] = useState(searchParams.orderId ?? "");
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const hasAutoSearched = useRef(false);

  async function doSearch(idToSearch: string) {
    const trimmed = idToSearch.trim();
    if (!trimmed) return;
    setIsLoading(true);
    setNotFound(false);
    setOrder(null);
    try {
      const result = await fetchTrackOrder(trimmed);
      if (result) {
        setOrder(result);
      } else {
        setNotFound(true);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit() {
    doSearch(inputValue);
  }

  function handleQuickFill(id: string) {
    setInputValue(id);
    doSearch(id);
  }

  // Auto-search when orderId is in URL query string
  // doSearch is intentionally excluded — it's stable and adding it causes infinite loops
  useEffect(() => {
    if (searchParams.orderId && !hasAutoSearched.current) {
      hasAutoSearched.current = true;
      void fetchTrackOrder(searchParams.orderId).then((result) => {
        if (result) {
          setOrder(result);
        } else {
          setNotFound(true);
        }
        setIsLoading(false);
      });
      setIsLoading(true);
    }
  }, [searchParams.orderId]);

  return (
    <section className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <TrackPageHeader />

        <SearchForm
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          onQuickFill={handleQuickFill}
          isLoading={isLoading}
        />

        <div className="mt-10 space-y-5">
          {isLoading && <LoadingSkeleton />}

          <AnimatePresence mode="wait">
            {!isLoading && notFound && (
              <motion.div
                key="not-found"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <NotFoundState />
              </motion.div>
            )}

            {!isLoading && order && (
              <motion.div
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
                data-ocid="track.result.card"
              >
                <OrderStatusBanner order={order} />
                <StatusTimeline order={order} />
                <OrderItems order={order} />
                <DeliveryInfo order={order} />

                {/* Support CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38 }}
                  className="text-center pt-2 pb-6"
                >
                  <p className="text-sm text-muted-foreground mb-3">
                    Questions about your order?
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    Contact Support
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
