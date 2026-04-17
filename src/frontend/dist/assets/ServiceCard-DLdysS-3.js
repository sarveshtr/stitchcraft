import { c as createLucideIcon, b as useCartStore, j as jsxRuntimeExports, m as motion, L as Link, B as Button, d as cn } from "./index-8S2Cru2x.js";
import { C as Clock } from "./clock-BiFJ7_6B.js";
import { A as ArrowRight } from "./arrow-right-DMuIQUSy.js";
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
function ServiceCard({
  service,
  index = 0,
  className
}) {
  const addItem = useCartStore((s) => s.addItem);
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(service);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: {
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1]
      },
      className: cn("group", className),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/services/$slug",
          params: { slug: service.slug },
          "data-ocid": `service.item.${index + 1}`,
          className: "block rounded-xl overflow-hidden bg-card border border-border shadow-elegant hover:shadow-lifted transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden aspect-[4/3]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: service.imageUrl,
                  alt: service.name,
                  className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
                  onError: (e) => {
                    e.target.src = "/assets/images/placeholder.svg";
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 rounded-full text-xs font-medium bg-card/90 backdrop-blur-sm text-foreground border border-border/50 capitalize", children: service.category }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors", children: service.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed", children: service.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Starting from" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-semibold text-foreground", children: [
                    "₹",
                    service.priceMin.toLocaleString("en-IN"),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-normal ml-1", children: [
                      "– ₹",
                      service.priceMax.toLocaleString("en-IN")
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs", children: [
                    service.deliveryDays,
                    " days"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "flex-1 text-xs transition-smooth",
                    onClick: handleAddToCart,
                    "data-ocid": `service.add_button.${index + 1}`,
                    children: "Add to Cart"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    className: "flex-1 text-xs group/btn transition-smooth",
                    asChild: true,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 justify-center", children: [
                      "View Details",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" })
                    ] })
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
export {
  ServiceCard as S,
  Sparkles as a
};
