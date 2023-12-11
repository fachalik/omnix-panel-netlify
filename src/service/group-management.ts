import http from '../utils/request';

export const getGroup = ({
  token,
  page = 1,
  limit = 100,
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
      const respon = await http.get(`/api/settings-menu/get_group`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          limit,
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

export const getGroupAll = ({
  token,
  page = 1,
  limit = 100,
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
      const respon = await http.get(`/api/settings-menu/get_group_all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          limit,
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

export const postGroup = (payload: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`/api/settings-menu/m_group`, payload);
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

export const deleteGroup = (id: number) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.delete(`/api/settings-menu/m_group/${id}`);
      if (respon.status === 204 || respon.status === 200) resolve(respon);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const updateGroup = ({ val, id }: any) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.patch(`/api/settings-menu/m_group/${id}`, {
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
