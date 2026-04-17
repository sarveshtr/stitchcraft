import Common "common";

module {
  public type GalleryCategory = {
    #Men;
    #Women;
    #Kids;
    #Featured;
    #Custom;
  };

  public type GalleryItem = {
    id : Common.GalleryItemId;
    imageUrl : Text;
    category : GalleryCategory;
    title : Text;
    createdAt : Common.Timestamp;
  };

  public type CreateGalleryItemArgs = {
    imageUrl : Text;
    category : GalleryCategory;
    title : Text;
  };

  public type Review = {
    id : Common.ReviewId;
    orderId : Common.OrderId;
    userId : Common.UserId;
    rating : Nat;
    comment : Text;
    approved : Bool;
    createdAt : Common.Timestamp;
  };

  public type CreateReviewArgs = {
    orderId : Common.OrderId;
    rating : Nat;
    comment : Text;
  };

  public type Coupon = {
    id : Common.CouponId;
    code : Text;
    discountPercent : Nat;
    isActive : Bool;
    createdAt : Common.Timestamp;
  };

  public type CreateCouponArgs = {
    code : Text;
    discountPercent : Nat;
  };

  public type AdminStats = {
    totalOrders : Nat;
    totalRevenue : Nat;
    pendingOrders : Nat;
    customersCount : Nat;
  };
};
