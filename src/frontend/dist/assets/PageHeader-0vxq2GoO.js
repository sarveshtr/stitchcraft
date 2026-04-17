import { j as jsxRuntimeExports, m as motion, d as cn } from "./index-8S2Cru2x.js";
function PageHeader({
  title,
  subtitle,
  badge,
  className,
  centered = false,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "py-12 md:py-16 px-4",
        centered && "text-center",
        className
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
          children: [
            badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block px-3 py-1 mb-4 text-xs font-medium tracking-widest uppercase text-primary bg-primary/10 rounded-full border border-primary/20", children: badge }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground leading-tight mb-4", children: title }),
            subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed", children: subtitle }),
            children && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children })
          ]
        }
      )
    }
  );
}
export {
  PageHeader as P
};
