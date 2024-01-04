import React from 'react';
import { Modal as ModalANTD, Button } from 'antd';

interface IModal {
  isModalOpen: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  children: React.ReactNode;
  title: string;
  width?: number | string;
  footerCancel?: boolean;
}

export default function Modal(props: IModal) {
  const {
    title,
    isModalOpen,
    handleCancel,
    handleOk,
    children,
    width = 600,
    footerCancel = true,
  } = props;
  const [footer, setFooter] = React.useState<any[]>([]);

  React.useEffect(() => {
    let isLoad = true;

    if (isLoad) {
      if (handleOk) {
        setFooter((prevState) => [
          ...prevState,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]);
      }
      if (handleCancel) {
        setFooter((prevState) => [
          ...prevState,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]);
      }
      if (!handleCancel && !handleOk) {
        setFooter([]);
      }
    }

    return () => {
      isLoad = false;
      setFooter([]);
    };
  }, [handleCancel, handleOk]);

  return (
    <ModalANTD
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={footerCancel ? footer : []}
      width={width}
    >
      {children}
    </ModalANTD>
  );
}
