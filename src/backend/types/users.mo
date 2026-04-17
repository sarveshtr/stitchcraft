import Common "common";
import Orders "orders";

module {
  public type UserRole = {
    #Customer;
    #Tailor;
    #Staff;
    #Admin;
  };

  public type User = {
    id : Common.UserId;
    name : Text;
    email : Text;
    phone : Text;
    role : UserRole;
    savedMeasurements : ?Orders.Measurement;
    createdAt : Common.Timestamp;
  };

  public type UpdateProfileArgs = {
    name : Text;
    email : Text;
    phone : Text;
  };

  public type Tailor = {
    id : Common.UserId;
    name : Text;
    email : Text;
    phone : Text;
    specialization : [Text];
    isActive : Bool;
    ordersAssigned : [Common.OrderId];
    createdAt : Common.Timestamp;
  };

  public type CreateTailorArgs = {
    principal : Common.UserId;
    name : Text;
    email : Text;
    phone : Text;
    specialization : [Text];
  };
};
