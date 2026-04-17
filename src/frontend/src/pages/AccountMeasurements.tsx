import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { Edit2, LogIn, Plus, Ruler, Save } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { EmptyState } from "../components/EmptyState";
import { PageHeader } from "../components/PageHeader";
import { useAuth } from "../hooks/use-auth";

interface MeasurementValues {
  bust: string;
  waist: string;
  hips: string;
  length: string;
  shoulder: string;
  sleeve: string;
  notes: string;
}

const EMPTY_FORM: MeasurementValues = {
  bust: "",
  waist: "",
  hips: "",
  length: "",
  shoulder: "",
  sleeve: "",
  notes: "",
};

const FIELDS: {
  key: keyof Omit<MeasurementValues, "notes">;
  label: string;
  hint: string;
}[] = [
  { key: "bust", label: "Bust / Chest", hint: "Around the fullest part" },
  { key: "waist", label: "Waist", hint: "Natural waistline" },
  { key: "hips", label: "Hips", hint: "Around the fullest part" },
  { key: "shoulder", label: "Shoulder Width", hint: "Shoulder to shoulder" },
  { key: "length", label: "Length", hint: "Neck to desired hem" },
  { key: "sleeve", label: "Sleeve Length", hint: "Shoulder to wrist" },
];

function LoginPrompt() {
  const { login } = useAuth();
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto px-6"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <LogIn className="w-9 h-9 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
          Sign In Required
        </h2>
        <p className="text-muted-foreground mb-8">
          Please sign in to view and manage your measurements.
        </p>
        <Button
          type="button"
          size="lg"
          onClick={login}
          data-ocid="measurements.login_button"
          className="gap-2 shadow-elegant w-full sm:w-auto"
        >
          <LogIn className="w-4 h-4" />
          Sign In
        </Button>
      </motion.div>
    </div>
  );
}

interface MeasurementFormProps {
  initial: MeasurementValues;
  onSave: (values: MeasurementValues) => Promise<void>;
  onCancel?: () => void;
  isNew?: boolean;
}

function MeasurementForm({
  initial,
  onSave,
  onCancel,
  isNew = false,
}: MeasurementFormProps) {
  const [form, setForm] = useState<MeasurementValues>(initial);
  const [saving, setSaving] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {FIELDS.map(({ key, label, hint }) => (
          <div key={key} className="space-y-1.5">
            <Label htmlFor={key} className="text-sm font-medium">
              {label}
            </Label>
            <div className="relative">
              <Input
                id={key}
                name={key}
                type="number"
                min="0"
                step="0.5"
                value={form[key]}
                onChange={handleChange}
                placeholder="0"
                data-ocid={`measurements.${key}_input`}
                className="pr-10 transition-smooth"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                cm
              </span>
            </div>
            <p className="text-xs text-muted-foreground/70">{hint}</p>
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes" className="text-sm font-medium">
          Special Notes
        </Label>
        <Textarea
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Any special fitting notes or preferences…"
          data-ocid="measurements.notes_input"
          className="resize-none h-24 transition-smooth"
        />
      </div>

      <div className="flex gap-3 pt-1">
        <Button
          type="submit"
          disabled={saving}
          data-ocid="measurements.save_button"
          className="gap-2 shadow-elegant"
        >
          <Save className="w-4 h-4" />
          {saving
            ? "Saving…"
            : isNew
              ? "Save Measurements"
              : "Update Measurements"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            data-ocid="measurements.cancel_button"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export default function AccountMeasurements() {
  const { isAuthenticated, isLoading } = useAuth();
  const [saved, setSaved] = useState<MeasurementValues | null>(null);
  const [editing, setEditing] = useState(false);

  async function handleSave(values: MeasurementValues) {
    // TODO: replace with actor.saveMeasurements() call
    await new Promise((r) => setTimeout(r, 800));
    setSaved(values);
    setEditing(false);
    toast.success("Measurements saved successfully!");
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPrompt />;
  }

  return (
    <div>
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="Saved Measurements"
            badge="Body Measurements"
            subtitle="Your measurements ensure every garment fits perfectly."
          >
            <nav className="flex items-center gap-2 text-sm text-muted-foreground -mt-2">
              <Link
                to="/account"
                data-ocid="measurements.account_link"
                className="hover:text-foreground transition-colors"
              >
                Account
              </Link>
              <span>/</span>
              <span className="text-foreground">Measurements</span>
            </nav>
          </PageHeader>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        {!saved && !editing ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div data-ocid="measurements.empty_state">
              <EmptyState
                icon={Ruler}
                title="No measurements saved"
                description="Save your body measurements for faster checkout and perfectly fitted garments every time."
                actionLabel="Add Measurements"
                onAction={() => setEditing(true)}
              />
            </div>
          </motion.div>
        ) : editing ? (
          /* Edit / Add form */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div
              className="bg-card rounded-xl border border-border p-6 shadow-elegant"
              data-ocid="measurements.edit_panel"
            >
              <h2 className="font-display text-lg font-semibold text-foreground mb-6">
                {saved ? "Update Measurements" : "Add Measurements"}
                <span className="text-sm text-muted-foreground font-normal ml-2">
                  (all values in cm)
                </span>
              </h2>
              <MeasurementForm
                initial={saved ?? EMPTY_FORM}
                onSave={handleSave}
                onCancel={() => setEditing(false)}
                isNew={!saved}
              />
            </div>
          </motion.div>
        ) : (
          /* Display saved measurements */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-6"
          >
            <div
              className="bg-card rounded-xl border border-border shadow-elegant"
              data-ocid="measurements.display_card"
            >
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold text-foreground">
                    Your Measurements
                  </h3>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEditing(true)}
                  data-ocid="measurements.edit_button"
                  className="gap-2"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </Button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {FIELDS.map(({ key, label }) => {
                    const val = saved?.[key];
                    return (
                      <div
                        key={key}
                        className="bg-muted/40 rounded-lg px-4 py-3 border border-border/40"
                        data-ocid={`measurements.${key}_display`}
                      >
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                          {label}
                        </p>
                        <p className="font-display text-lg font-semibold text-foreground">
                          {val ? (
                            `${val} cm`
                          ) : (
                            <span className="text-muted-foreground/50 text-base font-body">
                              —
                            </span>
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {saved?.notes && (
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border/40">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Notes
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {saved.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-muted/20 rounded-xl border border-border/40 p-5">
              <h4 className="font-semibold text-foreground text-sm mb-3">
                Measurement Tips
              </h4>
              <ul className="space-y-1.5">
                {[
                  "Measure over light clothing for accuracy",
                  "Keep the tape snug but not tight",
                  "Stand straight and relaxed while measuring",
                  "Update measurements every 3–6 months",
                ].map((tip) => (
                  <li
                    key={tip}
                    className="text-xs text-muted-foreground flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
