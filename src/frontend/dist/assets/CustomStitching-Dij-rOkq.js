import { c as createLucideIcon, j as jsxRuntimeExports, d as cn, i as useAuth, b as useCartStore, r as reactExports, A as AnimatePresence, m as motion, B as Button, C as ChevronRight, X, S as Scissors } from "./index-8S2Cru2x.js";
import { P as PageHeader } from "./PageHeader-0vxq2GoO.js";
import { B as Badge } from "./badge-BlzNEo3z.js";
import { I as Input } from "./input-D6xFgmLn.js";
import { L as Label } from "./label-BS8SqPNm.js";
import { S as Separator } from "./separator-BBeiFi9i.js";
import { T as Textarea } from "./textarea-CS_Hxw4e.js";
import { u as ue } from "./index-DK0Pv57u.js";
import { C as ChevronLeft } from "./chevron-left-CWXdkJHK.js";
import { R as Ruler } from "./ruler-sef2wIA6.js";
import { C as Check } from "./check-Cbeh65r7.js";
import { I as Image } from "./image-fJTfCCXT.js";
import { C as CircleAlert } from "./circle-alert-BABCc74e.js";
import "./index-B_36CAa7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
];
const Palette = createLucideIcon("palette", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
];
const ShoppingCart = createLucideIcon("shopping-cart", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
const BASE_PRICES = {
  Blouse: { min: 800, max: 1200 },
  Suit: { min: 2500, max: 4e3 },
  Lehenga: { min: 3e3, max: 5e3 },
  Dress: { min: 1500, max: 2500 },
  Kurta: { min: 600, max: 900 },
  Salwar: { min: 1200, max: 1800 }
};
const FABRIC_MULTIPLIERS = {
  Cotton: 1,
  Silk: 1.3,
  Chiffon: 1.2,
  Georgette: 1.2,
  Velvet: 1.5,
  Linen: 1.1,
  Net: 1.15,
  Crepe: 1.1
};
const FABRIC_OPTIONS = [
  "Cotton",
  "Silk",
  "Chiffon",
  "Georgette",
  "Velvet",
  "Linen",
  "Net",
  "Crepe"
];
const CLOTHING_OPTIONS = [
  "Blouse",
  "Suit",
  "Lehenga",
  "Dress",
  "Kurta",
  "Salwar"
];
function calcPrice(clothing, fabric) {
  const base = BASE_PRICES[clothing];
  const mult = FABRIC_MULTIPLIERS[fabric];
  return { min: Math.round(base.min * mult), max: Math.round(base.max * mult) };
}
const STEPS = [
  { id: 1, label: "Design & Fabric", icon: Palette },
  { id: 2, label: "Measurements", icon: Ruler },
  { id: 3, label: "Review & Price", icon: ShoppingCart }
];
function StepIndicator({ current }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-center gap-0 mb-10", children: STEPS.map((step, idx) => {
    const Icon = step.icon;
    const isCompleted = current > step.id;
    const isActive = current === step.id;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            animate: { scale: isActive ? 1.08 : 1 },
            transition: { duration: 0.3 },
            className: cn(
              "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-smooth",
              isCompleted || isActive ? "bg-primary border-primary" : "bg-muted border-border"
            ),
            children: isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-primary-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Icon,
              {
                className: cn(
                  "w-4 h-4",
                  isActive ? "text-primary-foreground" : "text-muted-foreground"
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "text-xs font-medium hidden sm:block transition-smooth",
              isActive ? "text-primary" : "text-muted-foreground"
            ),
            children: step.label
          }
        )
      ] }),
      idx < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "w-16 sm:w-24 h-0.5 mx-2 mt-[-14px] transition-smooth",
            current > step.id ? "bg-primary" : "bg-border"
          )
        }
      )
    ] }, step.id);
  }) });
}
function SelectChips({ options, value, onChange, ...rest }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", ...rest, children: options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => onChange(opt),
      className: cn(
        "px-3 py-1.5 rounded-full text-sm border transition-smooth cursor-pointer",
        value === opt ? "bg-primary text-primary-foreground border-primary shadow-elegant" : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-primary/5"
      ),
      children: opt
    },
    opt
  )) });
}
function Step1Form({
  data,
  onChange,
  designImage,
  onImageChange,
  imagePreview
}) {
  const fileRef = reactExports.useRef(null);
  const handleFileChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      ue.error("Please upload an image file (JPG, PNG, WebP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      ue.error("Image must be under 5 MB");
      return;
    }
    onImageChange(file);
  };
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file == null ? void 0 : file.type.startsWith("image/")) onImageChange(file);
    },
    [onImageChange]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground", children: [
        "Clothing Type ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectChips,
        {
          "data-ocid": "custom.clothing_type.select",
          options: CLOTHING_OPTIONS,
          value: data.clothingType,
          onChange: (v) => onChange({ clothingType: v })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground", children: [
        "Fabric Type ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectChips,
        {
          "data-ocid": "custom.fabric_type.select",
          options: FABRIC_OPTIONS,
          value: data.fabricType,
          onChange: (v) => onChange({ fabricType: v })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground", children: "Upload Design / Inspiration Image" }),
      imagePreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-sm rounded-xl overflow-hidden border border-border shadow-elegant group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: imagePreview,
            alt: "Design preview",
            className: "w-full aspect-[4/3] object-cover"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onImageChange(null),
            className: "absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center border border-border opacity-0 group-hover:opacity-100 transition-smooth hover:bg-destructive hover:text-destructive-foreground",
            "aria-label": "Remove image",
            "data-ocid": "custom.design_image.remove_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3 h-3 mr-1" }),
          designImage == null ? void 0 : designImage.name
        ] }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center gap-3 text-center",
          onDrop: handleDrop,
          onDragOver: (e) => e.preventDefault(),
          "data-ocid": "custom.design_image.dropzone",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Drop your design image here" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "JPG, PNG, WebP · Max 5 MB" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "mt-1",
                onClick: () => {
                  var _a;
                  return (_a = fileRef.current) == null ? void 0 : _a.click();
                },
                "data-ocid": "custom.design_image.upload_button",
                children: "Browse Files"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: fileRef,
          type: "file",
          accept: "image/*",
          className: "hidden",
          onChange: handleFileChange
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          htmlFor: "specialInstructions",
          className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground",
          children: "Special Instructions"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          id: "specialInstructions",
          placeholder: "Describe any special requests, embroidery details, lining preferences, colour notes...",
          rows: 4,
          value: data.specialInstructions,
          onChange: (e) => onChange({ specialInstructions: e.target.value }),
          className: "resize-none",
          "data-ocid": "custom.special_instructions.textarea"
        }
      )
    ] })
  ] });
}
const MEASUREMENT_FIELDS = [
  { key: "bust", label: "Bust / Chest", placeholder: "86" },
  { key: "waist", label: "Waist", placeholder: "72" },
  { key: "hips", label: "Hips", placeholder: "94" },
  { key: "length", label: "Length", placeholder: "110" },
  { key: "shoulder", label: "Shoulder", placeholder: "38" },
  { key: "sleeve", label: "Sleeve Width", placeholder: "32" }
];
function Step2Form({ data, onChange, isAuthenticated }) {
  const handleUseSaved = () => {
    ue.info("Loading your saved measurements…");
    onChange({
      bust: "86",
      waist: "70",
      hips: "92",
      length: "105",
      shoulder: "37",
      sleeve: "30"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground", children: "Your Measurements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "All values in centimetres (cm)" })
      ] }),
      isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: handleUseSaved,
          className: "shrink-0",
          "data-ocid": "custom.use_saved_measurements.button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-3.5 h-3.5 mr-1.5" }),
            "Use Saved Measurements"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: MEASUREMENT_FIELDS.map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Label,
        {
          htmlFor: field.key,
          className: "text-sm font-medium text-foreground",
          children: [
            field.label,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(cm)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: field.key,
            type: "number",
            min: 0,
            step: 0.5,
            placeholder: field.placeholder,
            value: data[field.key],
            onChange: (e) => onChange({ [field.key]: e.target.value }),
            className: "pr-10",
            "data-ocid": `custom.measurement_${field.key}.input`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none", children: "cm" })
      ] })
    ] }, field.key)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-primary/5 border border-primary/15 p-5 flex gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "Measurement Guide" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs text-muted-foreground space-y-0.5 list-disc list-inside", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Measure directly on your body, not over clothing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Keep the tape snug but not tight" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Bust: fullest part of the chest · Waist: narrowest part of your torso" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Hips: widest part of your hips / seat" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          htmlFor: "measurementNotes",
          className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground",
          children: "Additional Notes"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          id: "measurementNotes",
          placeholder: "Any special fit preferences, posture notes, or adjustments...",
          rows: 3,
          value: data.measurementNotes,
          onChange: (e) => onChange({ measurementNotes: e.target.value }),
          className: "resize-none",
          "data-ocid": "custom.measurement_notes.textarea"
        }
      )
    ] })
  ] });
}
function ReviewRow({
  label,
  value,
  compact
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        compact ? "space-y-0.5" : "flex items-start justify-between gap-2"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: cn(
              "font-medium text-foreground",
              compact ? "text-sm" : "text-sm text-right"
            ),
            children: value
          }
        )
      ]
    }
  );
}
function Step3Review({
  step1,
  step2,
  imagePreview,
  designImage,
  onAddToCart,
  isAdding
}) {
  const price = calcPrice(step1.clothingType, step1.fabricType);
  const midPrice = Math.round((price.min + price.max) / 2);
  const premiumPct = Math.round(
    (FABRIC_MULTIPLIERS[step1.fabricType] - 1) * 100
  );
  const filledMeasurements = MEASUREMENT_FIELDS.filter(
    (f) => step2[f.key] && String(step2[f.key]).trim()
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-elegant", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm uppercase tracking-wide", children: "Your Order" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewRow, { label: "Clothing", value: step1.clothingType }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewRow, { label: "Fabric", value: step1.fabricType }),
          designImage && /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewRow, { label: "Design Reference", value: designImage.name }),
          step1.specialInstructions && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Special Instructions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed line-clamp-3", children: step1.specialInstructions })
          ] })
        ] }),
        imagePreview && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Uploaded Design" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: imagePreview,
                alt: "Design reference",
                className: "w-28 h-20 object-cover rounded-lg border border-border"
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-elegant", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm uppercase tracking-wide", children: "Measurements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        filledMeasurements.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: filledMeasurements.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReviewRow,
          {
            label: f.label,
            value: `${step2[f.key]} cm`,
            compact: true
          },
          f.key
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "No measurements provided — our team will contact you." }),
        step2.measurementNotes && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: step2.measurementNotes })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-primary/20 bg-primary/5 shadow-elegant overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest", children: "Estimated Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-display font-bold text-primary", children: [
            "₹",
            price.min.toLocaleString(),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl text-muted-foreground font-normal", children: [
              " ",
              "– ₹",
              price.max.toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            step1.clothingType,
            " in ",
            step1.fabricType,
            " ·",
            " ",
            premiumPct > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
              "+",
              premiumPct,
              "% fabric premium"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Base price" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right hidden sm:block space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Mid estimate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-semibold text-foreground", children: [
            "₹",
            midPrice.toLocaleString()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4 bg-primary/15" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 text-xs text-muted-foreground", children: [
        "Free consultation",
        "1 free alteration",
        "7–14 day delivery"
      ].map((perk) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "inline-flex items-center gap-1 bg-card rounded-full px-3 py-1 border border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-primary" }),
            perk
          ]
        },
        perk
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        size: "lg",
        className: "w-full text-base font-semibold shadow-elegant",
        onClick: onAddToCart,
        disabled: isAdding,
        "data-ocid": "custom.add_to_cart.primary_button",
        children: isAdding ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }),
          "Adding to Cart…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-5 h-5" }),
          "Add to Cart · ₹",
          price.min.toLocaleString(),
          "+"
        ] })
      }
    )
  ] });
}
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 })
};
function CustomStitching() {
  const { isAuthenticated } = useAuth();
  const { addItem } = useCartStore();
  const [step, setStep] = reactExports.useState(1);
  const [direction, setDirection] = reactExports.useState(1);
  const [isAdding, setIsAdding] = reactExports.useState(false);
  const [designImage, setDesignImage] = reactExports.useState(null);
  const [imagePreview, setImagePreview] = reactExports.useState(null);
  const [step1, setStep1] = reactExports.useState({
    clothingType: "Blouse",
    fabricType: "Cotton",
    specialInstructions: ""
  });
  const [step2, setStep2] = reactExports.useState({
    bust: "",
    waist: "",
    hips: "",
    length: "",
    shoulder: "",
    sleeve: "",
    measurementNotes: ""
  });
  const handleImageChange = (file) => {
    if (!file) {
      setDesignImage(null);
      setImagePreview(null);
      return;
    }
    setDesignImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      var _a;
      return setImagePreview((_a = e.target) == null ? void 0 : _a.result);
    };
    reader.readAsDataURL(file);
  };
  const goNext = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, 3));
  };
  const goPrev = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };
  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      const uploadedImageUrl = imagePreview ?? "";
      const price = calcPrice(step1.clothingType, step1.fabricType);
      const customService = {
        id: `custom-${step1.clothingType.toLowerCase()}-${step1.fabricType.toLowerCase()}-${Date.now()}`,
        slug: `custom-${step1.clothingType.toLowerCase()}`,
        name: `Custom ${step1.clothingType} — ${step1.fabricType}`,
        category: "custom",
        description: step1.specialInstructions || `Custom ${step1.clothingType} in ${step1.fabricType}`,
        priceMin: price.min,
        priceMax: price.max,
        deliveryDays: 10,
        imageUrl: uploadedImageUrl || "/assets/images/placeholder.svg",
        isActive: true,
        addons: []
      };
      const measurementSummary = MEASUREMENT_FIELDS.filter((f) => step2[f.key]).map((f) => `${f.label}: ${step2[f.key]}cm`).join(", ");
      addItem(customService, {
        quantity: 1,
        selectedAddons: [],
        customInstructions: [
          step1.specialInstructions,
          measurementSummary,
          step2.measurementNotes
        ].filter(Boolean).join(" | ") || "Custom order",
        fabricType: step1.fabricType
      });
      ue.success(`Custom ${step1.clothingType} added to cart!`, {
        description: `₹${price.min.toLocaleString()} – ₹${price.max.toLocaleString()} · ${step1.fabricType}`
      });
    } catch {
      ue.error("Failed to add to cart. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Custom Stitching Order",
        subtitle: "Design your dream outfit — tell us your vision and we'll craft it with precision.",
        badge: "Bespoke"
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { current: step }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden min-h-96", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", custom: direction, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          custom: direction,
          variants: slideVariants,
          initial: "enter",
          animate: "center",
          exit: "exit",
          transition: { duration: 0.32, ease: [0.25, 0.1, 0.25, 1] },
          "data-ocid": `custom.step_${step}.panel`,
          children: [
            step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Step1Form,
              {
                data: step1,
                onChange: (d) => setStep1((prev) => ({ ...prev, ...d })),
                designImage,
                onImageChange: handleImageChange,
                imagePreview
              }
            ),
            step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Step2Form,
              {
                data: step2,
                onChange: (d) => setStep2((prev) => ({ ...prev, ...d })),
                isAuthenticated
              }
            ),
            step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Step3Review,
              {
                step1,
                step2,
                imagePreview,
                designImage,
                onAddToCart: handleAddToCart,
                isAdding
              }
            )
          ]
        },
        step
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "flex mt-10 pt-6 border-t border-border",
            step === 1 ? "justify-end" : "justify-between"
          ),
          children: [
            step > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "lg",
                onClick: goPrev,
                "data-ocid": "custom.prev_step.button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4 mr-1" }),
                  "Back"
                ]
              }
            ),
            step < 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "lg",
                onClick: goNext,
                className: "shadow-elegant",
                "data-ocid": "custom.next_step.button",
                children: [
                  "Continue",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-1" })
                ]
              }
            )
          ]
        }
      )
    ] })
  ] });
}
export {
  CustomStitching as default
};
