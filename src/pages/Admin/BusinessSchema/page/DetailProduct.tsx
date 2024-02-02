import React from 'react';
import { Button } from 'antd';
import { useSearchParams } from 'react-router-dom';

import Drawer from '@/components/Drawer';
import Product from '../components/Products';
import Package from '../components/Package';
import FormAddDetailPackage from '../Form/FormAddDetailPackage';
import FormAddDetailProduct from '../Form/FormAddDetailProduct';

export default function DetailProduct() {
  const [typeProduct, setTypeProduct] = React.useState('PACKAGE');
  const [addProduct, setAddProduct] = React.useState<boolean>(false);

  const [searchParams, _setSearchParams]: any = useSearchParams();
  const product = searchParams.get('product');

  const type = searchParams.get('type');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div
        style={{
          marginBottom: '1em',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div
          style={{
            marginBottom: '1em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div>
            <Button
              disabled={typeProduct === 'PACKAGE'}
              onClick={() => {
                setTypeProduct('PACKAGE');
              }}
            >
              Package
            </Button>
            <Button
              disabled={typeProduct === 'PRODUCT'}
              onClick={() => {
                setTypeProduct('PRODUCT');
              }}
              style={{ marginLeft: '1em' }}
            >
              Product
            </Button>
          </div>
          {typeProduct === 'PACKAGE' && (
            <Button
              onClick={() => {
                setAddProduct(true);
              }}
              type="primary"
            >
              Add Package
            </Button>
          )}
          {typeProduct === 'PRODUCT' && (
            <Button
              onClick={() => {
                setAddProduct(true);
              }}
              type="primary"
            >
              Add Product
            </Button>
          )}
        </div>
      </div>
      {typeProduct === 'PRODUCT' && (
        <>
          <Product />
          <Drawer
            onClose={() => setAddProduct(false)}
            open={addProduct}
            title={`Add product ${product.replaceAll('_', ' ').toLowerCase()}`}
          >
            <FormAddDetailProduct
              handleClose={() => setAddProduct(false)}
              productCategory={product}
              productType={type}
            />
          </Drawer>
        </>
      )}
      {typeProduct === 'PACKAGE' && (
        <>
          <Package />
          <Drawer
            onClose={() => setAddProduct(false)}
            open={addProduct}
            title={`Add package ${product.replaceAll('_', ' ').toLowerCase()}`}
          >
            <FormAddDetailPackage
              handleClose={() => setAddProduct(false)}
              productCategory={product}
              productType={type}
            />
          </Drawer>
        </>
      )}
    </div>
  );
}
