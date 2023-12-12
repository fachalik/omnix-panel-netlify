import React from 'react';
import { Drawer } from 'antd';

interface IModal {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  width?: number;
}

export default function Modal(props: IModal) {
  const { title, open, onClose, children } = props;

  return (
    <Drawer title={title} open={open} onClose={onClose}>
      {children}
    </Drawer>
  );
}
