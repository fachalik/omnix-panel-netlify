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
      const respon = await http.post(`/api/v1/auth/email/login`, payload);
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

export const logout = () =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`/api/v1/auth/logout`);
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

export const register = (payload: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`/api/v1/auth/email/register`, payload);
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
      const respon = await http.post(`/api/v1/auth/email/confirm`, payload);
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

//
