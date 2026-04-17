import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Address {
    street: string;
    country: string;
    city: string;
    zipCode: string;
    state: string;
}
export type Timestamp = bigint;
export interface Tailor {
    id: UserId;
    name: string;
    createdAt: Timestamp;
    ordersAssigned: Array<OrderId>;
    isActive: boolean;
    email: string;
    specialization: Array<string>;
    phone: string;
}
export interface UpdateProfileArgs {
    name: string;
    email: string;
    phone: string;
}
export interface UpdateServiceArgs {
    id: ServiceId;
    name: string;
    slug: string;
    deliveryDays: bigint;
    description: string;
    imageUrl: string;
    addons: Array<Addon>;
    category: ServiceCategory;
    priceMax: bigint;
    priceMin: bigint;
    fabricOptions: Array<string>;
}
export interface CreateGalleryItemArgs {
    title: string;
    imageUrl: string;
    category: GalleryCategory;
}
export type ReviewId = bigint;
export type CouponId = bigint;
export interface CreateReviewArgs {
    orderId: OrderId;
    comment: string;
    rating: bigint;
}
export interface CreateOrderArgs {
    couponCode?: string;
    measurements: Measurement;
    totalAmount: bigint;
    address: Address;
    items: Array<CartItem>;
}
export type ServiceId = bigint;
export interface Review {
    id: ReviewId;
    userId: UserId;
    createdAt: Timestamp;
    orderId: OrderId;
    comment: string;
    approved: boolean;
    rating: bigint;
}
export interface User {
    id: UserId;
    name: string;
    createdAt: Timestamp;
    role: UserRole;
    savedMeasurements?: Measurement;
    email: string;
    phone: string;
}
export interface Coupon {
    id: CouponId;
    code: string;
    createdAt: Timestamp;
    discountPercent: bigint;
    isActive: boolean;
}
export interface Service {
    id: ServiceId;
    name: string;
    slug: string;
    deliveryDays: bigint;
    description: string;
    imageUrl: string;
    addons: Array<Addon>;
    category: ServiceCategory;
    priceMax: bigint;
    priceMin: bigint;
    fabricOptions: Array<string>;
}
export interface Addon {
    id: bigint;
    name: string;
    price: bigint;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    couponCode?: string;
    tailorId?: UserId;
    userId: UserId;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    measurements: Measurement;
    totalAmount: bigint;
    address: Address;
    items: Array<CartItem>;
}
export interface CreateServiceArgs {
    name: string;
    slug: string;
    deliveryDays: bigint;
    description: string;
    imageUrl: string;
    addons: Array<Addon>;
    category: ServiceCategory;
    priceMax: bigint;
    priceMin: bigint;
    fabricOptions: Array<string>;
}
export type UserId = Principal;
export interface CreateTailorArgs {
    principal: UserId;
    name: string;
    email: string;
    specialization: Array<string>;
    phone: string;
}
export interface AdminStats {
    totalOrders: bigint;
    customersCount: bigint;
    pendingOrders: bigint;
    totalRevenue: bigint;
}
export type GalleryItemId = bigint;
export interface Measurement {
    bust?: bigint;
    hips?: bigint;
    sleeve?: bigint;
    shoulder?: bigint;
    length?: bigint;
    notes: string;
    waist?: bigint;
}
export interface CartItem {
    serviceName: string;
    addons: Array<string>;
    quantity: bigint;
    serviceId: ServiceId;
    price: bigint;
}
export interface GalleryItem {
    id: GalleryItemId;
    title: string;
    createdAt: Timestamp;
    imageUrl: string;
    category: GalleryCategory;
}
export type OrderId = bigint;
export interface CreateCouponArgs {
    code: string;
    discountPercent: bigint;
}
export enum GalleryCategory {
    Men = "Men",
    Kids = "Kids",
    Women = "Women",
    Custom = "Custom",
    Featured = "Featured"
}
export enum OrderStatus {
    Stitching = "Stitching",
    Delivered = "Delivered",
    Ready = "Ready",
    Received = "Received",
    InProgress = "InProgress"
}
export enum ServiceCategory {
    Men = "Men",
    Kids = "Kids",
    Women = "Women",
    Custom = "Custom"
}
export enum UserRole {
    Customer = "Customer",
    Staff = "Staff",
    Admin = "Admin",
    Tailor = "Tailor"
}
export interface backendInterface {
    addGalleryItem(args: CreateGalleryItemArgs): Promise<GalleryItem>;
    approveReview(id: ReviewId): Promise<Review | null>;
    assignTailor(orderId: OrderId, tailorId: UserId): Promise<Order | null>;
    createCoupon(args: CreateCouponArgs): Promise<Coupon>;
    createOrder(args: CreateOrderArgs): Promise<Order>;
    createReview(args: CreateReviewArgs): Promise<Review>;
    createService(args: CreateServiceArgs): Promise<Service>;
    createTailor(args: CreateTailorArgs): Promise<Tailor>;
    deleteCoupon(id: CouponId): Promise<boolean>;
    deleteGalleryItem(id: GalleryItemId): Promise<boolean>;
    deleteReview(id: ReviewId): Promise<boolean>;
    deleteService(id: ServiceId): Promise<boolean>;
    getAdminStats(): Promise<AdminStats>;
    getMyProfile(): Promise<User>;
    getOrder(id: OrderId): Promise<Order | null>;
    getService(id: ServiceId): Promise<Service | null>;
    getServiceBySlug(slug: string): Promise<Service | null>;
    getTailor(id: UserId): Promise<Tailor | null>;
    listAllReviews(): Promise<Array<Review>>;
    listApprovedReviews(): Promise<Array<Review>>;
    listCoupons(): Promise<Array<Coupon>>;
    listGalleryItems(): Promise<Array<GalleryItem>>;
    listMyOrders(): Promise<Array<Order>>;
    listOrders(): Promise<Array<Order>>;
    listServices(): Promise<Array<Service>>;
    listTailors(): Promise<Array<Tailor>>;
    listUsers(): Promise<Array<User>>;
    saveMeasurements(measurements: Measurement): Promise<User | null>;
    toggleCoupon(id: CouponId): Promise<Coupon | null>;
    trackOrder(id: OrderId): Promise<OrderStatus | null>;
    updateOrderStatus(id: OrderId, status: OrderStatus): Promise<Order | null>;
    updateProfile(args: UpdateProfileArgs): Promise<User | null>;
    updateService(args: UpdateServiceArgs): Promise<Service | null>;
    validateCoupon(code: string): Promise<Coupon | null>;
}
