import { useQuery } from "@tanstack/react-query";
import type { AdminStats, GalleryItem, Order, Review, Service } from "../types";

// Mock data for development — replace with real actor calls once backend methods are available
const MOCK_SERVICES: Service[] = [
  {
    id: "1",
    slug: "blouse-stitching",
    name: "Blouse Stitching",
    category: "women",
    description:
      "Expertly crafted blouses tailored to your measurements with premium fabric choices.",
    priceMin: 800,
    priceMax: 2500,
    deliveryDays: 7,
    imageUrl: "/assets/generated/service-blouse.jpg",
    isActive: true,
    addons: [
      { id: "a1", name: "Embroidery", price: 500 },
      { id: "a2", name: "Lining", price: 200 },
    ],
  },
  {
    id: "2",
    slug: "suit-stitching",
    name: "Suit Stitching",
    category: "women",
    description:
      "Elegant suits stitched with precision for formal and semi-formal occasions.",
    priceMin: 2500,
    priceMax: 6000,
    deliveryDays: 10,
    imageUrl: "/assets/generated/service-suit.jpg",
    isActive: true,
    addons: [
      { id: "a3", name: "Embellishments", price: 800 },
      { id: "a4", name: "Premium Lining", price: 400 },
    ],
  },
  {
    id: "3",
    slug: "lehenga-stitching",
    name: "Lehenga Stitching",
    category: "women",
    description:
      "Stunning lehengas crafted for weddings and festive occasions.",
    priceMin: 3500,
    priceMax: 12000,
    deliveryDays: 14,
    imageUrl: "/assets/generated/service-lehenga.jpg",
    isActive: true,
    addons: [
      { id: "a5", name: "Heavy Embroidery", price: 2000 },
      { id: "a6", name: "Dupatta Work", price: 1000 },
    ],
  },
  {
    id: "4",
    slug: "shirt-pant-stitching",
    name: "Shirt & Pant Stitching",
    category: "men",
    description:
      "Sharp, well-fitted shirts and trousers for professional and casual wear.",
    priceMin: 1200,
    priceMax: 3500,
    deliveryDays: 7,
    imageUrl: "/assets/generated/service-shirt.jpg",
    isActive: true,
    addons: [
      { id: "a7", name: "Monogram", price: 300 },
      { id: "a8", name: "Premium Buttons", price: 150 },
    ],
  },
  {
    id: "5",
    slug: "kids-clothing",
    name: "Kids Clothing",
    category: "kids",
    description: "Adorable, comfortable clothing for children of all ages.",
    priceMin: 600,
    priceMax: 1800,
    deliveryDays: 5,
    imageUrl: "/assets/generated/service-kids.jpg",
    isActive: true,
    addons: [{ id: "a9", name: "Applique Work", price: 200 }],
  },
  {
    id: "6",
    slug: "custom-design",
    name: "Custom Design",
    category: "custom",
    description:
      "Bring your vision to life with fully bespoke garment creation.",
    priceMin: 5000,
    priceMax: 25000,
    deliveryDays: 21,
    imageUrl: "/assets/generated/service-custom.jpg",
    isActive: true,
    addons: [
      { id: "a10", name: "Design Consultation", price: 500 },
      { id: "a11", name: "Rush Delivery", price: 1000 },
    ],
  },
];

const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    userId: "u1",
    userName: "Priya Sharma",
    orderId: "o1",
    rating: 5,
    comment:
      "Absolutely beautiful work! The blouse fit perfectly and the embroidery was stunning. Will definitely order again.",
    isApproved: true,
    createdAt: "2026-03-15T10:00:00Z",
  },
  {
    id: "r2",
    userId: "u2",
    userName: "Meera Patel",
    orderId: "o2",
    rating: 5,
    comment:
      "My lehenga was a dream! The stitching quality is exceptional and they delivered on time for my wedding.",
    isApproved: true,
    createdAt: "2026-03-20T14:30:00Z",
  },
  {
    id: "r3",
    userId: "u3",
    userName: "Anita Verma",
    orderId: "o3",
    rating: 4,
    comment:
      "Great quality suit. Minor alteration was needed but they fixed it quickly. Very professional service.",
    isApproved: true,
    createdAt: "2026-04-01T09:15:00Z",
  },
];

export function useServices(category?: string) {
  return useQuery<Service[]>({
    queryKey: ["services", category],
    queryFn: async () => {
      // TODO: replace with actor.listServices() when backend is ready
      if (category && category !== "all") {
        return MOCK_SERVICES.filter((s) => s.category === category);
      }
      return MOCK_SERVICES;
    },
  });
}

export function useService(slug: string) {
  return useQuery<Service | undefined>({
    queryKey: ["service", slug],
    queryFn: async () => {
      // TODO: replace with actor.getService(slug) when backend is ready
      return MOCK_SERVICES.find((s) => s.slug === slug);
    },
    enabled: !!slug,
  });
}

export function useOrders() {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      // TODO: replace with actor.listOrders() when backend is ready
      return [];
    },
  });
}

export function useUserOrders(userId: string | null) {
  return useQuery<Order[]>({
    queryKey: ["user-orders", userId],
    queryFn: async () => {
      // TODO: replace with actor.getUserOrders(userId) when backend is ready
      return [];
    },
    enabled: !!userId,
  });
}

export function useAdminStats() {
  return useQuery<AdminStats>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      // TODO: replace with actor.getStats() when backend is ready
      return {
        totalOrders: 248,
        pendingOrders: 34,
        totalRevenue: 487500,
        totalCustomers: 186,
        recentOrders: [],
      };
    },
  });
}

export function useGallery(category?: string) {
  return useQuery<GalleryItem[]>({
    queryKey: ["gallery", category],
    queryFn: async () => {
      // TODO: replace with actor.listGallery() when backend is ready
      return [];
    },
  });
}

export function useReviews() {
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      // TODO: replace with actor.listReviews() when backend is ready
      return MOCK_REVIEWS;
    },
  });
}
