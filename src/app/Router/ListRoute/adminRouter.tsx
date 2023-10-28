import { lazy } from 'react';
import { ListRouteProps } from './models';
import { RoleEnum } from '@/models';

const Home = lazy(() => import('@/pages/Admin/Home'));
const ManageProduct = lazy(
  () => import('@/pages/Admin/ManageProduct/Product/index')
);
const DetailProduct = lazy(
  () => import('@/pages/Admin/ManageProduct/Product/detail')
);

const SubProduct = lazy(() => import('@/pages/Admin/ManageProduct/SubProduct'));
const SubProductChannel = lazy(
  () => import('@/pages/Admin/ManageProduct/SubProductChannel')
);

const UserManagementAdmin = lazy(
  () => import('@/pages/Admin/UserManagement/List/Admin')
);

const UserManagementReseller = lazy(
  () => import('@/pages/Admin/UserManagement/List/Reseller')
);

const UserManagementUser = lazy(
  () => import('@/pages/Admin/UserManagement/List/User')
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
    comp: DetailProduct,
    path: '/manage-product/product/detail',
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
  {
    comp: UserManagementAdmin,
    path: '/user-management/admin',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.ADMIN],
  },
  {
    comp: UserManagementUser,
    path: '/user-management/user',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.ADMIN],
  },
  {
    comp: UserManagementReseller,
    path: '/user-management/reseller',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.ADMIN],
  },
];

export default Routers;
