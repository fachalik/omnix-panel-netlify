import { lazy } from 'react';
import { ListRouteProps } from './models';
import { RoleEnum } from '@/models';

const Home = lazy(() => import('@/pages/Admin/Home'));
const ManageProduct = lazy(
  () => import('@/pages/Admin/ManageProduct/Product/index')
);
const SubProduct = lazy(() => import('@/pages/admin/ManageProduct/SubProduct'));
const SubProductChannel = lazy(
  () => import('@/pages/admin/ManageProduct/SubProductChannel')
);

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
    path: '/manage-product/product',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.ADMIN],
  },
  {
    comp: SubProduct,
    path: '/manage-product/sub-product',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.ADMIN],
  },
  {
    comp: SubProductChannel,
    path: '/manage-product/sub-product-channel',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.ADMIN],
  },
];

export default Routers;
