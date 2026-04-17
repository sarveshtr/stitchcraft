import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, a as LoadingSpinner, P as Package, A as AnimatePresence, m as motion, L as Link, S as Scissors } from "./index-8S2Cru2x.js";
import { E as EmptyState } from "./EmptyState-BvY9OZfP.js";
import { P as PageHeader } from "./PageHeader-0vxq2GoO.js";
import { a as Sparkles, S as ServiceCard } from "./ServiceCard-DLdysS-3.js";
import { u as useServices } from "./use-backend-DqovxjMb.js";
import "./clock-BiFJ7_6B.js";
import "./arrow-right-DMuIQUSy.js";
import "./useQuery-C35CS9u-.js";
const CATEGORIES = [
  { id: "all", label: "All Services", emoji: "✨" },
  { id: "women", label: "Women", emoji: "👗" },
  { id: "men", label: "Men", emoji: "👔" },
  { id: "kids", label: "Kids", emoji: "🎀" },
  { id: "custom", label: "Custom Design", emoji: "🪡" }
];
function Services() {
  const navigate = useNavigate();
  const getInitialCategory = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category") ?? "all";
      return CATEGORIES.some((c) => c.id === cat) ? cat : "all";
    } catch {
      return "all";
    }
  };
  const [activeCategory, setActiveCategory] = reactExports.useState(getInitialCategory);
  const { data: services, isLoading } = useServices(
    activeCategory === "all" ? void 0 : activeCategory
  );
  reactExports.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category") ?? "all";
    if (CATEGORIES.some((c) => c.id === cat)) {
      setActiveCategory(cat);
    }
  }, []);
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    navigate({
      to: "/services",
      search: cat === "all" ? {} : { category: cat }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Our Services",
        subtitle: "From blouses to lehengas — exquisitely crafted garments tailored to your unique measurements with artisan precision.",
        badge: "Artisan Craftsmanship"
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/60 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 overflow-x-auto scrollbar-hide py-3", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": `services.filter.${cat.id}.tab`,
        onClick: () => handleCategoryChange(cat.id),
        className: [
          "flex shrink-0 items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium border transition-smooth",
          activeCategory === cat.id ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card text-muted-foreground border-border hover:bg-accent hover:text-foreground hover:border-primary/40"
        ].join(" "),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none", children: cat.emoji }),
          cat.label
        ]
      },
      cat.id
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "services.loading_state",
        className: "flex items-center justify-center min-h-[40vh]",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" })
      }
    ) : !services || services.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: Package,
        title: "No services found",
        description: "We couldn't find services in this category. Try a different filter.",
        actionLabel: "View All Services",
        onAction: () => handleCategoryChange("all")
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm font-medium", children: [
              services.length,
              " service",
              services.length !== 1 ? "s" : "",
              " ",
              "available",
              activeCategory !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 capitalize", children: [
                "in ",
                activeCategory
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "services.list",
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
              children: services.map((service, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceCard, { service, index: i }, service.id))
            }
          )
        ]
      },
      activeCategory
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 border-t border-border py-16 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block px-3 py-1 mb-4 text-xs font-medium tracking-widest uppercase text-primary bg-primary/10 rounded-full border border-primary/20", children: "Unique Vision?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-semibold text-foreground mb-3", children: "Create a Custom Design" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-7 leading-relaxed", children: "Have something special in mind? Our expert tailors will bring your dream garment to life with a fully bespoke design consultation." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/custom-stitching",
              "data-ocid": "services.custom_cta_button",
              className: "inline-flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground rounded-full font-medium text-sm shadow-elegant hover:opacity-90 transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-4 h-4" }),
                "Start Your Custom Design"
              ]
            }
          )
        ]
      }
    ) }) })
  ] });
}
export {
  Services as default
};
