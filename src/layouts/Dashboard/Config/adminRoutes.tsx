import { Home, Planet, UserManagement } from '@/assets/icons';

const adminRoutes: any = [
  {
    key: `/home`,
    icon: Home,
    label: 'Home',
  },
  {
    key: `/manage-product`,
    icon: Planet,
    label: 'Manage Product',
    children: [
      { key: '/manage-product/product', label: 'Product' },
      {
        key: '/manage-product/sub-product-channel',
        label: 'Sub Product Channel',
      },
      { key: '/manage-product/sub-product', label: 'Sub Product' },
    ],
  },
  {
    key: `/user-management`,
    icon: UserManagement,
    label: 'User Management',
    children: [
      { key: '/user-management/admin', label: 'Admin' },
      { key: '/user-management/user', label: 'User' },
      {
        key: '/user-management/reseller',
        label: 'Reseller',
      },
    ],
  },
];

export default adminRoutes;
