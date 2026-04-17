import List "mo:core/List";
import Runtime "mo:core/Runtime";
import CatalogTypes "../types/catalog";
import Common "../types/common";
import OrderTypes "../types/orders";

module {
  // Gallery
  public func listGalleryItems(gallery : List.List<CatalogTypes.GalleryItem>) : [CatalogTypes.GalleryItem] {
    gallery.toArray();
  };

  public func addGalleryItem(
    gallery : List.List<CatalogTypes.GalleryItem>,
    nextId : Nat,
    args : CatalogTypes.CreateGalleryItemArgs,
    now : Common.Timestamp,
  ) : CatalogTypes.GalleryItem {
    let item : CatalogTypes.GalleryItem = {
      id = nextId;
      imageUrl = args.imageUrl;
      category = args.category;
      title = args.title;
      createdAt = now;
    };
    gallery.add(item);
    item;
  };

  public func deleteGalleryItem(gallery : List.List<CatalogTypes.GalleryItem>, id : Common.GalleryItemId) : Bool {
    let sizeBefore = gallery.size();
    let filtered = gallery.filter(func(g) { g.id != id });
    gallery.clear();
    gallery.append(filtered);
    gallery.size() < sizeBefore;
  };

  // Reviews
  public func listReviews(reviews : List.List<CatalogTypes.Review>) : [CatalogTypes.Review] {
    reviews.toArray();
  };

  public func listApprovedReviews(reviews : List.List<CatalogTypes.Review>) : [CatalogTypes.Review] {
    reviews.filter(func(r) { r.approved }).toArray();
  };

  public func createReview(
    reviews : List.List<CatalogTypes.Review>,
    nextId : Nat,
    userId : Common.UserId,
    args : CatalogTypes.CreateReviewArgs,
    now : Common.Timestamp,
  ) : CatalogTypes.Review {
    if (args.rating < 1 or args.rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };
    let review : CatalogTypes.Review = {
      id = nextId;
      orderId = args.orderId;
      userId = userId;
      rating = args.rating;
      comment = args.comment;
      approved = false;
      createdAt = now;
    };
    reviews.add(review);
    review;
  };

  public func approveReview(reviews : List.List<CatalogTypes.Review>, id : Common.ReviewId) : ?CatalogTypes.Review {
    var updated : ?CatalogTypes.Review = null;
    reviews.mapInPlace(func(r) {
      if (r.id == id) {
        let u : CatalogTypes.Review = { r with approved = true };
        updated := ?u;
        u;
      } else { r };
    });
    updated;
  };

  public func deleteReview(reviews : List.List<CatalogTypes.Review>, id : Common.ReviewId) : Bool {
    let sizeBefore = reviews.size();
    let filtered = reviews.filter(func(r) { r.id != id });
    reviews.clear();
    reviews.append(filtered);
    reviews.size() < sizeBefore;
  };

  // Coupons
  public func listCoupons(coupons : List.List<CatalogTypes.Coupon>) : [CatalogTypes.Coupon] {
    coupons.toArray();
  };

  public func getCouponByCode(coupons : List.List<CatalogTypes.Coupon>, code : Text) : ?CatalogTypes.Coupon {
    coupons.find(func(c) { c.code == code });
  };

  public func createCoupon(
    coupons : List.List<CatalogTypes.Coupon>,
    nextId : Nat,
    args : CatalogTypes.CreateCouponArgs,
    now : Common.Timestamp,
  ) : CatalogTypes.Coupon {
    let coupon : CatalogTypes.Coupon = {
      id = nextId;
      code = args.code;
      discountPercent = args.discountPercent;
      isActive = true;
      createdAt = now;
    };
    coupons.add(coupon);
    coupon;
  };

  public func toggleCoupon(coupons : List.List<CatalogTypes.Coupon>, id : Common.CouponId) : ?CatalogTypes.Coupon {
    var updated : ?CatalogTypes.Coupon = null;
    coupons.mapInPlace(func(c) {
      if (c.id == id) {
        let u : CatalogTypes.Coupon = { c with isActive = not c.isActive };
        updated := ?u;
        u;
      } else { c };
    });
    updated;
  };

  public func deleteCoupon(coupons : List.List<CatalogTypes.Coupon>, id : Common.CouponId) : Bool {
    let sizeBefore = coupons.size();
    let filtered = coupons.filter(func(c) { c.id != id });
    coupons.clear();
    coupons.append(filtered);
    coupons.size() < sizeBefore;
  };

  // Admin stats
  public func getAdminStats(
    orders : List.List<OrderTypes.Order>,
    users : List.List<{ id : Common.UserId }>,
  ) : CatalogTypes.AdminStats {
    let totalOrders = orders.size();
    let totalRevenue = orders.foldLeft(0, func(acc, o) { acc + o.totalAmount });
    let pendingOrders = orders.filter(func(o) {
      switch (o.status) {
        case (#Received or #InProgress or #Stitching) { true };
        case _ { false };
      };
    }).size();
    let customersCount = users.size();
    {
      totalOrders = totalOrders;
      totalRevenue = totalRevenue;
      pendingOrders = pendingOrders;
      customersCount = customersCount;
    };
  };
};
