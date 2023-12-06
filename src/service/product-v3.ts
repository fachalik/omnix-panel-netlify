import http from '../utils/request';

export const getHistoryCost = (
  token: string,
  updatedBy: string,
  user_id: string,
  productType: string,
  start_date: string,
  end_date: string
) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(
        'api/auth/history_cost',
        {
          start_date,
          end_date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            updatedBy,
            user_id,
            productType,
          },
        }
      );
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

export const getProductPaginate = (
  token: string,
  page: number = 1,
  limit: number = 10
) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/api/products/paginate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
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

export const getProductPlatform = (token: string) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/api/products/PLATFORM`, {
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

export const getProductNonPlatform = (token: string) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/api/products/CHANNEL`, {
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

export const getProductPlatformResellerDefault = (
  token: string,
  id_reseller: string
) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`api/products-for-reseller/productType`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          productType: 'PLATFORM',
          akses: id_reseller,
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

export const getProductNonPlatformResellerDefault = (
  token: string,
  id_reseller: string
) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`api/products-for-reseller/productType`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          productType: 'CHANNEL',
          akses: id_reseller,
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

export const getProductPlatformUser = (
  token: string,
  idParent: string,
  id_user: string
) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`api/products-for-user/productType`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          productType: 'PLATFORM',
          akses: idParent,
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

export const getProductNonPlatformUser = (
  token: string,
  idParent: string,
  id_user: string
) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`api/products-for-user/productType`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          productType: 'CHANNEL',
          akses: idParent,
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

export const updateProduct = ({ val, id }: any) => {
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

export const updateProductResellerDefault = ({ val, id, id_reseller }: any) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.patch(
        `/api/products-for-reseller`,
        {
          ...val,
        },
        {
          params: {
            id,
            id_reseller,
          },
        }
      );
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

export const updateProductUserDefault = ({
  val,
  id,
  id_reseller,
  id_user,
}: any) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.patch(
        `/api/products-for-user`,
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

export const updateStatusProduct = ({ productCategory, status }: any) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.patch(
        `/api/auth/setting_status_active?productCategory=${productCategory}&status=${status}`
      );
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
