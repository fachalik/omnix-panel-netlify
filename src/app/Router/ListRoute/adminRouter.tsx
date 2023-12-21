import { lazy } from 'react';
import { ListRouteProps } from './models';
import { RoleEnum } from '@/models';

const Home = lazy(() => import('@/pages/Admin/Home'));
const ManageTenant = lazy(() => import('@/pages/Admin/ManageTenant'));
const UserManagement = lazy(() => import('@/pages/Admin/UserManagement'));
const BusinessManagementProduct = lazy(
  () => import('@/pages/Admin/BusinessSchema/page')
);

const TeamManagement = lazy(() => import('@/pages/Admin/TeamManagement'));
const GroupManagement = lazy(() => import('@/pages/Admin/GroupManagement'));
const MenuManagement = lazy(() => import('@/pages/Admin/ManageMenu'));

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
    comp: BusinessManagementProduct,
    path: '/schema-product',
    layout: 'ADMIN_BUSINESS_SCHEMA',
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
  {
    comp: MenuManagement,
    path: '/manage-menu',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.ADMIN],
  },
];

export default Routers;
