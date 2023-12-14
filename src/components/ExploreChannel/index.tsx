import React from 'react';
import { Input, Button, Row, Col, Card, Avatar, Badge } from 'antd';
// import { useRouter, usePathname } from 'next/navigation';
import { useNavigate } from 'react-router-dom';
import whatsappIcon from '@/assets/icons/whatsapp.svg';
import facebookIcon from '@/assets/icons/facebook.svg';
import telegramIcon from '@/assets/icons/telegram.svg';
import twitterIcon from '@/assets/icons/twitter.svg';
import instagramIcon from '@/assets/icons/instagram.svg';
import lineIcon from '@/assets/icons/line.svg';
import smsIcon from '@/assets/icons/sms.svg';
import emailIcon from '@/assets/icons/Email.svg';

export default function ExploreChannel() {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState<string>('');

  // const role = pathname.split('/')[1];

  const menu: any = [
    {
      key: 'whatsapp',
      image: whatsappIcon,
      name: 'Whatsapp',
      descrption:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      isActive: true,
    },
    {
      key: 'facebook',
      image: facebookIcon,
      name: 'Facebook',
      descrption:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      isActive: true,
    },
    {
      key: 'telegram',
      image: telegramIcon,
      name: 'Telegram',
      descrption:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      isActive: true,
    },
    {
      key: 'twitter',
      image: twitterIcon,
      name: 'Twitter',
      descrption:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      isActive: true,
    },
    {
      key: 'instagram',
      image: instagramIcon,
      name: 'Instagram',
      descrption:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      isActive: true,
    },
    {
      key: 'line',
      image: lineIcon,
      name: 'Line',
      descrption:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      isActive: false,
    },
    {
      key: 'sms',
      image: smsIcon,
      name: 'SMS',
      descrption:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      isActive: false,
    },
    {
      key: 'email',
      image: emailIcon,
      name: 'EMAIL',
      descrption:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      isActive: false,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Campaign..."
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
                <Card>
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
                        navigate(`/channel-subscription/${item.key}`);
                      }}
                    >
                      Active now
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
