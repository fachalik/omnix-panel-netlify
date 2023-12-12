import http from '../utils/request';

export const getListMenu = ({ token }: { token: string }) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/api/settings-menu/menu`, {
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

export const getPermissionMenu = ({
  token,
  page = 1,
  limit = 100,
  group_id,
  is_not_paginate,
}: {
  token: string;
  page: number;
  limit: number;
  group_id: string;
  is_not_paginate?: string;
}) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/api/settings-menu/permissions_group`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          limit,
          group_id,
          status,
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

export const postPermissionMenu = ({ val, id }: { val: any; id: string }) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(
        `/api/settings-menu/permissions/?group_id=${id}`,
        {
          ...val,
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

// export const deleteGroup = (id: number) =>
//   new Promise<any>(async (resolve, reject) => {
//     try {
//       const respon = await http.delete(`/api/settings-menu/m_group/${id}`);
//       if (respon.status === 204 || respon.status === 200) resolve(respon);
//     } catch (err: any) {
//       const message: string = err.response
//         ? `${err.response.data.message}`
//         : 'Oops, something wrong with our server, please try again later.';
//       reject(message);
//     }
//   });

export const updatePermissionGroup = ({ val, id }: any) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.patch(`/api/settings-menu/permissions/${id}`, {
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
