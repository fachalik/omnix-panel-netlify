import http from '../utils/request';

export const getProductAdmin = ({
  token,
  page = 1,
  limit = 10,
  term,
  status,
  productType,
  typeDetails,
  productCategory,
  is_not_paginate,
}: {
  token: string;
  page: number;
  limit: number;
  typeDetails: string;
  term?: string;
  status?: string;
  productType: string;
  productCategory?: string;
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
          typeDetails,
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

// export const getPackage = (
//   token: string,
//   page: number = 1,
//   limit: number = 100
// ) =>
//   new Promise<any>(async (resolve, reject) => {
//     try {
//       const respon = await http.get(
//         `/api/v1/packages?page=${page}&limit=${limit}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (respon.data) {
//         resolve(respon.data);
//       }
//     } catch (err: any) {
//       const message: string = err.response
//         ? `${err.response.data.message}`
//         : 'Oops, something wrong with our server, please try again later.';
//       reject(message);
//     }
//   });

// export const getProduct = (
//   token: string,
//   page: number = 1,
//   limit: number = 100
// ) =>
//   new Promise<any>(async (resolve, reject) => {
//     try {
//       const respon = await http.get(
//         `/api/v1/product?page=${page}&limit=${limit}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (respon.data) {
//         resolve(respon.data);
//       }
//     } catch (err: any) {
//       const message: string = err.response
//         ? `${err.response.data.message}`
//         : 'Oops, something wrong with our server, please try again later.';
//       reject(message);
//     }
//   });

// export const getOrder = (
//   token: string,
//   page: number = 1,
//   limit: number = 100
// ) =>
//   new Promise<any>(async (resolve, reject) => {
//     try {
//       const respon = await http.get(
//         `/api/v1/order?page=${page}&limit=${limit}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (respon.data) {
//         resolve(respon.data);
//       }
//     } catch (err: any) {
//       const message: string = err.response
//         ? `${err.response.data.message}`
//         : 'Oops, something wrong with our server, please try again later.';
//       reject(message);
//     }
//   });

// export const getDetailPackage = (token: string, id: string) =>
//   new Promise<any>(async (resolve, reject) => {
//     try {
//       const respon = await http.get(`/api/v1/packages/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (respon.data) {
//         resolve(respon.data);
//       }
//     } catch (err: any) {
//       const message: string = err.response
//         ? `${err.response.data.message}`
//         : 'Oops, something wrong with our server, please try again later.';
//       reject(message);
//     }
//   });

// export const postOrder = (payload: any) =>
//   new Promise<any>(async (resolve, reject) => {
//     try {
//       const respon = await http.post(`/api/v1/order`, payload);
//       if (respon.data) {
//         resolve(respon.data);
//       }
//     } catch (err: any) {
//       const message: string = err.response
//         ? `${err.response.data.message}`
//         : 'Oops, something wrong with our server, please try again later.';
//       reject(message);
//     }
//   });

// export const paymentMidtrans = (payload: any) =>
//   new Promise<any>(async (resolve, reject) => {
//     try {
//       const respon = await http.post(`/api/v1/payment/midtrans`, payload);
//       if (respon.data) {
//         resolve(respon.data);
//       }
//     } catch (err: any) {
//       const message: string = err.response
//         ? `${err.response.data.message}`
//         : 'Oops, something wrong with our server, please try again later.';
//       reject(message);
//     }
//   });

// export const getDetailProduct = (token: string, id: string) =>
//   new Promise<any>(async (resolve, reject) => {
//     try {
//       const respon = await http.get(`/api/v1/product/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (respon.data) {
//         resolve(respon.data);
//       }
//     } catch (err: any) {
//       const message: string = err.response
//         ? `${err.response.data.message}`
//         : 'Oops, something wrong with our server, please try again later.';
//       reject(message);
//     }
//   });

// export const getDetailOrder = (token: string, id: string) =>
//   new Promise<any>(async (resolve, reject) => {
//     try {
//       const respon = await http.get(`/api/v1/product/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (respon.data) {
//         resolve(respon.data);
//       }
//     } catch (err: any) {
//       const message: string = err.response
//         ? `${err.response.data.message}`
//         : 'Oops, something wrong with our server, please try again later.';
//       reject(message);
//     }
//   });
