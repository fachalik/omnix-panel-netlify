import { Bar } from '@ant-design/plots';

function BarChart() {
  const data: any = [
    {
      tenant: 'Telkom',
      value: 1000000,
      type: 'SMS',
    },
    {
      tenant: 'Telkom',
      value: 1000000,
      type: 'Whatsapp',
    },
    {
      tenant: 'Telkom',
      value: 1000000,
      type: 'Email',
    },
    {
      tenant: 'Allobank',
      value: 1000000,
      type: 'Whatsapp',
    },
    {
      tenant: 'Allobank',
      value: 1000000,
      type: 'SMS',
    },
  ];
  const config: any = {
    data: data.reverse(),
    isStack: true,
    xField: 'value',
    yField: 'tenant',
    seriesField: 'type',
    label: {
      position: 'middle',
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
  };
  return <Bar {...config} />;
}

export default BarChart;
