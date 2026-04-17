import { j as jsxRuntimeExports, B as Button, d as cn } from "./index-8S2Cru2x.js";
function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "empty_state",
      className: cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      ),
      children: [
        Icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 p-4 rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-8 h-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-display font-semibold text-foreground mb-2", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm mb-6", children: description }),
        actionLabel && onAction && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: onAction,
            "data-ocid": "empty_state.primary_button",
            className: "transition-smooth",
            children: actionLabel
          }
        )
      ]
    }
  );
}
export {
  EmptyState as E
};
