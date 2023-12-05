// import {
//   Home,
//   Dashboard,
//   Windows,
//   Channel,
//   Planet,
//   UserSetting,
// } from '@/assets/icons';
import { FaHome, FaShoppingBasket, FaUserCog, FaCog } from 'react-icons/fa';
import { FaDisplay } from 'react-icons/fa6';

const resellerRoutes: any = [
  {
    key: `/home`,
    icon: <FaHome />,
    label: 'Home',
  },
  {
    key: `/dashboard`,
    icon: <FaDisplay />,
    label: 'Dashboard',
  },
  {
    key: `/member`,
    icon: <FaUserCog />,
    label: 'Member',
  },
  {
    key: `/business-schema`,
    icon: <FaCog />,
    label: 'Business Schema',
  },
  {
    key: `/manage-tenant`,
    icon: <FaCog />,
    label: 'Manage Tenant',
  },
  {
    key: `/channel-subscription`,
    icon: <FaShoppingBasket />,
    label: 'Channel Subscription',
  },

  {
    key: `/product-activation`,
    icon: <FaShoppingBasket />,
    label: 'Product Activation',
  },
];

export default resellerRoutes;
