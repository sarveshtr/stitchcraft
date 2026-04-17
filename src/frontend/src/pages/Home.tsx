import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  Package,
  Ruler,
  Scissors,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { ServiceCard } from "../components/ServiceCard";
import { useReviews, useServices } from "../hooks/use-backend";

// ─── Fade-up animation helper ─────────────────────────────────────────────────
function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true as const },
    transition: {
      duration: 0.55,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  };
}

function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true as const },
    transition: { duration: 0.55, delay, ease: "easeOut" as const },
  };
}

// ─── Static data ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "women",
    label: "Women",
    description: "Sarees, blouses, suits & ethnic wear",
    image: "https://picsum.photos/seed/women-fashion-india/480/600",
    href: "/services",
  },
  {
    id: "men",
    label: "Men",
    description: "Shirts, trousers, sherwanis & kurtas",
    image: "https://picsum.photos/seed/men-fashion-suit-india/480/600",
    href: "/services",
  },
  {
    id: "kids",
    label: "Kids",
    description: "Frocks, suits & festive outfits",
    image: "https://picsum.photos/seed/kids-fashion-festive/480/600",
    href: "/services",
  },
];

const STEPS = [
  {
    icon: Scissors,
    title: "Choose Service",
    description:
      "Browse our tailoring services and select what suits your style and occasion.",
  },
  {
    icon: Ruler,
    title: "Share Measurements",
    description:
      "Provide measurements online or visit our atelier for a professional fitting session.",
  },
  {
    icon: Sparkles,
    title: "Expert Crafting",
    description:
      "Our master tailors craft your garment with precision and artisanal care.",
  },
  {
    icon: Package,
    title: "Swift Delivery",
    description:
      "Your perfectly tailored outfit is delivered right to your doorstep on time.",
  },
];

const DESIGNS = [
  {
    id: 1,
    src: "https://picsum.photos/seed/bridal-lehenga-red/400/520",
    tag: "Bridal",
    label: "Silk Lehenga",
  },
  {
    id: 2,
    src: "https://picsum.photos/seed/fashion-summer-suit/400/340",
    tag: "Casual",
    label: "Summer Suit",
  },
  {
    id: 3,
    src: "https://picsum.photos/seed/anarkali-gown-ethnic/400/440",
    tag: "Ethnic",
    label: "Anarkali Gown",
  },
  {
    id: 4,
    src: "https://picsum.photos/seed/tailored-blazer-formal/400/360",
    tag: "Formal",
    label: "Tailored Blazer",
  },
  {
    id: 5,
    src: "https://picsum.photos/seed/embroidered-blouse-pink/400/500",
    tag: "Festive",
    label: "Embroidered Blouse",
  },
  {
    id: 6,
    src: "https://picsum.photos/seed/bespoke-fashion-custom/400/380",
    tag: "Custom",
    label: "Bespoke Creation",
  },
];

// ─── Decorative SVG thread pattern ─────────────────────────────────────────────
function StitchPattern() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="stitch"
          x="0"
          y="0"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.8" fill="currentColor" />
          <circle cx="26" cy="26" r="1.8" fill="currentColor" />
          <line
            x1="2"
            y1="2"
            x2="26"
            y2="26"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="3 4"
          />
          <line
            x1="26"
            y1="2"
            x2="2"
            y2="26"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="3 4"
          />
          <circle cx="48" cy="2" r="1.8" fill="currentColor" />
          <circle cx="48" cy="48" r="1.8" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#stitch)" />
    </svg>
  );
}

// ─── Star rating ───────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={`star-${n}`}
          className={`w-4 h-4 ${n <= rating ? "fill-amber-400 text-amber-400" : "text-border"}`}
        />
      ))}
    </div>
  );
}

