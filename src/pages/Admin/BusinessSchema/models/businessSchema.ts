type license = {
  minQuantity?: string;
  maxQuantity?: string;
};

export type FieldTypeUpdateProduct = {
  productName?: string;
  description?: string;
  typeDetails?: string;
  typeSchema?: string;
  productPrice?: string;
  minQuantity?: string;
  maxQuantity?: string;
  licenseAgent?: license;
  licenseSVP?: license;
  licenseBackroom?: license;
  channel?: string[];
  status?: boolean;
};

export type FieldTypeAddProduct = {
  typeDetails?: string;
  description?: string;
  typeSchema?: string;
  productName?: string;
  productPrice?: string;
};
