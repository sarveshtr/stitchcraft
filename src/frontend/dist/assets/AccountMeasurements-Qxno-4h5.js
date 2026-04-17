import { i as useAuth, r as reactExports, j as jsxRuntimeExports, L as Link, m as motion, B as Button } from "./index-8S2Cru2x.js";
import { I as Input } from "./input-D6xFgmLn.js";
import { L as Label } from "./label-BS8SqPNm.js";
import { S as Skeleton } from "./skeleton-CVoRLpDg.js";
import { T as Textarea } from "./textarea-CS_Hxw4e.js";
import { u as ue } from "./index-DK0Pv57u.js";
import { E as EmptyState } from "./EmptyState-BvY9OZfP.js";
import { P as PageHeader } from "./PageHeader-0vxq2GoO.js";
import { R as Ruler } from "./ruler-sef2wIA6.js";
import { P as Pen } from "./pen-B1jR--B7.js";
import { L as LogIn } from "./log-in-jHTYVCCp.js";
import { S as Save } from "./save-CpAQ2Dkq.js";
import "./index-B_36CAa7.js";
const EMPTY_FORM = {
  bust: "",
  waist: "",
  hips: "",
  length: "",
  shoulder: "",
  sleeve: "",
  notes: ""
};
const FIELDS = [
  { key: "bust", label: "Bust / Chest", hint: "Around the fullest part" },
  { key: "waist", label: "Waist", hint: "Natural waistline" },
  { key: "hips", label: "Hips", hint: "Around the fullest part" },
  { key: "shoulder", label: "Shoulder Width", hint: "Shoulder to shoulder" },
  { key: "length", label: "Length", hint: "Neck to desired hem" },
  { key: "sleeve", label: "Sleeve Length", hint: "Shoulder to wrist" }
];
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-3", children: "Sign In Required" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "Please sign in to view and manage your measurements." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "lg",
            onClick: login,
            "data-ocid": "measurements.login_button",
            className: "gap-2 shadow-elegant w-full sm:w-auto",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
              "Sign In"
            ]
          }
        )
      ]
    }
  ) });
}
function MeasurementForm({
  initial,
  onSave,
  onCancel,
  isNew = false
}) {
  const [form, setForm] = reactExports.useState(initial);
  const [saving, setSaving] = reactExports.useState(false);
  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: FIELDS.map(({ key, label, hint }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: key, className: "text-sm font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: key,
            name: key,
            type: "number",
            min: "0",
            step: "0.5",
            value: form[key],
            onChange: handleChange,
            placeholder: "0",
            "data-ocid": `measurements.${key}_input`,
            className: "pr-10 transition-smooth"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none", children: "cm" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: hint })
    ] }, key)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notes", className: "text-sm font-medium", children: "Special Notes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          id: "notes",
          name: "notes",
          value: form.notes,
          onChange: handleChange,
          placeholder: "Any special fitting notes or preferences…",
          "data-ocid": "measurements.notes_input",
          className: "resize-none h-24 transition-smooth"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "submit",
          disabled: saving,
          "data-ocid": "measurements.save_button",
          className: "gap-2 shadow-elegant",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
            saving ? "Saving…" : isNew ? "Save Measurements" : "Update Measurements"
          ]
        }
      ),
      onCancel && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onCancel,
          "data-ocid": "measurements.cancel_button",
          children: "Cancel"
        }
      )
    ] })
  ] });
}
function AccountMeasurements() {
  const { isAuthenticated, isLoading } = useAuth();
  const [saved, setSaved] = reactExports.useState(null);
  const [editing, setEditing] = reactExports.useState(false);
  async function handleSave(values) {
    await new Promise((r) => setTimeout(r, 800));
    setSaved(values);
    setEditing(false);
    ue.success("Measurements saved successfully!");
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-12 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-56" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-xl" })
    ] });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPrompt, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Saved Measurements",
        badge: "Body Measurements",
        subtitle: "Your measurements ensure every garment fits perfectly.",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-2 text-sm text-muted-foreground -mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/account",
              "data-ocid": "measurements.account_link",
              className: "hover:text-foreground transition-colors",
              children: "Account"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Measurements" })
        ] })
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6", children: !saved && !editing ? (
      /* Empty state */
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "measurements.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: Ruler,
              title: "No measurements saved",
              description: "Save your body measurements for faster checkout and perfectly fitted garments every time.",
              actionLabel: "Add Measurements",
              onAction: () => setEditing(true)
            }
          ) })
        }
      )
    ) : editing ? (
      /* Edit / Add form */
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card rounded-xl border border-border p-6 shadow-elegant",
              "data-ocid": "measurements.edit_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold text-foreground mb-6", children: [
                  saved ? "Update Measurements" : "Add Measurements",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-normal ml-2", children: "(all values in cm)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MeasurementForm,
                  {
                    initial: saved ?? EMPTY_FORM,
                    onSave: handleSave,
                    onCancel: () => setEditing(false),
                    isNew: !saved
                  }
                )
              ]
            }
          )
        }
      )
    ) : (
      /* Display saved measurements */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45 },
          className: "space-y-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card rounded-xl border border-border shadow-elegant",
                "data-ocid": "measurements.display_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 pt-5 pb-4 border-b border-border/60", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Ruler, { className: "w-5 h-5 text-primary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Your Measurements" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "sm",
                        onClick: () => setEditing(true),
                        "data-ocid": "measurements.edit_button",
                        className: "gap-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" }),
                          "Edit"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: FIELDS.map(({ key, label }) => {
                      const val = saved == null ? void 0 : saved[key];
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "bg-muted/40 rounded-lg px-4 py-3 border border-border/40",
                          "data-ocid": `measurements.${key}_display`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1", children: label }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold text-foreground", children: val ? `${val} cm` : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50 text-base font-body", children: "—" }) })
                          ]
                        },
                        key
                      );
                    }) }),
                    (saved == null ? void 0 : saved.notes) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-4 bg-muted/30 rounded-lg border border-border/40", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1", children: "Notes" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: saved.notes })
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-xl border border-border/40 p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground text-sm mb-3", children: "Measurement Tips" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: [
                "Measure over light clothing for accuracy",
                "Keep the tape snug but not tight",
                "Stand straight and relaxed while measuring",
                "Update measurements every 3–6 months"
              ].map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "text-xs text-muted-foreground flex items-start gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" }),
                    tip
                  ]
                },
                tip
              )) })
            ] })
          ]
        }
      )
    ) })
  ] });
}
export {
  AccountMeasurements as default
};
