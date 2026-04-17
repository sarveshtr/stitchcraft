import { r as reactExports, j as jsxRuntimeExports, m as motion } from "./index-8S2Cru2x.js";
import { E as EmptyState } from "./EmptyState-BvY9OZfP.js";
import { P as PageHeader } from "./PageHeader-0vxq2GoO.js";
import { I as Image } from "./image-fJTfCCXT.js";
const CATEGORIES = ["All", "Women", "Men", "Kids", "Bridal", "Festive"];
const GALLERY_ITEMS = [
  {
    id: "1",
    title: "Blush Bridal Lehenga",
    category: "Bridal",
    imageUrl: "/assets/generated/gallery-1.jpg"
  },
  {
    id: "2",
    title: "Ivory Silk Blouse",
    category: "Women",
    imageUrl: "/assets/generated/gallery-2.jpg"
  },
  {
    id: "3",
    title: "Classic Sherwani",
    category: "Men",
    imageUrl: "/assets/generated/gallery-3.jpg"
  },
  {
    id: "4",
    title: "Floral Anarkali Suit",
    category: "Women",
    imageUrl: "/assets/generated/gallery-4.jpg"
  },
  {
    id: "5",
    title: "Kids Festive Wear",
    category: "Kids",
    imageUrl: "/assets/generated/gallery-5.jpg"
  },
  {
    id: "6",
    title: "Gold Embroidered Dupatta",
    category: "Festive",
    imageUrl: "/assets/generated/gallery-6.jpg"
  }
];
function Gallery() {
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const filtered = activeCategory === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.category === activeCategory);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Design Gallery",
        subtitle: "Get inspired by our portfolio of handcrafted creations.",
        badge: "Portfolio",
        centered: true
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-2 mb-8 justify-center flex-wrap", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveCategory(cat),
          "data-ocid": `gallery.filter.${cat.toLowerCase()}.tab`,
          className: `shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-smooth ${activeCategory === cat ? "bg-primary text-primary-foreground shadow-elegant" : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`,
          children: cat
        },
        cat
      )) }),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: Image, title: "No designs in this category" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: filtered.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          transition: { delay: i * 0.05 },
          "data-ocid": `gallery.item.${i + 1}`,
          className: "group rounded-xl overflow-hidden bg-card border border-border shadow-elegant hover:shadow-lifted transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: item.imageUrl,
                  alt: item.title,
                  className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
                  onError: (e) => {
                    e.target.src = "/assets/images/placeholder.svg";
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-smooth" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: item.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: item.category })
            ] })
          ]
        },
        item.id
      )) })
    ] })
  ] });
}
export {
  Gallery as default
};
