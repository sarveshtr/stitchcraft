import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useParams } from "@tanstack/react-router";
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Info,
  Minus,
  Plus,
  Ruler,
  ShoppingBag,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { PageLoader } from "../components/LoadingSpinner";
import { useService } from "../hooks/use-backend";
import { useCartStore } from "../store/cart";
import type { ServiceAddon } from "../types";

// Fixed add-ons that apply to every service (merged with service's own addons)
const STANDARD_ADDONS: ServiceAddon[] = [
  { id: "sa-lining", name: "Lining", price: 200 },
  { id: "sa-embroidery", name: "Embroidery", price: 500 },
  { id: "sa-beadwork", name: "Beadwork", price: 800 },
  { id: "sa-piping", name: "Piping", price: 150 },
  { id: "sa-buttons", name: "Buttons Upgrade", price: 100 },
];

const FABRICS = [
  "Cotton",
  "Silk",
  "Georgette",
  "Chiffon",
  "Velvet",
  "Linen",
  "Net",
  "Crepe",
];

const MEASUREMENT_FIELDS = [
  {
    key: "bust",
    label: "Bust / Chest",
    hint: "Around the fullest part of your chest",
  },
  {
    key: "waist",
    label: "Waist",
    hint: "Around the narrowest part of your torso",
  },
  { key: "hips", label: "Hips", hint: "Around the fullest part of your hips" },
  {
    key: "shoulder",
    label: "Shoulder Width",
    hint: "Across the back from shoulder tip to tip",
  },
  { key: "length", label: "Length", hint: "From shoulder to desired hemline" },
  {
    key: "sleeve",
    label: "Sleeve Length",
    hint: "From shoulder to wrist (arm relaxed)",
  },
];

