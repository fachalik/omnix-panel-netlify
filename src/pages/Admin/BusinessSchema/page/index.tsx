import { useSearchParams } from 'react-router-dom';

import ProductSettings from './ProductSettings';
import DetailProduct from './DetailProduct';
import DetailProductUser from './DetailProductUser';
import DetailProductReseller from './DetailProductReseller';

import PricingAllocation from './PricingAllocation';
import ProductSettingUser from './PricingAllocation/ProductSettingUser';

import FormEditDetailProduct from '../Form/FormEditDetailProduct';
import DetailDataProductReseller from '../Form/FormEditDetailProduct/DetailDataProductReseller';
import DetailDataProductUser from '../Form/FormEditDetailProduct/DetailDataProductUser';

import FormEditDetailPackage from '../Form/FormEditDetailPackage';
import DetailDataPackageReseller from '../Form/FormEditDetailPackage/DetailDataPackageReseller';
import DetailDataPackageUser from '../Form/FormEditDetailPackage/DetailDataPackageUser';

export default function index() {
  const [searchParams] = useSearchParams();
  const menu: any = searchParams.get('menu');
  const product = searchParams.get('product');
  const id = searchParams.get('id');
  const type = searchParams.get('type');
  const action = searchParams.get('action');
  const user = searchParams.get('user');
  const username = searchParams.get('username');
  const role = searchParams.get('role');
  const typeDetails = searchParams.get('typeDetails');

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
      }}
    >
      {menu === 'Product Settings' && <ProductSettings />}
      {menu === 'Pricing Allocation' && <PricingAllocation />}
      {user && username && role && <ProductSettingUser />}

      {product && type && !action && !id && !role && <DetailProduct />}
      {product && type && !action && !id && role === 'REGULER' && (
        <DetailProductUser />
      )}
      {product && type && !action && !id && role === 'RESELLER' && (
        <DetailProductReseller />
      )}

      {product &&
        type &&
        id &&
        role == 'null' &&
        typeDetails === 'NONPACKAGE' && <FormEditDetailProduct />}
      {product &&
        type &&
        id &&
        role === 'REGULER' &&
        typeDetails === 'NONPACKAGE' && <DetailDataProductUser />}
      {product &&
        type &&
        id &&
        role === 'RESELLER' &&
        typeDetails === 'NONPACKAGE' && <DetailDataProductReseller />}

      {product && type && id && role == 'null' && typeDetails === 'PACKAGE' && (
        <FormEditDetailPackage />
      )}
      {product &&
        type &&
        id &&
        role === 'REGULER' &&
        typeDetails === 'PACKAGE' && <DetailDataPackageUser />}
      {product &&
        type &&
        id &&
        role === 'RESELLER' &&
        typeDetails === 'PACKAGE' && <DetailDataPackageReseller />}
    </div>
  );
}
