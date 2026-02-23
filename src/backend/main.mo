import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type Ingredient = {
    name : Text;
    isVegan : Bool;
    isGlutenFree : Bool;
  };

  public type ProductTranslations = {
    enName : Text;
    enDescription : Text;
    enIngredients : [Ingredient];
    hiName : Text;
    hiDescription : Text;
    hiIngredients : [Ingredient];
    taName : Text;
    taDescription : Text;
    taIngredients : [Ingredient];
    mlName : Text;
    mlDescription : Text;
    mlIngredients : [Ingredient];
  };

  public type Product = {
    id : Nat;
    priceInCents : Nat;
    image : Storage.ExternalBlob;
    isAvailable : Bool;
    sku : Text;
    detailedDescription : Text;
    translations : ProductTranslations;
  };

  public type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  public type IdeaSubmission = {
    id : Nat;
    name : Text;
    email : ?Text;
    message : Text;
    timestamp : Int;
  };

  public type Order = {
    id : Nat;
    products : [Product];
    totalAmount : Nat;
    orderTimestamp : Int;
    customerName : Text;
    customerEmail : Text;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  public type PreferredLanguage = { language : Text; timestamp : Int };

  public type Cart = { id : Nat; products : [Nat]; total : Nat };

  public type CheckoutSession = {
    sessionId : Text;
    creator : Principal;
    timestamp : Int;
  };

  let products = Map.empty<Nat, Product>();
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  let ideas = Map.empty<Nat, IdeaSubmission>();
  let orders = Map.empty<Nat, Order>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let carts = Map.empty<Nat, Cart>();
  let languagePrefs = Map.empty<Principal, PreferredLanguage>();
  let checkoutSessions = Map.empty<Text, CheckoutSession>();

  var nextContactId : Nat = 1;
  var nextIdeaId : Nat = 1;
  var nextOrderId : Nat = 1;
  var nextCartId : Nat = 1;

  var stripeConfig : ?Stripe.StripeConfiguration = null;

  public query func isStripeConfigured() : async Bool {
    switch (stripeConfig) {
      case (null) { false };
      case (?_) { true };
    };
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfig := ?config;
  };

  func checkStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe not configured") };
      case (?config) { config };
    };
  };

  public shared ({ caller }) func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    switch (checkoutSessions.get(sessionId)) {
      case (null) {
        if (not (AccessControl.isAdmin(accessControlState, caller))) {
          Runtime.trap("Unauthorized: Session not found or access denied");
        };
      };
      case (?session) {
        if (session.creator != caller and not (AccessControl.isAdmin(accessControlState, caller))) {
          Runtime.trap("Unauthorized: Can only view your own checkout sessions");
        };
      };
    };
    await Stripe.getSessionStatus(checkStripeConfig(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    let sessionId = await Stripe.createCheckoutSession(checkStripeConfig(), caller, items, successUrl, cancelUrl, transform);

    let session : CheckoutSession = {
      sessionId;
      creator = caller;
      timestamp = Time.now();
    };
    checkoutSessions.add(sessionId, session);

    sessionId;
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  func getNextContactId() : Nat {
    let id = nextContactId;
    nextContactId += 1;
    id;
  };

  func getNextIdeaId() : Nat {
    let id = nextIdeaId;
    nextIdeaId += 1;
    id;
  };

  func getNextOrderId() : Nat {
    let id = nextOrderId;
    nextOrderId += 1;
    id;
  };

  func getNextCartId() : Nat {
    let id = nextCartId;
    nextCartId += 1;
    id;
  };

  // Contact
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async Nat {
    let id = getNextContactId();
    let submission : ContactSubmission = {
      id;
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactSubmissions.add(id, submission);
    id;
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    contactSubmissions.values().toArray();
  };

  // Idea/Suggestion
  public shared ({ caller }) func submitIdea(name : Text, email : ?Text, message : Text) : async Nat {
    let id = getNextIdeaId();
    let idea : IdeaSubmission = {
      id;
      name;
      email;
      message;
      timestamp = Time.now();
    };
    ideas.add(id, idea);
    id;
  };

  public query ({ caller }) func getAllIdeas() : async [IdeaSubmission] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view idea submissions");
    };
    ideas.values().toArray();
  };

  // Cart
  public shared ({ caller }) func createCart(productIds : [Nat], total : Nat) : async Nat {
    let id = getNextCartId();
    let cart : Cart = { id; products = productIds; total };
    carts.add(id, cart);
    id;
  };

  public query func getCart(cartId : Nat) : async ?Cart {
    carts.get(cartId);
  };

  // Orders
  public shared ({ caller }) func createOrder(products : [Product], totalAmount : Nat, customerName : Text, customerEmail : Text) : async Nat {
    let id = getNextOrderId();
    let order : Order = {
      id;
      products;
      totalAmount;
      orderTimestamp = Time.now();
      customerName;
      customerEmail;
    };
    orders.add(id, order);
    id;
  };

  public query ({ caller }) func getOrdersAll() : async [Order] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    orders.values().toArray();
  };

  // User Profiles
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Language Preferences
  public shared ({ caller }) func setPreferredLanguage(language : Text) : async () {
    let pref : PreferredLanguage = {
      language;
      timestamp = Time.now();
    };
    languagePrefs.add(caller, pref);
  };

  public query ({ caller }) func getPreferredLanguage() : async Text {
    switch (languagePrefs.get(caller)) {
      case (null) { "en" };
      case (?pref) { pref.language };
    };
  };

  // Product Queries
  public query func getProductsAll() : async [Product] {
    products.values().toArray();
  };

  public query func getProduct(productId : Nat) : async ?Product {
    products.get(productId);
  };
};
