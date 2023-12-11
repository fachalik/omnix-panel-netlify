import axios from 'axios';
import { getLogin } from '@/utils/sessions';

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_APP_API_URL,
});

const getToken = () => {
  const auth = getLogin();
  if (auth) {
    return auth.token;
  }
  return false;
};

let token = getToken();

http.defaults.headers.common.Accept = 'application/json';
if (token) {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
}

http.interceptors.response.use(
  (config) => {
    const getToken = () => {
      const auth = getLogin();
      if (auth) {
        return auth.token;
      }
      return false;
    };

    let token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  async (error) => {
    // const { response, config } = error;
    // if (response.status !== 401) {
    return Promise.reject(error);
    // }
    // if (response.status == 401) {
    //   return (
    //     axios
    //       .post(
    //         `${import.meta.env.VITE_APP_APP_API_URL}api/v1/auth/refresh`,
    //         {},
    //         {
    //           headers: {
    //             Authorization: `Bearer ${refreshToken}`,
    //           },
    //         }
    //       )
    //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //       .then((values: any) => {
    //         // If you are using localStorage, update the token and Authorization header here
    //         setLogin({
    //           refreshToken: values?.refreshToken ?? '',
    //           token: values?.token ?? '',
    //           user: getLogin().user,
    //         });
    //         return http(config);
    //       })
    //       .catch((err) => {
    //         // return Promise.reject(error);
    //         if (err.response.data.status == '401') {
    //           removeLogin();
    //         }
    //       })
    //   );
    // }
  }
);

export default http;
