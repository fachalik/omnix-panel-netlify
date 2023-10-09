import http from '../utils/request';

export const postLoginReseller = (payload: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(
        `/api/v1/auth/reseller/email/login`,
        payload
      );
      if (respon.data) {
        resolve(respon.data);
      }
    } catch (err: any) {
      // const message: string = err.response
      //   ? `${err.response.data.message}`
      //   : 'Oops, something wrong with our server, please try again later.';
      reject(err);
    }
  });

export const registerReseller = (payload: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(
        `/api/v1/auth/reseller/email/register`,
        payload
      );
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
