import http from '../utils/request';

export const getGroupSkill = ({
  token,
  limit,
  page,
  term,
  status,
  is_not_paginate,
}: {
  token: string;
  page: number;
  limit: number;
  term?: string;
  status?: string;
  is_not_paginate?: string;
}) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/api/groups-skill-channel/groups-skill`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit,
          page,
          term,
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

export const getDetailGroupSkill = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/api/groups-skill-channel/${id}`, {
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

export const postGroupSkill = (payload: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`/api/groups-skill-channel`, payload);
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

// export const deleteGroupSkill = (id: number) =>
//   new Promise<any>(async (resolve, reject) => {
//     try {
//       const respon = await http.delete(`/api/groups-skill-channel?id=${id}`);
//       if (respon.status === 204 || respon.status === 200) resolve(respon);
//     } catch (err: any) {
//       const message: string = err.response
//         ? `${err.response.data.message}`
//         : 'Oops, something wrong with our server, please try again later.';
//       reject(message);
//     }
//   });

export const updateGroupSkill = ({ val, id }: any) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.patch(`/api/groups-skill-channel/${id}`, {
        ...val,
      });
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
