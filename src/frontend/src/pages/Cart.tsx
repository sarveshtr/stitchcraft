import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  Minus,
  Plus,
  ShoppingBag,
  Tag,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCartStore } from "../store/cart";

const DELIVERY_FEE = 150;
const TAX_RATE = 0.05;

function formatPrice(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function validateCoupon(code: string): {
  valid: boolean;
  discount: number;
  type: "percentage" | "fixed";
  message: string;
} {
  const upper = code.trim().toUpperCase();
  if (upper === "FIRST10")
    return {
      valid: true,
      discount: 10,
      type: "percentage",
      message: "10% off applied!",
    };
  if (upper === "STITCH20")
    return {
      valid: true,
      discount: 20,
      type: "percentage",
      message: "20% off applied!",
    };
  if (upper === "SAVE50")
    return {
      valid: true,
      discount: 50,
      type: "fixed",
      message: "₹50 flat discount applied!",
    };
  return {
    valid: false,
    discount: 0,
    type: "fixed",
    message: "Invalid or expired coupon code.",
  };
}

function EmptyCartState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
      data-ocid="cart.empty_state"
    >
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <ShoppingBag className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
        Your cart is empty
      </h2>
      <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
        You haven't added any services yet. Browse our collection and find the
        perfect stitching service for you.
      </p>
      <Button asChild size="lg" data-ocid="cart.continue_shopping.button">
        <Link to="/services">
          Continue Shopping
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </Button>
    </motion.div>
  );
}

export default function Cart() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState("");
  const [couponApplied, setCouponApplied] = useState<{
    code: string;
    discount: number;
    type: "percentage" | "fixed";
    message: string;
  } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const subtotal = items.reduce((sum, item) => {
    const addonsTotal = item.selectedAddons.reduce(
      (a, addon) => a + addon.price,
      0,
    );
    return sum + (item.service.priceMin + addonsTotal) * item.quantity;
  }, 0);

  const discountAmount = couponApplied
    ? couponApplied.type === "percentage"
      ? Math.round((subtotal * couponApplied.discount) / 100)
      : couponApplied.discount
    : 0;

  const taxableAmount = subtotal - discountAmount + DELIVERY_FEE;
  const taxAmount = Math.round(taxableAmount * TAX_RATE);
  const total = taxableAmount + taxAmount;

  function handleApplyCoupon() {
    if (!couponInput.trim()) return;
    setIsApplyingCoupon(true);
    setCouponError("");
    setCouponApplied(null);
    setTimeout(() => {
      const result = validateCoupon(couponInput);
      if (result.valid) {
        setCouponApplied({
          code: couponInput.trim().toUpperCase(),
          discount: result.discount,
          type: result.type,
          message: result.message,
        });
        setCouponError("");
      } else {
        setCouponError(result.message);
      }
      setIsApplyingCoupon(false);
    }, 600);
  }

  function handleRemoveCoupon() {
    setCouponApplied(null);
    setCouponInput("");
    setCouponError("");
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-background">
        <div className="bg-muted/40 border-b border-border py-6 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-display text-3xl font-semibold text-foreground">
              Your Cart
            </h1>
          </div>
        </div>
        <EmptyCartState />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-muted/40 border-b border-border py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link
            to="/services"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="cart.back.link"
          >
            <ChevronLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <h1 className="font-display text-3xl font-semibold text-foreground">
            Your Cart
          </h1>
          <span className="text-sm text-muted-foreground">
            ({items.length} {items.length === 1 ? "item" : "items"})
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4" data-ocid="cart.items.list">
            <AnimatePresence initial={false}>
              {items.map((item, index) => {
                const addonsTotal = item.selectedAddons.reduce(
                  (a, addon) => a + addon.price,
                  0,
                );
                const unitPrice = item.service.priceMin + addonsTotal;
                const lineTotal = unitPrice * item.quantity;

                return (
                  <motion.div
                    key={item.service.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card border border-border rounded-2xl p-5 shadow-elegant"
                    data-ocid={`cart.item.${index + 1}`}
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                        <img
                          src={item.service.imageUrl}
                          alt={item.service.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/assets/images/placeholder.svg";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="font-display font-semibold text-foreground text-base truncate">
                              {item.service.name}
                            </h3>
                            {item.fabricType && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Fabric: {item.fabricType}
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.service.id)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth flex-shrink-0"
                            aria-label={`Remove ${item.service.name}`}
                            data-ocid={`cart.delete_button.${index + 1}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {item.selectedAddons.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {item.selectedAddons.map((addon) => (
                              <span
                                key={addon.id}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
                              >
                                {addon.name} +{formatPrice(addon.price)}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.customInstructions && (
                          <p className="text-xs text-muted-foreground mt-1.5 italic line-clamp-1">
                            Note: {item.customInstructions}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-1 rounded-lg border border-border overflow-hidden">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.service.id,
                                  item.quantity - 1,
                                )
                              }
                              className="p-1.5 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                              aria-label="Decrease quantity"
                              data-ocid={`cart.qty_minus.${index + 1}`}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.service.id,
                                  item.quantity + 1,
                                )
                              }
                              className="p-1.5 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                              aria-label="Increase quantity"
                              data-ocid={`cart.qty_plus.${index + 1}`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">
                              {formatPrice(unitPrice)} × {item.quantity}
                            </p>
                            <p className="font-semibold text-foreground">
                              {formatPrice(lineTotal)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Order Summary (sticky on desktop) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Coupon Card */}
              <div className="bg-card border border-border rounded-2xl p-5 shadow-elegant">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-primary" />
                  <h3 className="font-display font-semibold text-foreground">
                    Coupon Code
                  </h3>
                </div>
                {couponApplied ? (
                  <div
                    className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-xl px-3 py-2.5"
                    data-ocid="cart.coupon.success_state"
                  >
                    <div>
                      <p className="text-sm font-semibold text-primary">
                        {couponApplied.code}
                      </p>
                      <p className="text-xs text-primary/80">
                        {couponApplied.message}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-xs text-muted-foreground hover:text-destructive transition-colors ml-2"
                      data-ocid="cart.coupon_remove.button"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError("");
                      }}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleApplyCoupon()
                      }
                      className="flex-1"
                      data-ocid="cart.coupon.input"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleApplyCoupon}
                      disabled={!couponInput.trim() || isApplyingCoupon}
                      data-ocid="cart.coupon_apply.button"
                    >
                      {isApplyingCoupon ? "…" : "Apply"}
                    </Button>
                  </div>
                )}
                {couponError && (
                  <p
                    className="text-xs text-destructive mt-2"
                    data-ocid="cart.coupon.error_state"
                  >
                    {couponError}
                  </p>
                )}
              </div>

              {/* Summary Card */}
              <div
                className="bg-card border border-border rounded-2xl p-5 shadow-elegant"
                data-ocid="cart.summary.card"
              >
                <h3 className="font-display font-semibold text-foreground mb-5">
                  Order Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-sm">
                      <span className="text-primary">
                        Discount ({couponApplied.code})
                      </span>
                      <span className="text-primary font-medium">
                        −{formatPrice(discountAmount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="text-foreground font-medium">
                      {formatPrice(DELIVERY_FEE)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (5%)</span>
                    <span className="text-foreground font-medium">
                      {formatPrice(taxAmount)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-base">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full mt-6 h-11"
                  size="lg"
                  onClick={() => navigate({ to: "/checkout" })}
                  data-ocid="cart.checkout.primary_button"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  Secure checkout · Free alterations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
