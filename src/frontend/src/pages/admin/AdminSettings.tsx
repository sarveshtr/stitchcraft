import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle, Save } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/use-auth";

const STORAGE_KEY = "stitchcraft_settings";

interface BusinessSettings {
  businessName: string;
  address: string;
  phone: string;
  email: string;
  deliveryCharge: string;
  taxPercentage: string;
}

function loadSettings(): BusinessSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as BusinessSettings;
  } catch {
    // ignore parse errors
  }
  return {
    businessName: "StitchCraft Atelier",
    address: "23, Fashion Street, Linking Road, Mumbai, Maharashtra — 400050",
    phone: "+91 98765 43210",
    email: "hello@stitchcraft.in",
    deliveryCharge: "100",
    taxPercentage: "5",
  };
}

export default function AdminSettings() {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAuth();
  const [settings, setSettings] = useState<BusinessSettings>(loadSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAdmin) navigate({ to: "/account" });
  }, [isAdmin, isLoading, navigate]);

  if (isLoading || !isAdmin) return null;

  function update(field: keyof BusinessSettings, value: string) {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // ignore storage errors
    }
  }

  return (
    <div className="space-y-8 max-w-2xl" data-ocid="admin.settings.page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="text-2xl font-display font-bold text-foreground">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage business information and pricing configuration.
        </p>
      </motion.div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Business Info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-5"
          data-ocid="admin.settings.business_info.panel"
        >
          <div>
            <h2 className="text-base font-display font-semibold text-foreground">
              Business Information
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Basic details shown to customers and used in communications.
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="settings-name">Business Name</Label>
              <Input
                id="settings-name"
                data-ocid="admin.settings.business_name.input"
                value={settings.businessName}
                onChange={(e) => update("businessName", e.target.value)}
                placeholder="StitchCraft Atelier"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="settings-phone">Phone Number</Label>
              <Input
                id="settings-phone"
                type="tel"
                data-ocid="admin.settings.phone.input"
                value={settings.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="settings-email">Email Address</Label>
              <Input
                id="settings-email"
                type="email"
                data-ocid="admin.settings.email.input"
                value={settings.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="hello@stitchcraft.in"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="settings-address">Business Address</Label>
              <Textarea
                id="settings-address"
                data-ocid="admin.settings.address.textarea"
                value={settings.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="Street, City, State — Pincode"
                rows={3}
              />
            </div>
          </div>
        </motion.div>

        {/* Pricing Settings */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-5"
          data-ocid="admin.settings.pricing.panel"
        >
          <div>
            <h2 className="text-base font-display font-semibold text-foreground">
              Pricing &amp; Charges
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Configure delivery fees and tax applied to all orders.
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="settings-delivery">Delivery Charge (₹)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                  ₹
                </span>
                <Input
                  id="settings-delivery"
                  type="number"
                  data-ocid="admin.settings.delivery_charge.input"
                  value={settings.deliveryCharge}
                  onChange={(e) => update("deliveryCharge", e.target.value)}
                  placeholder="100"
                  min={0}
                  className="pl-7"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Applied to each order. Use 0 for free delivery.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="settings-tax">Tax (%)</Label>
              <div className="relative">
                <Input
                  id="settings-tax"
                  type="number"
                  data-ocid="admin.settings.tax_percentage.input"
                  value={settings.taxPercentage}
                  onChange={(e) => update("taxPercentage", e.target.value)}
                  placeholder="5"
                  min={0}
                  max={100}
                  step={0.1}
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                  %
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                GST or applicable tax rate on services.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.35 }}
          className="flex items-center justify-between"
        >
          {saved && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-sm text-emerald-600 font-medium"
              data-ocid="admin.settings.save.success_state"
            >
              <CheckCircle className="w-4 h-4" />
              Settings saved successfully
            </motion.div>
          )}
          <div className="ml-auto">
            <button
              type="submit"
              data-ocid="admin.settings.save.submit_button"
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-smooth shadow-sm"
            >
              <Save className="w-4 h-4" />
              Save Settings
            </button>
          </div>
        </motion.div>
      </form>
    </div>
  );
}
