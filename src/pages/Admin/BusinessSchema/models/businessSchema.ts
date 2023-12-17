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

export type FieldTypeAddonUpdateProduct = {
  channel?: string[];
  selectChannel?: string[];
  channelAddOn?: ChannelAddOn[];
};

export interface ChannelAddOn {
  channel: string;
  addOnType: string;
  pricingRequired: number;
  detail: Detail[];
}

export interface Detail {
  name: string;
  price: string;
}

export type FieldTypeAddProduct = {
  typeDetails?: string;
  description?: string;
  typeSchema?: string;
  productName?: string;
  productPrice?: string;
};
