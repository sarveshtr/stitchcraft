import { j as jsxRuntimeExports, m as motion, B as Button, L as Link, C as ChevronRight, S as Scissors, P as Package } from "./index-8S2Cru2x.js";
import { B as Badge } from "./badge-BlzNEo3z.js";
import { S as ServiceCard, a as Sparkles } from "./ServiceCard-DLdysS-3.js";
import { u as useServices, a as useReviews } from "./use-backend-DqovxjMb.js";
import { A as ArrowRight } from "./arrow-right-DMuIQUSy.js";
import { R as Ruler } from "./ruler-sef2wIA6.js";
import { C as CircleCheck } from "./circle-check-C85zSLON.js";
import { M as MessageCircle } from "./message-circle-BrW0kh0G.js";
import { S as Star } from "./star-DU8OE6AG.js";
import "./clock-BiFJ7_6B.js";
import "./useQuery-C35CS9u-.js";
function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: {
      duration: 0.55,
      delay,
      ease: [0.25, 0.1, 0.25, 1]
    }
  };
}
function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.55, delay, ease: "easeOut" }
  };
}
const CATEGORIES = [
  {
    id: "women",
    label: "Women",
    description: "Sarees, blouses, suits & ethnic wear",
    image: "https://picsum.photos/seed/women-fashion-india/480/600",
    href: "/services"
  },
  {
    id: "men",
    label: "Men",
    description: "Shirts, trousers, sherwanis & kurtas",
    image: "https://picsum.photos/seed/men-fashion-suit-india/480/600",
    href: "/services"
  },
  {
    id: "kids",
    label: "Kids",
    description: "Frocks, suits & festive outfits",
    image: "https://picsum.photos/seed/kids-fashion-festive/480/600",
    href: "/services"
  }
];
const STEPS = [
  {
    icon: Scissors,
    title: "Choose Service",
    description: "Browse our tailoring services and select what suits your style and occasion."
  },
  {
    icon: Ruler,
    title: "Share Measurements",
    description: "Provide measurements online or visit our atelier for a professional fitting session."
  },
  {
    icon: Sparkles,
    title: "Expert Crafting",
    description: "Our master tailors craft your garment with precision and artisanal care."
  },
  {
    icon: Package,
    title: "Swift Delivery",
    description: "Your perfectly tailored outfit is delivered right to your doorstep on time."
  }
];
const DESIGNS = [
  {
    id: 1,
    src: "https://picsum.photos/seed/bridal-lehenga-red/400/520",
    tag: "Bridal",
    label: "Silk Lehenga"
  },
  {
    id: 2,
    src: "https://picsum.photos/seed/fashion-summer-suit/400/340",
    tag: "Casual",
    label: "Summer Suit"
  },
  {
    id: 3,
    src: "https://picsum.photos/seed/anarkali-gown-ethnic/400/440",
    tag: "Ethnic",
    label: "Anarkali Gown"
  },
  {
    id: 4,
    src: "https://picsum.photos/seed/tailored-blazer-formal/400/360",
    tag: "Formal",
    label: "Tailored Blazer"
  },
  {
    id: 5,
    src: "https://picsum.photos/seed/embroidered-blouse-pink/400/500",
    tag: "Festive",
    label: "Embroidered Blouse"
  },
  {
    id: 6,
    src: "https://picsum.photos/seed/bespoke-fashion-custom/400/380",
    tag: "Custom",
    label: "Bespoke Creation"
  }
];
function StitchPattern() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      "aria-hidden": "true",
      className: "absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "pattern",
          {
            id: "stitch",
            x: "0",
            y: "0",
            width: "48",
            height: "48",
            patternUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "2", cy: "2", r: "1.8", fill: "currentColor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "26", cy: "26", r: "1.8", fill: "currentColor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "2",
                  y1: "2",
                  x2: "26",
                  y2: "26",
                  stroke: "currentColor",
                  strokeWidth: "0.8",
                  strokeDasharray: "3 4"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "26",
                  y1: "2",
                  x2: "2",
                  y2: "26",
                  stroke: "currentColor",
                  strokeWidth: "0.8",
                  strokeDasharray: "3 4"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "48", cy: "2", r: "1.8", fill: "currentColor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "48", cy: "48", r: "1.8", fill: "currentColor" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: "url(#stitch)" })
      ]
    }
  );
}
function StarRating({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      className: `w-4 h-4 ${n <= rating ? "fill-amber-400 text-amber-400" : "text-border"}`
    },
    `star-${n}`
  )) });
}
function Home() {
  const { data: services } = useServices();
  const { data: reviews } = useReviews();
  const popularServices = (services ?? []).slice(0, 4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "home.hero.section",
        className: "relative min-h-[92vh] flex items-center overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/generated/hero-tailoring.dim_1600x900.jpg",
                alt: "Expert tailoring atelier",
                className: "w-full h-full object-cover object-center",
                onError: (e) => {
                  e.target.src = "/assets/images/placeholder.svg";
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/96 via-background/72 to-background/20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0 text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StitchPattern, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 container mx-auto px-6 lg:px-12 py-24 max-w-7xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "mb-6 px-4 py-1.5 text-xs font-medium tracking-widest uppercase border-primary/30 text-primary bg-primary/5",
                    children: "✦ Bespoke Tailoring Since 2010"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.h1,
              {
                initial: { opacity: 0, y: 28 },
                animate: { opacity: 1, y: 0 },
                transition: {
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.25, 0.1, 0.25, 1]
                },
                className: "font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] mb-6",
                children: [
                  "Expert Tailoring,",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary italic", children: "Crafted" }),
                  " for You"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: {
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.25, 0.1, 0.25, 1]
                },
                className: "text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl",
                children: "Discover custom clothing made with care and precision. From bridal lehengas to everyday suits — your perfect fit, delivered with artisanal craftsmanship."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.3 },
                className: "flex flex-wrap gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "lg",
                      className: "rounded-full px-8 font-semibold shadow-lifted transition-smooth group",
                      "data-ocid": "home.hero.book_now_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/custom-stitching", children: [
                        "Book Now",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "lg",
                      variant: "outline",
                      className: "rounded-full px-8 font-semibold border-border/60 transition-smooth",
                      "data-ocid": "home.hero.view_services_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", children: "Explore Services" })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.45 },
                className: "flex gap-8 mt-12 pt-8 border-t border-border/40",
                children: [
                  { num: "2,400+", label: "Happy Clients" },
                  { num: "15+", label: "Expert Tailors" },
                  { num: "98%", label: "Satisfaction" }
                ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground", children: stat.num }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: stat.label })
                ] }, stat.label))
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { y: [0, 8, 0] },
              transition: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "easeInOut"
              },
              className: "absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-muted-foreground/40",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-6 h-6 rotate-90" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "home.categories.section",
        className: "py-24 bg-muted/30",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "text-center mb-14", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3", children: "Shop by Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-bold text-foreground", children: "Crafted for Everyone" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: CATEGORIES.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fadeUp(i * 0.1), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: cat.href,
              "data-ocid": `home.categories.item.${i + 1}`,
              className: "group relative overflow-hidden rounded-2xl block aspect-[3/4] shadow-elegant hover:shadow-lifted transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: cat.image,
                    alt: cat.label,
                    className: "w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-7", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl font-bold text-primary-foreground mb-1", children: cat.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-primary-foreground/75 mb-4", children: cat.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-semibold text-primary-foreground/90 border border-primary-foreground/30 rounded-full px-4 py-1.5 group-hover:bg-primary-foreground/10 transition-smooth", children: [
                    "Explore",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3 group-hover:translate-x-0.5 transition-transform" })
                  ] })
                ] })
              ]
            }
          ) }, cat.id)) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "home.services.section",
        className: "py-24 bg-background",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              ...fadeUp(),
              className: "flex items-end justify-between mb-14",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3", children: "Our Services" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-bold text-foreground", children: "Popular Services" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    variant: "ghost",
                    className: "hidden sm:flex items-center gap-2 text-primary font-medium transition-smooth",
                    "data-ocid": "home.services.view_all_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", children: [
                      "View All ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                    ] })
                  }
                )
              ]
            }
          ),
          popularServices.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: popularServices.map((service, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceCard, { service, index: i }, service.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl overflow-hidden bg-card border border-border animate-pulse",
              "data-ocid": `home.services.loading_state.${n}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] bg-muted" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-muted rounded w-3/4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-5/6" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 bg-muted rounded" })
                ] })
              ]
            },
            `skel-${n}`
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-center sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              className: "rounded-full px-8",
              "data-ocid": "home.services.mobile_view_all_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", children: "View All Services" })
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "home.how_it_works.section",
        className: "py-24 bg-muted/30 relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-32 top-0 w-96 h-96 bg-primary/4 rounded-full blur-3xl pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-32 bottom-0 w-96 h-96 bg-accent/4 rounded-full blur-3xl pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "text-center mb-16", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3", children: "Simple Process" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-bold text-foreground", children: "How It Works" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block absolute top-10 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-gradient-to-r from-transparent via-border to-transparent" }),
              STEPS.map((step, i) => {
                const Icon = step.icon;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    ...fadeUp(i * 0.12),
                    className: "relative flex flex-col items-center text-center",
                    "data-ocid": `home.how_it_works.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-card border border-border shadow-elegant flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-8 h-8 text-primary" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center", children: i + 1 })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-2", children: step.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: step.description })
                    ]
                  },
                  step.title
                );
              })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "home.designs.section", className: "py-24 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          ...fadeUp(),
          className: "flex items-end justify-between mb-14",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3", children: "Inspiration" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-bold text-foreground", children: "Featured Designs" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "ghost",
                className: "hidden sm:flex items-center gap-2 text-primary font-medium transition-smooth",
                "data-ocid": "home.designs.view_gallery_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/gallery", children: [
                  "View Gallery ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                ] })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "columns-2 md:columns-3 gap-4 space-y-4", children: DESIGNS.map((design, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          ...fadeIn(i * 0.08),
          className: "group relative overflow-hidden rounded-xl shadow-elegant hover:shadow-lifted transition-smooth break-inside-avoid mb-4",
          "data-ocid": `home.designs.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: design.src,
                alt: design.label,
                className: "w-full object-cover group-hover:scale-105 transition-smooth duration-700"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-smooth", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "mb-1 text-xs", children: design.tag }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold text-primary-foreground", children: design.label })
            ] })
          ]
        },
        design.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "home.testimonials.section",
        className: "py-24 bg-muted/30 relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StitchPattern, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "text-center mb-16", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3", children: "Client Stories" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-bold text-foreground", children: "What Our Clients Say" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: (reviews ?? []).slice(0, 3).map((review, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                ...fadeUp(i * 0.12),
                className: "bg-card rounded-2xl p-7 border border-border shadow-elegant",
                "data-ocid": `home.testimonials.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: review.rating }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "mt-4 mb-6 text-sm text-muted-foreground leading-relaxed italic", children: [
                    '"',
                    review.comment,
                    '"'
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-bold text-primary", children: review.userName.charAt(0) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: review.userName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Verified Customer" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary ml-auto shrink-0" })
                  ] })
                ]
              },
              review.id
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fadeUp(0.3), className: "text-center mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                className: "rounded-full px-8 transition-smooth",
                "data-ocid": "home.testimonials.view_all_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/reviews", children: "Read All Reviews" })
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "home.offer.section",
        className: "py-20 bg-primary/8 border-y border-primary/15 relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row items-center justify-between gap-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "text-center lg:text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 text-xs tracking-widest uppercase bg-primary/15 text-primary border-primary/25", children: "Limited Time Offer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl lg:text-5xl font-bold text-foreground mb-3", children: [
                "First Order ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary italic", children: "20% OFF" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-md leading-relaxed", children: "New to Atelier Bloom? Enjoy 20% off on your first stitching order. Use the code at checkout." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                ...fadeUp(0.15),
                className: "flex flex-col items-center gap-5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-l-xl px-6 py-4 font-mono font-bold text-2xl text-foreground tracking-[0.15em] select-all", children: "BLOOM20" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary text-primary-foreground rounded-r-xl px-5 py-4 text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-primary/90 transition-smooth", children: "Copy" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Valid for orders above ₹1,000 · Expires Apr 30, 2026" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "lg",
                      className: "rounded-full px-8 shadow-lifted transition-smooth",
                      "data-ocid": "home.offer.book_now_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", children: [
                        "Book Now & Save ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "ml-2 w-4 h-4" })
                      ] })
                    }
                  )
                ]
              }
            )
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "home.cta.section", className: "py-28 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6 lg:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp(), className: "text-center max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-7 h-7 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl lg:text-5xl font-bold text-foreground mb-5", children: [
        "Ready for Your",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary italic", children: "Perfect Fit?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground leading-relaxed mb-10", children: "Let our master tailors craft something uniquely yours. Start with a custom design or browse our services — your dream outfit is just a few clicks away." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "lg",
            className: "rounded-full px-10 font-semibold shadow-lifted transition-smooth group",
            "data-ocid": "home.cta.start_design_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/custom-stitching", children: [
              "Start Your Design",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "lg",
            variant: "outline",
            className: "rounded-full px-10 font-semibold border-border/60 transition-smooth",
            "data-ocid": "home.cta.contact_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "mr-2 w-4 h-4" }),
              "Contact Us"
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.a,
        {
          ...fadeUp(0.2),
          href: "https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20book%20a%20stitching%20service",
          target: "_blank",
          rel: "noopener noreferrer",
          "data-ocid": "home.cta.whatsapp_button",
          className: "inline-flex items-center gap-2 mt-6 text-sm text-muted-foreground hover:text-primary transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-600", children: "💬" }),
            "Chat on WhatsApp for quick enquiries"
          ]
        }
      )
    ] }) }) })
  ] });
}
export {
  Home as default
};
