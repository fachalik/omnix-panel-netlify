import http from '../utils/request';

export const getUser = ({
  token,
  page = 1,
  limit = 10,
  role = '',
  is_not_paginate = '0',
}: {
  token: string;
  page?: number;
  limit?: number;
  role: string;
  is_not_paginate?: string;
}) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit,
          page,
          role,
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
};

export const getMember = (
  token: string,
  page: number = 1,
  limit: number = 10,
  id: string = '',
  is_not_paginate: string = '0'
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

export const getMemberNoReferralCode = (token: string) =>
  new Promise<any>(async (resolve, reject) => {
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
