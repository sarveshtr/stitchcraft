import Common "common";

module {
  public type OrderStatus = {
    #Received;
    #InProgress;
    #Stitching;
    #Ready;
    #Delivered;
  };

  public type Measurement = {
    bust : ?Nat;
    waist : ?Nat;
    hips : ?Nat;
    length : ?Nat;
    shoulder : ?Nat;
    sleeve : ?Nat;
    notes : Text;
  };

  public type CartItem = {
    serviceId : Common.ServiceId;
    serviceName : Text;
    price : Nat;
    quantity : Nat;
    addons : [Text];
  };

  public type Address = {
    street : Text;
    city : Text;
    state : Text;
    zipCode : Text;
    country : Text;
  };

  public type Order = {
    id : Common.OrderId;
    userId : Common.UserId;
    items : [CartItem];
    measurements : Measurement;
    totalAmount : Nat;
    status : OrderStatus;
    address : Address;
    tailorId : ?Common.UserId;
    couponCode : ?Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type CreateOrderArgs = {
    items : [CartItem];
    measurements : Measurement;
    totalAmount : Nat;
    address : Address;
    couponCode : ?Text;
  };
};
