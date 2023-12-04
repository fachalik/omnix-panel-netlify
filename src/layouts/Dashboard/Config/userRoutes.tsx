// import { Home, Channel, Planet, Dashboard } from '@/assets/icons';
import { FaHome, FaShoppingBasket } from 'react-icons/fa';
import { FaDisplay } from 'react-icons/fa6';

const userRoutes: any = [
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

export default userRoutes;
