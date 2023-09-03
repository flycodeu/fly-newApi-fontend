import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { getTopInvokeInterfaceInfoVoUsingGET } from '@/services/fly/analysisController';
import { Divider } from 'antd';


/**
 * 主页
 * @constructor
 */

const Index: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInfoVo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // const items: MenuProps['items'] = [
  //   {
  //     label: 2,
  //     key: '0',
  //   },
  //   {
  //     label: 4,
  //     key: '1',
  //   },
  //   {
  //     label: 6,
  //     key: '3',
  //   },
  // ];

  useEffect(() => {
    try {
      getTopInvokeInterfaceInfoVoUsingGET({
        limit: 10,
      }).then(res => {
        if (res.data) {
          setData(res.data);
        }
        setLoading(false);
      });
    } catch (e: any) {

    }
  }, []);

  const chatData = data.map(item => {
    return {
      value: item.totalNum,
      name: item.name,
    };
  });


  const option = {
    title: {
      text: '热门调用接口',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '热门接口',
        type: 'pie',
        radius: '80%',
        data: chatData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  return (
    <PageContainer title="热门接口">
      <div>
        {/*<Dropdown menu={{ items }} trigger={['click']}>*/}
        {/*  <a onClick={(e) => e.preventDefault()}>*/}
        {/*    <Space>*/}
        {/*      Click me*/}
        {/*      <DownOutlined />*/}
        {/*    </Space>*/}
        {/*  </a>*/}
        {/*</Dropdown>*/}
      </div>

      <Divider/>
      <div>
        <ReactECharts showLoading={loading} option={option} />
      </div>
    </PageContainer>
  );
};

export default Index;
