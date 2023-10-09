import { lazy } from 'react';

import { ListRouteProps } from './models';

const NotFound = lazy(() => import('@/pages/NotFound'));
const Login = lazy(() => import('@/pages/Auth/Login'));
const LoginAdmin = lazy(() => import('@/pages/Auth/LoginAdmin'));
const SignUp = lazy(() => import('@/pages/Auth/SingUp'));
const Google = lazy(() => import('@/pages/Auth/Google'));
const ForgetPassword = lazy(() => import('@/pages/Auth/ForgetPassword'));
const Verif = lazy(() => import('@/pages/Auth/Verif'));
const ConfirmEmail = lazy(() => import('@/pages/Auth/ConfirmEmail'));

const ListRoute: ListRouteProps[] = [
  {
    redirectLink: '*',
    path: '/',
    index: true,
    layout: 'Redirect',
    auth: 'Public',
  },
  {
    comp: Login,
    path: '/',
    index: true,
    layout: 'Plain',
    auth: 'Public',
  },
  {
    comp: LoginAdmin,
    path: '/login/admin',
    index: true,
    layout: 'Plain',
    auth: 'Public',
  },
  {
    comp: SignUp,
    path: '/sign-up',
    index: true,
    layout: 'Plain',
    auth: 'Public',
  },
  {
    comp: Google,
    path: '/google',
    index: true,
    layout: 'Plain',
    auth: 'Public',
  },
  {
    comp: ForgetPassword,
    path: '/forget-password',
    index: true,
    layout: 'Plain',
    auth: 'Public',
  },
  {
    comp: Verif,
    path: '/verify',
    index: true,
    layout: 'Plain',
    auth: 'Public',
  },
  {
    comp: ConfirmEmail,
    path: '/:id/confirm-email',
    index: true,
    layout: 'Plain',
    auth: 'Public',
  },

  // ...courseRouters,

  {
    comp: NotFound,
    path: '*',
    layout: 'Plain',
    index: false,
    auth: 'Public',
  },
];

export default ListRoute;
