export type OrderStatus =
  | "received"
  | "in_progress"
  | "stitching"
  | "ready"
  | "delivered"
  | "cancelled";

export type ServiceCategory = "women" | "men" | "kids" | "custom";

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  description: string;
  priceMin: number;
  priceMax: number;
  deliveryDays: number;
  imageUrl: string;
  isActive: boolean;
  addons: ServiceAddon[];
}

export interface ServiceAddon {
  id: string;
  name: string;
  price: number;
}

export interface Measurement {
  id: string;
  userId: string;
  label: string;
  chest: number;
  waist: number;
  hips: number;
  shoulder: number;
  length: number;
  sleeve: number;
  notes: string;
  createdAt: string;
}

export interface OrderItem {
  serviceId: string;
  serviceName: string;
  price: number;
  quantity: number;
  addons: ServiceAddon[];
  customInstructions: string;
  fabricType: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  couponCode: string;
  discountAmount: number;
  deliveryAddress: Address;
  measurementId: string;
  tailorId: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

export interface User {
  id: string;
  principal: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "tailor" | "admin";
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: ServiceCategory;
  imageUrl: string;
  description: string;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  orderId: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount: number;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  expiresAt: string;
}

export interface AdminStats {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  recentOrders: Order[];
}

export interface CartItem {
  service: Service;
  quantity: number;
  selectedAddons: ServiceAddon[];
  customInstructions: string;
  fabricType: string;
}

export interface CustomStitchingRequest {
  designImageUrl: string;
  fabricType: string;
  measurements: Partial<Measurement>;
  specialInstructions: string;
  estimatedPrice?: number;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  received: "Received",
  in_progress: "In Progress",
  stitching: "Stitching",
  ready: "Ready",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  received: "bg-blue-100 text-blue-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  stitching: "bg-purple-100 text-purple-700",
  ready: "bg-green-100 text-green-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};
