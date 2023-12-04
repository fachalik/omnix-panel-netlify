import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { postLogin, postLoginAdmin, getMe } from '@/service/auth';
import { postLoginReseller } from '@/service/authReseller';
// import { adminRoutes, userRoutes, resellerRoutes } from '@/routes';
import { setLogin, removeLogin, getLogin } from '@/utils/sessions';

import { useAlertStore } from './alert';

import { User } from '@/models/authModels';

import { logout } from '@/service/auth';

interface IStoreAuth {
  token: string | null;
  user: User | null;
  isLogout: boolean;

  login: (payload: { email: string; password: string }) => void;

  loginReseller: (payload: { email: string; password: string }) => void;

  loginAdmin: (payload: { email: string; password: string }) => void;

  setAuth: (payload: any) => void;

  logoutAuth: () => void;

  setIsLogout: (isLogout: boolean) => void;
}

const initialState = {
  token: null,
  user: null,
  isLogout: false,
};

export const useAuthStore = create<IStoreAuth>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        async login(payload: { email: string; password: string }) {
          try {
            const response = await postLogin(payload);

            if (response?.status != '422') {
              const getProfile = await getMe(response?.data?.accessToken ?? '');

              const payload = await {
                status: `welcome back ${getProfile.name}`,
                hit: true,
                type: 'success',
              };
              await useAlertStore.getState().setAlert(payload);

              await setLogin({
                token: response?.data?.accessToken,
                user: getProfile,
              });

              await set({
                token: response?.data?.accessToken,
                user: getProfile,
              });
            } else {
              const payload = {
                status: `Email not exists`,
                hit: true,
                type: 'error',
              };
              await useAlertStore.getState().setAlert(payload);
            }
            // await window.location.reload();
          } catch (err: any) {
            console.log('err', err?.response?.data?.message);
            const payload = {
              status: err?.response?.data?.message,
              hit: true,
              type: 'error',
            };
            await useAlertStore.getState().setAlert(payload);
          }
          // const response: any = await postLogin(payload)
          //   .then((res) => {
          //     return res;
          //   })
          //   .catch((err) => {
          //     return err.response.data;
          //   });

          // if (response?.status != '422') {
          //   if (
          //     response?.user !== undefined &&
          //     response?.user?.status?.name?.toLowerCase() !== 'inactive'
          //   ) {
          //     const payload = await {
          //       status: `welcome back ${response.user.firstName}`,
          //       hit: true,
          //       type: 'success',
          //     };
          //     await useAlertStore.getState().setAlert(payload);
          //     await set(
          //       () => ({
          //         token: response.token,
          //         refreshToken: response.refreshToken,
          //         user: response.user,
          //       }),
          //       false
          //     );
          //     await setLogin({
          //       token: response.token,
          //       refreshToken: response.refreshToken,
          //       user: response.user,
          //     });
          //   } else {
          //     const payload = await {
          //       status: 'your account is inactive',
          //       hit: true,
          //       type: 'error',
          //     };
          //     await useAlertStore.getState().setAlert(payload);
          //   }
          // } else {
          //   const payload = {
          //     status: `Email not exists`,
          //     hit: true,
          //     type: 'error',
          //   };
          //   await useAlertStore.getState().setAlert(payload);
          // }
          // await window.location.reload();
        },

        async loginReseller(payload: { email: string; password: string }) {
          const response: any = await postLoginReseller(payload)
            .then((res) => {
              return res;
            })
            .catch((err) => {
              return err.response.data;
            });

          if (response?.status != '422') {
            if (
              response?.user !== undefined &&
              response?.user?.status?.name?.toLowerCase() !== 'inactive'
            ) {
              const payload = await {
                status: `welcome back ${response.user.firstName}`,
                hit: true,
                type: 'success',
              };
              await useAlertStore.getState().setAlert(payload);
              await set(
                () => ({
                  token: response.token,
                  refreshToken: response.refreshToken,
                  user: response.user,
                }),
                false
              );
              await setLogin({
                token: response.token,
                refreshToken: response.refreshToken,
                user: response.user,
              });
            } else {
              const payload = await {
                status: 'your account is inactive',
                hit: true,
                type: 'error',
              };
              await useAlertStore.getState().setAlert(payload);
            }
          } else {
            const payload = {
              status: `Email not exists`,
              hit: true,
              type: 'error',
            };
            await useAlertStore.getState().setAlert(payload);
          }
          await window.location.reload();
        },

        async loginAdmin(payload: { email: string; password: string }) {
          try {
            const response = await postLoginAdmin(payload);

            if (response?.status != '422') {
              const getProfile = await getMe(response?.data?.accessToken ?? '');

              const payload = await {
                status: `welcome back ${getProfile.name}`,
                hit: true,
                type: 'success',
              };
              await useAlertStore.getState().setAlert(payload);

              await setLogin({
                token: response?.data?.accessToken,
                user: getProfile,
              });

              await set({
                token: response?.data?.accessToken,
                user: getProfile,
              });
            } else {
              const payload = {
                status: `Email not exists`,
                hit: true,
                type: 'error',
              };
              await useAlertStore.getState().setAlert(payload);
            }
            await window.location.reload();
          } catch (err: any) {
            console.log('err', err?.response?.data?.message);
            const payload = {
              status: err?.response?.data?.message,
              hit: true,
              type: 'error',
            };
            await useAlertStore.getState().setAlert(payload);
          }
        },

        setIsLogout(isLogout: boolean) {
          set(
            () => ({
              isLogout,
            }),
            false,
            'set-is-logout'
          );
        },

        async logoutAuth() {
          const checklocalStorage = await getLogin();
          if (checklocalStorage !== undefined) {
            logout(checklocalStorage?.user?.role?.name);
            set(() => initialState, false, 'omnix-reset');
            localStorage.clear();
            removeLogin();
          }
        },

        setAuth(payload: any) {
          set(
            () => ({
              token: payload.token,
              refreshToken: payload.refreshToken,
              user: payload.user,
            }),
            false
          );
          setLogin({
            token: payload.token,
            refreshToken: payload.refreshToken,
            user: payload.user,
          });
        },
      }),
      {
        name: 'omnix-auth-state',
      }
    )
  )
);
