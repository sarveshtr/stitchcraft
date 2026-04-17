import { j as jsxRuntimeExports, f as PageLoader, m as motion } from "./index-8S2Cru2x.js";
import { P as PageHeader } from "./PageHeader-0vxq2GoO.js";
import { a as useReviews } from "./use-backend-DqovxjMb.js";
import { S as Star } from "./star-DU8OE6AG.js";
import "./useQuery-C35CS9u-.js";
function Reviews() {
  const { data: reviews, isLoading } = useReviews();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Customer Reviews",
        subtitle: "Hear what our customers say about their StitchCraft experience.",
        badge: "Testimonials",
        centered: true
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-3 mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center bg-card rounded-2xl border border-border p-6 shadow-elegant", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl font-display font-bold text-foreground mb-1", children: "4.9" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 justify-center mb-2", children: Array.from({ length: 5 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static star array
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 fill-primary text-primary" }, i)
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Based on 2,500+ reviews" })
      ] }) }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 md:grid-cols-2 gap-5",
          "data-ocid": "reviews.list",
          children: (reviews ?? []).map((review, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.08 },
              "data-ocid": `reviews.item.${i + 1}`,
              className: "bg-card rounded-xl border border-border p-6 shadow-elegant",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 mb-3", children: Array.from({ length: 5 }).map((_, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: `w-4 h-4 ${j < review.rating ? "fill-primary text-primary" : "text-border"}`
                  },
                  j
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-4 italic", children: [
                  '"',
                  review.comment,
                  '"'
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-3 border-t border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary", children: review.userName.charAt(0) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: review.userName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Verified Customer" })
                  ] })
                ] })
              ]
            },
            review.id
          ))
        }
      )
    ] })
  ] });
}
export {
  Reviews as default
};
