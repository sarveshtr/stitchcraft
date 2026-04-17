import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  Edit2,
  LogIn,
  MapPin,
  Package,
  Ruler,
  Scissors,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { useAuth } from "../hooks/use-auth";
import { useUserOrders } from "../hooks/use-backend";

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
          Sign In to Your Account
        </h2>
        <p className="text-muted-foreground font-body mb-8 leading-relaxed">
          Access your profile, saved measurements, and order history by signing
          in with Internet Identity.
        </p>
        <Button
          type="button"
          size="lg"
          onClick={login}
          data-ocid="account.login_button"
          className="w-full sm:w-auto gap-2 shadow-elegant"
        >
          <LogIn className="w-4 h-4" />
          Sign In with Internet Identity
        </Button>
      </motion.div>
    </div>
  );
}

interface ProfileFormValues {
  name: string;
  email: string;
  phone: string;
}

function ProfileCard({ principal }: { principal: string }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ProfileFormValues>({
    name: "My Account",
    email: "",
    phone: "",
  });

  const initials =
    form.name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSave() {
    setSaving(true);
    // TODO: replace with actor.updateProfile() call
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setEditing(false);
  }

  return (
    <div
      className="bg-card rounded-xl border border-border p-6 shadow-elegant"
      data-ocid="account.profile_card"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <span className="font-display text-2xl font-semibold text-primary-foreground">
            {initials}
          </span>
        </div>
        {editing ? (
          <div className="flex-1 space-y-4 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  data-ocid="account.name_input"
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  data-ocid="account.email_input"
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-sm">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  data-ocid="account.phone_input"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={handleSave}
                disabled={saving}
                data-ocid="account.save_button"
                className="shadow-elegant"
              >
                {saving ? "Saving…" : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditing(false)}
                data-ocid="account.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground truncate">
                  {form.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5 truncate">
                  {form.email || "No email set"}
                </p>
                {form.phone && (
                  <p className="text-sm text-muted-foreground">{form.phone}</p>
                )}
                <p
                  className="text-xs text-muted-foreground/60 font-mono mt-1 truncate"
                  title={principal}
                >
                  ID: {principal.slice(0, 24)}…
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setEditing(true)}
                data-ocid="account.edit_profile_button"
                className="gap-2 flex-shrink-0"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const QUICK_LINKS = [
  {
    icon: Ruler,
    label: "My Measurements",
    desc: "Manage your saved body measurements",
    href: "/account/measurements",
    ocid: "account.measurements_link",
  },
  {
    icon: Package,
    label: "Order History",
    desc: "View all your past and current orders",
    href: "/account/orders",
    ocid: "account.orders_link",
  },
  {
    icon: MapPin,
    label: "Track Order",
    desc: "Check the real-time status of active orders",
    href: "/track",
    ocid: "account.track_link",
  },
];

export default function Account() {
  const { isAuthenticated, isLoading, principal } = useAuth();
  const { data: orders = [], isLoading: ordersLoading } =
    useUserOrders(principal);
  const recentOrders = orders.slice(0, 3);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
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
            title="My Account"
            badge="Profile"
            subtitle="Manage your profile, measurements, and orders."
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <ProfileCard principal={principal ?? ""} />
        </motion.div>

        {/* Quick navigation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {QUICK_LINKS.map(({ icon: Icon, label, desc, href, ocid }) => (
              <Link
                key={href}
                to={href}
                data-ocid={ocid}
                className="group block"
              >
                <div className="bg-card rounded-xl border border-border hover:border-primary/40 hover:shadow-lifted p-5 h-full transition-smooth cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors duration-200">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground text-sm mb-1">
                    {label}
                  </p>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent orders */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Recent Orders
            </h2>
            <Link
              to="/account/orders"
              data-ocid="account.view_all_orders_link"
              className="text-sm text-primary hover:underline underline-offset-2"
            >
              View all
            </Link>
          </div>

          {ordersLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          ) : recentOrders.length === 0 ? (
            <div
              className="bg-card rounded-xl border border-dashed border-border py-10 text-center"
              data-ocid="account.orders_empty_state"
            >
              <Package className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm mb-4">
                No orders yet. Start your tailoring journey!
              </p>
              <Link to="/services">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  data-ocid="account.browse_services_button"
                >
                  Browse Services
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order, idx) => (
                <div
                  key={order.id}
                  className="bg-card rounded-xl border border-border p-4 shadow-elegant flex items-center justify-between gap-4"
                  data-ocid={`account.recent_order.${idx + 1}`}
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">
                      #{order.orderNumber}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <StatusBadge status={order.status} />
                    <span className="font-semibold text-foreground text-sm">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
