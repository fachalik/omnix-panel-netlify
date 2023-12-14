import React from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Tooltip,
  Button,
  DatePicker,
  Popconfirm,
  Descriptions,
} from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import { formatRupiah } from '@/utils/utilitys';
import { useGetProductNonPlatform } from '@/hooks/ReactQuery/reseller/business/useGetProductDefaultUser';
import { useGetHistoryCost } from '@/hooks/ReactQuery/useGetHistoryCost';
import {
  useGetUserDetail,
  usePatchUser,
} from '@/hooks/ReactQuery/useGetChangeStatusPayment';
import Modal from '@/components/Modal';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import HistoryCost from './HistoryCost';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

import { FaHistory } from 'react-icons/fa';

import FormEditBusinessSchemaNonProductUser from '../Form/FormEditBusinessSchemaNonProductUser';

import { getLogin } from '@/utils/sessions';
import { useAuthStore } from '@/store';

interface IProps {
  user_data: any;
}

type RangeValue = [Dayjs | null, Dayjs | null] | null;

export default function NonProductMember(props: IProps) {
  const { user_data } = props;

  const { user } = useAuthStore((state) => state);
  const [dataEdit, setdataEdit] = React.useState<any>(null);
  const [changeDataKey, setChangeDataKey] = React.useState('');
  const [_selectProduct, setSelectProduct] = React.useState('');

  const [IsModalEdit, setIsModalEdit] = React.useState<boolean>(false);
  const handleCancelEdit = () => setIsModalEdit(false);

  const [dates, setDates] = React.useState<RangeValue>(null);

  const [IsModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const handleCancelOpen = () => setIsModalOpen(false);

  const {
    data: dataPlatform,
    isLoading: isLoadingPlatform,
    error: errorPlatform,
    isError: isErrorPlatform,
    isSuccess: isSuccessPlatform,
  }: any = useGetProductNonPlatform({
    token: getLogin()?.token ?? '',
    id_reseller: 'admin',
    id_user: user_data._id,
  });

  const {
    data: dataHistoryCost,
    isLoading: isLoadingHistoryCost,
    error: errorHistoryCost,
    isError: isErrorHistoryCost,
    isSuccess: isSuccessHistoryCost,
  }: any = useGetHistoryCost({
    productType: 'CHANNEL',
    token: getLogin()?.token ?? '',
    updatedBy: user?._id,
    user_id: user_data._id,
    query_key: 'USER_CHANNEL_HISTORY_COST',
    start_date: dates ? dayjs(dates[0]).format('YYYY-MM-DD') : '',
    end_date: dates ? dayjs(dates[1]).format('YYYY-MM-DD') : '',
  });

  const {
    data: dataMember,
    isLoading: isLoadingMember,
    error: errorMember,
    isError: isErrorMember,
    isSuccess: isSuccessMember,
  }: any = useGetUserDetail({
    token: getLogin()?.token ?? '',
    id: user_data?._id,
    query_key: 'NON_PRODUCT_MEMBER_DETAIL',
  });

  const { mutate, isLoading: isLoadingChangeStatus } = usePatchUser({
    token: getLogin()?.token ?? '',
    id: user_data?._id,
    query_key: 'NON_PRODUCT_MEMBER_DETAIL',
  });

  const mapVariable = (data: any) => {
    switch (data.productName) {
      case 'User License':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>per license</Typography>
              <Typography>
                {formatRupiah(data.License.toString(), 'Rp.')}
              </Typography>
            </div>
            <Tooltip title={'Edit Schema'}>
              <Button
                onClick={() => {
                  setIsModalEdit(true);
                  setdataEdit(null);
                  setdataEdit(data);
                  setChangeDataKey('License');
                }}
                style={{ marginLeft: '0.5em' }}
                icon={<EditTwoTone />}
              />
            </Tooltip>
          </div>
        );

      case 'Whatsapp':
        return (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1em',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Typography>Per Outgoing Utility Message</Typography>
                <Typography>
                  {formatRupiah(data.Outgoing_Utility.toString(), 'Rp.')}
                </Typography>
              </div>
              <Tooltip title={'Edit Schema'}>
                <Button
                  onClick={() => {
                    setIsModalEdit(true);
                    setdataEdit(null);
                    setdataEdit(data);
                    setChangeDataKey('Outgoing_Utility');
                  }}
                  style={{ marginLeft: '0.5em' }}
                  icon={<EditTwoTone />}
                />
              </Tooltip>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1em',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Typography>Per Outgoing Auth Message</Typography>
                <Typography>
                  {formatRupiah(data.Outgoing_Auth.toString(), 'Rp.')}
                </Typography>
              </div>
              <Tooltip title={'Edit Schema'}>
                <Button
                  onClick={() => {
                    setIsModalEdit(true);
                    setdataEdit(null);
                    setdataEdit(data);
                    setChangeDataKey('Outgoing_Auth');
                  }}
                  style={{ marginLeft: '0.5em' }}
                  icon={<EditTwoTone />}
                />
              </Tooltip>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1em',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Typography>Per Outgoing Marketing Message</Typography>
                <Typography>
                  {formatRupiah(data.Outgoing_Marketing.toString(), 'Rp.')}
                </Typography>
              </div>
              <Tooltip title={'Edit Schema'}>
                <Button
                  onClick={() => {
                    setIsModalEdit(true);
                    setdataEdit(null);
                    setdataEdit(data);
                    setChangeDataKey('Outgoing_Marketing');
                  }}
                  style={{ marginLeft: '0.5em' }}
                  icon={<EditTwoTone />}
                />
              </Tooltip>
            </div>
          </div>
        );

      case 'SMS':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>per Outgoing Message</Typography>
              <Typography>
                {formatRupiah(data.Outgoing_Message.toString(), 'Rp.')}
              </Typography>
            </div>
            <Tooltip title={'Edit Schema'}>
              <Button
                onClick={() => {
                  setIsModalEdit(true);
                  setdataEdit(null);
                  setdataEdit(data);
                  setChangeDataKey('Outgoing_Message');
                }}
                style={{ marginLeft: '0.5em' }}
                icon={<EditTwoTone />}
              />
            </Tooltip>
          </div>
        );

      case 'Telegram':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per incoming message</Typography>
              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
            <Tooltip title={'Edit Schema'}>
              <Button
                onClick={() => {
                  setIsModalEdit(true);
                  setdataEdit(null);
                  setdataEdit(data);
                  setChangeDataKey('Incoming_Message');
                }}
                style={{ marginLeft: '0.5em' }}
                icon={<EditTwoTone />}
              />
            </Tooltip>
          </div>
        );

      case 'Voice':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per phone duration in minutes</Typography>
              <Typography>
                {formatRupiah(data.Phone_Duration.toString(), 'Rp.')}
              </Typography>
            </div>
            <Tooltip title={'Edit Schema'}>
              <Button
                onClick={() => {
                  setIsModalEdit(true);
                  setdataEdit(null);
                  setdataEdit(data);
                  setChangeDataKey('Phone_Duration');
                }}
                style={{ marginLeft: '0.5em' }}
                icon={<EditTwoTone />}
              />
            </Tooltip>
          </div>
        );

      case 'Email':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per incoming email</Typography>
              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
            <Tooltip title={'Edit Schema'}>
              <Button
                onClick={() => {
                  setIsModalEdit(true);
                  setdataEdit(null);
                  setdataEdit(data);
                  setChangeDataKey('Incoming_Message');
                }}
                style={{ marginLeft: '0.5em' }}
                icon={<EditTwoTone />}
              />
            </Tooltip>
          </div>
        );

      case 'Livechat':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per session livechat</Typography>
              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
            <Tooltip title={'Edit Schema'}>
              <Button
                onClick={() => {
                  setIsModalEdit(true);
                  setdataEdit(null);
                  setdataEdit(data);
                  setChangeDataKey('Incoming_Message');
                }}
                style={{ marginLeft: '0.5em' }}
                icon={<EditTwoTone />}
              />
            </Tooltip>
          </div>
        );
      case 'Line':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per incoming message</Typography>
              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
            <Tooltip title={'Edit Schema'}>
              <Button
                onClick={() => {
                  setIsModalEdit(true);
                  setdataEdit(null);
                  setdataEdit(data);
                  setChangeDataKey('Incoming_Message');
                }}
                style={{ marginLeft: '0.5em' }}
                icon={<EditTwoTone />}
              />
            </Tooltip>
          </div>
        );

      case 'Video Call':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per Videocall Duration in minutes</Typography>
              <Typography>
                {formatRupiah(data.Videocall_Duration.toString(), 'Rp.')}
              </Typography>
            </div>
            <Tooltip title={'Edit Schema'}>
              <Button
                onClick={() => {
                  setIsModalEdit(true);
                  setdataEdit(null);
                  setdataEdit(data);
                  setChangeDataKey('Videocall_Duration');
                }}
                style={{ marginLeft: '0.5em' }}
                icon={<EditTwoTone />}
              />
            </Tooltip>
          </div>
        );

      case 'Facebook Comment':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per incoming message</Typography>
              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
            <Tooltip title={'Edit Schema'}>
              <Button
                onClick={() => {
                  setIsModalEdit(true);
                  setdataEdit(null);
                  setdataEdit(data);
                  setChangeDataKey('Incoming_Message');
                }}
                style={{ marginLeft: '0.5em' }}
                icon={<EditTwoTone />}
              />
            </Tooltip>
          </div>
        );

      case 'Facebook Message':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per incoming message</Typography>
              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
            <Tooltip title={'Edit Schema'}>
              <Button
                onClick={() => {
                  setIsModalEdit(true);
                  setdataEdit(null);
                  setdataEdit(data);
                  setChangeDataKey('Incoming_Message');
                }}
                style={{ marginLeft: '0.5em' }}
                icon={<EditTwoTone />}
              />
            </Tooltip>
          </div>
        );

      case 'Instagram Comment':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per incoming message</Typography>
              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
            <Tooltip title={'Edit Schema'}>
              <Button
                onClick={() => {
                  setIsModalEdit(true);
                  setdataEdit(null);
                  setdataEdit(data);
                  setChangeDataKey('Incoming_Message');
                }}
                style={{ marginLeft: '0.5em' }}
                icon={<EditTwoTone />}
              />
            </Tooltip>
          </div>
        );

      case 'Instagram Message':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per incoming message</Typography>
              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
            <Tooltip title={'Edit Schema'}>
              <Button
                onClick={() => {
                  setIsModalEdit(true);
                  setdataEdit(null);
                  setdataEdit(data);
                  setChangeDataKey('Incoming_Message');
                }}
                style={{ marginLeft: '0.5em' }}
                icon={<EditTwoTone />}
              />
            </Tooltip>
          </div>
        );

      case 'Twitter Message':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per incoming message</Typography>
              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
            <Tooltip title={'Edit Schema'}>
              <Button
                onClick={() => {
                  setIsModalEdit(true);
                  setdataEdit(null);
                  setdataEdit(data);
                  setChangeDataKey('Incoming_Message');
                }}
                style={{ marginLeft: '0.5em' }}
                icon={<EditTwoTone />}
              />
            </Tooltip>
          </div>
        );

      case 'Twitter Comment':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per incoming message</Typography>

              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
            <Tooltip title={'Edit Schema'}>
              <Button
                onClick={() => {
                  setIsModalEdit(true);
                  setdataEdit(null);
                  setdataEdit(data);
                  setChangeDataKey('Incoming_Message');
                }}
                style={{ marginLeft: '0.5em' }}
                icon={<EditTwoTone />}
              />
            </Tooltip>
          </div>
        );

      default:
        break;
    }
  };

  return (
    <div>
      {isLoadingMember && <Loading height="5rem" />}
      {isSuccessMember && dataMember && (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <h3>Business Schema Member Non Product</h3>
            <Button
              type="primary"
              style={{ marginLeft: '1em' }}
              icon={<FaHistory />}
              onClick={() => setIsModalOpen(true)}
            >
              History Cost
            </Button>
          </div>

          <div>
            <Descriptions
              title="User Info"
              items={[
                {
                  key: '1',
                  label: 'Name',
                  children: dataMember?.name,
                  span: 3,
                },
                {
                  key: '2',
                  label: 'Email',
                  children: dataMember?.email,
                  span: 3,
                },
                {
                  key: '3',
                  label: 'Payment Method',
                  children: (
                    <Popconfirm
                      title={`Change Payment Status to ${
                        dataMember?.paymentMethod === 'PREPAID'
                          ? 'Postpaid'
                          : 'Prepaid'
                      }`}
                      description="Are you sure to change this status"
                      onConfirm={async () => {
                        await mutate({
                          val: {
                            paymentMethod:
                              dataMember?.paymentMethod === 'PREPAID'
                                ? 'POSTPAID'
                                : 'PREPAID',
                          },
                          id: dataMember?._id,
                        });
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button loading={isLoadingChangeStatus} type="primary">
                        {dataMember?.paymentMethod}
                      </Button>
                    </Popconfirm>
                  ),
                  span: 3,
                },
              ]}
            />
          </div>
        </>
      )}
      {!isLoadingMember && isErrorMember && <Error error={errorMember} />}

      {isLoadingMember && <Loading />}
      {isSuccessPlatform && dataPlatform && (
        <Row gutter={[16, 16]}>
          {dataPlatform.map((item: any, idx: number) => {
            return (
              <Col xs={24} sm={24} md={12} lg={8} key={`${idx}_${item.name}`}>
                <Card
                  title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700 }}>
                        {item.name.replaceAll('_', ' ')}
                      </p>
                    </div>
                  }
                  style={{ minWidth: 300, width: 'auto' }}
                >
                  {item.data.map((item2: any, idx2: number) => (
                    <div key={`${idx2}_${item2.productName}`}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: 10,
                        }}
                      >
                        <p style={{ fontWeight: 700 }}>{item2.productName}</p>

                        <Popconfirm
                          title="Change Status"
                          description="Are you sure to change this status"
                          onConfirm={async () => {
                            await setSelectProduct(item.name.productCategory);
                            // await mutate({
                            //   productCategory: item.name.productCategory,
                            //   status: item2.status == 1 ? 0 : 1,
                            // });
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            // loading={
                            //   item.name.productCategory === selectProduct
                            //   &&
                            //   isLoadingChangeStatus
                            // }
                            style={{
                              backgroundColor:
                                item2.status === 1 ? '#b7eb8f' : '#ffd591',
                            }}
                          >
                            {item2.status === 1 ? 'ACTIVE' : 'IN ACTIVE'}
                          </Button>
                        </Popconfirm>
                      </div>

                      {mapVariable(item2)}
                    </div>
                  ))}
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
      {!isLoadingPlatform && isErrorPlatform && <Error error={errorPlatform} />}

      {dataEdit && (
        <Modal
          title={`Edit Product ${dataEdit?.productName}`}
          isModalOpen={IsModalEdit}
          handleCancel={handleCancelEdit}
        >
          <FormEditBusinessSchemaNonProductUser
            handleClose={handleCancelEdit}
            data={dataEdit}
            changeKey={changeDataKey}
            id_user={user_data?._id}
          />
        </Modal>
      )}

      <Modal
        title={'History Cost Member'}
        isModalOpen={IsModalOpen}
        handleCancel={handleCancelOpen}
      >
        <DatePicker.RangePicker
          style={{ width: '100%' }}
          onCalendarChange={(val) => {
            setDates(val);
          }}
          onChange={(val) => {
            setDates(val);
          }}
        />
        {/* {isLoadingHistoryCost && <Loading />} */}
        {isSuccessHistoryCost && dataHistoryCost && (
          <Row gutter={[16, 16]} style={{ marginTop: 15 }}>
            <HistoryCost data={dataHistoryCost} />
          </Row>
        )}
        {!isLoadingHistoryCost && isErrorHistoryCost && (
          <Error error={errorHistoryCost} />
        )}
      </Modal>
    </div>
  );
}