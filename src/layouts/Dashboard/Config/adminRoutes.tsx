import { Home, Planet } from '@/assets/icons';

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
];

export default adminRoutes;
