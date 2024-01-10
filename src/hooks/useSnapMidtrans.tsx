import { useState, useEffect } from 'react';

const useSnapMidtrans = () => {
  const [snap, setSnap] = useState<any>(null);

  useEffect(() => {
    const myMidtransClientKey = import.meta.env.VITE_APP_MIDTRANS_CLIENT_ID;
    const apiUrlMidtrans = import.meta.env.VITE_APP_MIDTRANS_API_URL;
    // console.log({ myMidtransClientKey });
    // console.log({ apiUrlMidtrans });
    const script = document.createElement('script');
    script.src = `${apiUrlMidtrans}/snap/snap.js`;
    script.setAttribute('data-client-key', myMidtransClientKey);
    script.onload = () => {
      setSnap((window as any).snap);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (snap_token: any, embedId: any, action: any) => {
    if (snap) {
      // console.log({ embedId });
      snap.embed(snap_token, {
        embedId,
        onSuccess: function (result: any) {
          console.log('success', result);
          action.onSuccess(result);
        },
        onPending: function (result: any) {
          console.log('pending', result);
          action.onPending(result);
        },
        onClose: function () {
          action.onClose();
        },
      });
    }
  };

  return { snapEmbed };
};

export default useSnapMidtrans;
