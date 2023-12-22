import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { postLogin, getMe, getMenu, getMenuMember } from '@/service/auth';
import { setLogin, removeLogin, getLogin } from '@/utils/sessions';

import { useAlertStore } from './alert';

import { User, Menu } from '@/models/authModels';

import { logout } from '@/service/auth';
import { timeout } from '@/utils/utilitys';

interface IStoreAuth {
  token: string | null;
  user: User | null;
  menu: Menu[] | null;
  isLogout: boolean;

  login: (payload: { email: string; password: string }) => void;

  setAuth: (payload: any) => void;

  logoutAuth: () => void;

  setIsLogout: (isLogout: boolean) => void;
}

const initialState = {
  token: null,
  user: null,
  menu: null,
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
              let menu = [];

              if (!getProfile.UnitAccounts) {
                menu = await getMenu(response?.data?.accessToken ?? '');
              } else {
                menu = await getMenuMember(response?.data?.accessToken ?? '');
              }

              if (menu.length !== 0) {
                menu.sort((a: any, b: any) => {
                  const iconA = a.menu_id[0].icon;
                  const iconB = b.menu_id[0].icon;

                  // Assuming icon is a string, you might need to convert it to a comparable format if it's not
                  return iconA.localeCompare(iconB);
                });
              }

              const payload = {
                status: `welcome back ${getProfile.name}`,
                hit: true,
                type: 'success',
              };
              useAlertStore.getState().setAlert(payload);
              await timeout(1000);
              setLogin({
                token: response?.data?.accessToken,
                user: getProfile,
              });

              set({
                token: response?.data?.accessToken,
                user: getProfile,
                menu,
              });
              window.location.reload();
            } else {
              const payload = {
                status: `Email not exists`,
                hit: true,
                type: 'error',
              };
              useAlertStore.getState().setAlert(payload);
            }
            // await window.location.reload();
          } catch (err: any) {
            console.log('err', err);
            console.log('err', err?.response?.data?.message);
            const payload = {
              status: err?.response?.data?.message,
              hit: true,
              type: 'error',
            };
            useAlertStore.getState().setAlert(payload);
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
          window.location.reload();
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
