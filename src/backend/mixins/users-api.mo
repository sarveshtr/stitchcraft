import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import UserTypes "../types/users";
import OrderTypes "../types/orders";
import Common "../types/common";
import UsersLib "../lib/users";

mixin (
  users : List.List<UserTypes.User>,
  tailors : List.List<UserTypes.Tailor>,
) {
  public shared ({ caller }) func getMyProfile() : async UserTypes.User {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    let now = Time.now();
    UsersLib.getOrCreateUser(users, caller, now);
  };

  public shared ({ caller }) func updateProfile(args : UserTypes.UpdateProfileArgs) : async ?UserTypes.User {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    UsersLib.updateProfile(users, caller, args);
  };

  public shared ({ caller }) func saveMeasurements(measurements : OrderTypes.Measurement) : async ?UserTypes.User {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    UsersLib.saveMeasurements(users, caller, measurements);
  };

  public query ({ caller }) func listUsers() : async [UserTypes.User] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    UsersLib.listUsers(users);
  };

  public query func listTailors() : async [UserTypes.Tailor] {
    UsersLib.listTailors(tailors);
  };

  public query func getTailor(id : Common.UserId) : async ?UserTypes.Tailor {
    UsersLib.getTailor(tailors, id);
  };

  public shared ({ caller }) func createTailor(args : UserTypes.CreateTailorArgs) : async UserTypes.Tailor {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: login required");
    };
    let now = Time.now();
    UsersLib.createTailor(tailors, users, args, now);
  };
};
