import http from '../utils/request';

export const getProductReseller = ({
  token,
  page = 1,
  limit = 10,
  term,
  status,
  productType,
  productCategory,
  is_not_paginate,
  akses,
}: {
  token: string;
  page: number;
  akses: string;
  limit: number;
  productType: string;
  productCategory: string;
  term?: string;
  status?: string;
  is_not_paginate?: string;
}) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/api/products-for-reseller/paginate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          limit,
          term,
          status,
          productType,
          productCategory,
          is_not_paginate,
          akses,
        },
      });
      if (respon.data) {
        resolve(respon.data);
      }
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });
export const getDetailProductReseller = ({
  token,
  id,
  id_reseller,
  id_user,
}: {
  token: string;
  id: string;
  id_reseller?: string;
  id_user?: string;
}) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/api/products/product_detail`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id,
          id_reseller,
          id_user,
        },
      });
      if (respon.data) {
        resolve(respon.data);
      }
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const postProductReseller = (payload: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`/api/products-for-reseller`, payload);
      console.log('respon', respon);
      if (respon) {
        resolve(respon);
      }
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const deleteProductReseller = (id: number) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.delete(`/api/products-for-reseller/?id=${id}`);
      if (respon.status === 204 || respon.status === 200) resolve(respon);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const updateProductReseller = ({
  val,
  id,
  id_user,
  id_reseller,
}: {
  val: any;
  id: string;
  id_reseller?: string;
  id_user?: string;
}) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.patch(
        `/api/products`,
        {
          ...val,
        },
        {
          params: {
            id,
            id_user,
            id_reseller,
          },
        }
      );
      if (respon) {
        resolve(respon);
      }
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });
};

export const updateProductResellerAddon = ({
  val,
  id,
  id_reseller,
  id_user,
}: {
  val: any;
  id: string;
  id_reseller?: string;
  id_user?: string;
}) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(
        `/api/products/addon`,
        {
          ...val,
        },
        {
          params: {
            id,
            id_reseller,
            id_user,
          },
        }
      );
      if (respon) {
        resolve(respon);
      }
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });
};
