import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import CatalogTypes "../types/catalog";
import OrderTypes "../types/orders";
import UserTypes "../types/users";
import Common "../types/common";
import CatalogLib "../lib/catalog";

mixin (
  gallery : List.List<CatalogTypes.GalleryItem>,
  reviews : List.List<CatalogTypes.Review>,
  coupons : List.List<CatalogTypes.Coupon>,
  orders : List.List<OrderTypes.Order>,
  users : List.List<UserTypes.User>,
  nextGalleryId : [var Nat],
  nextReviewId : [var Nat],
  nextCouponId : [var Nat],
) {
  // Gallery
  public query func listGalleryItems() : async [CatalogTypes.GalleryItem] {
    CatalogLib.listGalleryItems(gallery);
  };

  public shared ({ caller }) func addGalleryItem(args : CatalogTypes.CreateGalleryItemArgs) : async CatalogTypes.GalleryItem {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    let now = Time.now();
    let item = CatalogLib.addGalleryItem(gallery, nextGalleryId[0], args, now);
    nextGalleryId[0] += 1;
    item;
  };

  public shared ({ caller }) func deleteGalleryItem(id : Common.GalleryItemId) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    CatalogLib.deleteGalleryItem(gallery, id);
  };

  // Reviews
  public query func listApprovedReviews() : async [CatalogTypes.Review] {
    CatalogLib.listApprovedReviews(reviews);
  };

  public query ({ caller }) func listAllReviews() : async [CatalogTypes.Review] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    CatalogLib.listReviews(reviews);
  };

  public shared ({ caller }) func createReview(args : CatalogTypes.CreateReviewArgs) : async CatalogTypes.Review {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    let now = Time.now();
    let review = CatalogLib.createReview(reviews, nextReviewId[0], caller, args, now);
    nextReviewId[0] += 1;
    review;
  };

  public shared ({ caller }) func approveReview(id : Common.ReviewId) : async ?CatalogTypes.Review {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    CatalogLib.approveReview(reviews, id);
  };

  public shared ({ caller }) func deleteReview(id : Common.ReviewId) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    CatalogLib.deleteReview(reviews, id);
  };

  // Coupons
  public query ({ caller }) func listCoupons() : async [CatalogTypes.Coupon] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    CatalogLib.listCoupons(coupons);
  };

  public query func validateCoupon(code : Text) : async ?CatalogTypes.Coupon {
    switch (CatalogLib.getCouponByCode(coupons, code)) {
      case (?c) { if (c.isActive) { ?c } else { null } };
      case null { null };
    };
  };

  public shared ({ caller }) func createCoupon(args : CatalogTypes.CreateCouponArgs) : async CatalogTypes.Coupon {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    let now = Time.now();
    let coupon = CatalogLib.createCoupon(coupons, nextCouponId[0], args, now);
    nextCouponId[0] += 1;
    coupon;
  };

  public shared ({ caller }) func toggleCoupon(id : Common.CouponId) : async ?CatalogTypes.Coupon {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    CatalogLib.toggleCoupon(coupons, id);
  };

  public shared ({ caller }) func deleteCoupon(id : Common.CouponId) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    CatalogLib.deleteCoupon(coupons, id);
  };

  // Admin stats
  public query ({ caller }) func getAdminStats() : async CatalogTypes.AdminStats {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    let userSlice = users.map<UserTypes.User, { id : Common.UserId }>(func(u) { { id = u.id } });
    CatalogLib.getAdminStats(orders, userSlice);
  };
};
