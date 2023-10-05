/* eslint-disable no-restricted-globals */
import isBrowser from './is-browser';

export default function thirdPartyLogin(href: string): Promise<any> | null {
  if (!isBrowser) return null;
  const loginWindow = open(href, '_self');
  return new Promise<any>((res, rej) => {
    function listen(e: MessageEvent<any>) {
      const { origin, data } = e;
      if (
        [
          'http://localhost:3000',
          'https://omnix-panel.netlify.app/',
        ].includes(origin) === false
      )
        return;

      if (typeof data != 'string') return;
      const escaped = (() => {
        const txt = document.createElement('textarea');
        txt.innerHTML = data;
        return txt.value;
      })();

      try {
        const rawUser = JSON.parse(escaped);
        if (rawUser == null) throw new Error('User data is empty!');

        if (rawUser.token == null) {
          throw new Error('Token is empty!');
        }

        return res(rawUser);
      } catch (e) {
        return;
      }
    }

    window.addEventListener('message', listen);
  }).finally(() => {
    loginWindow?.close();
  });
}
