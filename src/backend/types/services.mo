import Common "common";

module {
  public type ServiceCategory = {
    #Men;
    #Women;
    #Kids;
    #Custom;
  };

  public type Addon = {
    id : Nat;
    name : Text;
    price : Nat;
  };

  public type Service = {
    id : Common.ServiceId;
    slug : Text;
    name : Text;
    description : Text;
    priceMin : Nat;
    priceMax : Nat;
    deliveryDays : Nat;
    imageUrl : Text;
    fabricOptions : [Text];
    addons : [Addon];
    category : ServiceCategory;
  };

  public type CreateServiceArgs = {
    slug : Text;
    name : Text;
    description : Text;
    priceMin : Nat;
    priceMax : Nat;
    deliveryDays : Nat;
    imageUrl : Text;
    fabricOptions : [Text];
    addons : [Addon];
    category : ServiceCategory;
  };

  public type UpdateServiceArgs = {
    id : Common.ServiceId;
    slug : Text;
    name : Text;
    description : Text;
    priceMin : Nat;
    priceMax : Nat;
    deliveryDays : Nat;
    imageUrl : Text;
    fabricOptions : [Text];
    addons : [Addon];
    category : ServiceCategory;
  };
};
