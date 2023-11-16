import { lazy } from 'react';
import { ListRouteProps } from './models';
import { RoleEnum } from '@/models';

const Dashboard = lazy(() => import('@/pages/Reseller/Dashboard'));
const Home = lazy(() => import('@/pages/Reseller/Home'));
const ManageTenant = lazy(() => import('@/pages/Reseller/ManageTenant'));
const DetailManageTenant = lazy(
  () => import('@/pages/Reseller/ManageTenant/detail')
);
const ProductActivationDetail = lazy(
  () => import('@/pages/Reseller/ManageTenant/ProductActivation')
);
const ProductActivation = lazy(
  () => import('@/pages/Reseller/ProductActivation')
);
const ChannelSubscribe = lazy(
  () => import('@/pages/Reseller/ChannelSubscribe')
);

const ChannelSubscribeDetail = lazy(
  () => import('@/pages/Reseller/ChannelSubscribe/detail')
);

const ChannelFacebook = lazy(
  () => import('@/pages/Reseller/ChannelSubscribe/Channel/Facebook')
);
const ChannelFacebookSubscribe = lazy(
  () => import('@/pages/Reseller/ChannelSubscribe/Channel/Facebook/subscribe')
);

const ChannelInstagram = lazy(
  () => import('@/pages/Reseller/ChannelSubscribe/Channel/Instagram')
);
const ChannelInstagramSubscribe = lazy(
  () => import('@/pages/Reseller/ChannelSubscribe/Channel/Instagram/subscribe')
);

const ChannelTelegram = lazy(
  () => import('@/pages/Reseller/ChannelSubscribe/Channel/Telegram')
);
const ChannelTelegramSubscribe = lazy(
  () => import('@/pages/Reseller/ChannelSubscribe/Channel/Telegram/subscribe')
);

const ChannelTwitter = lazy(
  () => import('@/pages/Reseller/ChannelSubscribe/Channel/Twitter')
);
const ChannelTwitterSubscribe = lazy(
  () => import('@/pages/Reseller/ChannelSubscribe/Channel/Twitter/subscribe')
);

const ChannelWhatsapp = lazy(
  () => import('@/pages/Reseller/ChannelSubscribe/Channel/Whatsapp')
);
const ChannelWhatsappSubscribe = lazy(
  () => import('@/pages/Reseller/ChannelSubscribe/Channel/Whatsapp/subscribe')
);

const ActivatedProduct = lazy(
  () => import('@/pages/Reseller/ActivatedProduct')
);

const Member = lazy(() => import('@/pages/Reseller/Member'));

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
    auth: [RoleEnum.RESELLER],
  },
  {
    comp: Home,
    path: '/home',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.RESELLER],
  },
  {
    comp: Member,
    path: '/member',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.RESELLER],
  },
  {
    comp: ManageTenant,
    path: '/manage-tenant',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.RESELLER],
  },
  {
    comp: ProductActivationDetail,
    path: '/manage-tenant/product-activation',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.RESELLER],
  },
  {
    comp: DetailManageTenant,
    path: '/manage-tenant/:id',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.RESELLER],
  },
  {
    comp: ChannelSubscribe,
    path: '/channel-subscription',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.RESELLER],
  },
  {
    comp: ChannelFacebook,
    path: '/channel-subscription/facebook',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.RESELLER],
  },
  {
    comp: ChannelFacebookSubscribe,
    path: '/channel-subscription/facebook/subscribe',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.RESELLER],
  },
  {
    comp: ChannelInstagram,
    path: '/channel-subscription/instagram',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.RESELLER],
  },
  {
    comp: ChannelInstagramSubscribe,
    path: '/channel-subscription/instagram/subscribe',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.RESELLER],
  },
  {
    comp: ChannelTelegram,
    path: '/channel-subscription/telegram',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.RESELLER],
  },
  {
    comp: ChannelTelegramSubscribe,
    path: '/channel-subscription/telegram/subscribe',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.RESELLER],
  },
  {
    comp: ChannelTwitter,
    path: '/channel-subscription/twitter',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.RESELLER],
  },
  {
    comp: ChannelTwitterSubscribe,
    path: '/channel-subscription/twitter/subscribe',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.RESELLER],
  },
  {
    comp: ChannelWhatsapp,
    path: '/channel-subscription/whatsapp',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.RESELLER],
  },
  {
    comp: ChannelWhatsappSubscribe,
    path: '/channel-subscription/whatsapp/subscribe',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.RESELLER],
  },
  {
    comp: ChannelSubscribeDetail,
    path: '/channel-subscription/:id',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.RESELLER],
  },
  {
    comp: ProductActivation,
    path: '/product-activation',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.RESELLER],
  },
  {
    comp: ActivatedProduct,
    path: '/active-product',
    layout: 'Dashboard',
    index: true,
    auth: [RoleEnum.RESELLER],
  },
];

export default Routers;
