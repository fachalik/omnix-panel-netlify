import { Pie } from '@ant-design/plots';

function PieChart() {
  const data = [
    {
      type: 'Authentication',
      value: 27,
    },
    {
      type: 'Marketing',
      value: 25,
    },
    {
      type: 'Utility',
      value: 18,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
}

export default PieChart;
