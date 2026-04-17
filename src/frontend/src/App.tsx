import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { AdminLayout } from "./components/AdminLayout";
import { Layout } from "./components/Layout";
import { PageLoader } from "./components/LoadingSpinner";

// Lazy-load pages
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const CustomStitching = lazy(() => import("./pages/CustomStitching"));
const TrackOrder = lazy(() => import("./pages/TrackOrder"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const Account = lazy(() => import("./pages/Account"));
const AccountMeasurements = lazy(() => import("./pages/AccountMeasurements"));
const AccountOrders = lazy(() => import("./pages/AccountOrders"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Reviews = lazy(() => import("./pages/Reviews"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminOrders = lazy(() => import("./pages/admin/Orders"));
const AdminServices = lazy(() => import("./pages/admin/AdminServices"));
const AdminCustomers = lazy(() => import("./pages/admin/Customers"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Public layout wrapper
const publicLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

// Admin layout wrapper
const adminLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin",
  component: () => (
    <AdminLayout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </AdminLayout>
  ),
});

// Public routes
const homeRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/",
  component: Home,
});

const servicesRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/services",
  component: Services,
});

const serviceDetailRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/services/$slug",
  component: ServiceDetail,
});

const customStitchingRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/custom-stitching",
  component: CustomStitching,
});

const trackOrderRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/track",
  component: TrackOrder,
});

const cartRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/cart",
  component: Cart,
});

const checkoutRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/checkout",
  component: Checkout,
});

const orderConfirmationRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/order-confirmation",
  component: OrderConfirmation,
});

const accountRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/account",
  component: Account,
});

const accountMeasurementsRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/account/measurements",
  component: AccountMeasurements,
});

const accountOrdersRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/account/orders",
  component: AccountOrders,
});

const galleryRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/gallery",
  component: Gallery,
});

const contactRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/contact",
  component: Contact,
});

const reviewsRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/reviews",
  component: Reviews,
});

// Admin routes
const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: "/admin",
  component: AdminDashboard,
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: "/admin/orders",
  component: AdminOrders,
});

const adminServicesRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: "/admin/services",
  component: AdminServices,
});

const adminCustomersRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: "/admin/customers",
  component: AdminCustomers,
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: "/admin/settings",
  component: AdminSettings,
});

const routeTree = rootRoute.addChildren([
  publicLayout.addChildren([
    homeRoute,
    servicesRoute,
    serviceDetailRoute,
    customStitchingRoute,
    trackOrderRoute,
    cartRoute,
    checkoutRoute,
    orderConfirmationRoute,
    accountRoute,
    accountMeasurementsRoute,
    accountOrdersRoute,
    galleryRoute,
    contactRoute,
    reviewsRoute,
  ]),
  adminLayout.addChildren([
    adminDashboardRoute,
    adminOrdersRoute,
    adminServicesRoute,
    adminCustomersRoute,
    adminSettingsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
