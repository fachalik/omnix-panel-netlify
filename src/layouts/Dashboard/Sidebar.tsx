// import React from 'react';

// import { adminRoutes, userRoutes, resellerRoutes } from './Config';

import { Layout, Menu, Tooltip } from 'antd';
// import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

import { Menu as MenuType } from '@/models/authModels';
import { palette } from '@/theme/themeConfig';
import { useOtherStore, useAuthStore } from '@/store';
import useIsMobile from '@/hooks/useIsMobile';
import useWindowSize from '@/hooks/useWindowSize';
import OmnixSmall from '@/assets/omnix-icon-white.png';
import OmnixBig from '@/assets/omnix_white_v2.png';

//**--------------------------------------------------------------

export default function Sidebar() {
  const {
    other: { sidebarCollapse },
  } = useOtherStore((state) => state);

  const { height } = useWindowSize();

  const {
    // user,
    menu,
    //  logoutAuth, setIsLogout
  } = useAuthStore((state) => state);

  // const { reset: resetModalLogout } = useModalLogoutstore((state) => state);

  const navigate = useNavigate();

  const location = useLocation();

  const { pathname } = location;

  const isMobile = useIsMobile();

  // const mapRoute = (role: string): any => {
  //   switch (role) {
  //     case 'reguler':
  //       return userRoutes;

  //     case 'admin':
  //       return adminRoutes;

  //     case 'reseller':
  //       return resellerRoutes;

  //     default:
  //       return [];
  //   }
  // };

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={sidebarCollapse}
      collapsedWidth={isMobile ? 0 : '4rem'}
      breakpoint="lg"
      width={240}
      style={{
        height: '100vh',
        overflow: 'hidden',
        background: palette.primary.dark,
        position: 'sticky',
        left: 0,
      }}
      theme="dark"
      className="sidebar"
    >
      <div
        style={{
          height: 50,
          backgroundColor: palette.primary.light,
        }}
      >
        <img
          src={sidebarCollapse ? OmnixSmall : OmnixBig}
          alt="Vercel Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            margin: 'auto',
            backgroundColor: palette.primary.light,
            padding: 5,
          }}
        />
      </div>

      <Menu
        style={{
          padding: 5,
          marginTop: 20,
          overflow: 'hidden',
          height: height - 150,
          position: 'relative',
          backgroundColor: palette.primary.dark,
          color: 'white',
        }}
        theme="light"
        mode="inline"
        onClick={(e) => {
          navigate(`/${e.key}`);
          // alert(e.key);
        }}
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[pathname]}
        selectedKeys={[pathname]}
        items={menu?.map((val: MenuType, idx: number) => {
          return {
            key: val.menu_id[0].accessor,
            icon: (
              <Tooltip placement="left">
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                  className={`${val.menu_id[0].icon}`}
                />
              </Tooltip>
            ),
            label: val.menu_id[0].label,
            // children: val?.children ?? null,
          };
        })}
        // items={mapRoute(user?.role.toLowerCase() ?? '').map(
        //   (val: any, idx: number) => {
        //     return {
        //       key: val.key,
        //       icon: (
        //         <Tooltip placement="left">
        //           <div
        //             key={idx}
        //             style={{
        //               display: 'flex',
        //               justifyContent: 'center',
        //               alignItems: 'center',
        //               height: '100%',
        //             }}
        //             className={`${val.icon}`}
        //           />
        //         </Tooltip>
        //       ),
        //       label: val.label,
        //       children: val?.children ?? null,
        //     };
        //   }
        // )}
      />
    </Layout.Sider>
  );
}