export default function ServiceDetail() {
  const { slug } = useParams({ strict: false }) as { slug: string };
  const { data: service, isLoading, isError } = useService(slug);
  const addItem = useCartStore((s) => s.addItem);

  const [selectedAddons, setSelectedAddons] = useState<ServiceAddon[]>([]);
  const [fabricType, setFabricType] = useState("cotton");
  const [quantity, setQuantity] = useState(1);
  const [measurementOpen, setMeasurementOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const toggleAddon = (addon: ServiceAddon) => {
    setSelectedAddons((prev) =>
      prev.find((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon],
    );
  };

  const isAddonSelected = (id: string) =>
    selectedAddons.some((a) => a.id === id);

  const addonTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = service ? service.priceMin + addonTotal : 0;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    if (!service) return;
    addItem(service, { quantity, selectedAddons, fabricType });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  if (isLoading) return <PageLoader />;
  if (isError || !service) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <EmptyState
          data-ocid="service_detail.error_state"
          title="Service not found"
          description="This service does not exist or may have been removed."
          actionLabel="Browse All Services"
          onAction={() => {
            window.location.href = "/services";
          }}
        />
      </div>
    );
  }

  // Merge standard addons with service-specific ones (deduplicate by name)
  const allAddons: ServiceAddon[] = [
    ...STANDARD_ADDONS,
    ...service.addons.filter(
      (sa) =>
        !STANDARD_ADDONS.some(
          (std) => std.name.toLowerCase() === sa.name.toLowerCase(),
        ),
    ),
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              data-ocid="service_detail.breadcrumb.home"
              className="hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link
              to="/services"
              data-ocid="service_detail.breadcrumb.services"
              className="hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {service.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-lifted">
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/assets/images/placeholder.svg";
                }}
              />
            </div>
            {/* Floating delivery badge */}
            <div className="absolute bottom-5 left-5 bg-card/95 backdrop-blur-sm border border-border rounded-xl px-4 py-3 shadow-elegant">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground leading-none mb-0.5">
                    Delivery Time
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {service.deliveryDays} Days
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Service Info & Options */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.08,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex flex-col gap-6"
          >
            {/* Title & Meta */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="capitalize">
                  {service.category}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground leading-tight mb-3">
                {service.name}
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Price Range Banner */}
            <div className="p-4 bg-muted/40 rounded-xl border border-border">
              <p className="text-xs text-muted-foreground mb-1">
                Base Price Range
              </p>
              <p className="text-2xl font-display font-semibold text-foreground">
                ₹{service.priceMin.toLocaleString("en-IN")}
                <span className="text-base text-muted-foreground font-normal">
                  {" "}
                  – ₹{service.priceMax.toLocaleString("en-IN")}
                </span>
              </p>
            </div>

            {/* Fabric Selection */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-2.5">
                Select Fabric
              </p>
              <Select value={fabricType} onValueChange={setFabricType}>
                <SelectTrigger
                  className="w-full"
                  data-ocid="service_detail.fabric.select"
                >
                  <SelectValue placeholder="Choose a fabric" />
                </SelectTrigger>
                <SelectContent>
                  {FABRICS.map((f) => (
                    <SelectItem key={f} value={f.toLowerCase()}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Add-ons Checklist */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-2.5">
                Add-ons
              </p>
              <div className="space-y-2" data-ocid="service_detail.addons.list">
                {allAddons.map((addon, idx) => {
                  const checked = isAddonSelected(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon)}
                      data-ocid={`service_detail.addon.${idx + 1}.toggle`}
                      className={[
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-smooth",
                        checked
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/40 hover:bg-muted/30",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-3">
                        {/* Custom checkbox */}
                        <div
                          className={[
                            "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-smooth",
                            checked
                              ? "border-primary bg-primary"
                              : "border-border",
                          ].join(" ")}
                        >
                          {checked && (
                            <CheckCircle className="w-3.5 h-3.5 text-primary-foreground" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {addon.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-primary ml-4 shrink-0">
                        +₹{addon.price.toLocaleString("en-IN")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold text-foreground">Quantity</p>
              <div className="flex items-center rounded-lg border border-border overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  data-ocid="service_detail.quantity.minus.button"
                  className="p-2.5 hover:bg-muted transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4 text-foreground" />
                </button>
                <span className="px-5 py-2.5 text-sm font-semibold text-foreground border-x border-border min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  data-ocid="service_detail.quantity.plus.button"
                  className="p-2.5 hover:bg-muted transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4 text-foreground" />
                </button>
              </div>
            </div>

            {/* Live Price Calculator */}
            <div
              data-ocid="service_detail.price_calculator"
              className="bg-card border border-border rounded-xl p-4 space-y-2"
            >
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Price Summary
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Base price</span>
                <span className="text-foreground font-medium">
                  ₹{service.priceMin.toLocaleString("en-IN")}
                </span>
              </div>
              {selectedAddons.length > 0 && (
                <>
                  {selectedAddons.map((addon) => (
                    <div
                      key={addon.id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {addon.name}
                      </span>
                      <span className="text-primary font-medium">
                        +₹{addon.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm border-t border-border pt-2">
                    <span className="text-muted-foreground">Unit price</span>
                    <span className="text-foreground font-medium">
                      ₹{unitPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </>
              )}
              {quantity > 1 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">× {quantity}</span>
                  <span className="text-foreground font-medium">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
              <div className="flex justify-between border-t border-border pt-3 mt-2">
                <span className="text-sm font-semibold text-foreground">
                  Estimated Total
                </span>
                <motion.span
                  key={totalPrice}
                  initial={{ scale: 1.12, color: "var(--primary)" }}
                  animate={{ scale: 1, color: "var(--foreground)" }}
                  transition={{ duration: 0.3 }}
                  className="text-xl font-display font-semibold text-foreground"
                >
                  ₹{totalPrice.toLocaleString("en-IN")}
                </motion.span>
              </div>
            </div>

            {/* Book Now / Add to Cart CTA */}
            <Button
              size="lg"
              className="w-full shadow-elegant hover:shadow-lifted transition-smooth text-base"
              onClick={handleAddToCart}
              data-ocid="service_detail.add_to_cart.primary_button"
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Added to Cart!
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Book Now / Add to Cart
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Measurement Guide — Expandable */}
      <div className="bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <button
            type="button"
            data-ocid="service_detail.measurement_guide.toggle"
            onClick={() => setMeasurementOpen((v) => !v)}
            className="w-full flex items-center justify-between py-5 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Ruler className="w-4 h-4 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground text-sm md:text-base">
                  Measurement Guide
                </p>
                <p className="text-xs text-muted-foreground">
                  How to take accurate measurements for a perfect fit
                </p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: measurementOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </button>

          <AnimatePresence>
            {measurementOpen && (
              <motion.div
                key="measurement-guide"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-8 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {MEASUREMENT_FIELDS.map((field) => (
                      <div
                        key={field.key}
                        className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Info className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-0.5">
                            {field.label}
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {field.hint}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tips */}
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                    <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Pro Tips for Accurate Measurements
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground list-none">
                      {[
                        "Stand straight with feet together while measuring.",
                        "Wear minimal or well-fitted clothing.",
                        "Keep the measuring tape parallel to the floor.",
                        "Don't pull the tape too tight — just snug.",
                        "Have someone else measure your back for accuracy.",
                      ].map((tip) => (
                        <li key={tip} className="flex items-start gap-2">
                          <span className="text-primary font-bold shrink-0">
                            ·
                          </span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Service includes list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl font-display font-semibold text-foreground mb-6">
          What's Included
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "Free consultation with our master tailor",
            "2 fitting sessions included",
            "Premium thread & finishing",
            "Alterations within 30 days",
            "Secure garment packaging",
            "On-time delivery guarantee",
          ].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border"
            >
              <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-foreground leading-snug">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
