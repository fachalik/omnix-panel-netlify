import { Home, Planet, UserSetting } from '@/assets/icons';

const adminRoutes: any = [
  {
    key: `/home`,
    icon: Home,
    label: 'Home',
  },
  {
    key: `/manage-product`,
    icon: Planet,
    label: 'Manage Tenant',
  },
  {
    key: `/user-management`,
    icon: UserSetting,
    label: 'User Management',
  },
];

export default adminRoutes;
