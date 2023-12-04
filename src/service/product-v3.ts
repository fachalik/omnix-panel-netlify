import http from '../utils/request';

export const getProductPaginate = (
  token: string,
  page: number = 1,
  limit: number = 10,
  id: string = ''
) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/api/products/paginate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id,
          page,
          limit,
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

export const getProduct = (token: string) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/api/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
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

export const postProduct = (payload: any) =>
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

export const deleteProduct = (id: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.delete('/api/products', {
        params: {
          id,
        },
      });
      if (respon.status === 204 || respon.status === 200) resolve(respon);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const updateProduct = ({ payload, id }: any) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.patch(`/api/products/${id}`, {
        payload,
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
