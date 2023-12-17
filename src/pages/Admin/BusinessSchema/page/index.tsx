import { useSearchParams } from 'react-router-dom';

import ProductSettings from './ProductSettings';
import DetailProduct from './DetailProduct';
import FormEditDetailProduct from '../Form/FormEditDetailProduct';

export default function index() {
  const [searchParams] = useSearchParams();
  const menu = searchParams.get('menu');
  const product = searchParams.get('product');
  const id = searchParams.get('id');
  const type = searchParams.get('type');
  const action = searchParams.get('action');

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
      }}
    >
      {menu && <ProductSettings />}
      {product && type && !action && !id && <DetailProduct />}
      {product && type && id && <FormEditDetailProduct />}
    </div>
  );
}
