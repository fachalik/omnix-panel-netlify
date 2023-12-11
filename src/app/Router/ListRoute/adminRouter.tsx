import { lazy } from 'react';
import { ListRouteProps } from './models';
import { RoleEnum } from '@/models';

const Home = lazy(() => import('@/pages/Admin/Home'));
const ManageProduct = lazy(() => import('@/pages/Admin/ManageProduct'));
const ManageTenant = lazy(() => import('@/pages/Admin/ManageTenant'));
const UserManagement = lazy(() => import('@/pages/Admin/UserManagement'));
const BusinessManagementProduct = lazy(
  () => import('@/pages/Admin/BusinessSchema/page/Product')
);
const BusinessManagementNonProduct = lazy(
  () => import('@/pages/Admin/BusinessSchema/page/NonProduct')
);
const TeamManagement = lazy(() => import('@/pages/Admin/TeamManagement'));

const GroupManagement = lazy(() => import('@/pages/Admin/GroupManagement'));

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
  {
    comp: BusinessManagementNonProduct,
    path: '/schema-non-product',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.ADMIN],
  },
  {
    comp: BusinessManagementProduct,
    path: '/schema-product',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.ADMIN],
  },
  {
    comp: GroupManagement,
    path: '/manage-group',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.ADMIN],
  },
  {
    comp: TeamManagement,
    path: '/manage-team',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.ADMIN],
  },
  {
    comp: ManageTenant,
    path: '/manage-tenant',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.ADMIN],
  },
  {
    comp: UserManagement,
    path: '/user-management',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.ADMIN],
  },
];

export default Routers;
