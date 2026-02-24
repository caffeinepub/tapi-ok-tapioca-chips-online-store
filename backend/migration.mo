import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Storage "blob-storage/Storage";
import Stripe "stripe/stripe";
import AccessControl "authorization/access-control";
import Text "mo:core/Text";

module {
  type OldActor = {
    products : Map.Map<Nat, {
      id : Nat;
      priceInCents : Nat;
      image : Storage.ExternalBlob;
      isAvailable : Bool;
      sku : Text;
      detailedDescription : Text;
      translations : {
        enName : Text;
        enDescription : Text;
        enIngredients : [{
          name : Text;
          isVegan : Bool;
          isGlutenFree : Bool;
        }];
        hiName : Text;
        hiDescription : Text;
        hiIngredients : [{
          name : Text;
          isVegan : Bool;
          isGlutenFree : Bool;
        }];
        taName : Text;
        taDescription : Text;
        taIngredients : [{
          name : Text;
          isVegan : Bool;
          isGlutenFree : Bool;
        }];
        mlName : Text;
        mlDescription : Text;
        mlIngredients : [{
          name : Text;
          isVegan : Bool;
          isGlutenFree : Bool;
        }];
      };
    }>;
    contactSubmissions : Map.Map<Nat, {
      id : Nat;
      name : Text;
      email : Text;
      message : Text;
      timestamp : Int;
    }>;
    ideas : Map.Map<Nat, {
      id : Nat;
      name : Text;
      email : ?Text;
      message : Text;
      timestamp : Int;
    }>;
    orders : Map.Map<Nat, {
      id : Nat;
      products : [{
        id : Nat;
        priceInCents : Nat;
        image : Storage.ExternalBlob;
        isAvailable : Bool;
        sku : Text;
        detailedDescription : Text;
        translations : {
          enName : Text;
          enDescription : Text;
          enIngredients : [{
            name : Text;
            isVegan : Bool;
            isGlutenFree : Bool;
          }];
          hiName : Text;
          hiDescription : Text;
          hiIngredients : [{
            name : Text;
            isVegan : Bool;
            isGlutenFree : Bool;
          }];
          taName : Text;
          taDescription : Text;
          taIngredients : [{
            name : Text;
            isVegan : Bool;
            isGlutenFree : Bool;
          }];
          mlName : Text;
          mlDescription : Text;
          mlIngredients : [{
            name : Text;
            isVegan : Bool;
            isGlutenFree : Bool;
          }];
        };
      }];
      totalAmount : Nat;
      orderTimestamp : Int;
      customerName : Text;
      customerEmail : Text;
    }>;
    userProfiles : Map.Map<Principal, {
      name : Text;
      email : Text;
    }>;
    carts : Map.Map<Nat, {
      id : Nat;
      products : [Nat];
      total : Nat;
    }>;
    languagePrefs : Map.Map<Principal, { language : Text; timestamp : Int }>;
    checkoutSessions : Map.Map<Text, {
      sessionId : Text;
      creator : Principal;
      timestamp : Int;
    }>;
    stripeConfig : ?Stripe.StripeConfiguration;
    nextContactId : Nat;
    nextIdeaId : Nat;
    nextOrderId : Nat;
    nextCartId : Nat;
    accessControlState : AccessControl.AccessControlState;
  };

  type UserAccountInternal = {
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

  type NewActor = {
    products : Map.Map<Nat, {
      id : Nat;
      priceInCents : Nat;
      image : Storage.ExternalBlob;
      isAvailable : Bool;
      sku : Text;
      detailedDescription : Text;
      translations : {
        enName : Text;
        enDescription : Text;
        enIngredients : [{
          name : Text;
          isVegan : Bool;
          isGlutenFree : Bool;
        }];
        hiName : Text;
        hiDescription : Text;
        hiIngredients : [{
          name : Text;
          isVegan : Bool;
          isGlutenFree : Bool;
        }];
        taName : Text;
        taDescription : Text;
        taIngredients : [{
          name : Text;
          isVegan : Bool;
          isGlutenFree : Bool;
        }];
        mlName : Text;
        mlDescription : Text;
        mlIngredients : [{
          name : Text;
          isVegan : Bool;
          isGlutenFree : Bool;
        }];
      };
    }>;
    contactSubmissions : Map.Map<Nat, {
      id : Nat;
      name : Text;
      email : Text;
      message : Text;
      timestamp : Int;
    }>;
    ideas : Map.Map<Nat, {
      id : Nat;
      name : Text;
      email : ?Text;
      message : Text;
      timestamp : Int;
    }>;
    orders : Map.Map<Nat, {
      id : Nat;
      products : [{
        id : Nat;
        priceInCents : Nat;
        image : Storage.ExternalBlob;
        isAvailable : Bool;
        sku : Text;
        detailedDescription : Text;
        translations : {
          enName : Text;
          enDescription : Text;
          enIngredients : [{
            name : Text;
            isVegan : Bool;
            isGlutenFree : Bool;
          }];
          hiName : Text;
          hiDescription : Text;
          hiIngredients : [{
            name : Text;
            isVegan : Bool;
            isGlutenFree : Bool;
          }];
          taName : Text;
          taDescription : Text;
          taIngredients : [{
            name : Text;
            isVegan : Bool;
            isGlutenFree : Bool;
          }];
          mlName : Text;
          mlDescription : Text;
          mlIngredients : [{
            name : Text;
            isVegan : Bool;
            isGlutenFree : Bool;
          }];
        };
      }];
      totalAmount : Nat;
      orderTimestamp : Int;
      customerName : Text;
      customerEmail : Text;
    }>;
    userProfiles : Map.Map<Principal, {
      name : Text;
      email : Text;
    }>;
    carts : Map.Map<Nat, {
      id : Nat;
      products : [Nat];
      total : Nat;
    }>;
    languagePrefs : Map.Map<Principal, { language : Text; timestamp : Int }>;
    checkoutSessions : Map.Map<Text, {
      sessionId : Text;
      creator : Principal;
      timestamp : Int;
    }>;
    stripeConfig : ?Stripe.StripeConfiguration;
    nextContactId : Nat;
    nextIdeaId : Nat;
    nextOrderId : Nat;
    nextCartId : Nat;
    accessControlState : AccessControl.AccessControlState;
    userAccounts : Map.Map<Nat, UserAccountInternal>;
    feedbacks : Map.Map<Nat, FeedbackSubmission>;
    generatedContent : Map.Map<Nat, GeneratedContent>;
    nextUserAccountId : Nat;
    nextFeedbackId : Nat;
    nextContentId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    {
      old with
      userAccounts = Map.empty<Nat, UserAccountInternal>();
      feedbacks = Map.empty<Nat, FeedbackSubmission>();
      generatedContent = Map.empty<Nat, GeneratedContent>();
      nextUserAccountId = 1;
      nextFeedbackId = 1;
      nextContentId = 1;
    };
  };
};
