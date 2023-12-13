type license = {
  minQuantity?: string;
  maxQuantity?: string;
};

export type FieldType = {
  productName?: string;
  description?: string;
  typeSchema?: string;
  pricingSchema?: string;
  productPrice?: string;
  minQuantity?: string;
  maxQuantity?: string;
  licenseAgent?: license;
  licenseSVP?: license;
  licenseBackroom?: license;
  digital?: string[];
  nondigital?: string[];
  status?: boolean;
};
