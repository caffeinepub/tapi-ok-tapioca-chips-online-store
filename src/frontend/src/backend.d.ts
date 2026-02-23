import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface UserProfile {
    name: string;
    email: string;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ContactSubmission {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface ProductTranslations {
    enDescription: string;
    hiIngredients: Array<Ingredient>;
    hiName: string;
    mlIngredients: Array<Ingredient>;
    taIngredients: Array<Ingredient>;
    taName: string;
    hiDescription: string;
    enIngredients: Array<Ingredient>;
    mlDescription: string;
    taDescription: string;
    enName: string;
    mlName: string;
}
export interface Order {
    id: bigint;
    customerName: string;
    totalAmount: bigint;
    products: Array<Product>;
    customerEmail: string;
    orderTimestamp: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface Ingredient {
    isGlutenFree: boolean;
    name: string;
    isVegan: boolean;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface IdeaSubmission {
    id: bigint;
    name: string;
    email?: string;
    message: string;
    timestamp: bigint;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface Cart {
    id: bigint;
    total: bigint;
    products: Array<bigint>;
}
export interface Product {
    id: bigint;
    sku: string;
    isAvailable: boolean;
    image: ExternalBlob;
    detailedDescription: string;
    translations: ProductTranslations;
    priceInCents: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCart(productIds: Array<bigint>, total: bigint): Promise<bigint>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createOrder(products: Array<Product>, totalAmount: bigint, customerName: string, customerEmail: string): Promise<bigint>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllIdeas(): Promise<Array<IdeaSubmission>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(cartId: bigint): Promise<Cart | null>;
    getOrdersAll(): Promise<Array<Order>>;
    getPreferredLanguage(): Promise<string>;
    getProduct(productId: bigint): Promise<Product | null>;
    getProductsAll(): Promise<Array<Product>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setPreferredLanguage(language: string): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<bigint>;
    submitIdea(name: string, email: string | null, message: string): Promise<bigint>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
