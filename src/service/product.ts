import http from '../utils/request';

export const getProductAdmin = ({
  token,
  page = 1,
  limit = 10,
  term,
  status,
  productType,
  productCategory,
  is_not_paginate,
}: {
  token: string;
  page: number;
  limit: number;
  productType: string;
  productCategory: string;
  term?: string;
  status?: string;
  is_not_paginate?: string;
}) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/api/products/paginate`, {
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

export const postProductAdmin = (payload: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`/api/products`, payload);
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

export const deleteProductAdmin = (id: number) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.delete(`/api/products/?id=${id}`);
      if (respon.status === 204 || respon.status === 200) resolve(respon);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const updateProductAdmin = ({ val, id }: any) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.patch(`/api/products/${id}`, {
        ...val,
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
};
