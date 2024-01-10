import { useState, useEffect } from 'react';
import { Modal } from 'antd';

const use3DSMidtrans = () => {
  const [MidtransNew3D, setMidtransNew3D] = useState<any>(null);
  const { confirm } = Modal;
  useEffect(() => {
    const myMidtransClientKey = import.meta.env.VITE_APP_MIDTRANS_CLIENT_ID;
    const script = document.createElement('script');
    script.src = `https://api.midtrans.com/v2/assets/js/midtrans-new-3ds.min.js`;
    script.setAttribute('data-client-key', myMidtransClientKey);
    script.onload = () => {
      setMidtransNew3D((window as any).MidtransNew3ds);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const popupModal = (function () {
    return {
      openPopup(url: any) {
        confirm({
          title: 'Credit card Subscribe',
          content: (
            <iframe
              frameBorder={'0'}
              style={{ height: '90vh', width: '100%' }}
              src={url}
            ></iframe>
          ),
          width: '100%',
        });
      },
      closePopup() {
        try {
          Modal.destroyAll();
        } catch (e) {}
      },
    };
  })();

  const midtransNew3DsEmbed = async (redirect_url: string, navigate: any) => {
    if (MidtransNew3D) {
      var options = {
        performAuthentication: function (redirect_url: any) {
          // Implement how you will open iframe to display 3ds authentication redirect_url to customer
          popupModal.openPopup(redirect_url);
        },
        onSuccess: function (response: any) {
          // 3ds authentication success, implement payment success scenario
          console.log('response:', response);
          popupModal.closePopup();
          // // Simulate an HTTP redirect:
          navigate(
            response.order_id
              ? `/order-history?orderId=${response.order_id}`
              : '/order-history'
          );
        },
        onFailure: function (response: any) {
          // 3ds authentication failure, implement payment failure scenario
          console.log('response:', response);
          popupModal.closePopup();
        },
        onPending: function (response: any) {
          // transaction is pending, transaction result will be notified later via
          // HTTP POST notification, implement as you wish here
          console.log('response:', response);
          popupModal.closePopup();
        },
      };

      MidtransNew3D.authenticate(redirect_url, options);
    }
  };

  return { midtransNew3DsEmbed };
};

export default use3DSMidtrans;
