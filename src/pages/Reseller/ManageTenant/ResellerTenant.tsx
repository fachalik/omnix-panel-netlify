import React from 'react';
import { Input, Button, Row, Col, Card, Avatar, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
// import { useRouter } from 'next/navigation';

export default function ResellerTenant() {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState<string>('');
  const menu: any = [
    {
      key: 'telkom',
      name: 'Telkom',
      descrption:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      isActive: true,
    },
    {
      key: 'indosat',
      name: 'Indosat',
      descrption:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      isActive: true,
    },
    {
      key: 'im3',
      name: 'IM3',
      descrption:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      isActive: true,
    },
    {
      key: 'byu',
      name: 'Byu',
      descrption:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      isActive: true,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Tenant..."
          style={{ width: '30em' }}
        />
      </div>
      <div
        style={{
          marginTop: '1.5em',
          marginBottom: '1.5em',
          textAlign: 'start',
        }}
      >
        <p style={{ fontSize: 14, fontWeight: 600, marginBottom: '1em' }}>
          Platform
        </p>
        <Row gutter={[16, 16]}>
          {(search
            ? menu.filter((item: any) => {
                const startsWith = item['name']
                  .toLowerCase()
                  .startsWith(search.toLowerCase());
                const includes = item['name']
                  .toLowerCase()
                  .includes(search.toLowerCase());
                if (startsWith) {
                  return startsWith;
                } else if (!startsWith && includes) {
                  return includes;
                } else return null;
              })
            : menu
          ).map((item: any, key: number) => (
            <Col span={8} key={`${key}_${item.name}`}>
              <Badge.Ribbon text={!item.isActive && 'coming soon'} color="gray">
                <Card style={{ alignItems: 'start', textAlign: 'start' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar style={{ marginBottom: '1em' }} src={item.image} />
                  </div>
                  {/* <Badge>{item.isActive ? 'active' :''}</Badge> */}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</p>
                    <p style={{ fontSize: 14, fontWeight: 400 }}>
                      {item.descrption}
                    </p>
                    <Button
                      style={{ marginTop: '1em' }}
                      type="primary"
                      disabled={!item.isActive}
                      onClick={() => {
                        navigate(`/manage-tenant/${item.key}`);
                      }}
                    >
                      Detail
                    </Button>
                  </div>
                </Card>
              </Badge.Ribbon>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
