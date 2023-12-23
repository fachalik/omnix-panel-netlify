import { lazy } from 'react';
import { ListRouteProps } from './models';
import { RoleEnum } from '@/models';

const Dashboard = lazy(() => import('@/pages/User/Dashboard/index'));
const Home = lazy(() => import('@/pages/User/Home'));
const Package = lazy(() => import('@/pages/User/Package'));
const ChannelSubscribe = lazy(() => import('@/pages/User/ChannelSubscribe'));
const ChannelSubscribeDetail = lazy(
  () => import('@/pages/User/ChannelSubscribe/detail')
);
const ChannelFacebook = lazy(
  () => import('@/pages/User/ChannelSubscribe/Channel/Facebook')
);
const ChannelFacebookSubscribe = lazy(
  () => import('@/pages/User/ChannelSubscribe/Channel/Facebook/subscribe')
);
const ChannelInstagram = lazy(
  () => import('@/pages/User/ChannelSubscribe/Channel/Instagram')
);
const ChannelInstagramSubscribe = lazy(
  () => import('@/pages/User/ChannelSubscribe/Channel/Instagram/subscribe')
);
const ChannelTelegram = lazy(
  () => import('@/pages/User/ChannelSubscribe/Channel/Telegram')
);
const ChannelTelegramSubscribe = lazy(
  () => import('@/pages/User/ChannelSubscribe/Channel/Telegram/subscribe')
);
const ChannelTwitter = lazy(
  () => import('@/pages/User/ChannelSubscribe/Channel/Twitter')
);
const ChannelTwitterSubscribe = lazy(
  () => import('@/pages/User/ChannelSubscribe/Channel/Twitter/subscribe')
);
const ChannelWhatsapp = lazy(
  () => import('@/pages/User/ChannelSubscribe/Channel/Whatsapp')
);
const ChannelWhatsappSubscribe = lazy(
  () => import('@/pages/User/ChannelSubscribe/Channel/Whatsapp/subscribe')
);
const ActivatedProduct = lazy(() => import('@/pages/User/ActivatedProduct'));
const TeamManagement = lazy(() => import('@/pages/User/TeamManagement'));
const GroupManagement = lazy(() => import('@/pages/User/GroupManagement'));
const OrderHistory = lazy(() => import('@/pages/User/OrderHistory'));
const OrderHitoryDetail = lazy(
  () => import('@/pages/User/OrderHistory/Detail')
);

const Routers: ListRouteProps[] = [
  {
    redirectLink: '*',
    path: '/dashboard',
    index: true,
    layout: 'Redirect',
    auth: 'Public',
  },
  {
    comp: Dashboard,
    path: '/dashboard',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
  {
    comp: Home,
    path: '/home',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
  {
    comp: ChannelSubscribe,
    path: '/channel-subscription',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
  {
    comp: ChannelFacebook,
    path: '/channel-subscription/facebook',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
  {
    comp: ChannelFacebookSubscribe,
    path: '/channel-subscription/facebook/subscribe',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
  {
    comp: ChannelInstagram,
    path: '/channel-subscription/instagram',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
  {
    comp: ChannelInstagramSubscribe,
    path: '/channel-subscription/instagram/subscribe',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
  {
    comp: ChannelTelegram,
    path: '/channel-subscription/telegram',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
  {
    comp: ChannelTelegramSubscribe,
    path: '/channel-subscription/telegram/subscribe',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
  {
    comp: ChannelTwitter,
    path: '/channel-subscription/twitter',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
  {
    comp: ChannelTwitterSubscribe,
    path: '/channel-subscription/twitter/subscribe',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
  {
    comp: TeamManagement,
    path: '/manage-team',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
  {
    comp: ChannelWhatsapp,
    path: '/channel-subscription/whatsapp',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
  {
    comp: ChannelWhatsappSubscribe,
    path: '/channel-subscription/whatsapp/subscribe',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
  {
    comp: ChannelSubscribeDetail,
    path: '/channel-subscription/:id',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
  {
    comp: Package,
    path: '/package',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
  {
    comp: OrderHistory,
    path: '/order-history',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
  {
    comp: OrderHitoryDetail,
    path: '/order-history/:id',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
  {
    comp: ActivatedProduct,
    path: '/active-product',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
  {
    comp: GroupManagement,
    path: '/manage-group',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.REGULER],
  },
];

export default Routers;
