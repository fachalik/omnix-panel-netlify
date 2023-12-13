import { LazyExoticComponent } from 'react';
import { RoleAuth } from '@/models';

export interface ListRouteProps {
  comp?: LazyExoticComponent<() => JSX.Element> | any;
  redirectLink?: string;
  path: string;
  index: boolean;
  layout: 'Dashboard' | 'Plain' | 'Redirect' | 'ADMIN_BUSINESS_SCHEMA';
  auth: 'Public' | 'AllRole' | 'NoAuth' | RoleAuth[] | RoleAuth;
}
