import { i as useAuth, j as jsxRuntimeExports, m as motion, P as Package, L as Link, B as Button, r as reactExports } from "./index-8S2Cru2x.js";
import { I as Input } from "./input-D6xFgmLn.js";
import { L as Label } from "./label-BS8SqPNm.js";
import { S as Skeleton } from "./skeleton-CVoRLpDg.js";
import { P as PageHeader } from "./PageHeader-0vxq2GoO.js";
import { S as StatusBadge } from "./StatusBadge-CJiJSCYJ.js";
import { c as useUserOrders } from "./use-backend-DqovxjMb.js";
import { R as Ruler } from "./ruler-sef2wIA6.js";
import { M as MapPin } from "./map-pin-ClRg--1x.js";
import { L as LogIn } from "./log-in-jHTYVCCp.js";
import { P as Pen } from "./pen-B1jR--B7.js";
import "./index-B_36CAa7.js";
import "./index-BwO3510T.js";
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-3", children: "Sign In to Your Account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mb-8 leading-relaxed", children: "Access your profile, saved measurements, and order history by signing in with Internet Identity." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "lg",
            onClick: login,
            "data-ocid": "account.login_button",
            className: "w-full sm:w-auto gap-2 shadow-elegant",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
              "Sign In with Internet Identity"
            ]
          }
        )
      ]
    }
  ) });
}
function ProfileCard({ principal }) {
  const [editing, setEditing] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    name: "My Account",
    email: "",
    phone: ""
  });
  const initials = form.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "U";
  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleSave() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setEditing(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "bg-card rounded-xl border border-border p-6 shadow-elegant",
      "data-ocid": "account.profile_card",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-semibold text-primary-foreground", children: initials }) }),
        editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-4 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", className: "text-sm", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "name",
                  name: "name",
                  value: form.name,
                  onChange: handleChange,
                  "data-ocid": "account.name_input",
                  placeholder: "Your full name"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "text-sm", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "email",
                  name: "email",
                  type: "email",
                  value: form.email,
                  onChange: handleChange,
                  "data-ocid": "account.email_input",
                  placeholder: "your@email.com"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", className: "text-sm", children: "Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "phone",
                  name: "phone",
                  type: "tel",
                  value: form.phone,
                  onChange: handleChange,
                  "data-ocid": "account.phone_input",
                  placeholder: "+91 98765 43210"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: handleSave,
                disabled: saving,
                "data-ocid": "account.save_button",
                className: "shadow-elegant",
                children: saving ? "Saving…" : "Save Changes"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setEditing(false),
                "data-ocid": "account.cancel_button",
                children: "Cancel"
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground truncate", children: form.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5 truncate", children: form.email || "No email set" }),
            form.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: form.phone }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-xs text-muted-foreground/60 font-mono mt-1 truncate",
                title: principal,
                children: [
                  "ID: ",
                  principal.slice(0, 24),
                  "…"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => setEditing(true),
              "data-ocid": "account.edit_profile_button",
              className: "gap-2 flex-shrink-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" }),
                "Edit Profile"
              ]
            }
          )
        ] }) })
      ] })
    }
  );
}
const QUICK_LINKS = [
  {
    icon: Ruler,
    label: "My Measurements",
    desc: "Manage your saved body measurements",
    href: "/account/measurements",
    ocid: "account.measurements_link"
  },
  {
    icon: Package,
    label: "Order History",
    desc: "View all your past and current orders",
    href: "/account/orders",
    ocid: "account.orders_link"
  },
  {
    icon: MapPin,
    label: "Track Order",
    desc: "Check the real-time status of active orders",
    href: "/track",
    ocid: "account.track_link"
  }
];
function Account() {
  const { isAuthenticated, isLoading, principal } = useAuth();
  const { data: orders = [], isLoading: ordersLoading } = useUserOrders(principal);
  const recentOrders = orders.slice(0, 3);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-12 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }, i)) })
    ] });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPrompt, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "My Account",
        badge: "Profile",
        subtitle: "Manage your profile, measurements, and orders."
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileCard, { principal: principal ?? "" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay: 0.08 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-4", children: "Quick Access" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: QUICK_LINKS.map(({ icon: Icon, label, desc, href, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: href,
                "data-ocid": ocid,
                className: "group block",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border hover:border-primary/40 hover:shadow-lifted p-5 h-full transition-smooth cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm mb-1", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-snug", children: desc })
                ] })
              },
              href
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay: 0.14 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Recent Orders" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/account/orders",
                  "data-ocid": "account.view_all_orders_link",
                  className: "text-sm text-primary hover:underline underline-offset-2",
                  children: "View all"
                }
              )
            ] }),
            ordersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, i)) }) : recentOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card rounded-xl border border-dashed border-border py-10 text-center",
                "data-ocid": "account.orders_empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-10 h-10 text-muted-foreground/40 mx-auto mb-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "No orders yet. Start your tailoring journey!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      "data-ocid": "account.browse_services_button",
                      children: "Browse Services"
                    }
                  ) })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: recentOrders.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card rounded-xl border border-border p-4 shadow-elegant flex items-center justify-between gap-4",
                "data-ocid": `account.recent_order.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground text-sm truncate", children: [
                      "#",
                      order.orderNumber
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground text-sm", children: [
                      "₹",
                      order.totalAmount.toLocaleString("en-IN")
                    ] })
                  ] })
                ]
              },
              order.id
            )) })
          ]
        }
      )
    ] })
  ] });
}
export {
  Account as default
};
