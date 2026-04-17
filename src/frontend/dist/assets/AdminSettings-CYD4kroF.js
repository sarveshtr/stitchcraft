import { u as useNavigate, i as useAuth, r as reactExports, j as jsxRuntimeExports, m as motion } from "./index-8S2Cru2x.js";
import { I as Input } from "./input-D6xFgmLn.js";
import { L as Label } from "./label-BS8SqPNm.js";
import { S as Separator } from "./separator-BBeiFi9i.js";
import { T as Textarea } from "./textarea-CS_Hxw4e.js";
import { C as CircleCheckBig } from "./circle-check-big-CybGVE9o.js";
import { S as Save } from "./save-CpAQ2Dkq.js";
import "./index-B_36CAa7.js";
const STORAGE_KEY = "stitchcraft_settings";
function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return {
    businessName: "StitchCraft Atelier",
    address: "23, Fashion Street, Linking Road, Mumbai, Maharashtra — 400050",
    phone: "+91 98765 43210",
    email: "hello@stitchcraft.in",
    deliveryCharge: "100",
    taxPercentage: "5"
  };
}
function AdminSettings() {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAuth();
  const [settings, setSettings] = reactExports.useState(loadSettings);
  const [saved, setSaved] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isLoading && !isAdmin) navigate({ to: "/account" });
  }, [isAdmin, isLoading, navigate]);
  if (isLoading || !isAdmin) return null;
  function update(field, value) {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }
  function handleSave(e) {
    e.preventDefault();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setSaved(true);
      setTimeout(() => setSaved(false), 3e3);
    } catch {
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-2xl", "data-ocid": "admin.settings.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Settings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Manage business information and pricing configuration." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1, duration: 0.4 },
          className: "bg-card rounded-2xl border border-border shadow-sm p-6 space-y-5",
          "data-ocid": "admin.settings.business_info.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-display font-semibold text-foreground", children: "Business Information" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Basic details shown to customers and used in communications." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "settings-name", children: "Business Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "settings-name",
                    "data-ocid": "admin.settings.business_name.input",
                    value: settings.businessName,
                    onChange: (e) => update("businessName", e.target.value),
                    placeholder: "StitchCraft Atelier"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "settings-phone", children: "Phone Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "settings-phone",
                    type: "tel",
                    "data-ocid": "admin.settings.phone.input",
                    value: settings.phone,
                    onChange: (e) => update("phone", e.target.value),
                    placeholder: "+91 98765 43210"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "settings-email", children: "Email Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "settings-email",
                    type: "email",
                    "data-ocid": "admin.settings.email.input",
                    value: settings.email,
                    onChange: (e) => update("email", e.target.value),
                    placeholder: "hello@stitchcraft.in"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "settings-address", children: "Business Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "settings-address",
                    "data-ocid": "admin.settings.address.textarea",
                    value: settings.address,
                    onChange: (e) => update("address", e.target.value),
                    placeholder: "Street, City, State — Pincode",
                    rows: 3
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
          transition: { delay: 0.18, duration: 0.4 },
          className: "bg-card rounded-2xl border border-border shadow-sm p-6 space-y-5",
          "data-ocid": "admin.settings.pricing.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-display font-semibold text-foreground", children: "Pricing & Charges" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Configure delivery fees and tax applied to all orders." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "settings-delivery", children: "Delivery Charge (₹)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none", children: "₹" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "settings-delivery",
                      type: "number",
                      "data-ocid": "admin.settings.delivery_charge.input",
                      value: settings.deliveryCharge,
                      onChange: (e) => update("deliveryCharge", e.target.value),
                      placeholder: "100",
                      min: 0,
                      className: "pl-7"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Applied to each order. Use 0 for free delivery." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "settings-tax", children: "Tax (%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "settings-tax",
                      type: "number",
                      "data-ocid": "admin.settings.tax_percentage.input",
                      value: settings.taxPercentage,
                      onChange: (e) => update("taxPercentage", e.target.value),
                      placeholder: "5",
                      min: 0,
                      max: 100,
                      step: 0.1,
                      className: "pr-8"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none", children: "%" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "GST or applicable tax rate on services." })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.25, duration: 0.35 },
          className: "flex items-center justify-between",
          children: [
            saved && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -8 },
                animate: { opacity: 1, x: 0 },
                className: "flex items-center gap-2 text-sm text-emerald-600 font-medium",
                "data-ocid": "admin.settings.save.success_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
                  "Settings saved successfully"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "submit",
                "data-ocid": "admin.settings.save.submit_button",
                className: "flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-smooth shadow-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                  "Save Settings"
                ]
              }
            ) })
          ]
        }
      )
    ] })
  ] });
}
export {
  AdminSettings as default
};
