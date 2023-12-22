import React from 'react';
import { Layout, Menu, Tooltip } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

// import { Menu as MenuType } from '@/models/authModels';
import { palette } from '@/theme/themeConfig';
import { useOtherStore, useAuthStore } from '@/store';
import useIsMobile from '@/hooks/useIsMobile';
import useWindowSize from '@/hooks/useWindowSize';
import OmnixSmall from '@/assets/omnix-icon-white.png';
import OmnixBig from '@/assets/omnix_white_v2.png';
import { capitalizeFirstLetter } from '@/utils/utilitys';

//**--------------------------------------------------------------

export default function Sidebar() {
  const [mapMenu, setMapMenu] = React.useState<any>([]);
  const {
    other: { sidebarCollapse },
  } = useOtherStore((state) => state);

  const { height } = useWindowSize();

  const { menu } = useAuthStore((state) => state);

  const navigate = useNavigate();

  const location = useLocation();

  const { pathname } = location;

  const isMobile = useIsMobile();

  React.useEffect(() => {
    let isMount = true;

    if (isMount && menu) {
      const tempMenu = menu.map((item: any) => item.menu_id[0]);
      const groupedData = tempMenu.reduce((acc, item) => {
        const parentAccessor = item.parentAccessor || 'single';

        if (!acc[parentAccessor]) {
          acc[parentAccessor] = [];
        }

        acc[parentAccessor].push(item);

        return acc;
      }, {});

      const finalMenu = Object.keys(groupedData).map(
        (groupKey: string, _groupIndex: number) => {
          const group = groupedData[groupKey];

          const groupItems = group.map((item: any, itemIndex: number) => {
            const key = `${groupKey}-${itemIndex + 1}`;

            return {
              key: `${item.path || key}`,
              icon: item.icon,
              label: item.label,
            };
          });

          if (groupKey === 'single') {
            return groupItems;
          }

          if (groupKey !== 'single') {
            return {
              key: `${groupKey}`,
              icon: group[0].icon,
              label: groupKey,
              children: groupItems,
            };
          }
        }
      );

      const doneMenu = finalMenu.flat().map((item) => {
        if (!item.children)
          return {
            key: item.key,
            icon: item.icon,
            label: item.label,
          };
        else {
          return {
            key: item.key,
            icon: item.icon,
            label: capitalizeFirstLetter(item.label),
            children: item.children.map((item: any) => ({
              key: item.key,
              label: item.label,
            })),
          };
        }
      });

      setMapMenu(doneMenu);
    }

    return () => {
      isMount = false;
    };
  }, [menu]);

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
        }}
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[pathname]}
        selectedKeys={[pathname]}
        items={
          mapMenu.length !== 0 &&
          mapMenu?.map((val: any, idx: number) => {
            return {
              key: val.key,
              icon: (
                <Tooltip placement="left">
                  <div
                    key={`${idx}_${val.key}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}
                    className={`${val.icon}`}
                  />
                </Tooltip>
              ),
              label: val.label,
              children: val?.children ?? null,
            };
          })
        }
      />
    </Layout.Sider>
  );
}
