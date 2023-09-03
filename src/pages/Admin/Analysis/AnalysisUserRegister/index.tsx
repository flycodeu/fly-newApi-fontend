import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import {
  getUserRegisterOrderByMonthUsingGET,
} from '@/services/fly/analysisController';
import { Divider } from 'antd';


/**
 * 主页
 * @constructor
 */
interface UserData {
  month: number;
  count: number;
}

const Index: React.FC = () => {
  const [udata, setUData] = useState<UserData[]>([]);
  const [uloading] = useState(true);
  useEffect(() => {
    // todo 远程获取数据
    try {
      getUserRegisterOrderByMonthUsingGET().then((res: any) => {
        if (res.data) {
          setUData(res.data);
        }
      });
    } catch (e: any) {
    }
  }, []);

  // 映射
  const chartUData = udata.map((item) => {
    return {
      value: item.count,
      name: item.month + '月',
    };
  });

  const UOption = {
    xAxis: {
      type: 'category',
      data: chartUData.map((item) => item.name), // 使用月份作为横坐标数据
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: chartUData.map((item) => item.value), // 使用统计数量作为纵坐标数据
        type: 'line',
      },
    ],
  };

  return (
    <PageContainer title="用户注册">

      <Divider />
      {/*用户注册情况*/}

      <ReactECharts
        loadingOption={{
          showLoading: uloading,
        }}
        option={UOption}
      />
    </PageContainer>
  );
};

export default Index;
