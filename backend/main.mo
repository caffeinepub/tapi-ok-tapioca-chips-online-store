import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";
import List "mo:core/List";

import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import Migration "migration";

(with migration = Migration.run)
actor {
  include MixinStorage();

  type UserRole = AccessControl.UserRole;

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

  public type AuthUserProfile = {
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

  // Internal storage type with password hash - never exposed directly
  type UserAccountInternal = {
    id : Nat;
    username : Text;
    email : Text;
    displayName : Text;
    createdAt : Int;
    isActive : Bool;
  };

  // Public-facing user account type
  public type UserAccount = {
    id : Nat;
    username : Text;
    email : Text;
    displayName : Text;
    createdAt : Int;
    isActive : Bool;
  };

  public type FeedbackSubmission = {
    id : Nat;
    userId : ?Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  public type GeneratedContent = {
    id : Nat;
    userId : Nat;
    contentType : Text;
    content : Text;
    createdAt : Int;
  };

  let products = Map.empty<Nat, Product>();
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  let ideas = Map.empty<Nat, IdeaSubmission>();
  let orders = Map.empty<Nat, Order>();
  let userProfiles = Map.empty<Principal, AuthUserProfile>();
  let carts = Map.empty<Nat, Cart>();
  let languagePrefs = Map.empty<Principal, PreferredLanguage>();
  let checkoutSessions = Map.empty<Text, CheckoutSession>();
  let userAccounts = Map.empty<Nat, UserAccountInternal>();
  let feedbacks = Map.empty<Nat, FeedbackSubmission>();
  let generatedContent = Map.empty<Nat, GeneratedContent>();

  var nextContactId : Nat = 1;
  var nextIdeaId : Nat = 1;
  var nextOrderId : Nat = 1;
  var nextCartId : Nat = 1;
  var nextUserAccountId : Nat = 1;
  var nextFeedbackId : Nat = 1;
  var nextContentId : Nat = 1;

  var stripeConfig : ?Stripe.StripeConfiguration = null;

  func getCurrentTime() : Int {
    Time.now();
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

  func getNextUserAccountId() : Nat {
    let id = nextUserAccountId;
    nextUserAccountId += 1;
    id;
  };

  func getNextFeedbackId() : Nat {
    let id = nextFeedbackId;
    nextFeedbackId += 1;
    id;
  };

  func getNextContentId() : Nat {
    let id = nextContentId;
    nextContentId += 1;
    id;
  };

  func stripPasswordHash(account : UserAccountInternal) : UserAccount {
    {
      id = account.id;
      username = account.username;
      email = account.email;
      displayName = account.displayName;
      createdAt = account.createdAt;
      isActive = account.isActive;
    };
  };

  // Product Queries
  public query func getProductsAll() : async [Product] {
    products.values().toArray();
  };

  public query func getProduct(productId : Nat) : async ?Product {
    products.get(productId);
  };

  // Contact
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async Nat {
    let id = getNextContactId();
    let submission : ContactSubmission = {
      id;
      name;
      email;
      message;
      timestamp = getCurrentTime();
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
      timestamp = getCurrentTime();
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
      orderTimestamp = getCurrentTime();
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
  public query ({ caller }) func getCallerUserProfile() : async ?AuthUserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?AuthUserProfile {
    if (caller != user and not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : AuthUserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Language Preferences
  public shared ({ caller }) func setPreferredLanguage(language : Text) : async () {
    let pref : PreferredLanguage = {
      language;
      timestamp = getCurrentTime();
    };
    languagePrefs.add(caller, pref);
  };

  public query ({ caller }) func getPreferredLanguage() : async Text {
    switch (languagePrefs.get(caller)) {
      case (null) { "en" };
      case (?pref) { pref.language };
    };
  };

  // Stripe
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
      timestamp = getCurrentTime();
    };
    checkoutSessions.add(sessionId, session);

    sessionId;
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // User Account Management
  // Registration is restricted while no secure password storage mechanism is implemented
  public shared ({ caller }) func createUserAccount(username : Text, email : Text, displayName : Text) : async Nat {
    if (not isValidUsername(username)) {
      Runtime.trap("Username must be between 4 and 20 characters and cannot contain . or /");
    };

    let existingAccount = userAccounts.values().any(
      func(account) { Text.equal(account.username, username) },
    );

    if (existingAccount) {
      Runtime.trap("Username already exists");
    };

    let accountId = getNextUserAccountId();

    let account : UserAccountInternal = {
      id = accountId;
      username;
      email;
      displayName;
      createdAt = getCurrentTime();
      isActive = true;
    };

    userAccounts.add(accountId, account);
    accountId;
  };

  // Only admins can look up arbitrary accounts by ID; users can look up their own account
  public query ({ caller }) func getUserAccountById(id : Nat) : async ?UserAccount {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can fetch user accounts by ID");
    };
    switch (userAccounts.get(id)) {
      case (null) { null };
      case (?account) { ?stripPasswordHash(account) };
    };
  };

  // Only admins can update arbitrary accounts
  public shared ({ caller }) func updateUserAccount(id : Nat, displayName : Text, email : Text, isActive : Bool) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update user accounts");
    };
    switch (userAccounts.get(id)) {
      case (null) { Runtime.trap("Account not found") };
      case (?account) {
        let updatedAccount : UserAccountInternal = {
          account with
          displayName;
          email;
          isActive;
        };
        userAccounts.add(id, updatedAccount);
      };
    };
  };

  // Only admins can list all users
  public query ({ caller }) func getAllUsers() : async [UserAccount] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can fetch all users");
    };
    userAccounts.values().map(stripPasswordHash).toArray();
  };

  func getUserAccountByUsername(username : Text) : ?UserAccountInternal {
    userAccounts.values().find(
      func(account) { Text.equal(account.username, username) }
    );
  };

  func isValidUsername(username : Text) : Bool {
    let length = username.size();
    length >= 4 and length <= 20 and not username.contains(#char('.')) and not username.contains(#char('/'));
  };

  // Feedback Management
  // Anyone can submit feedback (open to guests too)
  public shared ({ caller }) func submitFeedback(userId : ?Nat, name : Text, email : Text, message : Text) : async Nat {
    let feedbackId = getNextFeedbackId();
    let feedback : FeedbackSubmission = {
      id = feedbackId;
      userId;
      name;
      email;
      message;
      timestamp = getCurrentTime();
    };
    feedbacks.add(feedbackId, feedback);
    feedbackId;
  };

  // Only admins can view all feedback
  public query ({ caller }) func getAllFeedbacks() : async [FeedbackSubmission] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all feedback");
    };
    feedbacks.values().toArray();
  };

  // Only admins can fetch individual feedback by ID
  public query ({ caller }) func getFeedbackById(id : Nat) : async ?FeedbackSubmission {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view feedback");
    };
    feedbacks.get(id);
  };

  // Generated Content Management
  // Only authenticated users can create content
  public shared ({ caller }) func createGeneratedContent(userId : Nat, contentType : Text, content : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create content");
    };
    let contentId = getNextContentId();
    let contentItem : GeneratedContent = {
      id = contentId;
      userId;
      contentType;
      content;
      createdAt = getCurrentTime();
    };
    generatedContent.add(contentId, contentItem);
    contentId;
  };

  // Only authenticated users can view content by user ID; admins can view any user's content
  public query ({ caller }) func getContentByUserId(userId : Nat) : async [GeneratedContent] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view content");
    };
    let list = List.empty<GeneratedContent>();
    for ((_, content) in generatedContent.entries()) {
      if (content.userId == userId) {
        list.add(content);
      };
    };
    list.toArray();
  };

  // Only admins can view all generated content
  public query ({ caller }) func getAllGeneratedContent() : async [GeneratedContent] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all generated content");
    };
    generatedContent.values().toArray();
  };

  // Only admins can fetch individual content by ID
  public query ({ caller }) func getGeneratedContentById(id : Nat) : async ?GeneratedContent {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view content by ID");
    };
    generatedContent.get(id);
  };
};
