import { i as useAuth, r as reactExports, u as useNavigate, j as jsxRuntimeExports, L as Link, P as Package, m as motion, B as Button, C as ChevronRight } from "./index-8S2Cru2x.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DQq1TRaC.js";
import { S as Skeleton } from "./skeleton-CVoRLpDg.js";
import { E as EmptyState } from "./EmptyState-BvY9OZfP.js";
import { P as PageHeader } from "./PageHeader-0vxq2GoO.js";
import { S as StatusBadge } from "./StatusBadge-CJiJSCYJ.js";
import { c as useUserOrders } from "./use-backend-DqovxjMb.js";
import { O as ORDER_STATUS_LABELS } from "./index-BwO3510T.js";
import { M as MapPin } from "./map-pin-ClRg--1x.js";
import { L as LogIn } from "./log-in-jHTYVCCp.js";
import "./Combination-B8mwU8qU.js";
import "./check-Cbeh65r7.js";
import "./useQuery-C35CS9u-.js";
function LoginPrompt() {
  const { login } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[60vh] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
      className: "text-center max-w-md mx-auto px-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-9 h-9 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-3", children: "Sign In Required" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "Please sign in to view your orders." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "lg",
            onClick: login,
            "data-ocid": "orders.login_button",
            className: "gap-2 shadow-elegant w-full sm:w-auto",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
              "Sign In"
            ]
          }
        )
      ]
    }
  ) });
}
const STATUS_OPTIONS = [
  { value: "all", label: "All Orders" },
  { value: "received", label: ORDER_STATUS_LABELS.received },
  { value: "in_progress", label: ORDER_STATUS_LABELS.in_progress },
  { value: "stitching", label: ORDER_STATUS_LABELS.stitching },
  { value: "ready", label: ORDER_STATUS_LABELS.ready },
  { value: "delivered", label: ORDER_STATUS_LABELS.delivered },
  { value: "cancelled", label: ORDER_STATUS_LABELS.cancelled }
];
function AccountOrders() {
  const { isAuthenticated, isLoading, principal } = useAuth();
  const { data: orders = [], isLoading: ordersLoading } = useUserOrders(principal);
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const navigate = useNavigate();
  const filteredOrders = statusFilter === "all" ? orders : orders.filter((o) => o.status === statusFilter);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-12 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }, i)) })
    ] });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPrompt, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "My Orders",
        badge: "Order History",
        subtitle: "Track and manage all your tailoring orders.",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 -mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/account",
                "data-ocid": "orders.account_link",
                className: "hover:text-foreground transition-colors",
                children: "Account"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Orders" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: statusFilter,
              onValueChange: (v) => setStatusFilter(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "w-44 text-sm",
                    "data-ocid": "orders.status_filter",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Orders" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUS_OPTIONS.map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value, className: "text-sm", children: label }, value)) })
              ]
            }
          ) })
        ] })
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
      ordersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }, i)) }) : filteredOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "orders.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: Package,
          title: statusFilter === "all" ? "No orders yet" : `No ${ORDER_STATUS_LABELS[statusFilter]} orders`,
          description: statusFilter === "all" ? "Your tailoring orders will appear here once you place one." : "No orders match this filter. Try a different status.",
          actionLabel: statusFilter === "all" ? "Browse Services" : "Clear Filter",
          onAction: statusFilter === "all" ? () => navigate({ to: "/services" }) : () => setStatusFilter("all")
        }
      ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "orders.list", children: filteredOrders.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: idx * 0.06 },
          "data-ocid": `orders.item.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lifted p-5 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground text-sm", children: [
                  "#",
                  order.orderNumber
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-1.5 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(order.createdAt).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  order.items.length,
                  " item",
                  order.items.length !== 1 ? "s" : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate max-w-[180px]", children: order.items.map((i) => i.serviceName).join(", ") })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground", children: [
                  "₹",
                  order.totalAmount.toLocaleString("en-IN")
                ] }),
                order.discountAmount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-600", children: [
                  "−₹",
                  order.discountAmount.toLocaleString("en-IN"),
                  " ",
                  "saved"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/track",
                    "data-ocid": `orders.track_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "sm",
                        className: "gap-1.5 text-xs",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                          "Track"
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "gap-1 text-xs text-muted-foreground hover:text-foreground",
                    "data-ocid": `orders.view_details_button.${idx + 1}`,
                    onClick: () => navigate({
                      to: "/track",
                      search: { orderId: order.id }
                    }),
                    children: [
                      "Details",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
                    ]
                  }
                )
              ] })
            ] })
          ] }) })
        },
        order.id
      )) }),
      !ordersLoading && orders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.4, delay: 0.2 },
          className: "mt-6",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 rounded-xl border border-border/40 p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold text-foreground", children: orders.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Orders" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-px bg-border/60 hidden sm:block" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold text-foreground", children: orders.filter(
                (o) => [
                  "received",
                  "in_progress",
                  "stitching",
                  "ready"
                ].includes(o.status)
              ).length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Active" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-px bg-border/60 hidden sm:block" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-xl font-semibold text-foreground", children: [
                "₹",
                orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString("en-IN")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Spent" })
            ] })
          ] }) })
        }
      )
    ] })
  ] });
}
export {
  AccountOrders as default
};
