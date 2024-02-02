import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductAdmin } from '@/service/product';

// ** GET

const transformData = (data: any) => {
  const arr = Array.from(data, function (item: any) {
    return { value: item._id, label: item.productName };
  });
  return arr;
};

const fetchProductAlacarte = async (params: {
  token: any;
  page: number;
  limit: number;
  productType: string;
  productCategory: string;
  status?: string;
  term?: string;
}): Promise<any> => {
  const data = await getProductAdmin({
    token: params.token,
    page: params.page,
    limit: params.limit,
    productCategory: params.productCategory,
    productType: params.productType,
    term: params.term,
    status: params.status,
    is_not_paginate: '1',
    typeDetails: 'ALACARTE',
  });
  return data;
};

export const useGetProductAlacarte = (params: {
  token: any;
  page: number;
  limit: number;
  productType: string;
  productCategory: string;
  status?: string;
  term?: string;
}) => {
  return useQuery<any, Error>({
    queryKey: ['PRODUCT_ALACARTE_LIST', params],
    queryFn: () => fetchProductAlacarte(params),
    keepPreviousData: true,
    select: React.useCallback((data: any) => transformData(data), []),
  });
};

// ** GET

const fetchProductAddOn = async (params: {
  token: any;
  page: number;
  limit: number;
  productType: string;
  productCategory: string;
  status?: string;
  term?: string;
}): Promise<any> => {
  const data = await getProductAdmin({
    token: params.token,
    page: params.page,
    limit: params.limit,
    productCategory: params.productCategory,
    productType: params.productType,
    term: params.term,
    status: params.status,
    is_not_paginate: '1',
    typeDetails: 'ADDON',
  });
  return data;
};

const transformDataFilterLicenseUser = (data: any, filter: string) => {
  const license_user = data.filter((item: any) =>
    item.typeSchema.includes(filter)
  );
  const arr = Array.from(license_user, function (item: any) {
    return {
      value: item._id,
      label: item.productName,
      price: item.productPrice,
    };
  });
  return arr;
};

export const useGetProductAddonLicenseUser = (params: {
  token: any;
  page: number;
  limit: number;
  productType: string;
  productCategory: string;
  status?: string;
  term?: string;
}) => {
  return useQuery<any, Error>({
    queryKey: ['PRODUCT_ADDON_LIST_LICENSE_USER', params],
    queryFn: () => fetchProductAddOn(params),
    keepPreviousData: true,
    select: React.useCallback(
      (data: any) => transformDataFilterLicenseUser(data, 'LICENSE_USER'),
      []
    ),
  });
};

const transformDataFilterLicenseGeneral = (data: any, filter: string) => {
  const license_user = data.filter((item: any) =>
    item.typeSchema.includes(filter)
  );
  const arr = Array.from(license_user, function (item: any) {
    return {
      value: JSON.stringify({ _id: item._id, price: item.productPrice }),
      label: item.productName,
    };
  });
  return arr;
};

export const useGetProductAddonLicenseGeneral = (params: {
  token: any;
  page: number;
  limit: number;
  productType: string;
  productCategory: string;
  status?: string;
  term?: string;
}) => {
  return useQuery<any, Error>({
    queryKey: ['PRODUCT_ADDON_LIST_LICENSE_GENERAL', params],
    queryFn: () => fetchProductAddOn(params),
    keepPreviousData: true,
    select: React.useCallback(
      (data: any) => transformDataFilterLicenseGeneral(data, 'LICENSE_GENERAL'),
      []
    ),
  });
};
