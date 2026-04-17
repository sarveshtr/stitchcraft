import { c as createLucideIcon, e as useParams, b as useCartStore, r as reactExports, j as jsxRuntimeExports, f as PageLoader, L as Link, C as ChevronRight, m as motion, B as Button, A as AnimatePresence, g as ShoppingBag, h as ChevronDown } from "./index-8S2Cru2x.js";
import { B as Badge } from "./badge-BlzNEo3z.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DQq1TRaC.js";
import { E as EmptyState } from "./EmptyState-BvY9OZfP.js";
import { b as useService } from "./use-backend-DqovxjMb.js";
import { C as Clock } from "./clock-BiFJ7_6B.js";
import { C as CircleCheckBig } from "./circle-check-big-CybGVE9o.js";
import { M as Minus } from "./minus-DimcWv1p.js";
import { P as Plus } from "./plus-DFxn9OKg.js";
import { R as Ruler } from "./ruler-sef2wIA6.js";
import "./Combination-B8mwU8qU.js";
import "./check-Cbeh65r7.js";
import "./useQuery-C35CS9u-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
const STANDARD_ADDONS = [
  { id: "sa-lining", name: "Lining", price: 200 },
  { id: "sa-embroidery", name: "Embroidery", price: 500 },
  { id: "sa-beadwork", name: "Beadwork", price: 800 },
  { id: "sa-piping", name: "Piping", price: 150 },
  { id: "sa-buttons", name: "Buttons Upgrade", price: 100 }
];
const FABRICS = [
  "Cotton",
  "Silk",
  "Georgette",
  "Chiffon",
  "Velvet",
  "Linen",
  "Net",
  "Crepe"
];
const MEASUREMENT_FIELDS = [
  {
    key: "bust",
    label: "Bust / Chest",
    hint: "Around the fullest part of your chest"
  },
  {
    key: "waist",
    label: "Waist",
    hint: "Around the narrowest part of your torso"
  },
  { key: "hips", label: "Hips", hint: "Around the fullest part of your hips" },
  {
    key: "shoulder",
    label: "Shoulder Width",
    hint: "Across the back from shoulder tip to tip"
  },
  { key: "length", label: "Length", hint: "From shoulder to desired hemline" },
  {
    key: "sleeve",
    label: "Sleeve Length",
    hint: "From shoulder to wrist (arm relaxed)"
  }
];
function ServiceDetail() {
  const { slug } = useParams({ strict: false });
  const { data: service, isLoading, isError } = useService(slug);
  const addItem = useCartStore((s) => s.addItem);
  const [selectedAddons, setSelectedAddons] = reactExports.useState([]);
  const [fabricType, setFabricType] = reactExports.useState("cotton");
  const [quantity, setQuantity] = reactExports.useState(1);
  const [measurementOpen, setMeasurementOpen] = reactExports.useState(false);
  const [added, setAdded] = reactExports.useState(false);
  const toggleAddon = (addon) => {
    setSelectedAddons(
      (prev) => prev.find((a) => a.id === addon.id) ? prev.filter((a) => a.id !== addon.id) : [...prev, addon]
    );
  };
  const isAddonSelected = (id) => selectedAddons.some((a) => a.id === id);
  const addonTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = service ? service.priceMin + addonTotal : 0;
  const totalPrice = unitPrice * quantity;
  const handleAddToCart = () => {
    if (!service) return;
    addItem(service, { quantity, selectedAddons, fabricType });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {});
  if (isError || !service) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[60vh] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        "data-ocid": "service_detail.error_state",
        title: "Service not found",
        description: "This service does not exist or may have been removed.",
        actionLabel: "Browse All Services",
        onAction: () => {
          window.location.href = "/services";
        }
      }
    ) });
  }
  const allAddons = [
    ...STANDARD_ADDONS,
    ...service.addons.filter(
      (sa) => !STANDARD_ADDONS.some(
        (std) => std.name.toLowerCase() === sa.name.toLowerCase()
      )
    )
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "nav",
      {
        className: "flex items-center gap-1.5 text-xs text-muted-foreground",
        "aria-label": "Breadcrumb",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              "data-ocid": "service_detail.breadcrumb.home",
              className: "hover:text-foreground transition-colors",
              children: "Home"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/services",
              "data-ocid": "service_detail.breadcrumb.services",
              className: "hover:text-foreground transition-colors",
              children: "Services"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-[200px]", children: service.name })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
          className: "relative",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden aspect-[4/5] shadow-lifted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: service.imageUrl,
                alt: service.name,
                className: "w-full h-full object-cover",
                onError: (e) => {
                  e.target.src = "/assets/images/placeholder.svg";
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-5 left-5 bg-card/95 backdrop-blur-sm border border-border rounded-xl px-4 py-3 shadow-elegant", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-none mb-0.5", children: "Delivery Time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                  service.deliveryDays,
                  " Days"
                ] })
              ] })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 24 },
          animate: { opacity: 1, x: 0 },
          transition: {
            duration: 0.5,
            delay: 0.08,
            ease: [0.25, 0.1, 0.25, 1]
          },
          className: "flex flex-col gap-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "capitalize", children: service.category }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-display font-semibold text-foreground leading-tight mb-3", children: service.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: service.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-muted/40 rounded-xl border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Base Price Range" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-semibold text-foreground", children: [
                "₹",
                service.priceMin.toLocaleString("en-IN"),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base text-muted-foreground font-normal", children: [
                  " ",
                  "– ₹",
                  service.priceMax.toLocaleString("en-IN")
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-2.5", children: "Select Fabric" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: fabricType, onValueChange: setFabricType, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "w-full",
                    "data-ocid": "service_detail.fabric.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose a fabric" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: FABRICS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: f.toLowerCase(), children: f }, f)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-2.5", children: "Add-ons" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "service_detail.addons.list", children: allAddons.map((addon, idx) => {
                const checked = isAddonSelected(addon.id);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => toggleAddon(addon),
                    "data-ocid": `service_detail.addon.${idx + 1}.toggle`,
                    className: [
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-smooth",
                      checked ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40 hover:bg-muted/30"
                    ].join(" "),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: [
                              "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-smooth",
                              checked ? "border-primary bg-primary" : "border-border"
                            ].join(" "),
                            children: checked && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 text-primary-foreground" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: addon.name })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-primary ml-4 shrink-0", children: [
                        "+₹",
                        addon.price.toLocaleString("en-IN")
                      ] })
                    ]
                  },
                  addon.id
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Quantity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center rounded-lg border border-border overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setQuantity(Math.max(1, quantity - 1)),
                    "data-ocid": "service_detail.quantity.minus.button",
                    className: "p-2.5 hover:bg-muted transition-colors",
                    "aria-label": "Decrease quantity",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4 text-foreground" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-5 py-2.5 text-sm font-semibold text-foreground border-x border-border min-w-[2.5rem] text-center", children: quantity }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setQuantity(quantity + 1),
                    "data-ocid": "service_detail.quantity.plus.button",
                    className: "p-2.5 hover:bg-muted transition-colors",
                    "aria-label": "Increase quantity",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 text-foreground" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "service_detail.price_calculator",
                className: "bg-card border border-border rounded-xl p-4 space-y-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Price Summary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Base price" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
                      "₹",
                      service.priceMin.toLocaleString("en-IN")
                    ] })
                  ] }),
                  selectedAddons.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    selectedAddons.map((addon) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex justify-between text-sm",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: addon.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-medium", children: [
                            "+₹",
                            addon.price.toLocaleString("en-IN")
                          ] })
                        ]
                      },
                      addon.id
                    )),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm border-t border-border pt-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Unit price" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
                        "₹",
                        unitPrice.toLocaleString("en-IN")
                      ] })
                    ] })
                  ] }),
                  quantity > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                      "× ",
                      quantity
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
                      "₹",
                      totalPrice.toLocaleString("en-IN")
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-t border-border pt-3 mt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Estimated Total" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.span,
                      {
                        initial: { scale: 1.12, color: "var(--primary)" },
                        animate: { scale: 1, color: "var(--foreground)" },
                        transition: { duration: 0.3 },
                        className: "text-xl font-display font-semibold text-foreground",
                        children: [
                          "₹",
                          totalPrice.toLocaleString("en-IN")
                        ]
                      },
                      totalPrice
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "lg",
                className: "w-full shadow-elegant hover:shadow-lifted transition-smooth text-base",
                onClick: handleAddToCart,
                "data-ocid": "service_detail.add_to_cart.primary_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: added ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.span,
                  {
                    initial: { opacity: 0, y: -8 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 8 },
                    className: "flex items-center gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5" }),
                      "Added to Cart!"
                    ]
                  },
                  "added"
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.span,
                  {
                    initial: { opacity: 0, y: -8 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 8 },
                    className: "flex items-center gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-5 h-5" }),
                      "Book Now / Add to Cart"
                    ]
                  },
                  "add"
                ) })
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-y border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "service_detail.measurement_guide.toggle",
          onClick: () => setMeasurementOpen((v) => !v),
          className: "w-full flex items-center justify-between py-5 group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ruler, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm md:text-base", children: "Measurement Guide" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "How to take accurate measurements for a perfect fit" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: { rotate: measurementOpen ? 180 : 0 },
                transition: { duration: 0.25 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-5 h-5 text-muted-foreground" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: measurementOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, height: 0 },
          animate: { opacity: 1, height: "auto" },
          exit: { opacity: 0, height: 0 },
          transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
          className: "overflow-hidden",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-8 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 mb-8", children: MEASUREMENT_FIELDS.map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-3 p-4 bg-card rounded-xl border border-border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3.5 h-3.5 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-0.5", children: field.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: field.hint })
                  ] })
                ]
              },
              field.key
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-xl p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-primary" }),
                "Pro Tips for Accurate Measurements"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm text-muted-foreground list-none", children: [
                "Stand straight with feet together while measuring.",
                "Wear minimal or well-fitted clothing.",
                "Keep the measuring tape parallel to the floor.",
                "Don't pull the tape too tight — just snug.",
                "Have someone else measure your back for accuracy."
              ].map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold shrink-0", children: "·" }),
                tip
              ] }, tip)) })
            ] })
          ] })
        },
        "measurement-guide"
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground mb-6", children: "What's Included" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4", children: [
        "Free consultation with our master tailor",
        "2 fitting sessions included",
        "Premium thread & finishing",
        "Alterations within 30 days",
        "Secure garment packaging",
        "On-time delivery guarantee"
      ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.07, duration: 0.4 },
          className: "flex items-start gap-3 p-4 bg-card rounded-xl border border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-primary mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-snug", children: item })
          ]
        },
        item
      )) })
    ] })
  ] });
}
export {
  ServiceDetail as default
};
