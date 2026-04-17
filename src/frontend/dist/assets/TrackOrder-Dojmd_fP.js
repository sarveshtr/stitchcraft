import { c as createLucideIcon, k as useSearch, r as reactExports, j as jsxRuntimeExports, A as AnimatePresence, m as motion, C as ChevronRight, B as Button, g as ShoppingBag, d as cn, S as Scissors, P as Package } from "./index-8S2Cru2x.js";
import { B as Badge } from "./badge-BlzNEo3z.js";
import { I as Input } from "./input-D6xFgmLn.js";
import { S as Skeleton } from "./skeleton-CVoRLpDg.js";
import { O as ORDER_STATUS_LABELS } from "./index-BwO3510T.js";
import { S as Search } from "./search-R7E3-zDi.js";
import { C as CircleAlert } from "./circle-alert-BABCc74e.js";
import { C as CircleCheck } from "./circle-check-C85zSLON.js";
import { C as Clock } from "./clock-BiFJ7_6B.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
const MOCK_ORDERS = {
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
      pincode: "400001"
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
        fabricType: "Pure Silk"
      },
      {
        serviceId: "5",
        serviceName: "Kids Clothing",
        price: 2e3,
        quantity: 1,
        addons: [],
        customInstructions: "Frock style, age 6",
        fabricType: "Cotton"
      }
    ]
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
      pincode: "400058"
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
        addons: [{ id: "a5", name: "Heavy Embroidery", price: 2e3 }],
        customInstructions: "Bridal, deep pink color theme",
        fabricType: "Raw Silk"
      }
    ]
  }
};
async function fetchTrackOrder(orderId) {
  await new Promise((r) => setTimeout(r, 900));
  return MOCK_ORDERS[orderId.trim().toUpperCase()] ?? null;
}
const TIMELINE_STEPS = [
  {
    status: "received",
    label: "Order Received",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5" }),
    description: "We've received your order and are reviewing the details."
  },
  {
    status: "in_progress",
    label: "In Progress",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5" }),
    description: "Your fabric and materials are being prepared."
  },
  {
    status: "stitching",
    label: "Stitching",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-5 h-5" }),
    description: "Our expert tailors are crafting your garment."
  },
  {
    status: "ready",
    label: "Ready for Pickup / Dispatch",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }),
    description: "Your order is stitched and quality checked."
  },
  {
    status: "delivered",
    label: "Delivered",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-5 h-5" }),
    description: "Your garment has been delivered. Enjoy!"
  }
];
const STATUS_ORDER = [
  "received",
  "in_progress",
  "stitching",
  "ready",
  "delivered"
];
function getStepState(stepStatus, currentStatus) {
  if (currentStatus === "cancelled") return "upcoming";
  const stepIdx = STATUS_ORDER.indexOf(stepStatus);
  const currentIdx = STATUS_ORDER.indexOf(currentStatus);
  if (stepIdx < currentIdx) return "completed";
  if (stepIdx === currentIdx) return "current";
  return "upcoming";
}
function TrackPageHeader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-px bg-primary/40" }),
          "Order Status",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-px bg-primary/40" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight", children: "Track Your Order" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground text-base max-w-md mx-auto", children: "Enter your Order ID to instantly check the status and details of your tailoring order." })
      ]
    }
  ) });
}
function SearchForm({
  value,
  onChange,
  onSubmit,
  onQuickFill,
  isLoading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: 0.1 },
      className: "max-w-xl mx-auto",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: (e) => {
              e.preventDefault();
              onSubmit();
            },
            className: "flex gap-3 items-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "track.search_input",
                    type: "text",
                    placeholder: "e.g. ORD-2026-1001",
                    value,
                    onChange: (e) => onChange(e.target.value),
                    className: "pl-10 h-12 text-base rounded-xl border-border bg-card shadow-sm focus-visible:ring-primary/30"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  "data-ocid": "track.submit_button",
                  disabled: isLoading || !value.trim(),
                  className: "h-12 px-7 rounded-xl font-semibold text-sm shadow-sm transition-all duration-200 disabled:opacity-60",
                  children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" }),
                    "Tracking…"
                  ] }) : "Track"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-3", children: [
          "Try",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-primary hover:underline font-medium",
              onClick: () => onQuickFill("ORD-2026-1001"),
              children: "ORD-2026-1001"
            }
          ),
          " ",
          "or",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-primary hover:underline font-medium",
              onClick: () => onQuickFill("ORD-2026-0988"),
              children: "ORD-2026-0988"
            }
          )
        ] })
      ]
    }
  );
}
function LoadingSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "track.loading_state",
      className: "max-w-2xl mx-auto space-y-6 mt-10",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border p-6 space-y-5", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-full flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-52" })
          ] })
        ] }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-2xl" })
      ]
    }
  );
}
function NotFoundState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "track.error_state",
      initial: { opacity: 0, scale: 0.97 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.35 },
      className: "max-w-md mx-auto mt-10 text-center bg-card rounded-2xl border border-border p-10 shadow-sm",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "Order Not Found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "We couldn't find an order matching that ID. Please double-check your Order ID and try again." })
      ]
    }
  );
}
function OrderStatusBanner({ order }) {
  const isCancelled = order.status === "cancelled";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: cn(
        "rounded-2xl border p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
        isCancelled ? "bg-destructive/5 border-destructive/20" : "bg-gradient-to-r from-primary/5 to-accent/10 border-primary/20"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                isCancelled ? "bg-destructive/10" : "bg-primary/10"
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                ShoppingBag,
                {
                  className: cn(
                    "w-5 h-5",
                    isCancelled ? "text-destructive" : "text-primary"
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Order ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground tracking-wide", children: order.orderNumber })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Placed",
              " ",
              new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
              })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 text-muted-foreground font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "₹",
            order.totalAmount.toLocaleString("en-IN")
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: cn(
                "rounded-full px-3 py-1 text-xs font-semibold border",
                isCancelled ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-primary/10 text-primary border-primary/20"
              ),
              children: ORDER_STATUS_LABELS[order.status]
            }
          )
        ] })
      ]
    }
  );
}
function StatusTimeline({ order }) {
  const isCancelled = order.status === "cancelled";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.45, delay: 0.1 },
      className: "bg-card rounded-2xl border border-border p-6 shadow-sm",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-6 text-base", children: "Order Progress" }),
        isCancelled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-2 bg-destructive/5 border border-destructive/20 rounded-xl px-4 py-3 text-sm text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
          "This order has been cancelled."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "relative", children: TIMELINE_STEPS.map((step, index) => {
          const state = getStepState(step.status, order.status);
          const isLast = index === TIMELINE_STEPS.length - 1;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.li,
            {
              initial: { opacity: 0, x: -12 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.35, delay: 0.15 + index * 0.07 },
              className: cn("flex gap-4", !isLast && "pb-6"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
                        state === "completed" && "bg-green-100 text-green-600 shadow-sm",
                        state === "current" && "bg-primary/10 text-primary shadow-md ring-4 ring-primary/10",
                        state === "upcoming" && "bg-muted text-muted-foreground"
                      ),
                      children: state === "completed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }) : step.icon
                    }
                  ),
                  !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "w-0.5 flex-1 mt-1 rounded-full transition-colors duration-300",
                        state === "completed" ? "bg-green-200" : "bg-border"
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1.5 pb-1 min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: cn(
                          "font-semibold text-sm",
                          state === "completed" && "text-green-700",
                          state === "current" && "text-primary",
                          state === "upcoming" && "text-muted-foreground"
                        ),
                        children: step.label
                      }
                    ),
                    state === "current" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs bg-primary/5 text-primary border border-primary/20 rounded-full px-2 py-0.5 font-medium", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }),
                      "Current"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: cn(
                        "text-xs leading-relaxed",
                        state === "upcoming" ? "text-muted-foreground/50" : "text-muted-foreground"
                      ),
                      children: step.description
                    }
                  ),
                  state === "current" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary/70 mt-1 font-medium", children: [
                    "Updated",
                    " ",
                    new Date(order.updatedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })
                  ] }),
                  state === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-600 mt-1 font-medium", children: "Completed" })
                ] })
              ]
            },
            step.status
          );
        }) })
      ]
    }
  );
}
function OrderItems({ order }) {
  const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.45, delay: 0.2 },
      className: "bg-card rounded-2xl border border-border p-6 shadow-sm",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-4 text-base", children: "Order Items" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: order.items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            "data-ocid": `track.item.${idx + 1}`,
            className: "flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-sm text-foreground truncate", children: [
                    item.serviceName,
                    " ",
                    item.quantity > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal", children: [
                      "×",
                      item.quantity
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground whitespace-nowrap", children: [
                    "₹",
                    (item.price * item.quantity).toLocaleString("en-IN")
                  ] })
                ] }),
                item.fabricType && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  "Fabric: ",
                  item.fabricType
                ] }),
                item.addons.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  "Add-ons: ",
                  item.addons.map((a) => a.name).join(", ")
                ] }),
                item.customInstructions && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/70 mt-0.5 italic truncate", children: [
                  '"',
                  item.customInstructions,
                  '"'
                ] })
              ] })
            ]
          },
          `${item.serviceId}-${idx}`
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-border space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₹",
              subtotal.toLocaleString("en-IN")
            ] })
          ] }),
          order.discountAmount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-green-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Discount",
              order.couponCode ? ` (${order.couponCode})` : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "−₹",
              order.discountAmount.toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-foreground text-base pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₹",
              order.totalAmount.toLocaleString("en-IN")
            ] })
          ] })
        ] })
      ]
    }
  );
}
function DeliveryInfo({ order }) {
  const addr = order.deliveryAddress;
  if (!(addr == null ? void 0 : addr.fullName)) return null;
  const estimatedDelivery = new Date(order.createdAt);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 14);
  const isDelivered = order.status === "delivered";
  const isCancelled = order.status === "cancelled";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.45, delay: 0.28 },
      className: "bg-card rounded-2xl border border-border p-6 shadow-sm",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-4 text-base", children: "Delivery Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1 font-medium", children: "Deliver To" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: addr.fullName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: [
              addr.addressLine1,
              addr.addressLine2 ? `, ${addr.addressLine2}` : "",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              addr.city,
              ", ",
              addr.state,
              " — ",
              addr.pincode
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              "📞 ",
              addr.phone
            ] })
          ] }),
          !isCancelled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1 font-medium", children: isDelivered ? "Delivered On" : "Estimated Delivery" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: cn(
                  "text-sm font-semibold flex items-center gap-1.5",
                  isDelivered ? "text-green-600" : "text-primary"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                  isDelivered ? new Date(order.updatedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  }) : estimatedDelivery.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })
                ]
              }
            ),
            !isDelivered && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Approximate — may vary" })
          ] })
        ] })
      ]
    }
  );
}
function TrackOrder() {
  const searchParams = useSearch({ strict: false });
  const [inputValue, setInputValue] = reactExports.useState(searchParams.orderId ?? "");
  const [order, setOrder] = reactExports.useState(null);
  const [notFound, setNotFound] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const hasAutoSearched = reactExports.useRef(false);
  async function doSearch(idToSearch) {
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
  function handleQuickFill(id) {
    setInputValue(id);
    doSearch(id);
  }
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "min-h-screen bg-background py-16 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrackPageHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SearchForm,
      {
        value: inputValue,
        onChange: setInputValue,
        onSubmit: handleSubmit,
        onQuickFill: handleQuickFill,
        isLoading
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 space-y-5", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
        !isLoading && notFound && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotFoundState, {})
          },
          "not-found"
        ),
        !isLoading && order && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "space-y-5",
            "data-ocid": "track.result.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusBanner, { order }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusTimeline, { order }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(OrderItems, { order }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DeliveryInfo, { order }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.38 },
                  className: "text-center pt-2 pb-6",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "Questions about your order?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: "/contact",
                        className: "inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200",
                        children: [
                          "Contact Support",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          },
          order.id
        )
      ] })
    ] })
  ] }) });
}
export {
  TrackOrder as default
};
