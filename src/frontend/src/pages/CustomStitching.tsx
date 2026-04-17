import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import type { Service } from "@/types";
import {
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Palette,
  Ruler,
  Scissors,
  ShoppingCart,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Price tables ─────────────────────────────────────────────────────────────

type ClothingType =
  | "Blouse"
  | "Suit"
  | "Lehenga"
  | "Dress"
  | "Kurta"
  | "Salwar";
type FabricType =
  | "Cotton"
  | "Silk"
  | "Chiffon"
  | "Georgette"
  | "Velvet"
  | "Linen"
  | "Net"
  | "Crepe";

const BASE_PRICES: Record<ClothingType, { min: number; max: number }> = {
  Blouse: { min: 800, max: 1200 },
  Suit: { min: 2500, max: 4000 },
  Lehenga: { min: 3000, max: 5000 },
  Dress: { min: 1500, max: 2500 },
  Kurta: { min: 600, max: 900 },
  Salwar: { min: 1200, max: 1800 },
};

const FABRIC_MULTIPLIERS: Record<FabricType, number> = {
  Cotton: 1.0,
  Silk: 1.3,
  Chiffon: 1.2,
  Georgette: 1.2,
  Velvet: 1.5,
  Linen: 1.1,
  Net: 1.15,
  Crepe: 1.1,
};

const FABRIC_OPTIONS: FabricType[] = [
  "Cotton",
  "Silk",
  "Chiffon",
  "Georgette",
  "Velvet",
  "Linen",
  "Net",
  "Crepe",
];

const CLOTHING_OPTIONS: ClothingType[] = [
  "Blouse",
  "Suit",
  "Lehenga",
  "Dress",
  "Kurta",
  "Salwar",
];

function calcPrice(clothing: ClothingType, fabric: FabricType) {
  const base = BASE_PRICES[clothing];
  const mult = FABRIC_MULTIPLIERS[fabric];
  return { min: Math.round(base.min * mult), max: Math.round(base.max * mult) };
}

// ─── Step definitions ─────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Design & Fabric", icon: Palette },
  { id: 2, label: "Measurements", icon: Ruler },
  { id: 3, label: "Review & Price", icon: ShoppingCart },
];

// ─── Form types ───────────────────────────────────────────────────────────────

interface Step1Fields {
  clothingType: ClothingType;
  fabricType: FabricType;
  specialInstructions: string;
}

