import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import ServiceTypes "../types/services";
import Common "../types/common";
import ServicesLib "../lib/services";

mixin (
  services : List.List<ServiceTypes.Service>,
  nextServiceId : [var Nat],
) {
  public query func listServices() : async [ServiceTypes.Service] {
    ServicesLib.listServices(services);
  };

  public query func getService(id : Common.ServiceId) : async ?ServiceTypes.Service {
    ServicesLib.getService(services, id);
  };

  public query func getServiceBySlug(slug : Text) : async ?ServiceTypes.Service {
    ServicesLib.getServiceBySlug(services, slug);
  };

  public shared ({ caller }) func createService(args : ServiceTypes.CreateServiceArgs) : async ServiceTypes.Service {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    let svc = ServicesLib.createService(services, nextServiceId[0], args);
    nextServiceId[0] += 1;
    svc;
  };

  public shared ({ caller }) func updateService(args : ServiceTypes.UpdateServiceArgs) : async ?ServiceTypes.Service {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    ServicesLib.updateService(services, args);
  };

  public shared ({ caller }) func deleteService(id : Common.ServiceId) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    ServicesLib.deleteService(services, id);
  };
};
