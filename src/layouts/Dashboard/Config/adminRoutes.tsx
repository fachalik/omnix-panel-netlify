// import { Home, Planet, UserSetting } from '@/assets/icons';
import { FaHome, FaShoppingBasket, FaUserCog, FaCog } from 'react-icons/fa';

const adminRoutes: any = [
  {
    key: `/home`,
    icon: <FaHome />,
    label: 'Home',
  },
  {
    key: `/manage-product`,
    icon: <FaShoppingBasket />,
    label: 'Manage Product',
  },
  {
    key: `/business-schema`,
    icon: <FaCog />,
    label: 'Business Schema',
    children: [
      { key: '/schema-non-product', label: 'Non Product' },
      { key: '/schema-product', label: 'Product' },
    ],
  },
  {
    key: `/manage-tenant`,
    icon: <FaUserCog />,
    label: 'Manage Tenant',
  },
  {
    key: `/user-management`,
    icon: <FaUserCog />,
    label: 'User Management',
  },
];

export default adminRoutes;
