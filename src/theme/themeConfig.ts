import type { ThemeConfig } from 'antd';

export const palette = {
  primary: {
    lighter: '#722FF2',
    light: '#094378',
    main: '#094378',
    dark: '#19336B',
    contrastText: '#fff',
    danger: '#C13647',
  },
};

export const theme: ThemeConfig = {
  token: {
    colorPrimary: palette.primary.main,
    colorLink: palette.primary.dark,
    colorLinkHover: palette.primary.dark,
    fontFamily: 'Plus Jakarta Sans',
    wireframe: false,
  },
  components: {
    Menu: {
      darkSubMenuItemBg: palette.primary.main,
      darkItemSelectedBg: 'rgba(255,255,255,0.2)',
    },
  },
};
