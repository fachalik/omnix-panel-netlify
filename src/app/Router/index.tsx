/* eslint-disable import/order */
import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { ListRouteProps } from './ListRoute/models';
import authRouters from './ListRoute/authRouters';
import userRouters from './ListRoute/userRouters';
import resellerRouters from './ListRoute/resellerRouter';
import adminRoutes from './ListRoute/adminRouter';

// Layout
import DashLayout from '@/layouts/Dashboard';

export default function IndexRoute() {
  const { role, isLogin } = useAuth();

  const mapRouter = (): ListRouteProps[] => {
    let routeByAuth: ListRouteProps[] = [];

    switch (role.toLowerCase()) {
      case 'user':
        routeByAuth = userRouters.filter((val) => {
          switch (val.auth) {
            case 'Public':
              return true;
            case 'AllRole':
              return isLogin;
            case 'NoAuth':
              return !isLogin;
            default:
              if (typeof val.auth === 'object') {
                return val.auth.includes(role.toLowerCase());
              }
              return false;
          }
        });
        break;

      case 'reseller':
        routeByAuth = resellerRouters.filter((val) => {
          switch (val.auth) {
            case 'Public':
              return true;
            case 'AllRole':
              return isLogin;
            case 'NoAuth':
              return !isLogin;
            default:
              if (typeof val.auth === 'object') {
                return val.auth.includes(role.toLowerCase());
              }
              return false;
          }
        });
        break;

      case 'admin':
        routeByAuth = adminRoutes.filter((val) => {
          switch (val.auth) {
            case 'Public':
              return true;
            case 'AllRole':
              return isLogin;
            case 'NoAuth':
              return !isLogin;
            default:
              if (typeof val.auth === 'object') {
                return val.auth.includes(role.toLowerCase());
              }
              return false;
          }
        });
        break;

      default:
        routeByAuth = authRouters.filter((val) => {
          switch (val.auth) {
            case 'Public':
              return true;
            case 'AllRole':
              return isLogin;
            case 'NoAuth':
              return !isLogin;
            default:
              if (typeof val.auth === 'object') {
                return val.auth.includes(role.toLowerCase());
              }
              return false;
          }
        });
        break;
    }
    return routeByAuth;
  };

  const Layout = (val: any): JSX.Element => {
    switch (val.layout) {
      case 'Dashboard':
        return (
          <DashLayout>
            <Suspense>
              <val.comp />
            </Suspense>
          </DashLayout>
        );

      default:
        return (
          <Suspense>
            <val.comp />
          </Suspense>
        );
    }
  };
  return (
    <>
      <Routes>
        {mapRouter().map((val: any, index: number) => {
          if (val.layout === 'Redirect')
            return (
              <Route
                key={index}
                path={val.redirectLink}
                element={<Navigate to={val.path} />}
              />
            );

          if (val.layout === 'Dashboard')
            return (
              <Route
                index={val.index}
                path={val.path}
                key={index}
                element={Layout(val)}
              />
            );

          if (val.layout === 'Plain')
            return (
              <Route
                index={val.index}
                path={val.path}
                key={index}
                element={Layout(val)}
              />
            );
        })}
      </Routes>
    </>
  );
}
