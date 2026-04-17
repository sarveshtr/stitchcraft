import { c as createLucideIcon, b as useCartStore, u as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link, A as AnimatePresence, m as motion, B as Button, g as ShoppingBag } from "./index-8S2Cru2x.js";
import { I as Input } from "./input-D6xFgmLn.js";
import { S as Separator } from "./separator-BBeiFi9i.js";
import { C as ChevronLeft } from "./chevron-left-CWXdkJHK.js";
import { T as Trash2 } from "./trash-2-DqtE3yNW.js";
import { M as Minus } from "./minus-DimcWv1p.js";
import { P as Plus } from "./plus-DFxn9OKg.js";
import { A as ArrowRight } from "./arrow-right-DMuIQUSy.js";
import "./index-B_36CAa7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
const DELIVERY_FEE = 150;
const TAX_RATE = 0.05;
function formatPrice(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
function validateCoupon(code) {
  const upper = code.trim().toUpperCase();
  if (upper === "FIRST10")
    return {
      valid: true,
      discount: 10,
      type: "percentage",
      message: "10% off applied!"
    };
  if (upper === "STITCH20")
    return {
      valid: true,
      discount: 20,
      type: "percentage",
      message: "20% off applied!"
    };
  if (upper === "SAVE50")
    return {
      valid: true,
      discount: 50,
      type: "fixed",
      message: "₹50 flat discount applied!"
    };
  return {
    valid: false,
    discount: 0,
    type: "fixed",
    message: "Invalid or expired coupon code."
  };
}
function EmptyCartState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "flex flex-col items-center justify-center py-24 px-6 text-center",
      "data-ocid": "cart.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-10 h-10 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-3", children: "Your cart is empty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 max-w-sm leading-relaxed", children: "You haven't added any services yet. Browse our collection and find the perfect stitching service for you." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", "data-ocid": "cart.continue_shopping.button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", children: [
          "Continue Shopping",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
        ] }) })
      ]
    }
  );
}
function Cart() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = reactExports.useState("");
  const [couponApplied, setCouponApplied] = reactExports.useState(null);
  const [couponError, setCouponError] = reactExports.useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = reactExports.useState(false);
  const subtotal = items.reduce((sum, item) => {
    const addonsTotal = item.selectedAddons.reduce(
      (a, addon) => a + addon.price,
      0
    );
    return sum + (item.service.priceMin + addonsTotal) * item.quantity;
  }, 0);
  const discountAmount = couponApplied ? couponApplied.type === "percentage" ? Math.round(subtotal * couponApplied.discount / 100) : couponApplied.discount : 0;
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
          message: result.message
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
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[70vh] bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 border-b border-border py-6 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold text-foreground", children: "Your Cart" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyCartState, {})
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 border-b border-border py-6 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/services",
          className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
          "data-ocid": "cart.back.link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
            "Continue Shopping"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold text-foreground", children: "Your Cart" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
        "(",
        items.length,
        " ",
        items.length === 1 ? "item" : "items",
        ")"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-4", "data-ocid": "cart.items.list", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: items.map((item, index) => {
        const addonsTotal = item.selectedAddons.reduce(
          (a, addon) => a + addon.price,
          0
        );
        const unitPrice = item.service.priceMin + addonsTotal;
        const lineTotal = unitPrice * item.quantity;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            layout: true,
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -20, height: 0 },
            transition: { delay: index * 0.05 },
            className: "bg-card border border-border rounded-2xl p-5 shadow-elegant",
            "data-ocid": `cart.item.${index + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base truncate", children: item.service.name }),
                    item.fabricType && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                      "Fabric: ",
                      item.fabricType
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeItem(item.service.id),
                      className: "p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth flex-shrink-0",
                      "aria-label": `Remove ${item.service.name}`,
                      "data-ocid": `cart.delete_button.${index + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                item.selectedAddons.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mt-2", children: item.selectedAddons.map((addon) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20",
                    children: [
                      addon.name,
                      " +",
                      formatPrice(addon.price)
                    ]
                  },
                  addon.id
                )) }),
                item.customInstructions && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1.5 italic line-clamp-1", children: [
                  "Note: ",
                  item.customInstructions
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 rounded-lg border border-border overflow-hidden", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => updateQuantity(
                          item.service.id,
                          item.quantity - 1
                        ),
                        className: "p-1.5 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
                        "aria-label": "Decrease quantity",
                        "data-ocid": `cart.qty_minus.${index + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-center text-sm font-medium text-foreground", children: item.quantity }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => updateQuantity(
                          item.service.id,
                          item.quantity + 1
                        ),
                        className: "p-1.5 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
                        "aria-label": "Increase quantity",
                        "data-ocid": `cart.qty_plus.${index + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      formatPrice(unitPrice),
                      " × ",
                      item.quantity
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: formatPrice(lineTotal) })
                  ] })
                ] })
              ] })
            ] })
          },
          item.service.id
        );
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 shadow-elegant", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Coupon Code" })
          ] }),
          couponApplied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between bg-primary/10 border border-primary/20 rounded-xl px-3 py-2.5",
              "data-ocid": "cart.coupon.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary", children: couponApplied.code }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary/80", children: couponApplied.message })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleRemoveCoupon,
                    className: "text-xs text-muted-foreground hover:text-destructive transition-colors ml-2",
                    "data-ocid": "cart.coupon_remove.button",
                    children: "Remove"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Enter code",
                value: couponInput,
                onChange: (e) => {
                  setCouponInput(e.target.value);
                  setCouponError("");
                },
                onKeyDown: (e) => e.key === "Enter" && handleApplyCoupon(),
                className: "flex-1",
                "data-ocid": "cart.coupon.input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: handleApplyCoupon,
                disabled: !couponInput.trim() || isApplyingCoupon,
                "data-ocid": "cart.coupon_apply.button",
                children: isApplyingCoupon ? "…" : "Apply"
              }
            )
          ] }),
          couponError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive mt-2",
              "data-ocid": "cart.coupon.error_state",
              children: couponError
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-2xl p-5 shadow-elegant",
            "data-ocid": "cart.summary.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-5", children: "Order Summary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: formatPrice(subtotal) })
                ] }),
                couponApplied && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
                    "Discount (",
                    couponApplied.code,
                    ")"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-medium", children: [
                    "−",
                    formatPrice(discountAmount)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Delivery Fee" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: formatPrice(DELIVERY_FEE) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Tax (5%)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: formatPrice(taxAmount) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-base", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatPrice(total) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "w-full mt-6 h-11",
                  size: "lg",
                  onClick: () => navigate({ to: "/checkout" }),
                  "data-ocid": "cart.checkout.primary_button",
                  children: [
                    "Proceed to Checkout",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground mt-3", children: "Secure checkout · Free alterations" })
            ]
          }
        )
      ] }) })
    ] }) })
  ] });
}
export {
  Cart as default
};
