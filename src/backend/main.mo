import List "mo:core/List";
import ServiceTypes "types/services";
import OrderTypes "types/orders";
import UserTypes "types/users";
import CatalogTypes "types/catalog";
import ServicesLib "lib/services";
import ServicesApi "mixins/services-api";
import OrdersApi "mixins/orders-api";
import UsersApi "mixins/users-api";
import CatalogApi "mixins/catalog-api";

actor {
  let services = List.empty<ServiceTypes.Service>();
  let nextServiceId : [var Nat] = [var 1];

  let orders = List.empty<OrderTypes.Order>();
  let nextOrderId : [var Nat] = [var 1];

  let users = List.empty<UserTypes.User>();
  let tailors = List.empty<UserTypes.Tailor>();

  let gallery = List.empty<CatalogTypes.GalleryItem>();
  let reviews = List.empty<CatalogTypes.Review>();
  let coupons = List.empty<CatalogTypes.Coupon>();
  let nextGalleryId : [var Nat] = [var 1];
  let nextReviewId : [var Nat] = [var 1];
  let nextCouponId : [var Nat] = [var 1];

  // Seed 5 sample services on first start
  if (services.size() == 0) {
    let seeds : [ServiceTypes.CreateServiceArgs] = [
      {
        slug = "blouse-stitching";
        name = "Blouse Stitching";
        description = "Custom-fitted blouses for sarees, including traditional and modern designs with expert craftsmanship.";
        priceMin = 500;
        priceMax = 2000;
        deliveryDays = 5;
        imageUrl = "";
        fabricOptions = ["Cotton", "Silk", "Georgette", "Chiffon", "Velvet"];
        addons = [];
        category = #Women;
      },
      {
        slug = "suit-stitching";
        name = "Suit Stitching";
        description = "Tailored suits for men and women — formal, business, or ethnic styles made to your exact measurements.";
        priceMin = 1500;
        priceMax = 6000;
        deliveryDays = 7;
        imageUrl = "";
        fabricOptions = ["Wool", "Linen", "Cotton", "Polyester", "Terylene"];
        addons = [];
        category = #Men;
      },
      {
        slug = "lehenga-stitching";
        name = "Lehenga Stitching";
        description = "Stunning lehenga cholis stitched with precision — perfect for weddings, festivals, and special occasions.";
        priceMin = 2000;
        priceMax = 10000;
        deliveryDays = 10;
        imageUrl = "";
        fabricOptions = ["Silk", "Velvet", "Net", "Georgette", "Brocade"];
        addons = [];
        category = #Women;
      },
      {
        slug = "shirt-pant-stitching";
        name = "Shirt/Pant Stitching";
        description = "Smart casual and formal shirts and pants tailored to fit perfectly, using your choice of fabric.";
        priceMin = 400;
        priceMax = 1800;
        deliveryDays = 4;
        imageUrl = "";
        fabricOptions = ["Cotton", "Linen", "Poplin", "Oxford", "Denim"];
        addons = [];
        category = #Men;
      },
      {
        slug = "custom-design";
        name = "Custom Design";
        description = "Bring your dream outfit to life. Upload your design, choose fabrics, and we will stitch it exactly as you envision.";
        priceMin = 1000;
        priceMax = 15000;
        deliveryDays = 14;
        imageUrl = "";
        fabricOptions = ["Any fabric of your choice"];
        addons = [];
        category = #Custom;
      },
    ];
    for (args in seeds.values()) {
      ignore ServicesLib.createService(services, nextServiceId[0], args);
      nextServiceId[0] += 1;
    };
  };

  include ServicesApi(services, nextServiceId);
  include OrdersApi(orders, nextOrderId);
  include UsersApi(users, tailors);
  include CatalogApi(gallery, reviews, coupons, orders, users, nextGalleryId, nextReviewId, nextCouponId);
};
