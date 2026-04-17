import { Link, useNavigate } from "@tanstack/react-router";
import { Package, Scissors, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageHeader } from "../components/PageHeader";
import { ServiceCard } from "../components/ServiceCard";
import { useServices } from "../hooks/use-backend";

type CategoryFilter = "all" | "women" | "men" | "kids" | "custom";

const CATEGORIES: { id: CategoryFilter; label: string; emoji: string }[] = [
  { id: "all", label: "All Services", emoji: "✨" },
  { id: "women", label: "Women", emoji: "👗" },
  { id: "men", label: "Men", emoji: "👔" },
  { id: "kids", label: "Kids", emoji: "🎀" },
  { id: "custom", label: "Custom Design", emoji: "🪡" },
];

export default function Services() {
  const navigate = useNavigate();

  // Read ?category from URL safely
  const getInitialCategory = (): CategoryFilter => {
    try {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category") ?? "all";
      return CATEGORIES.some((c) => c.id === cat)
        ? (cat as CategoryFilter)
        : "all";
    } catch {
      return "all";
    }
  };

  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>(getInitialCategory);

  const { data: services, isLoading } = useServices(
    activeCategory === "all" ? undefined : activeCategory,
  );

  // Sync category from URL on mount only
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category") ?? "all";
    if (CATEGORIES.some((c) => c.id === cat)) {
      setActiveCategory(cat as CategoryFilter);
    }
  }, []);

  const handleCategoryChange = (cat: CategoryFilter) => {
    setActiveCategory(cat);
    navigate({
      to: "/services",
      search:
        cat === "all"
          ? ({} as Record<string, string>)
          : ({ category: cat } as Record<string, string>),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header Zone */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="Our Services"
            subtitle="From blouses to lehengas — exquisitely crafted garments tailored to your unique measurements with artisan precision."
            badge="Artisan Craftsmanship"
          />
        </div>
      </div>

      {/* Sticky Filter Tabs */}
      <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                data-ocid={`services.filter.${cat.id}.tab`}
                onClick={() => handleCategoryChange(cat.id)}
                className={[
                  "flex shrink-0 items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium border transition-smooth",
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border hover:bg-accent hover:text-foreground hover:border-primary/40",
                ].join(" ")}
              >
                <span className="text-base leading-none">{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {isLoading ? (
          <div
            data-ocid="services.loading_state"
            className="flex items-center justify-center min-h-[40vh]"
          >
            <LoadingSpinner size="lg" />
          </div>
        ) : !services || services.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No services found"
            description="We couldn't find services in this category. Try a different filter."
            actionLabel="View All Services"
            onAction={() => handleCategoryChange("all")}
          />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Results count */}
              <div className="flex items-center gap-2 mb-8">
                <Sparkles className="w-4 h-4 text-primary" />
                <p className="text-muted-foreground text-sm font-medium">
                  {services.length} service{services.length !== 1 ? "s" : ""}{" "}
                  available
                  {activeCategory !== "all" && (
                    <span className="ml-1 capitalize">in {activeCategory}</span>
                  )}
                </p>
              </div>

              <div
                data-ocid="services.list"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {services.map((service, i) => (
                  <ServiceCard key={service.id} service={service} index={i} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-muted/40 border-t border-border py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-widest uppercase text-primary bg-primary/10 rounded-full border border-primary/20">
              Unique Vision?
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Create a Custom Design
            </h2>
            <p className="text-muted-foreground mb-7 leading-relaxed">
              Have something special in mind? Our expert tailors will bring your
              dream garment to life with a fully bespoke design consultation.
            </p>
            <Link
              to="/custom-stitching"
              data-ocid="services.custom_cta_button"
              className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground rounded-full font-medium text-sm shadow-elegant hover:opacity-90 transition-smooth"
            >
              <Scissors className="w-4 h-4" />
              Start Your Custom Design
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
