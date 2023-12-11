// import { Home, Planet, UserSetting } from '@/assets/icons';
// import { FaHome, FaShoppingBasket, FaUserCog, FaCog } from 'react-icons/fa';

const adminRoutes: any = [
  {
    key: `/home`,
    icon: 'ri-home-fill',
    label: 'Home',
  },
  {
    key: `/manage-product`,
    icon: 'ri-home-fill',
    label: 'Manage Product',
  },
  {
    key: `/manage-role`,
    icon: 'ri-home-fill',
    label: 'Role Management',
  },
  {
    key: `/manage-team`,
    icon: 'ri-home-fill',
    label: 'Team Management',
  },
  {
    key: `/user-management`,
    icon: 'ri-home-fill',
    label: 'User Management',
  },
  {
    key: `/business-schema`,
    icon: 'ri-home-fill',
    label: 'Business Schema',
    children: [
      { key: '/schema-product', label: 'Product' },
      { key: '/schema-non-product', label: 'Non Product' },
    ],
  },
  {
    key: `/manage-tenant`,
    icon: 'ri-home-fill',
    label: 'Manage Tenant',
  },
];

export default adminRoutes;
