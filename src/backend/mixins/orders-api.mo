import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import OrderTypes "../types/orders";
import Common "../types/common";
import OrdersLib "../lib/orders";

mixin (
  orders : List.List<OrderTypes.Order>,
  nextOrderId : [var Nat],
) {
  public query ({ caller }) func listOrders() : async [OrderTypes.Order] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    OrdersLib.listOrders(orders);
  };

  public query ({ caller }) func listMyOrders() : async [OrderTypes.Order] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    OrdersLib.listOrdersByUser(orders, caller);
  };

  public query ({ caller }) func getOrder(id : Common.OrderId) : async ?OrderTypes.Order {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    OrdersLib.getOrder(orders, id);
  };

  public query func trackOrder(id : Common.OrderId) : async ?OrderTypes.OrderStatus {
    OrdersLib.trackOrder(orders, id);
  };

  public shared ({ caller }) func createOrder(args : OrderTypes.CreateOrderArgs) : async OrderTypes.Order {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    let now = Time.now();
    let order = OrdersLib.createOrder(orders, nextOrderId[0], caller, args, now);
    nextOrderId[0] += 1;
    order;
  };

  public shared ({ caller }) func updateOrderStatus(id : Common.OrderId, status : OrderTypes.OrderStatus) : async ?OrderTypes.Order {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    let now = Time.now();
    OrdersLib.updateOrderStatus(orders, id, status, now);
  };

  public shared ({ caller }) func assignTailor(orderId : Common.OrderId, tailorId : Common.UserId) : async ?OrderTypes.Order {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    let now = Time.now();
    OrdersLib.assignTailor(orders, orderId, tailorId, now);
  };
};
