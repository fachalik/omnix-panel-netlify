import http from '../utils/request';

export const getMember = (
  token: string,
  page: number = 1,
  limit: number = 10,
  id: string = ''
) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/api/reseller/cari-member`, {
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

export const postMember = ({ payload, id }: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.patch(
        `/api/reseller/tambah-member-table-user/${id}`,
        payload
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

export const deleteMember = ({ payload, id }: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(
        `/api/reseller/delete-member/${id}`,
        payload
      );
      if (respon.status === 204 || respon.status === 200) resolve(respon);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const updateUsers = ({ users, id }: any) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.patch(`/api/v1/users/${id}`, {
        users,
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
