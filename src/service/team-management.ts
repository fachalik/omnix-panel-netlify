import http from '../utils/request';

export const getTeam = ({
  token,
  page = 1,
  limit = 10,
  is_not_paginate,
  UnitAccounts = '',
  status,
}: {
  token: string;
  page?: number;
  limit?: number;
  is_not_paginate?: string;
  status?: string;
  UnitAccounts?: string;
}) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`api/admin/UnitAccounts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          limit,
          status,
          UnitAccounts,
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

export const postTeam = (payload: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`/api/admin/add_account`, payload);
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

// export const getUserDetail = (
//   token: string,
//   id: string | number,
//   page: number = 1,
//   limit: number = 100
// ) =>
//   new Promise<any>(async (resolve, reject) => {
//     try {
//       const respon = await http.get(
//         `/api/v1/users/${id}?page=${page}&limit=${limit}`,
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

// export const deleteUser = (id: number) =>
//   new Promise<any>(async (resolve, reject) => {
//     try {
//       const respon = await http.delete(`/api/v1/users/${id}`);
//       if (respon.status === 204 || respon.status === 200) resolve(respon);
//     } catch (err: any) {
//       const message: string = err.response
//         ? `${err.response.data.message}`
//         : 'Oops, something wrong with our server, please try again later.';
//       reject(message);
//     }
//   });

// export const updateUsers = ({ val, id }: any) => {
//   return new Promise<any>(async (resolve, reject) => {
//     try {
//       const respon = await http.patch(`/api/users/${id}`, {
//         ...val,
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
// };