import http from '../utils/request';

export const getSubProductChannel = ({
  token,
  page,
  limit,
  search,
  sortField,
  sortOrder,
}: any) => {
  let params = '';

  if (page) params += `?page=${page}`;
  if (limit) params += `&limit=${limit}`;
  if (search) params += `&search=${search}`;
  if (sortField) params += `&sortField=${sortField}`;
  if (sortOrder) params += `&sortOrder=${sortOrder}`;

  return new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/api/v1/subproduct-channel${params}`, {
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

export const deleteSubProductChannel = (id: number) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.delete(`/api/v1/subproduct-channel/${id}`);
      if (respon.status === 204 || respon.status === 200) resolve(respon);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const postSubProductChannel = (payload: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`/api/v1/subproduct-channel`, payload);
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

export const updateSubProductChannel = ({ val, id }: any) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`/api/v1/subproduct-channel/${id}`, {
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

//
