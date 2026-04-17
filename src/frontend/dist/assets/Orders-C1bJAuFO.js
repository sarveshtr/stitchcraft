import { c as createLucideIcon, u as useNavigate, i as useAuth, r as reactExports, j as jsxRuntimeExports, m as motion, X } from "./index-8S2Cru2x.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-ByslgUxT.js";
import { S as Skeleton } from "./skeleton-CVoRLpDg.js";
import { S as StatusBadge } from "./StatusBadge-CJiJSCYJ.js";
import { e as useOrders } from "./use-backend-DqovxjMb.js";
import { O as ORDER_STATUS_LABELS } from "./index-BwO3510T.js";
import "./Combination-B8mwU8qU.js";
import "./useQuery-C35CS9u-.js";
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
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode);
const STATUS_FILTERS = [
  { label: "All", value: "all" },
  { label: "Received", value: "received" },
  { label: "In Progress", value: "in_progress" },
  { label: "Stitching", value: "stitching" },
  { label: "Ready", value: "ready" },
  { label: "Delivered", value: "delivered" }
];
const ALL_STATUSES = [
  "received",
  "in_progress",
  "stitching",
  "ready",
  "delivered",
  "cancelled"
];
function useUpdateOrderStatus() {
  return (orderId, status) => {
    console.log("Update order", orderId, "to", status);
  };
}
function OrderDetailModal({
  order,
  onClose
}) {
  var _a;
  if (!order) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!order, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-lg max-h-[80vh] overflow-y-auto",
      "data-ocid": "admin.orders.detail.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display", children: [
          "Order #",
          order.orderNumber
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric"
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-2", children: "Items" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: order.items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No items" }) : order.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between p-3 bg-muted/40 rounded-lg text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: item.serviceName }),
                    item.fabricType && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Fabric: ",
                      item.fabricType
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                    "₹",
                    item.price.toLocaleString("en-IN")
                  ] })
                ]
              },
              `${item.serviceId}-${i}`
            )) })
          ] }),
          ((_a = order.deliveryAddress) == null ? void 0 : _a.fullName) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-2", children: "Delivery Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted/40 rounded-lg text-sm text-muted-foreground space-y-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: order.deliveryAddress.fullName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: order.deliveryAddress.phone }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: order.deliveryAddress.addressLine1 }),
              order.deliveryAddress.addressLine2 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: order.deliveryAddress.addressLine2 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                order.deliveryAddress.city,
                ", ",
                order.deliveryAddress.state,
                " —",
                " ",
                order.deliveryAddress.pincode
              ] })
            ] })
          ] }),
          order.couponCode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "Coupon applied: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: order.couponCode })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-600 font-semibold", children: [
              "-₹",
              order.discountAmount.toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border text-sm font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg", children: [
              "₹",
              order.totalAmount.toLocaleString("en-IN")
            ] })
          ] }),
          order.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-1", children: "Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground p-3 bg-muted/40 rounded-lg", children: order.notes })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            "data-ocid": "admin.orders.detail.close_button",
            className: "px-4 py-2 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-smooth",
            children: "Close"
          }
        ) })
      ]
    }
  ) });
}
function AdminOrders() {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAuth();
  const { data: orders, isLoading: ordersLoading } = useOrders();
  const updateStatus = useUpdateOrderStatus();
  const [filter, setFilter] = reactExports.useState("all");
  const [selectedOrder, setSelectedOrder] = reactExports.useState(null);
  const [localStatuses, setLocalStatuses] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (!isLoading && !isAdmin) navigate({ to: "/account" });
  }, [isAdmin, isLoading, navigate]);
  if (isLoading || !isAdmin) return null;
  const allOrders = orders ?? [];
  const filtered = filter === "all" ? allOrders : allOrders.filter((o) => o.status === filter);
  function handleStatusChange(orderId, status) {
    setLocalStatuses((prev) => ({ ...prev, [orderId]: status }));
    updateStatus(orderId, status);
  }
  function getStatus(order) {
    return localStatuses[order.id] ?? order.status;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin.orders.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Orders Management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
            allOrders.length,
            " total orders"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1, duration: 0.35 },
        className: "flex flex-wrap gap-2",
        "data-ocid": "admin.orders.filter",
        children: STATUS_FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setFilter(f.value),
            "data-ocid": `admin.orders.filter.${f.value}.tab`,
            className: `px-4 py-1.5 rounded-full text-sm font-medium transition-smooth border ${filter === f.value ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`,
            children: [
              f.label,
              f.value !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 opacity-60 text-xs", children: [
                "(",
                allOrders.filter((o) => o.status === f.value).length,
                ")"
              ] })
            ]
          },
          f.value
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.15, duration: 0.4 },
        className: "bg-card rounded-2xl border border-border shadow-sm overflow-hidden",
        "data-ocid": "admin.orders.table",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: ordersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", children: Array.from({ length: 6 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, i)
        )) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-20 text-center",
            "data-ocid": "admin.orders.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6 text-muted-foreground/50" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No orders found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: filter !== "all" ? `No orders with status "${ORDER_STATUS_LABELS[filter]}"` : "No orders yet" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium text-muted-foreground whitespace-nowrap", children: "Order ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium text-muted-foreground", children: "Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium text-muted-foreground", children: "Items" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3 font-medium text-muted-foreground", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium text-muted-foreground", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium text-muted-foreground whitespace-nowrap", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-5 py-3 font-medium text-muted-foreground", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              "data-ocid": `admin.orders.item.${i + 1}`,
              className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3.5 font-mono text-xs text-muted-foreground whitespace-nowrap", children: [
                  "#",
                  order.orderNumber
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs bg-muted px-2 py-0.5 rounded", children: [
                  order.userId.slice(0, 10),
                  "…"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3.5 text-muted-foreground", children: [
                  order.items.length,
                  " item",
                  order.items.length !== 1 ? "s" : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3.5 text-right font-semibold text-foreground whitespace-nowrap", children: [
                  "₹",
                  order.totalAmount.toLocaleString("en-IN")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    value: getStatus(order),
                    onChange: (e) => handleStatusChange(
                      order.id,
                      e.target.value
                    ),
                    "data-ocid": `admin.orders.status.${i + 1}.select`,
                    className: "text-xs border border-border rounded-lg px-2 py-1 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer",
                    children: ALL_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: ORDER_STATUS_LABELS[s] }, s))
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-muted-foreground whitespace-nowrap", children: new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short"
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelectedOrder(order),
                    "data-ocid": `admin.orders.view.${i + 1}.button`,
                    className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 text-xs font-medium transition-smooth",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                      "View"
                    ]
                  }
                ) })
              ]
            },
            order.id
          )) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrderDetailModal,
      {
        order: selectedOrder,
        onClose: () => setSelectedOrder(null)
      }
    )
  ] });
}
export {
  AdminOrders as default
};
