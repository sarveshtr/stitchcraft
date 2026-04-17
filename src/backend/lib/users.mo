import List "mo:core/List";
import UserTypes "../types/users";
import OrderTypes "../types/orders";
import Common "../types/common";

module {
  public func getOrCreateUser(
    users : List.List<UserTypes.User>,
    principal : Common.UserId,
    now : Common.Timestamp,
  ) : UserTypes.User {
    switch (users.find(func(u) { u.id == principal })) {
      case (?u) { u };
      case null {
        let user : UserTypes.User = {
          id = principal;
          name = "";
          email = "";
          phone = "";
          role = #Customer;
          savedMeasurements = null;
          createdAt = now;
        };
        users.add(user);
        user;
      };
    };
  };

  public func getUser(users : List.List<UserTypes.User>, principal : Common.UserId) : ?UserTypes.User {
    users.find(func(u) { u.id == principal });
  };

  public func listUsers(users : List.List<UserTypes.User>) : [UserTypes.User] {
    users.toArray();
  };

  public func updateProfile(
    users : List.List<UserTypes.User>,
    principal : Common.UserId,
    args : UserTypes.UpdateProfileArgs,
  ) : ?UserTypes.User {
    var updated : ?UserTypes.User = null;
    users.mapInPlace(func(u) {
      if (u.id == principal) {
        let upd : UserTypes.User = { u with name = args.name; email = args.email; phone = args.phone };
        updated := ?upd;
        upd;
      } else { u };
    });
    updated;
  };

  public func saveMeasurements(
    users : List.List<UserTypes.User>,
    principal : Common.UserId,
    measurements : OrderTypes.Measurement,
  ) : ?UserTypes.User {
    var updated : ?UserTypes.User = null;
    users.mapInPlace(func(u) {
      if (u.id == principal) {
        let upd : UserTypes.User = { u with savedMeasurements = ?measurements };
        updated := ?upd;
        upd;
      } else { u };
    });
    updated;
  };

  public func listTailors(tailors : List.List<UserTypes.Tailor>) : [UserTypes.Tailor] {
    tailors.toArray();
  };

  public func getTailor(tailors : List.List<UserTypes.Tailor>, id : Common.UserId) : ?UserTypes.Tailor {
    tailors.find(func(t) { t.id == id });
  };

  public func createTailor(
    tailors : List.List<UserTypes.Tailor>,
    users : List.List<UserTypes.User>,
    args : UserTypes.CreateTailorArgs,
    now : Common.Timestamp,
  ) : UserTypes.Tailor {
    let tailor : UserTypes.Tailor = {
      id = args.principal;
      name = args.name;
      email = args.email;
      phone = args.phone;
      specialization = args.specialization;
      isActive = true;
      ordersAssigned = [];
      createdAt = now;
    };
    tailors.add(tailor);
    // Upsert user record with Tailor role
    switch (users.find(func(u) { u.id == args.principal })) {
      case (?_existing) {
        users.mapInPlace(func(u) {
          if (u.id == args.principal) {
            { u with name = args.name; email = args.email; phone = args.phone; role = #Tailor };
          } else { u };
        });
      };
      case null {
        let user : UserTypes.User = {
          id = args.principal;
          name = args.name;
          email = args.email;
          phone = args.phone;
          role = #Tailor;
          savedMeasurements = null;
          createdAt = now;
        };
        users.add(user);
      };
    };
    tailor;
  };
};
