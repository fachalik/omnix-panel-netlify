'use client';

import React from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState<any>(0);

  React.useEffect(() => {
    const onResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
