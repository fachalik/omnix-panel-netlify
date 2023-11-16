import {
  Home,
  Dashboard,
  Windows,
  Channel,
  Planet,
  UserSetting,
} from '@/assets/icons';

const resellerRoutes: any = [
  {
    key: `/home`,
    icon: Home,
    label: 'Home',
  },
  {
    key: `/dashboard`,
    icon: Dashboard,
    label: 'Dashboard',
  },
  {
    key: `/member`,
    icon: UserSetting,
    label: 'Member',
  },
  {
    key: `/manage-tenant`,
    icon: Windows,
    label: 'Manage Tenant',
  },
  {
    key: `/channel-subscription`,
    icon: Channel,
    label: 'Channel Subscription',
  },

  {
    key: `/product-activation`,
    icon: Planet,
    label: 'Product Activation',
  },
];

export default resellerRoutes;
