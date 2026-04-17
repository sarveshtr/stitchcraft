import { Button } from "@/components/ui/button";
import { Link, useSearch } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Home,
  ListOrdered,
  MapPin,
  Package,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

function formatPrice(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

const NEXT_STEPS = [
  {
    icon: CheckCircle2,
    title: "Order Confirmed",
    description: "Your order has been received and confirmed by our team.",
    done: true,
  },
  {
    icon: Package,
    title: "Fabric & Material Sourcing",
    description: "We'll source premium fabrics matching your requirements.",
    done: false,
  },
  {
    icon: Clock,
    title: "Expert Stitching",
    description:
      "Our skilled tailors will craft your garment with precision and care.",
    done: false,
  },
  {
    icon: MapPin,
    title: "Delivery",
    description: "Your finished garment will be dispatched to your address.",
    done: false,
  },
];

export default function OrderConfirmation() {
  const search = useSearch({ strict: false }) as {
    orderId?: string;
    total?: string;
  };
  const orderId =
    (search?.orderId as string | undefined) ??
    `SC-${Date.now().toString(36).toUpperCase()}`;
  const total = search?.total ? Number(search.total) : 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Success Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center"
        >
          <div className="relative inline-flex items-center justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1, duration: 0.5 }}
              className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3, duration: 0.5 }}
                className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.5, duration: 0.5 }}
                >
                  <CheckCircle2
                    className="w-10 h-10 text-primary"
                    strokeWidth={2}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-primary/20"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2.5 + i * 0.5, opacity: 0 }}
                transition={{
                  delay: 0.4 + i * 0.2,
                  duration: 1,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-3"
          >
            Your order has been placed!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-muted-foreground text-base"
          >
            Thank you for trusting StitchCraft with your vision. We'll get
            started right away.
          </motion.p>
        </motion.div>

        {/* Order ID Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-card border border-border rounded-2xl p-6 shadow-elegant"
          data-ocid="order_confirmation.order_id.card"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-medium">
                Order ID
              </p>
              <p className="font-display text-2xl font-semibold text-foreground tracking-wide">
                {orderId}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Placed on{" "}
                {new Date().toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            {total > 0 && (
              <div className="text-right sm:border-l sm:border-border sm:pl-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-medium">
                  Total Paid
                </p>
                <p className="font-display text-2xl font-semibold text-primary">
                  {formatPrice(total)}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* What Happens Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-card border border-border rounded-2xl p-6 shadow-elegant"
        >
          <h2 className="font-display font-semibold text-foreground text-lg mb-6">
            What Happens Next
          </h2>
          <div>
            {NEXT_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + i * 0.1 }}
                  className="flex gap-4 relative"
                >
                  {i < NEXT_STEPS.length - 1 && (
                    <div
                      className={`absolute left-4 top-9 bottom-0 w-0.5 ${step.done ? "bg-primary/40" : "bg-border"}`}
                    />
                  )}
                  <div
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${step.done ? "bg-primary text-primary-foreground" : "bg-muted border border-border text-muted-foreground"}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="pb-6">
                    <p
                      className={`font-medium text-sm ${step.done ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          data-ocid="order_confirmation.actions.section"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12"
            data-ocid="order_confirmation.track_order.button"
          >
            <Link to="/track">
              <Package className="w-4 h-4 mr-2" />
              Track My Order
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12"
            data-ocid="order_confirmation.view_orders.button"
          >
            <Link to="/account/orders">
              <ListOrdered className="w-4 h-4 mr-2" />
              View All Orders
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="sm:col-span-2 h-12"
            data-ocid="order_confirmation.continue_shopping.primary_button"
          >
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </motion.div>

        {/* Support Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center text-sm text-muted-foreground"
        >
          Have a question?{" "}
          <Link
            to="/contact"
            className="text-primary hover:underline"
            data-ocid="order_confirmation.contact.link"
          >
            Contact our support team
          </Link>
        </motion.p>
      </div>
    </div>
  );
}
