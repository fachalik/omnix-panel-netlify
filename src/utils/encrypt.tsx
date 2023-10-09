import CryptoJS from 'crypto-js';

const { VITE_APP_PERSIST_SECRE } = import.meta.env;

export const encode = (value: unknown) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(value),
    VITE_APP_PERSIST_SECRE ?? ''
  ).toString();
};

export const decode = (value: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(value, VITE_APP_PERSIST_SECRE ?? '');
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    return false;
  }
};
