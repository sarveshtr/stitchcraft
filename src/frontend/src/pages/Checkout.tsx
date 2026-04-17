import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ChevronLeft,
  CreditCard,
  Lock,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useCartStore } from "../store/cart";
import type { Address } from "../types";

const DELIVERY_FEE = 150;
const TAX_RATE = 0.05;

function formatPrice(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

function validateAddress(address: Address): FormErrors {
  const errors: FormErrors = {};
  if (!address.fullName.trim()) errors.fullName = "Full name is required";
  if (!address.phone.trim()) errors.phone = "Phone number is required";
  else if (!/^\+?[\d\s-]{10,}$/.test(address.phone))
    errors.phone = "Enter a valid phone number";
  if (!address.addressLine1.trim()) errors.addressLine1 = "Address is required";
  if (!address.city.trim()) errors.city = "City is required";
  if (!address.state.trim()) errors.state = "State is required";
  if (!address.pincode.trim()) errors.pincode = "Pincode is required";
  else if (!/^\d{6}$/.test(address.pincode))
    errors.pincode = "Enter a valid 6-digit pincode";
  return errors;
}

export default function Checkout() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();

  const [address, setAddress] = useState<Address>({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/account" });
    }
  }, [isLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (!isLoading && items.length === 0) {
      navigate({ to: "/cart" });
    }
  }, [isLoading, items.length, navigate]);

  const subtotal = getTotal();
  const taxAmount = Math.round((subtotal + DELIVERY_FEE) * TAX_RATE);
  const total = subtotal + DELIVERY_FEE + taxAmount;

  function handleAddressChange(field: keyof Address, value: string) {
    setAddress((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handlePlaceOrder() {
    const validationErrors = validateAddress(address);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      document
        .getElementById("address-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setIsPlacingOrder(true);
    setPaymentError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const orderId = `SC-${Date.now().toString(36).toUpperCase()}`;
      clearCart();
      navigate({
        to: "/order-confirmation",
        search: { orderId, total: String(total) },
      });
    } catch {
      setPaymentError("Payment failed. Please try again.");
      setIsPlacingOrder(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm"
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-5">
            <Lock className="w-7 h-7 text-muted-foreground" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
            Sign In Required
          </h2>
          <p className="text-muted-foreground mb-6">
            Please sign in to continue with your checkout.
          </p>
          <Button
            onClick={login}
            size="lg"
            className="w-full"
            data-ocid="checkout.login.button"
          >
            Sign In to Continue
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-muted/40 border-b border-border py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link
            to="/cart"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="checkout.back.link"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <h1 className="font-display text-3xl font-semibold text-foreground">
            Checkout
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left — Address + Payment */}
          <div className="lg:col-span-3 space-y-6">
            {/* Address Section */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-elegant"
              id="address-form"
            >
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <h2 className="font-display font-semibold text-foreground text-lg">
                  Delivery Address
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="e.g. Priya Sharma"
                    value={address.fullName}
                    onChange={(e) =>
                      handleAddressChange("fullName", e.target.value)
                    }
                    className={errors.fullName ? "border-destructive" : ""}
                    data-ocid="checkout.full_name.input"
                  />
                  {errors.fullName && (
                    <p
                      className="text-xs text-destructive flex items-center gap-1"
                      data-ocid="checkout.full_name.field_error"
                    >
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={address.phone}
                    onChange={(e) =>
                      handleAddressChange("phone", e.target.value)
                    }
                    className={errors.phone ? "border-destructive" : ""}
                    data-ocid="checkout.phone.input"
                  />
                  {errors.phone && (
                    <p
                      className="text-xs text-destructive flex items-center gap-1"
                      data-ocid="checkout.phone.field_error"
                    >
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <Label htmlFor="addressLine1">Address Line 1 *</Label>
                  <Input
                    id="addressLine1"
                    placeholder="House no., Street name"
                    value={address.addressLine1}
                    onChange={(e) =>
                      handleAddressChange("addressLine1", e.target.value)
                    }
                    className={errors.addressLine1 ? "border-destructive" : ""}
                    data-ocid="checkout.address_line1.input"
                  />
                  {errors.addressLine1 && (
                    <p
                      className="text-xs text-destructive flex items-center gap-1"
                      data-ocid="checkout.address_line1.field_error"
                    >
                      <AlertCircle className="w-3 h-3" /> {errors.addressLine1}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <Label htmlFor="addressLine2">
                    Address Line 2 (optional)
                  </Label>
                  <Input
                    id="addressLine2"
                    placeholder="Apartment, Floor, Landmark"
                    value={address.addressLine2}
                    onChange={(e) =>
                      handleAddressChange("addressLine2", e.target.value)
                    }
                    data-ocid="checkout.address_line2.input"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="Mumbai"
                    value={address.city}
                    onChange={(e) =>
                      handleAddressChange("city", e.target.value)
                    }
                    className={errors.city ? "border-destructive" : ""}
                    data-ocid="checkout.city.input"
                  />
                  {errors.city && (
                    <p
                      className="text-xs text-destructive flex items-center gap-1"
                      data-ocid="checkout.city.field_error"
                    >
                      <AlertCircle className="w-3 h-3" /> {errors.city}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    placeholder="Maharashtra"
                    value={address.state}
                    onChange={(e) =>
                      handleAddressChange("state", e.target.value)
                    }
                    className={errors.state ? "border-destructive" : ""}
                    data-ocid="checkout.state.input"
                  />
                  {errors.state && (
                    <p
                      className="text-xs text-destructive flex items-center gap-1"
                      data-ocid="checkout.state.field_error"
                    >
                      <AlertCircle className="w-3 h-3" /> {errors.state}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    placeholder="400001"
                    maxLength={6}
                    value={address.pincode}
                    onChange={(e) =>
                      handleAddressChange(
                        "pincode",
                        e.target.value.replace(/\D/g, ""),
                      )
                    }
                    className={errors.pincode ? "border-destructive" : ""}
                    data-ocid="checkout.pincode.input"
                  />
                  {errors.pincode && (
                    <p
                      className="text-xs text-destructive flex items-center gap-1"
                      data-ocid="checkout.pincode.field_error"
                    >
                      <AlertCircle className="w-3 h-3" /> {errors.pincode}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value="India"
                    readOnly
                    className="bg-muted/50 text-muted-foreground cursor-not-allowed"
                    data-ocid="checkout.country.input"
                  />
                </div>
              </div>
            </motion.div>

            {/* Order Notes */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-elegant"
            >
              <h2 className="font-display font-semibold text-foreground text-lg mb-4">
                Order Notes (optional)
              </h2>
              <Textarea
                placeholder="Any special instructions or preferences for your order..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="resize-none"
                data-ocid="checkout.order_notes.textarea"
              />
            </motion.div>

            {/* Payment Section */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-elegant"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-primary" />
                </div>
                <h2 className="font-display font-semibold text-foreground text-lg">
                  Payment
                </h2>
              </div>

              <div className="space-y-3">
                <div className="bg-muted/40 border border-border rounded-xl p-4">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Secure payment powered by Stripe
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="h-9 bg-muted rounded-lg animate-pulse" />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-9 bg-muted rounded-lg animate-pulse" />
                      <div className="h-9 bg-muted rounded-lg animate-pulse" />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  Payments are secured with 256-bit SSL encryption
                </p>
              </div>

              {paymentError && (
                <div
                  className="mt-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-2"
                  data-ocid="checkout.payment.error_state"
                >
                  <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                  <p className="text-sm text-destructive">{paymentError}</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right — Sticky Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-elegant"
              >
                <div className="flex items-center gap-2 mb-5">
                  <ShoppingBag className="w-4 h-4 text-primary" />
                  <h3 className="font-display font-semibold text-foreground">
                    Order Summary
                  </h3>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className="space-y-3 mb-5">
                  {items.map((item) => {
                    const addonsTotal = item.selectedAddons.reduce(
                      (a, addon) => a + addon.price,
                      0,
                    );
                    const lineTotal =
                      (item.service.priceMin + addonsTotal) * item.quantity;
                    return (
                      <div key={item.service.id} className="flex gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
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
                          <p className="text-sm font-medium text-foreground truncate">
                            {item.service.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-foreground flex-shrink-0">
                          {formatPrice(lineTotal)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <Separator />
                <div className="space-y-2.5 mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-foreground">
                      {formatPrice(DELIVERY_FEE)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (5%)</span>
                    <span className="text-foreground">
                      {formatPrice(taxAmount)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-base pt-1">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full mt-6 h-12 text-base"
                  size="lg"
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder}
                  data-ocid="checkout.place_order.submit_button"
                >
                  {isPlacingOrder ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                      Processing…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Place Order · {formatPrice(total)}
                    </span>
                  )}
                </Button>

                {isPlacingOrder && (
                  <p
                    className="text-xs text-center text-muted-foreground mt-2"
                    data-ocid="checkout.payment.loading_state"
                  >
                    Processing your payment securely…
                  </p>
                )}
              </motion.div>

              <p className="text-xs text-center text-muted-foreground px-2">
                By placing an order you agree to our{" "}
                <span className="text-primary cursor-pointer hover:underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-primary cursor-pointer hover:underline">
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
