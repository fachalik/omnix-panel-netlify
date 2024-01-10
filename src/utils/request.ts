import axios from 'axios';
import { getLogin } from '@/utils/sessions';

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_APP_API_URL,
});

const getToken = () => {
  const auth = getLogin();
  return auth ? auth?.token : null;
};

let token = getToken();

http.defaults.headers.common.Accept = 'application/json';
if (token) {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
}

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const { config, response } = error;

    // if (response.status === 401) {
    // Attempt to refresh the token
    // try {
    //   const refreshToken = getLogin()?.refreshToken;
    //   if (refreshToken) {
    //     const refreshResponse = await axios.post(
    //       `${import.meta.env.VITE_APP_APP_API_URL}api/v1/auth/refresh`,
    //       {},
    //       {
    //         headers: {
    //           Authorization: `Bearer ${refreshToken}`,
    //         },
    //       }
    //     );
    //     setLogin({
    //       refreshToken: refreshResponse?.data.refreshToken ?? '',
    //       token: refreshResponse?.data.token ?? '',
    //       user: getLogin().user,
    //     });
    //     // Retry the original request
    //     return axios(config);
    //   } else {
    //     // If no refresh token, log out the user
    //     removeLogin();
    //   }
    // } catch (refreshError) {
    //   // If token refresh fails, log out the user
    //   if (refreshError.response?.data?.status === '401') {
    //     removeLogin();
    //   }
    //   return Promise.reject(error);
    // }
    // }

    return Promise.reject(error);
  }
);

export default http;
