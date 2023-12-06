import http from '../utils/request';

export const postLoginGoogle = (payload: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`/api/v1/auth/google/login`, payload);
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

export const postLogin = (payload: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`/api/auth/email/signin`, payload);
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

export const postLoginAdmin = (payload: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon: any = await http.post(`/api/auth/email/signin`, payload);

      if (respon?.data) {
        resolve(respon.data);
      }
    } catch (err: any) {
      // const message: string = err.response
      //   ? `${err.response.data.message}`
      //   : 'Oops, something wrong with our server, please try again later.';
      reject(err);
    }
  });

export const getMe = (token: string) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

export const logout = (role: string) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`/api/v1/auth/${role}/logout`);
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

export const register = (payload: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`/api/auth/email/register`, payload);
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

export const confirmEmail = (payload: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`/api/auth/email/verify`, payload);
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

export const resendVerification = (payload: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(
        `/api/auth/email/resend-verification`,
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

export const forgotPassword = (payload: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`/api/v1/auth/forgot/password`, payload);
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

export const resetPassword = (payload: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`/api/v1/auth/reset/password`, payload);
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
