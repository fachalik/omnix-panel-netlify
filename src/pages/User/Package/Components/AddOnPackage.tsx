import React from 'react';
import { Skeleton, InputNumber, Checkbox } from 'antd';
import { palette } from '@/theme/themeConfig';
import { formatRupiah } from '@/utils/utilitys';

interface IProps {
  data: any;
  isLoading: boolean;
  isSuccess: boolean;
}

export const AddOnPackage: React.FC<IProps> = (props: IProps) => {
  const { data, isLoading, isSuccess } = props;

  const [dataAddOn, setDataAddOn] = React.useState<any>({});

  React.useEffect(() => {
    let isMount = true;

    if (isMount && data.length !== 0) {
      const groupedData = data.reduce((acc: any, item: any) => {
        const typeSchema = item.typeSchema.toLowerCase();

        // Create an array for the typeSchema if it doesn't exist in the accumulator
        if (!acc[typeSchema]) {
          acc[typeSchema] = [];
        }

        // Push the current item to the array corresponding to its typeSchema
        acc[typeSchema].push(item);

        return acc;
      }, {});

      setDataAddOn(groupedData);
    }

    return () => {
      isMount = false;
    };
  }, [data]);

  if (!isLoading && isSuccess && Object.keys(dataAddOn).length !== 0)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}>
        <p style={{ fontSize: 16, fontWeight: 700 }}>
          How many Paid users do I need?
        </p>
        <p style={{ fontSize: 13, fontWeight: 400 }}>
          Choose how many users can acess the Omnix Panel Paket 1 features.
        </p>
        {dataAddOn?.transaction && (
          <div
            style={{
              marginTop: '1.5em',
              border: '1px solid #BAC2D3',
              backgroundColor: 'rgba(25, 51, 107, 0.02);',
              borderRadius: 6,
              padding: '16px 21px',
              display: 'flex',
              flexDirection: 'column',
              gap: '.5em',
            }}
          >
            <p
              style={{
                color: palette.primary.main,
                fontSize: 16,
                fontWeight: 600,
              }}
            >{`Transaction`}</p>
            <p style={{ fontSize: 13, fontWeight: 400 }}>
              Increase your included License Account for your integrations
              between your Omnix Panel Account and other services.
            </p>
            {dataAddOn?.transaction?.map((item: any, idx: number) => (
              <div
                key={`${idx}_transaction`}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '1em' }}
                >
                  <InputNumber min={0} max={10} defaultValue={0} />
                  <p
                    style={{
                      color: palette.primary.main,
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >{`${item.productName}`}</p>
                  <p
                    style={{
                      color: palette.primary.main,
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {formatRupiah(item.productPrice.toString(), 'Rp.')}
                  </p>
                </div>
                <Checkbox />
              </div>
            ))}
          </div>
        )}
        {dataAddOn?.license_user && <p>ddd</p>}
        {dataAddOn?.license_general && <p>aaa</p>}
      </div>
    );
  return <Skeleton />;
};
