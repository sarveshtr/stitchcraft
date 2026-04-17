import List "mo:core/List";
import OrderTypes "../types/orders";
import Common "../types/common";

module {
  public func listOrders(orders : List.List<OrderTypes.Order>) : [OrderTypes.Order] {
    orders.toArray();
  };

  public func listOrdersByUser(
    orders : List.List<OrderTypes.Order>,
    userId : Common.UserId,
  ) : [OrderTypes.Order] {
    orders.filter(func(o) { o.userId == userId }).toArray();
  };

  public func getOrder(orders : List.List<OrderTypes.Order>, id : Common.OrderId) : ?OrderTypes.Order {
    orders.find(func(o) { o.id == id });
  };

  public func createOrder(
    orders : List.List<OrderTypes.Order>,
    nextId : Nat,
    userId : Common.UserId,
    args : OrderTypes.CreateOrderArgs,
    now : Common.Timestamp,
  ) : OrderTypes.Order {
    let order : OrderTypes.Order = {
      id = nextId;
      userId = userId;
      items = args.items;
      measurements = args.measurements;
      totalAmount = args.totalAmount;
      status = #Received;
      address = args.address;
      tailorId = null;
      couponCode = args.couponCode;
      createdAt = now;
      updatedAt = now;
    };
    orders.add(order);
    order;
  };

  public func updateOrderStatus(
    orders : List.List<OrderTypes.Order>,
    id : Common.OrderId,
    status : OrderTypes.OrderStatus,
    now : Common.Timestamp,
  ) : ?OrderTypes.Order {
    var updated : ?OrderTypes.Order = null;
    orders.mapInPlace(func(o) {
      if (o.id == id) {
        let u : OrderTypes.Order = { o with status = status; updatedAt = now };
        updated := ?u;
        u;
      } else { o };
    });
    updated;
  };

  public func assignTailor(
    orders : List.List<OrderTypes.Order>,
    orderId : Common.OrderId,
    tailorId : Common.UserId,
    now : Common.Timestamp,
  ) : ?OrderTypes.Order {
    var updated : ?OrderTypes.Order = null;
    orders.mapInPlace(func(o) {
      if (o.id == orderId) {
        let u : OrderTypes.Order = { o with tailorId = ?tailorId; updatedAt = now };
        updated := ?u;
        u;
      } else { o };
    });
    updated;
  };

  public func trackOrder(orders : List.List<OrderTypes.Order>, id : Common.OrderId) : ?OrderTypes.OrderStatus {
    switch (orders.find(func(o) { o.id == id })) {
      case (?o) { ?o.status };
      case null { null };
    };
  };
};
