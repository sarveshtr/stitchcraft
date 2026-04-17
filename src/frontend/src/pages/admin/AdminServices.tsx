import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { ImageIcon, Pencil, Plus, Trash2, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { useServices } from "../../hooks/use-backend";
import type { Service, ServiceCategory } from "../../types";

const CATEGORY_OPTIONS: { label: string; value: ServiceCategory }[] = [
  { label: "Women", value: "women" },
  { label: "Men", value: "men" },
  { label: "Kids", value: "kids" },
  { label: "Custom", value: "custom" },
];

interface ServiceFormData {
  name: string;
  slug: string;
  category: ServiceCategory;
  priceMin: string;
  priceMax: string;
  deliveryDays: string;
  description: string;
  fabricOptions: string;
  imageUrl: string;
}

const EMPTY_FORM: ServiceFormData = {
  name: "",
  slug: "",
  category: "women",
  priceMin: "",
  priceMax: "",
  deliveryDays: "",
  description: "",
  fabricOptions: "",
  imageUrl: "",
};

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface ServiceFormModalProps {
  open: boolean;
  onClose: () => void;
  editService: Service | null;
}

function ServiceFormModal({
  open,
  onClose,
  editService,
}: ServiceFormModalProps) {
  const [form, setForm] = useState<ServiceFormData>(EMPTY_FORM);

  useEffect(() => {
    if (editService) {
      setForm({
        name: editService.name,
        slug: editService.slug,
        category: editService.category,
        priceMin: String(editService.priceMin),
        priceMax: String(editService.priceMax),
        deliveryDays: String(editService.deliveryDays),
        description: editService.description,
        fabricOptions: "",
        imageUrl: editService.imageUrl,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editService]);

  function handleNameChange(value: string) {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: editService ? prev.slug : toSlug(value),
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: call actor.createService / actor.updateService
    console.log("Submit service:", form);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-lg max-h-[85vh] overflow-y-auto"
        data-ocid="admin.services.form.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">
            {editService ? "Edit Service" : "Add Service"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="svc-name">Service Name</Label>
            <Input
              id="svc-name"
              data-ocid="admin.services.form.name.input"
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Blouse Stitching"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="svc-slug">Slug</Label>
            <Input
              id="svc-slug"
              data-ocid="admin.services.form.slug.input"
              value={form.slug}
              onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
              placeholder="blouse-stitching"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="svc-category">Category</Label>
            <select
              id="svc-category"
              data-ocid="admin.services.form.category.select"
              value={form.category}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  category: e.target.value as ServiceCategory,
                }))
              }
              className="w-full border border-input rounded-lg px-3 py-2 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="svc-price-min">Min Price (₹)</Label>
              <Input
                id="svc-price-min"
                type="number"
                data-ocid="admin.services.form.price_min.input"
                value={form.priceMin}
                onChange={(e) =>
                  setForm((p) => ({ ...p, priceMin: e.target.value }))
                }
                placeholder="800"
                min={0}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="svc-price-max">Max Price (₹)</Label>
              <Input
                id="svc-price-max"
                type="number"
                data-ocid="admin.services.form.price_max.input"
                value={form.priceMax}
                onChange={(e) =>
                  setForm((p) => ({ ...p, priceMax: e.target.value }))
                }
                placeholder="2500"
                min={0}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="svc-delivery">Delivery Days</Label>
            <Input
              id="svc-delivery"
              type="number"
              data-ocid="admin.services.form.delivery_days.input"
              value={form.deliveryDays}
              onChange={(e) =>
                setForm((p) => ({ ...p, deliveryDays: e.target.value }))
              }
              placeholder="7"
              min={1}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="svc-desc">Description</Label>
            <Textarea
              id="svc-desc"
              data-ocid="admin.services.form.description.textarea"
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              placeholder="Short description of this service..."
              rows={3}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="svc-fabrics">
              Fabric Options{" "}
              <span className="text-xs text-muted-foreground">
                (comma-separated)
              </span>
            </Label>
            <Input
              id="svc-fabrics"
              data-ocid="admin.services.form.fabric_options.input"
              value={form.fabricOptions}
              onChange={(e) =>
                setForm((p) => ({ ...p, fabricOptions: e.target.value }))
              }
              placeholder="Cotton, Silk, Chiffon, Georgette"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="svc-image">Image URL</Label>
            <div className="flex gap-2">
              <Input
                id="svc-image"
                data-ocid="admin.services.form.image_url.input"
                value={form.imageUrl}
                onChange={(e) =>
                  setForm((p) => ({ ...p, imageUrl: e.target.value }))
                }
                placeholder="/assets/generated/service-image.jpg"
              />
              <button
                type="button"
                data-ocid="admin.services.form.image.upload_button"
                className="flex-shrink-0 px-3 py-2 border border-dashed border-border rounded-lg text-muted-foreground hover:border-primary/50 hover:text-primary transition-smooth"
                title="Upload image"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              data-ocid="admin.services.form.cancel_button"
              className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-smooth"
            >
              Cancel
            </button>
            <button
              type="submit"
              data-ocid="admin.services.form.submit_button"
              className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-smooth"
            >
              {editService ? "Save Changes" : "Add Service"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminServicesPage() {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAuth();
  const { data: services, isLoading: servicesLoading } = useServices();
  const [modalOpen, setModalOpen] = useState(false);
  const [editService, setEditService] = useState<Service | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);

  useEffect(() => {
    if (!isLoading && !isAdmin) navigate({ to: "/account" });
  }, [isAdmin, isLoading, navigate]);

  if (isLoading || !isAdmin) return null;

  function openAdd() {
    setEditService(null);
    setModalOpen(true);
  }

  function openEdit(svc: Service) {
    setEditService(svc);
    setModalOpen(true);
  }

  function confirmDelete() {
    // TODO: call actor.deleteService(deleteTarget.id)
    console.log("Delete service:", deleteTarget?.id);
    setDeleteTarget(null);
  }

  return (
    <div className="space-y-6" data-ocid="admin.services.page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Services Management
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {(services ?? []).length} services
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          data-ocid="admin.services.add.open_modal_button"
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-smooth shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.4 }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
        data-ocid="admin.services.table"
      >
        <div className="overflow-x-auto">
          {servicesLoading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          ) : (services ?? []).length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 text-center"
              data-ocid="admin.services.empty_state"
            >
              <X className="w-10 h-10 text-muted-foreground/40 mb-3" />
              <p className="font-medium text-foreground">No services yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add your first service to get started
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                    Image
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                    Category
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                    Price Range
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                    Delivery
                  </th>
                  <th className="text-center px-5 py-3 font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {(services ?? []).map((svc, i) => (
                  <tr
                    key={svc.id}
                    data-ocid={`admin.services.item.${i + 1}`}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted border border-border flex-shrink-0">
                        {svc.imageUrl ? (
                          <img
                            src={svc.imageUrl}
                            alt={svc.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-muted-foreground/40" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-medium text-foreground">{svc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {svc.slug}
                      </p>
                    </td>
                    <td className="px-5 py-3 capitalize text-muted-foreground">
                      {svc.category}
                    </td>
                    <td className="px-5 py-3 font-medium text-foreground whitespace-nowrap">
                      ₹{svc.priceMin.toLocaleString("en-IN")} – ₹
                      {svc.priceMax.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {svc.deliveryDays} days
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(svc)}
                          data-ocid={`admin.services.edit.${i + 1}.edit_button`}
                          className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
                          aria-label="Edit service"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(svc)}
                          data-ocid={`admin.services.delete.${i + 1}.delete_button`}
                          className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
                          aria-label="Delete service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>

      <ServiceFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editService={editService}
      />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="admin.services.delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deleteTarget?.name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.services.delete.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              data-ocid="admin.services.delete.confirm_button"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
