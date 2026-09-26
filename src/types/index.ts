export interface ProductImage {
  id: string;
  url: string;
  altText: string;
  width?: number;
  height?: number;
  sortOrder: number;
  isHero?: boolean;
  isSecondary?: boolean;
}

export interface ProductVariant {
  id: string;
  sku: string;
  title: string;
  colorName?: string;
  colorHex?: string;
  size?: string;
  material?: string;
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
  stockQuantity?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  itemCount?: number;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  tagline?: string;
  description: string;
  heroImage: string;
  isFeatured?: boolean;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  story?: string;
  details: string[];
  materials: string;
  dimensions: string;
  careGuide?: string;
  origin: string;
  weightKg?: number;
  basePrice: number;
  compareAtPrice?: number;
  category: Category;
  collections?: string[];
  isFeatured: boolean;
  isNewArrival: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
  rating?: number;
  reviewCount?: number;
}

export interface CartItem {
  id: string;
  productId: string;
  productTitle: string;
  productSlug: string;
  variantId: string;
  variantTitle: string;
  colorName?: string;
  size?: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  appliedPromo?: string;
}

export interface Address {
  recipientName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export type CheckoutStep = 'contact' | 'shipping' | 'payment' | 'review' | 'confirmation';

export interface CheckoutFormData {
  email: string;
  phone: string;
  marketingConsent: boolean;
  shippingAddress: Address;
  shippingMethod: 'standard' | 'express' | 'white_glove';
  paymentMethod: 'card' | 'apple_pay' | 'klarna';
  billingSameAsShipping: boolean;
  billingAddress?: Address;
  cardDetails?: {
    cardNumber: string;
    cardholderName: string;
    expiryDate: string;
    cvv: string;
  };
  packaging: 'essential' | 'monograph_box';
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerEmail: string;
  customerName: string;
  items: CartItem[];
  shippingAddress: Address;
  shippingMethod: string;
  subtotal: number;
  discountTotal: number;
  shippingTotal: number;
  taxTotal: number;
  grandTotal: number;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  tier: string;
  memberNumber: string;
  addresses?: Address[];
}

export interface ShipmentMilestone {
  id: string;
  stageName: string;
  location: string;
  timestamp: string;
  description: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface OrderTrackingInfo {
  orderNumber: string;
  trackingCode: string;
  carrier: string;
  status: string;
  estimatedDelivery: string;
  origin: string;
  destination: string;
  milestones: ShipmentMilestone[];
  items: {
    title: string;
    variant: string;
    quantity: number;
    price: number;
  }[];
}

export interface ReturnRequest {
  id: string;
  orderNumber: string;
  email: string;
  itemTitle: string;
  itemVariant: string;
  reason: string;
  resolution: 'exchange' | 'refund';
  rmaCode: string;
  createdAt: string;
  status: 'PENDING_INSPECTION' | 'APPROVED' | 'IN_TRANSIT' | 'COMPLETED';
}

