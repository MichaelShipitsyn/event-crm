export interface Employee {
  id: string;
  address1?: string;
  address2?: string;
  avatar?: string;
  balance?: number;
  city?: string;
  country?: string;
  creditCard?: string;
  currency?: string;
  email: string;
  hasAcceptedMarketing?: boolean;
  hasDiscountedPrices?: boolean;
  isProspect?: boolean;
  isReturning?: boolean;
  isVerified?: boolean;
  name: string;
  phone?: string;
  state?: string;
  totalAmountSpent?: number;
  totalOrders?: number;
  updatedAt?: number;
  vatRate?: number;
  zipCode?: string;
}
