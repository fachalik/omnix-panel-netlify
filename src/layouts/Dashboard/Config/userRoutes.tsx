import { Home, Channel, Planet, Dashboard } from '@/assets/icons';

const userRoutes: any = [
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

export default userRoutes;
