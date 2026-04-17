import { cn } from "@/lib/utils";
import type { OrderStatus } from "../types";
import { ORDER_STATUS_LABELS } from "../types";

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const STATUS_STYLES: Record<OrderStatus, string> = {
  received: "bg-blue-50 text-blue-600 border border-blue-200",
  in_progress: "bg-amber-50 text-amber-600 border border-amber-200",
  stitching: "bg-violet-50 text-violet-600 border border-violet-200",
  ready: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  delivered: "bg-green-50 text-green-700 border border-green-200",
  cancelled: "bg-red-50 text-red-600 border border-red-200",
};

const STATUS_DOTS: Record<OrderStatus, string> = {
  received: "bg-blue-500",
  in_progress: "bg-amber-500",
  stitching: "bg-violet-500",
  ready: "bg-emerald-500",
  delivered: "bg-green-600",
  cancelled: "bg-red-500",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        STATUS_STYLES[status],
        className,
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", STATUS_DOTS[status])} />
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}
