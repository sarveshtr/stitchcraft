import List "mo:core/List";
import Types "../types/services";
import Common "../types/common";

module {
  public func listServices(services : List.List<Types.Service>) : [Types.Service] {
    services.toArray();
  };

  public func getService(services : List.List<Types.Service>, id : Common.ServiceId) : ?Types.Service {
    services.find(func(s) { s.id == id });
  };

  public func getServiceBySlug(services : List.List<Types.Service>, slug : Text) : ?Types.Service {
    services.find(func(s) { s.slug == slug });
  };

  public func createService(
    services : List.List<Types.Service>,
    nextId : Nat,
    args : Types.CreateServiceArgs,
  ) : Types.Service {
    let service : Types.Service = {
      id = nextId;
      slug = args.slug;
      name = args.name;
      description = args.description;
      priceMin = args.priceMin;
      priceMax = args.priceMax;
      deliveryDays = args.deliveryDays;
      imageUrl = args.imageUrl;
      fabricOptions = args.fabricOptions;
      addons = args.addons;
      category = args.category;
    };
    services.add(service);
    service;
  };

  public func updateService(
    services : List.List<Types.Service>,
    args : Types.UpdateServiceArgs,
  ) : ?Types.Service {
    var updated : ?Types.Service = null;
    services.mapInPlace(func(s) {
      if (s.id == args.id) {
        let u : Types.Service = {
          id = args.id;
          slug = args.slug;
          name = args.name;
          description = args.description;
          priceMin = args.priceMin;
          priceMax = args.priceMax;
          deliveryDays = args.deliveryDays;
          imageUrl = args.imageUrl;
          fabricOptions = args.fabricOptions;
          addons = args.addons;
          category = args.category;
        };
        updated := ?u;
        u;
      } else { s };
    });
    updated;
  };

  public func deleteService(services : List.List<Types.Service>, id : Common.ServiceId) : Bool {
    let sizeBefore = services.size();
    let filtered = services.filter(func(s) { s.id != id });
    services.clear();
    services.append(filtered);
    services.size() < sizeBefore;
  };
};