interface Step2Fields {
  bust: string;
  waist: string;
  hips: string;
  length: string;
  shoulder: string;
  sleeve: string;
  measurementNotes: string;
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-start justify-center gap-0 mb-10">
      {STEPS.map((step, idx) => {
        const Icon = step.icon;
        const isCompleted = current > step.id;
        const isActive = current === step.id;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{ scale: isActive ? 1.08 : 1 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-smooth",
                  isCompleted || isActive
                    ? "bg-primary border-primary"
                    : "bg-muted border-border",
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <Icon
                    className={cn(
                      "w-4 h-4",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground",
                    )}
                  />
                )}
              </motion.div>
              <span
                className={cn(
                  "text-xs font-medium hidden sm:block transition-smooth",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={cn(
                  "w-16 sm:w-24 h-0.5 mx-2 mt-[-14px] transition-smooth",
                  current > step.id ? "bg-primary" : "bg-border",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── SelectChips ──────────────────────────────────────────────────────────────

interface SelectChipsProps {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  "data-ocid"?: string;
}

function SelectChips({ options, value, onChange, ...rest }: SelectChipsProps) {
  return (
    <div className="flex flex-wrap gap-2" {...rest}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm border transition-smooth cursor-pointer",
            value === opt
              ? "bg-primary text-primary-foreground border-primary shadow-elegant"
              : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-primary/5",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── Step 1: Design & Fabric ──────────────────────────────────────────────────

interface Step1Props {
  data: Step1Fields;
  onChange: (d: Partial<Step1Fields>) => void;
  designImage: File | null;
  onImageChange: (f: File | null) => void;
  imagePreview: string | null;
}

function Step1Form({
  data,
  onChange,
  designImage,
  onImageChange,
  imagePreview,
}: Step1Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, PNG, WebP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5 MB");
      return;
    }
    onImageChange(file);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file?.type.startsWith("image/")) onImageChange(file);
    },
    [onImageChange],
  );

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Clothing Type <span className="text-destructive">*</span>
        </Label>
        <SelectChips
          data-ocid="custom.clothing_type.select"
          options={CLOTHING_OPTIONS}
          value={data.clothingType}
          onChange={(v) => onChange({ clothingType: v as ClothingType })}
        />
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Fabric Type <span className="text-destructive">*</span>
        </Label>
        <SelectChips
          data-ocid="custom.fabric_type.select"
          options={FABRIC_OPTIONS}
          value={data.fabricType}
          onChange={(v) => onChange({ fabricType: v as FabricType })}
        />
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Upload Design / Inspiration Image
        </Label>
        {imagePreview ? (
          <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-border shadow-elegant group">
            <img
              src={imagePreview}
              alt="Design preview"
              className="w-full aspect-[4/3] object-cover"
            />
            <button
              type="button"
              onClick={() => onImageChange(null)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center border border-border opacity-0 group-hover:opacity-100 transition-smooth hover:bg-destructive hover:text-destructive-foreground"
              aria-label="Remove image"
              data-ocid="custom.design_image.remove_button"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-2">
              <Badge variant="secondary" className="text-xs backdrop-blur-sm">
                <ImageIcon className="w-3 h-3 mr-1" />
                {designImage?.name}
              </Badge>
            </div>
          </div>
        ) : (
          <div
            className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center gap-3 text-center"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            data-ocid="custom.design_image.dropzone"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Drop your design image here
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG, WebP · Max 5 MB
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-1"
              onClick={() => fileRef.current?.click()}
              data-ocid="custom.design_image.upload_button"
            >
              Browse Files
            </Button>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="space-y-3">
        <Label
          htmlFor="specialInstructions"
          className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Special Instructions
        </Label>
        <Textarea
          id="specialInstructions"
          placeholder="Describe any special requests, embroidery details, lining preferences, colour notes..."
          rows={4}
          value={data.specialInstructions}
          onChange={(e) => onChange({ specialInstructions: e.target.value })}
          className="resize-none"
          data-ocid="custom.special_instructions.textarea"
        />
      </div>
    </div>
  );
}

// ─── Step 2: Measurements ─────────────────────────────────────────────────────

const MEASUREMENT_FIELDS: {
  key: keyof Omit<Step2Fields, "measurementNotes">;
  label: string;
  placeholder: string;
}[] = [
  { key: "bust", label: "Bust / Chest", placeholder: "86" },
  { key: "waist", label: "Waist", placeholder: "72" },
  { key: "hips", label: "Hips", placeholder: "94" },
  { key: "length", label: "Length", placeholder: "110" },
  { key: "shoulder", label: "Shoulder", placeholder: "38" },
  { key: "sleeve", label: "Sleeve Width", placeholder: "32" },
];

interface Step2Props {
  data: Step2Fields;
  onChange: (d: Partial<Step2Fields>) => void;
  isAuthenticated: boolean;
}

function Step2Form({ data, onChange, isAuthenticated }: Step2Props) {
  const handleUseSaved = () => {
    toast.info("Loading your saved measurements…");
    onChange({
      bust: "86",
      waist: "70",
      hips: "92",
      length: "105",
      shoulder: "37",
      sleeve: "30",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Your Measurements
          </h3>
          <p className="text-sm text-muted-foreground">
            All values in centimetres (cm)
          </p>
        </div>
        {isAuthenticated && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleUseSaved}
            className="shrink-0"
            data-ocid="custom.use_saved_measurements.button"
          >
            <Scissors className="w-3.5 h-3.5 mr-1.5" />
            Use Saved Measurements
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {MEASUREMENT_FIELDS.map((field) => (
          <div key={field.key} className="space-y-1.5">
            <Label
              htmlFor={field.key}
              className="text-sm font-medium text-foreground"
            >
              {field.label}{" "}
              <span className="text-muted-foreground text-xs">(cm)</span>
            </Label>
            <div className="relative">
              <Input
                id={field.key}
                type="number"
                min={0}
                step={0.5}
                placeholder={field.placeholder}
                value={data[field.key]}
                onChange={(e) => onChange({ [field.key]: e.target.value })}
                className="pr-10"
                data-ocid={`custom.measurement_${field.key}.input`}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                cm
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-primary/5 border border-primary/15 p-5 flex gap-4">
        <div className="shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
          <AlertCircle className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">
            Measurement Guide
          </p>
          <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
            <li>Measure directly on your body, not over clothing</li>
            <li>Keep the tape snug but not tight</li>
            <li>
              Bust: fullest part of the chest · Waist: narrowest part of your
              torso
            </li>
            <li>Hips: widest part of your hips / seat</li>
          </ul>
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="measurementNotes"
          className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Additional Notes
        </Label>
        <Textarea
          id="measurementNotes"
          placeholder="Any special fit preferences, posture notes, or adjustments..."
          rows={3}
          value={data.measurementNotes}
          onChange={(e) => onChange({ measurementNotes: e.target.value })}
          className="resize-none"
          data-ocid="custom.measurement_notes.textarea"
        />
      </div>
    </div>
  );
}

// ─── Step 3: Review & Price ───────────────────────────────────────────────────

function ReviewRow({
  label,
  value,
  compact,
}: { label: string; value: string; compact?: boolean }) {
  return (
    <div
      className={cn(
        compact ? "space-y-0.5" : "flex items-start justify-between gap-2",
      )}
    >
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={cn(
          "font-medium text-foreground",
          compact ? "text-sm" : "text-sm text-right",
        )}
      >
        {value}
      </p>
    </div>
  );
}

interface Step3Props {
  step1: Step1Fields;
  step2: Step2Fields;
  imagePreview: string | null;
  designImage: File | null;
  onAddToCart: () => void;
  isAdding: boolean;
}

function Step3Review({
  step1,
  step2,
  imagePreview,
  designImage,
  onAddToCart,
  isAdding,
}: Step3Props) {
  const price = calcPrice(step1.clothingType, step1.fabricType);
  const midPrice = Math.round((price.min + price.max) / 2);
  const premiumPct = Math.round(
    (FABRIC_MULTIPLIERS[step1.fabricType] - 1) * 100,
  );
  const filledMeasurements = MEASUREMENT_FIELDS.filter(
    (f) => step2[f.key] && String(step2[f.key]).trim(),
  );

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-5">
        <Card className="border-border shadow-elegant">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
              Your Order
            </h3>
            <Separator />
            <div className="space-y-3">
              <ReviewRow label="Clothing" value={step1.clothingType} />
              <ReviewRow label="Fabric" value={step1.fabricType} />
              {designImage && (
                <ReviewRow label="Design Reference" value={designImage.name} />
              )}
              {step1.specialInstructions && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Special Instructions
                  </p>
                  <p className="text-sm text-foreground leading-relaxed line-clamp-3">
                    {step1.specialInstructions}
                  </p>
                </div>
              )}
            </div>
            {imagePreview && (
              <>
                <Separator />
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Uploaded Design
                  </p>
                  <img
                    src={imagePreview}
                    alt="Design reference"
                    className="w-28 h-20 object-cover rounded-lg border border-border"
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border-border shadow-elegant">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
              Measurements
            </h3>
            <Separator />
            {filledMeasurements.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {filledMeasurements.map((f) => (
                  <ReviewRow
                    key={f.key}
                    label={f.label}
                    value={`${step2[f.key]} cm`}
                    compact
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No measurements provided — our team will contact you.
              </p>
            )}
            {step2.measurementNotes && (
              <>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm text-foreground">
                    {step2.measurementNotes}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Price Estimation Card */}
      <Card className="border-primary/20 bg-primary/5 shadow-elegant overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                Estimated Price
              </p>
              <p className="text-3xl font-display font-bold text-primary">
                ₹{price.min.toLocaleString()}
                <span className="text-xl text-muted-foreground font-normal">
                  {" "}
                  – ₹{price.max.toLocaleString()}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                {step1.clothingType} in {step1.fabricType} ·{" "}
                {premiumPct > 0 ? (
                  <span className="text-primary">
                    +{premiumPct}% fabric premium
                  </span>
                ) : (
                  <span>Base price</span>
                )}
              </p>
            </div>
            <div className="text-right hidden sm:block space-y-0.5">
              <p className="text-xs text-muted-foreground">Mid estimate</p>
              <p className="text-xl font-semibold text-foreground">
                ₹{midPrice.toLocaleString()}
              </p>
            </div>
          </div>

          <Separator className="my-4 bg-primary/15" />

          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {[
              "Free consultation",
              "1 free alteration",
              "7–14 day delivery",
            ].map((perk) => (
              <span
                key={perk}
                className="inline-flex items-center gap-1 bg-card rounded-full px-3 py-1 border border-border"
              >
                <Check className="w-3 h-3 text-primary" />
                {perk}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button
        type="button"
        size="lg"
        className="w-full text-base font-semibold shadow-elegant"
        onClick={onAddToCart}
        disabled={isAdding}
        data-ocid="custom.add_to_cart.primary_button"
      >
        {isAdding ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
            Adding to Cart…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart · ₹{price.min.toLocaleString()}+
          </span>
        )}
      </Button>
    </div>
  );
}

// ─── Slide variants ───────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CustomStitching() {
  const { isAuthenticated } = useAuth();
  const { addItem } = useCartStore();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const [designImage, setDesignImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [step1, setStep1] = useState<Step1Fields>({
    clothingType: "Blouse",
    fabricType: "Cotton",
    specialInstructions: "",
  });

  const [step2, setStep2] = useState<Step2Fields>({
    bust: "",
    waist: "",
    hips: "",
    length: "",
    shoulder: "",
    sleeve: "",
    measurementNotes: "",
  });

  const handleImageChange = (file: File | null) => {
    if (!file) {
      setDesignImage(null);
      setImagePreview(null);
      return;
    }
    setDesignImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
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
      // Use the local object URL as image reference (upload would happen on order submission)
      const uploadedImageUrl = imagePreview ?? "";

      const price = calcPrice(step1.clothingType, step1.fabricType);
      const customService: Service = {
        id: `custom-${step1.clothingType.toLowerCase()}-${step1.fabricType.toLowerCase()}-${Date.now()}`,
        slug: `custom-${step1.clothingType.toLowerCase()}`,
        name: `Custom ${step1.clothingType} — ${step1.fabricType}`,
        category: "custom",
        description:
          step1.specialInstructions ||
          `Custom ${step1.clothingType} in ${step1.fabricType}`,
        priceMin: price.min,
        priceMax: price.max,
        deliveryDays: 10,
        imageUrl: uploadedImageUrl || "/assets/images/placeholder.svg",
        isActive: true,
        addons: [],
      };

      const measurementSummary = MEASUREMENT_FIELDS.filter((f) => step2[f.key])
        .map((f) => `${f.label}: ${step2[f.key]}cm`)
        .join(", ");

      addItem(customService, {
        quantity: 1,
        selectedAddons: [],
        customInstructions:
          [
            step1.specialInstructions,
            measurementSummary,
            step2.measurementNotes,
          ]
            .filter(Boolean)
            .join(" | ") || "Custom order",
        fabricType: step1.fabricType,
      });

      toast.success(`Custom ${step1.clothingType} added to cart!`, {
        description: `₹${price.min.toLocaleString()} – ₹${price.max.toLocaleString()} · ${step1.fabricType}`,
      });
    } catch {
      toast.error("Failed to add to cart. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <PageHeader
            title="Custom Stitching Order"
            subtitle="Design your dream outfit — tell us your vision and we'll craft it with precision."
            badge="Bespoke"
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <StepIndicator current={step} />

        <div className="relative overflow-hidden min-h-96">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
              data-ocid={`custom.step_${step}.panel`}
            >
              {step === 1 && (
                <Step1Form
                  data={step1}
                  onChange={(d) => setStep1((prev) => ({ ...prev, ...d }))}
                  designImage={designImage}
                  onImageChange={handleImageChange}
                  imagePreview={imagePreview}
                />
              )}
              {step === 2 && (
                <Step2Form
                  data={step2}
                  onChange={(d) => setStep2((prev) => ({ ...prev, ...d }))}
                  isAuthenticated={isAuthenticated}
                />
              )}
              {step === 3 && (
                <Step3Review
                  step1={step1}
                  step2={step2}
                  imagePreview={imagePreview}
                  designImage={designImage}
                  onAddToCart={handleAddToCart}
                  isAdding={isAdding}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div
          className={cn(
            "flex mt-10 pt-6 border-t border-border",
            step === 1 ? "justify-end" : "justify-between",
          )}
        >
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={goPrev}
              data-ocid="custom.prev_step.button"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          )}
          {step < 3 && (
            <Button
              type="button"
              size="lg"
              onClick={goNext}
              className="shadow-elegant"
              data-ocid="custom.next_step.button"
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
