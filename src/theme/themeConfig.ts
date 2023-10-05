import type { ThemeConfig } from 'antd';

export const palette = {
  primary: {
    lighter: '#722FF2',
    light: '#094378',
    main: '#19336b',
    dark: '#091A7A',
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
};
