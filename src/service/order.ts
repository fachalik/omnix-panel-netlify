import http from '../utils/request';
import { Checkout } from '@/models';

export const getCarts = ({
  token,
  page = 1,
  limit = 10,
  term,
}: {
  token: string;
  page: number;
  limit: number;
  term?: string;
}) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/api/carts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          limit,
          term,
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

export const PostOrder = (payload: Checkout) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`/api/carts/payment`, payload);
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
