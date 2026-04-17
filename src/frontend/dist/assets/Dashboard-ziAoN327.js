import { c as createLucideIcon, u as useNavigate, i as useAuth, r as reactExports, j as jsxRuntimeExports, m as motion, g as ShoppingBag, U as Users } from "./index-8S2Cru2x.js";
import { S as Skeleton } from "./skeleton-CVoRLpDg.js";
import { S as StatusBadge } from "./StatusBadge-CJiJSCYJ.js";
import { d as useAdminStats, e as useOrders } from "./use-backend-DqovxjMb.js";
import { C as Clock } from "./clock-BiFJ7_6B.js";
import { A as ArrowRight } from "./arrow-right-DMuIQUSy.js";
import "./index-BwO3510T.js";
import "./useQuery-C35CS9u-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M6 3h12", key: "ggurg9" }],
  ["path", { d: "M6 8h12", key: "6g4wlu" }],
  ["path", { d: "m6 13 8.5 8", key: "u1kupk" }],
  ["path", { d: "M6 13h3", key: "wdp6ag" }],
  ["path", { d: "M9 13c6.667 0 6.667-10 0-10", key: "1nkvk2" }]
];
const IndianRupee = createLucideIcon("indian-rupee", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function StatCard({
  label,
  value,
  icon: Icon,
  color,
  prefix,
  delay
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.4 },
      className: "bg-card rounded-2xl border border-border p-6 flex items-center gap-5 shadow-sm",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-12 h-12 rounded-xl flex items-center justify-center ${color}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: label }),
          value === void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-24 mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-bold text-foreground mt-0.5", children: [
            prefix,
            value.toLocaleString("en-IN")
          ] })
        ] })
      ]
    }
  );
}
function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAuth();
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: orders, isLoading: ordersLoading } = useOrders();
  reactExports.useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate({ to: "/account" });
    }
  }, [isAdmin, isLoading, navigate]);
  if (isLoading || !isAdmin) return null;
  const recentOrders = (orders ?? []).slice(0, 10);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", "data-ocid": "admin.dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
        className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Welcome back — here's what's happening today." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/60 rounded-lg px-3 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5" }),
            "Live overview"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4",
        "data-ocid": "admin.dashboard.stats",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Total Orders",
              value: statsLoading ? void 0 : stats == null ? void 0 : stats.totalOrders,
              icon: ShoppingBag,
              color: "bg-primary/10 text-primary",
              delay: 0.05
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Total Revenue",
              value: statsLoading ? void 0 : stats == null ? void 0 : stats.totalRevenue,
              icon: IndianRupee,
              color: "bg-emerald-100 text-emerald-600",
              prefix: "₹",
              delay: 0.1
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Pending Orders",
              value: statsLoading ? void 0 : stats == null ? void 0 : stats.pendingOrders,
              icon: Clock,
              color: "bg-amber-100 text-amber-600",
              delay: 0.15
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Customers",
              value: statsLoading ? void 0 : stats == null ? void 0 : stats.totalCustomers,
              icon: Users,
              color: "bg-violet-100 text-violet-600",
              delay: 0.2
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.25, duration: 0.4 },
        className: "bg-card rounded-2xl border border-border shadow-sm overflow-hidden",
        "data-ocid": "admin.dashboard.recent_orders",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Recent Orders" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => navigate({ to: "/admin/orders" }),
                "data-ocid": "admin.dashboard.view_orders.link",
                className: "flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-colors",
                children: [
                  "View all",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: ordersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", children: Array.from({ length: 5 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton only
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-lg" }, i)
          )) }) : recentOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-16 text-center",
              "data-ocid": "admin.dashboard.orders.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-10 h-10 text-muted-foreground/40 mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No orders yet" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3 font-medium text-muted-foreground", children: "Order ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3 font-medium text-muted-foreground", children: "Customer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3 font-medium text-muted-foreground", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-6 py-3 font-medium text-muted-foreground", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3 font-medium text-muted-foreground", children: "Date" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recentOrders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": `admin.dashboard.orders.item.${i + 1}`,
                className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-3.5 font-mono text-xs text-muted-foreground", children: [
                    "#",
                    order.orderNumber
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs bg-muted px-2 py-0.5 rounded", children: [
                    order.userId.slice(0, 12),
                    "…"
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-3.5 text-right font-semibold text-foreground", children: [
                    "₹",
                    order.totalAmount.toLocaleString("en-IN")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3.5 text-muted-foreground", children: new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  }) })
                ]
              },
              order.id
            )) })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.35, duration: 0.4 },
        className: "flex flex-wrap gap-3",
        "data-ocid": "admin.dashboard.quick_actions",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/admin/orders" }),
              "data-ocid": "admin.dashboard.manage_orders.button",
              className: "flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-smooth shadow-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
                "Manage Orders"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/admin/services" }),
              "data-ocid": "admin.dashboard.manage_services.button",
              className: "flex items-center gap-2 px-5 py-2.5 bg-card border border-border text-foreground rounded-xl font-medium text-sm hover:bg-muted/60 transition-smooth shadow-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
                "Manage Services"
              ]
            }
          )
        ]
      }
    )
  ] });
}
export {
  AdminDashboard as default
};
