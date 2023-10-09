import { lazy } from 'react';
import { ListRouteProps } from './models';
import { RoleEnum } from '@/models';

const Home = lazy(() => import('@/pages/Admin/Home'));
const ManageProduct = lazy(() => import('@/pages/Admin/ManageProduct'));

const Routers: ListRouteProps[] = [
  {
    redirectLink: '*',
    path: '/home',
    index: true,
    layout: 'Redirect',
    auth: 'Public',
  },
  {
    comp: Home,
    path: '/home',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.ADMIN],
  },
  {
    comp: ManageProduct,
    path: '/manage-product',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.ADMIN],
  },
];

export default Routers;
