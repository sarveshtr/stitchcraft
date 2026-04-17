import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, B as Button } from "./index-8S2Cru2x.js";
import { I as Input } from "./input-D6xFgmLn.js";
import { L as Label } from "./label-BS8SqPNm.js";
import { T as Textarea } from "./textarea-CS_Hxw4e.js";
import { P as PageHeader } from "./PageHeader-0vxq2GoO.js";
import { M as MapPin } from "./map-pin-ClRg--1x.js";
import { M as MessageCircle } from "./message-circle-BrW0kh0G.js";
import "./index-B_36CAa7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$1);
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
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
function Contact() {
  const [submitted, setSubmitted] = reactExports.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Contact Us",
        subtitle: "Have questions? We'd love to hear from you. Reach out and we'll respond within 2 hours.",
        badge: "Get in Touch"
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground mb-6", children: "Get in Touch" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: [
              {
                icon: MapPin,
                label: "Visit Us",
                value: "123 Fashion Street, Colaba, Mumbai - 400001"
              },
              { icon: Phone, label: "Call Us", value: "+91 98765 43210" },
              {
                icon: Mail,
                label: "Email Us",
                value: "hello@stitchcraft.in"
              }
            ].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-lg bg-primary/10 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: c.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: c.value })
              ] })
            ] }, c.label)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "https://wa.me/919876543210?text=Hello%20StitchCraft!",
                target: "_blank",
                rel: "noopener noreferrer",
                "data-ocid": "contact.whatsapp.link",
                className: "mt-8 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4 hover:bg-green-100 transition-smooth",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-6 h-6 text-green-600" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-green-800", children: "Chat on WhatsApp" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-600", children: "Instant replies during business hours" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 rounded-xl overflow-hidden border border-border aspect-video bg-muted/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-8 h-8 text-primary mx-auto mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "123 Fashion Street, Mumbai" })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.1 },
          children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-4", children: "✉️" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-display font-semibold text-foreground mb-2", children: "Message Sent!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "We'll get back to you within 2 hours." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-6", onClick: () => setSubmitted(false), children: "Send Another" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "bg-card rounded-xl border border-border p-6 shadow-elegant space-y-4",
              "data-ocid": "contact.form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground mb-2", children: "Send a Message" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "name",
                      required: true,
                      placeholder: "Priya Sharma",
                      "data-ocid": "contact.name.input",
                      className: "mt-1 transition-smooth"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "email",
                      type: "email",
                      required: true,
                      placeholder: "priya@example.com",
                      "data-ocid": "contact.email.input",
                      className: "mt-1 transition-smooth"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "subject", children: "Subject" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "subject",
                      required: true,
                      placeholder: "Service inquiry",
                      "data-ocid": "contact.subject.input",
                      className: "mt-1 transition-smooth"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "message", children: "Message" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "message",
                      required: true,
                      rows: 5,
                      placeholder: "Tell us how we can help...",
                      "data-ocid": "contact.message.textarea",
                      className: "mt-1 transition-smooth resize-none"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "w-full shadow-elegant",
                    "data-ocid": "contact.submit.submit_button",
                    children: "Send Message"
                  }
                )
              ]
            }
          )
        }
      )
    ] }) })
  ] });
}
export {
  Contact as default
};
