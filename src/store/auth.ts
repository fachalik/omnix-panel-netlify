'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { postLogin } from '@/service/auth';
// import { adminRoutes, userRoutes, resellerRoutes } from '@/routes';
import { setLogin, removeLogin, getLogin } from '@/utils/sessions';

import { useAlertStore } from './alert';

import { User, UserType } from '@/models/authModels';

import { logout } from '@/service/auth';

interface IStoreAuth {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isLogout: boolean;

  login: (payload: { email: string; password: string }) => void;

  setAuth: (payload: any) => void;

  logoutAuth: () => void;

  setIsLogout: (isLogout: boolean) => void;
}

const initialState = {
  token: null,
  refreshToken: null,
  user: null,
  isLogout: false,
};

export const useAuthStore = create<IStoreAuth>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        async login(payload: { email: string; password: string }) {
          const response: UserType = await postLogin(payload).catch((err) => {
            if (err.response.data.status == '422') {
              const payload = {
                status: `Email not exists`,
                hit: true,
                type: 'error',
              };
              useAlertStore.getState().setAlert(payload);
            }
          });

          if (response.user.status.name.toLowerCase() !== 'inactive') {
            set(
              () => ({
                token: response.token,
                refreshToken: response.refreshToken,
                user: response.user,
              }),
              false
            );
            setLogin({
              token: response.token,
              refreshToken: response.refreshToken,
              user: response.user,
            });
            const payload = await {
              status: `welcome back ${response.user.firstName}`,
              hit: true,
              type: 'success',
            };
            await useAlertStore.getState().setAlert(payload);
            // window.location.replace('dashboard');
            // if (typeof window !== 'undefined') {
            //   switch (response.user.role.name.toLocaleLowerCase()) {
            //     case 'user':
            //       return window.location.replace(userRoutes[0].key);

            //     case 'admin':
            //       return window.location.replace(adminRoutes[0].key);

            //     case 'reseller':
            //       return window.location.replace(resellerRoutes[0].key);

            //     default:
            //       break;
            //   }
            // }
          } else {
            console.log('inactive');
            const payload = await {
              status: 'your account is inactive',
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

        logoutAuth() {
          const checklocalStorage = getLogin();
          if (checklocalStorage !== undefined) {
            logout();
            set(() => initialState, false, 'omnix-reset');
            localStorage.clear();
            removeLogin();
          } else {
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
