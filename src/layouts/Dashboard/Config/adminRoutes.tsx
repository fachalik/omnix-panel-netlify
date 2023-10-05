import { Home, Channel } from '@/assets/icons';

// const path = '/admin';

const adminRoutes: any = [
  {
    key: `/home`,
    icon: Home,
    label: 'Home',
  },
  {
    key: `/manage-tenant`,
    icon: Channel,
    label: 'Manage Tenant',
  },
];

export default adminRoutes;
