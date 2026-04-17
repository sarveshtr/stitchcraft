import { c as createLucideIcon, i as useAuth, u as useNavigate, b as useCartStore, r as reactExports, j as jsxRuntimeExports, m as motion, B as Button, L as Link, g as ShoppingBag } from "./index-8S2Cru2x.js";
import { I as Input } from "./input-D6xFgmLn.js";
import { L as Label } from "./label-BS8SqPNm.js";
import { S as Separator } from "./separator-BBeiFi9i.js";
import { T as Textarea } from "./textarea-CS_Hxw4e.js";
import { C as ChevronLeft } from "./chevron-left-CWXdkJHK.js";
import { M as MapPin } from "./map-pin-ClRg--1x.js";
import { C as CircleAlert } from "./circle-alert-BABCc74e.js";
import "./index-B_36CAa7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
const DELIVERY_FEE = 150;
const TAX_RATE = 0.05;
function formatPrice(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
function validateAddress(address) {
  const errors = {};
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
function Checkout() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const [address, setAddress] = reactExports.useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [notes, setNotes] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  const [isPlacingOrder, setIsPlacingOrder] = reactExports.useState(false);
  const [paymentError, setPaymentError] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/account" });
    }
  }, [isLoading, isAuthenticated, navigate]);
  reactExports.useEffect(() => {
    if (!isLoading && items.length === 0) {
      navigate({ to: "/cart" });
    }
  }, [isLoading, items.length, navigate]);
  const subtotal = getTotal();
  const taxAmount = Math.round((subtotal + DELIVERY_FEE) * TAX_RATE);
  const total = subtotal + DELIVERY_FEE + taxAmount;
  function handleAddressChange(field, value) {
    setAddress((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: void 0 }));
    }
  }
  async function handlePlaceOrder() {
    var _a;
    const validationErrors = validateAddress(address);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      (_a = document.getElementById("address-form")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setIsPlacingOrder(true);
    setPaymentError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2e3));
      const orderId = `SC-${Date.now().toString(36).toUpperCase()}`;
      clearCart();
      navigate({
        to: "/order-confirmation",
        search: { orderId, total: String(total) }
      });
    } catch {
      setPaymentError("Payment failed. Please try again.");
      setIsPlacingOrder(false);
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" }) });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "text-center max-w-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-7 h-7 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-3", children: "Sign In Required" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Please sign in to continue with your checkout." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: login,
              size: "lg",
              className: "w-full",
              "data-ocid": "checkout.login.button",
              children: "Sign In to Continue"
            }
          )
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 border-b border-border py-6 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/cart",
          className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
          "data-ocid": "checkout.back.link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
            "Back to Cart"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold text-foreground", children: "Checkout" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            className: "bg-card border border-border rounded-2xl p-6 shadow-elegant",
            id: "address-form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg", children: "Delivery Address" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fullName", children: "Full Name *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "fullName",
                      placeholder: "e.g. Priya Sharma",
                      value: address.fullName,
                      onChange: (e) => handleAddressChange("fullName", e.target.value),
                      className: errors.fullName ? "border-destructive" : "",
                      "data-ocid": "checkout.full_name.input"
                    }
                  ),
                  errors.fullName && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-xs text-destructive flex items-center gap-1",
                      "data-ocid": "checkout.full_name.field_error",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                        " ",
                        errors.fullName
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone Number *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "phone",
                      type: "tel",
                      placeholder: "+91 98765 43210",
                      value: address.phone,
                      onChange: (e) => handleAddressChange("phone", e.target.value),
                      className: errors.phone ? "border-destructive" : "",
                      "data-ocid": "checkout.phone.input"
                    }
                  ),
                  errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-xs text-destructive flex items-center gap-1",
                      "data-ocid": "checkout.phone.field_error",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                        " ",
                        errors.phone
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "addressLine1", children: "Address Line 1 *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "addressLine1",
                      placeholder: "House no., Street name",
                      value: address.addressLine1,
                      onChange: (e) => handleAddressChange("addressLine1", e.target.value),
                      className: errors.addressLine1 ? "border-destructive" : "",
                      "data-ocid": "checkout.address_line1.input"
                    }
                  ),
                  errors.addressLine1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-xs text-destructive flex items-center gap-1",
                      "data-ocid": "checkout.address_line1.field_error",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                        " ",
                        errors.addressLine1
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "addressLine2", children: "Address Line 2 (optional)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "addressLine2",
                      placeholder: "Apartment, Floor, Landmark",
                      value: address.addressLine2,
                      onChange: (e) => handleAddressChange("addressLine2", e.target.value),
                      "data-ocid": "checkout.address_line2.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "city", children: "City *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "city",
                      placeholder: "Mumbai",
                      value: address.city,
                      onChange: (e) => handleAddressChange("city", e.target.value),
                      className: errors.city ? "border-destructive" : "",
                      "data-ocid": "checkout.city.input"
                    }
                  ),
                  errors.city && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-xs text-destructive flex items-center gap-1",
                      "data-ocid": "checkout.city.field_error",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                        " ",
                        errors.city
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "state", children: "State *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "state",
                      placeholder: "Maharashtra",
                      value: address.state,
                      onChange: (e) => handleAddressChange("state", e.target.value),
                      className: errors.state ? "border-destructive" : "",
                      "data-ocid": "checkout.state.input"
                    }
                  ),
                  errors.state && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-xs text-destructive flex items-center gap-1",
                      "data-ocid": "checkout.state.field_error",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                        " ",
                        errors.state
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pincode", children: "Pincode *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "pincode",
                      placeholder: "400001",
                      maxLength: 6,
                      value: address.pincode,
                      onChange: (e) => handleAddressChange(
                        "pincode",
                        e.target.value.replace(/\D/g, "")
                      ),
                      className: errors.pincode ? "border-destructive" : "",
                      "data-ocid": "checkout.pincode.input"
                    }
                  ),
                  errors.pincode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-xs text-destructive flex items-center gap-1",
                      "data-ocid": "checkout.pincode.field_error",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                        " ",
                        errors.pincode
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "country", children: "Country" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "country",
                      value: "India",
                      readOnly: true,
                      className: "bg-muted/50 text-muted-foreground cursor-not-allowed",
                      "data-ocid": "checkout.country.input"
                    }
                  )
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "bg-card border border-border rounded-2xl p-6 shadow-elegant",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg mb-4", children: "Order Notes (optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  placeholder: "Any special instructions or preferences for your order...",
                  value: notes,
                  onChange: (e) => setNotes(e.target.value),
                  rows: 3,
                  className: "resize-none",
                  "data-ocid": "checkout.order_notes.textarea"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2 },
            className: "bg-card border border-border rounded-2xl p-6 shadow-elegant",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg", children: "Payment" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 border border-border rounded-xl p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
                    "Secure payment powered by Stripe"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 bg-muted rounded-lg animate-pulse" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 bg-muted rounded-lg animate-pulse" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 bg-muted rounded-lg animate-pulse" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
                  "Payments are secured with 256-bit SSL encryption"
                ] })
              ] }),
              paymentError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "mt-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-2",
                  "data-ocid": "checkout.payment.error_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-destructive flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: paymentError })
                  ]
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 16 },
            animate: { opacity: 1, x: 0 },
            className: "bg-card border border-border rounded-2xl p-6 shadow-elegant",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Order Summary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
                  items.length,
                  " ",
                  items.length === 1 ? "item" : "items"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-5", children: items.map((item) => {
                const addonsTotal = item.selectedAddons.reduce(
                  (a, addon) => a + addon.price,
                  0
                );
                const lineTotal = (item.service.priceMin + addonsTotal) * item.quantity;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: item.service.imageUrl,
                      alt: item.service.name,
                      className: "w-full h-full object-cover",
                      onError: (e) => {
                        e.target.src = "/assets/images/placeholder.svg";
                      }
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: item.service.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Qty: ",
                      item.quantity
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground flex-shrink-0", children: formatPrice(lineTotal) })
                ] }, item.service.id);
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatPrice(subtotal) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Delivery" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatPrice(DELIVERY_FEE) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Tax (5%)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatPrice(taxAmount) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-base pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatPrice(total) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "w-full mt-6 h-12 text-base",
                  size: "lg",
                  type: "button",
                  onClick: handlePlaceOrder,
                  disabled: isPlacingOrder,
                  "data-ocid": "checkout.place_order.submit_button",
                  children: isPlacingOrder ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" }),
                    "Processing…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
                    "Place Order · ",
                    formatPrice(total)
                  ] })
                }
              ),
              isPlacingOrder && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-center text-muted-foreground mt-2",
                  "data-ocid": "checkout.payment.loading_state",
                  children: "Processing your payment securely…"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-center text-muted-foreground px-2", children: [
          "By placing an order you agree to our",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary cursor-pointer hover:underline", children: "Terms of Service" }),
          " ",
          "and",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary cursor-pointer hover:underline", children: "Privacy Policy" }),
          "."
        ] })
      ] }) })
    ] }) })
  ] });
}
export {
  Checkout as default
};
