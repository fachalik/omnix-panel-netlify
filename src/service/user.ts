import http from '../utils/request';

export const getUserNoPagination = (token: string) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/api/users/no-pagination`, {
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
};

export const getUserDetail = ({ token, id }: { token: string; id: string }) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/api/users/${id}`, {
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
};

export const updateUsers = ({ val, id }: any) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.patch(`/api/users/${id}`, {
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

// export const getUserDetail = (
//   token: string,
//   id: string | number,
//   page: number = 1,
//   limit: number = 100
// ) =>
//   new Promise<any>(async (resolve, reject) => {
//     try {
//       const respon = await http.get(`/api/reseller/cari-member`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: {
//           id,
//           page,
//           limit,
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

// export const postUser = ({ payload, id }: any) =>
//   new Promise<any>(async (resolve, reject) => {
//     try {
//       const respon = await http.patch(
//         `/api/reseller/tambah-member-table-user/${id}`,
//         payload
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
//       const respon = await http.delete(`/api/reseller/delete-member/${id}`);
//       if (respon.status === 204 || respon.status === 200) resolve(respon);
//     } catch (err: any) {
//       const message: string = err.response
//         ? `${err.response.data.message}`
//         : 'Oops, something wrong with our server, please try again later.';
//       reject(message);
//     }
//   });