// ─── Home page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const { data: services } = useServices();
  const { data: reviews } = useReviews();

  const popularServices = (services ?? []).slice(0, 4);

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        data-ocid="home.hero.section"
        className="relative min-h-[92vh] flex items-center overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/generated/hero-tailoring.dim_1600x900.jpg"
            alt="Expert tailoring atelier"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/96 via-background/72 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
        </div>

        {/* Stitching thread pattern overlay */}
        <div className="absolute inset-0 z-0 text-foreground">
          <StitchPattern />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 py-24 max-w-7xl">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="outline"
                className="mb-6 px-4 py-1.5 text-xs font-medium tracking-widest uppercase border-primary/30 text-primary bg-primary/5"
              >
                ✦ Bespoke Tailoring Since 2010
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] mb-6"
            >
              Expert Tailoring,{" "}
              <span className="text-primary italic">Crafted</span> for You
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl"
            >
              Discover custom clothing made with care and precision. From bridal
              lehengas to everyday suits — your perfect fit, delivered with
              artisanal craftsmanship.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 font-semibold shadow-lifted transition-smooth group"
                data-ocid="home.hero.book_now_button"
              >
                <Link to="/custom-stitching">
                  Book Now
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-semibold border-border/60 transition-smooth"
                data-ocid="home.hero.view_services_button"
              >
                <Link to="/services">Explore Services</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex gap-8 mt-12 pt-8 border-t border-border/40"
            >
              {[
                { num: "2,400+", label: "Happy Clients" },
                { num: "15+", label: "Expert Tailors" },
                { num: "98%", label: "Satisfaction" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold text-foreground">
                    {stat.num}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-muted-foreground/40"
        >
          <ChevronRight className="w-6 h-6 rotate-90" />
        </motion.div>
      </section>

      {/* ── Categories ────────────────────────────────────────────────────── */}
      <section
        data-ocid="home.categories.section"
        className="py-24 bg-muted/30"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">
              Shop by Category
            </p>
            <h2 className="font-display text-4xl font-bold text-foreground">
              Crafted for Everyone
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, i) => (
              <motion.div key={cat.id} {...fadeUp(i * 0.1)}>
                <Link
                  to={cat.href}
                  data-ocid={`home.categories.item.${i + 1}`}
                  className="group relative overflow-hidden rounded-2xl block aspect-[3/4] shadow-elegant hover:shadow-lifted transition-smooth"
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <h3 className="font-display text-3xl font-bold text-primary-foreground mb-1">
                      {cat.label}
                    </h3>
                    <p className="text-sm text-primary-foreground/75 mb-4">
                      {cat.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-foreground/90 border border-primary-foreground/30 rounded-full px-4 py-1.5 group-hover:bg-primary-foreground/10 transition-smooth">
                      Explore{" "}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Services ──────────────────────────────────────────────── */}
      <section
        data-ocid="home.services.section"
        className="py-24 bg-background"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            {...fadeUp()}
            className="flex items-end justify-between mb-14"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">
                Our Services
              </p>
              <h2 className="font-display text-4xl font-bold text-foreground">
                Popular Services
              </h2>
            </div>
            <Button
              asChild
              variant="ghost"
              className="hidden sm:flex items-center gap-2 text-primary font-medium transition-smooth"
              data-ocid="home.services.view_all_button"
            >
              <Link to="/services">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          {popularServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularServices.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {([1, 2, 3, 4] as const).map((n) => (
                <div
                  key={`skel-${n}`}
                  className="rounded-xl overflow-hidden bg-card border border-border animate-pulse"
                  data-ocid={`home.services.loading_state.${n}`}
                >
                  <div className="aspect-[4/3] bg-muted" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                    <div className="h-8 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Button
              asChild
              variant="outline"
              className="rounded-full px-8"
              data-ocid="home.services.mobile_view_all_button"
            >
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section
        data-ocid="home.how_it_works.section"
        className="py-24 bg-muted/30 relative overflow-hidden"
      >
        <div className="absolute -left-32 top-0 w-96 h-96 bg-primary/4 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-32 bottom-0 w-96 h-96 bg-accent/4 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">
              Simple Process
            </p>
            <h2 className="font-display text-4xl font-bold text-foreground">
              How It Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-10 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  {...fadeUp(i * 0.12)}
                  className="relative flex flex-col items-center text-center"
                  data-ocid={`home.how_it_works.item.${i + 1}`}
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-card border border-border shadow-elegant flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Designs ─────────────────────────────────────────────── */}
      <section data-ocid="home.designs.section" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            {...fadeUp()}
            className="flex items-end justify-between mb-14"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">
                Inspiration
              </p>
              <h2 className="font-display text-4xl font-bold text-foreground">
                Featured Designs
              </h2>
            </div>
            <Button
              asChild
              variant="ghost"
              className="hidden sm:flex items-center gap-2 text-primary font-medium transition-smooth"
              data-ocid="home.designs.view_gallery_button"
            >
              <Link to="/gallery">
                View Gallery <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {DESIGNS.map((design, i) => (
              <motion.div
                key={design.id}
                {...fadeIn(i * 0.08)}
                className="group relative overflow-hidden rounded-xl shadow-elegant hover:shadow-lifted transition-smooth break-inside-avoid mb-4"
                data-ocid={`home.designs.item.${i + 1}`}
              >
                <img
                  src={design.src}
                  alt={design.label}
                  className="w-full object-cover group-hover:scale-105 transition-smooth duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-smooth">
                  <Badge variant="secondary" className="mb-1 text-xs">
                    {design.tag}
                  </Badge>
                  <p className="font-display text-sm font-semibold text-primary-foreground">
                    {design.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section
        data-ocid="home.testimonials.section"
        className="py-24 bg-muted/30 relative overflow-hidden"
      >
        <div className="absolute inset-0 text-foreground">
          <StitchPattern />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">
              Client Stories
            </p>
            <h2 className="font-display text-4xl font-bold text-foreground">
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(reviews ?? []).slice(0, 3).map((review, i) => (
              <motion.div
                key={review.id}
                {...fadeUp(i * 0.12)}
                className="bg-card rounded-2xl p-7 border border-border shadow-elegant"
                data-ocid={`home.testimonials.item.${i + 1}`}
              >
                <StarRating rating={review.rating} />
                <blockquote className="mt-4 mb-6 text-sm text-muted-foreground leading-relaxed italic">
                  "{review.comment}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <span className="font-display text-sm font-bold text-primary">
                      {review.userName.charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {review.userName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Verified Customer
                    </p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-primary ml-auto shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.3)} className="text-center mt-10">
            <Button
              asChild
              variant="outline"
              className="rounded-full px-8 transition-smooth"
              data-ocid="home.testimonials.view_all_button"
            >
              <Link to="/reviews">Read All Reviews</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Offer Banner ─────────────────────────────────────────────────── */}
      <section
        data-ocid="home.offer.section"
        className="py-20 bg-primary/8 border-y border-primary/15 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <motion.div {...fadeUp()} className="text-center lg:text-left">
              <Badge className="mb-4 text-xs tracking-widest uppercase bg-primary/15 text-primary border-primary/25">
                Limited Time Offer
              </Badge>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-3">
                First Order <span className="text-primary italic">20% OFF</span>
              </h2>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                New to Atelier Bloom? Enjoy 20% off on your first stitching
                order. Use the code at checkout.
              </p>
            </motion.div>

            <motion.div
              {...fadeUp(0.15)}
              className="flex flex-col items-center gap-5"
            >
              <div className="flex items-center gap-0">
                <div className="bg-card border border-border rounded-l-xl px-6 py-4 font-mono font-bold text-2xl text-foreground tracking-[0.15em] select-all">
                  BLOOM20
                </div>
                <div className="bg-primary text-primary-foreground rounded-r-xl px-5 py-4 text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-primary/90 transition-smooth">
                  Copy
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Valid for orders above ₹1,000 · Expires Apr 30, 2026
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 shadow-lifted transition-smooth"
                data-ocid="home.offer.book_now_button"
              >
                <Link to="/services">
                  Book Now & Save <Sparkles className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────────────────────── */}
      <section data-ocid="home.cta.section" className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp()} className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-8">
              <Scissors className="w-7 h-7 text-primary" />
            </div>

            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-5">
              Ready for Your{" "}
              <span className="text-primary italic">Perfect Fit?</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Let our master tailors craft something uniquely yours. Start with
              a custom design or browse our services — your dream outfit is just
              a few clicks away.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 font-semibold shadow-lifted transition-smooth group"
                data-ocid="home.cta.start_design_button"
              >
                <Link to="/custom-stitching">
                  Start Your Design
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-10 font-semibold border-border/60 transition-smooth"
                data-ocid="home.cta.contact_button"
              >
                <Link to="/contact">
                  <MessageCircle className="mr-2 w-4 h-4" />
                  Contact Us
                </Link>
              </Button>
            </div>

            <motion.a
              {...fadeUp(0.2)}
              href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20book%20a%20stitching%20service"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="home.cta.whatsapp_button"
              className="inline-flex items-center gap-2 mt-6 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="text-green-600">💬</span>
              Chat on WhatsApp for quick enquiries
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
