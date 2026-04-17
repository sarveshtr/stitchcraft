import { c as createLucideIcon, k as useSearch, r as reactExports, j as jsxRuntimeExports, m as motion, P as Package, B as Button, L as Link, C as ChevronRight } from "./index-8S2Cru2x.js";
import { C as CircleCheck } from "./circle-check-C85zSLON.js";
import { C as Clock } from "./clock-BiFJ7_6B.js";
import { M as MapPin } from "./map-pin-ClRg--1x.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M10 12h11", key: "6m4ad9" }],
  ["path", { d: "M10 18h11", key: "11hvi2" }],
  ["path", { d: "M10 6h11", key: "c7qv1k" }],
  ["path", { d: "M4 10h2", key: "16xx2s" }],
  ["path", { d: "M4 6h1v4", key: "cnovpq" }],
  ["path", { d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1", key: "m9a95d" }]
];
const ListOrdered = createLucideIcon("list-ordered", __iconNode);
function formatPrice(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
const NEXT_STEPS = [
  {
    icon: CircleCheck,
    title: "Order Confirmed",
    description: "Your order has been received and confirmed by our team.",
    done: true
  },
  {
    icon: Package,
    title: "Fabric & Material Sourcing",
    description: "We'll source premium fabrics matching your requirements.",
    done: false
  },
  {
    icon: Clock,
    title: "Expert Stitching",
    description: "Our skilled tailors will craft your garment with precision and care.",
    done: false
  },
  {
    icon: MapPin,
    title: "Delivery",
    description: "Your finished garment will be dispatched to your address.",
    done: false
  }
];
function OrderConfirmation() {
  const search = useSearch({ strict: false });
  const orderId = (search == null ? void 0 : search.orderId) ?? `SC-${Date.now().toString(36).toUpperCase()}`;
  const total = (search == null ? void 0 : search.total) ? Number(search.total) : 0;
  reactExports.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background py-16 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { type: "spring", duration: 0.6 },
        className: "text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-flex items-center justify-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { scale: 0 },
                animate: { scale: 1 },
                transition: { type: "spring", delay: 0.1, duration: 0.5 },
                className: "w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { scale: 0 },
                    animate: { scale: 1 },
                    transition: { type: "spring", delay: 0.3, duration: 0.5 },
                    className: "w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: { scale: 0 },
                        animate: { scale: 1 },
                        transition: { type: "spring", delay: 0.5, duration: 0.5 },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CircleCheck,
                          {
                            className: "w-10 h-10 text-primary",
                            strokeWidth: 2
                          }
                        )
                      }
                    )
                  }
                )
              }
            ),
            [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "absolute inset-0 rounded-full border border-primary/20",
                initial: { scale: 1, opacity: 0.8 },
                animate: { scale: 2.5 + i * 0.5, opacity: 0 },
                transition: {
                  delay: 0.4 + i * 0.2,
                  duration: 1,
                  ease: "easeOut"
                }
              },
              i
            ))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.6 },
              className: "font-display text-3xl sm:text-4xl font-semibold text-foreground mb-3",
              children: "Your order has been placed!"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.7 },
              className: "text-muted-foreground text-base",
              children: "Thank you for trusting StitchCraft with your vision. We'll get started right away."
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.8 },
        className: "bg-card border border-border rounded-2xl p-6 shadow-elegant",
        "data-ocid": "order_confirmation.order_id.card",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1 font-medium", children: "Order ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-semibold text-foreground tracking-wide", children: orderId }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              "Placed on",
              " ",
              (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })
            ] })
          ] }),
          total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right sm:border-l sm:border-border sm:pl-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1 font-medium", children: "Total Paid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-semibold text-primary", children: formatPrice(total) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.9 },
        className: "bg-card border border-border rounded-2xl p-6 shadow-elegant",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg mb-6", children: "What Happens Next" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: NEXT_STEPS.map((step, i) => {
            const Icon = step.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: 1 + i * 0.1 },
                className: "flex gap-4 relative",
                children: [
                  i < NEXT_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `absolute left-4 top-9 bottom-0 w-0.5 ${step.done ? "bg-primary/40" : "bg-border"}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${step.done ? "bg-primary text-primary-foreground" : "bg-muted border border-border text-muted-foreground"}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `font-medium text-sm ${step.done ? "text-foreground" : "text-muted-foreground"}`,
                        children: step.title
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: step.description })
                  ] })
                ]
              },
              step.title
            );
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 1.2 },
        className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
        "data-ocid": "order_confirmation.actions.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              size: "lg",
              className: "h-12",
              "data-ocid": "order_confirmation.track_order.button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/track", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 mr-2" }),
                "Track My Order",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-auto" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              size: "lg",
              className: "h-12",
              "data-ocid": "order_confirmation.view_orders.button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/account/orders", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ListOrdered, { className: "w-4 h-4 mr-2" }),
                "View All Orders",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-auto" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "lg",
              className: "sm:col-span-2 h-12",
              "data-ocid": "order_confirmation.continue_shopping.primary_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4 mr-2" }),
                "Back to Home"
              ] })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.p,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 1.4 },
        className: "text-center text-sm text-muted-foreground",
        children: [
          "Have a question?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/contact",
              className: "text-primary hover:underline",
              "data-ocid": "order_confirmation.contact.link",
              children: "Contact our support team"
            }
          )
        ]
      }
    )
  ] }) });
}
export {
  OrderConfirmation as default
};
