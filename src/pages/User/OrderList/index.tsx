import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Button, message, Space, Table, Tag } from 'antd';
import { Column, ColumnGroup } from 'rc-table';
import { DataType } from 'csstype';
import { cancelOrderUsingGET, getOrderByUserIdUsingGET } from '@/services/fly/orderController';
import { payUsingGET } from '@/services/fly/aliPayController';

const OrderList: React.FC = () => {
  const [orderList, setOrderList] = useState<API.OrderApi[]>();
  const fectchAllData = async () => {
    getOrderByUserIdUsingGET({
      userId: localStorage.getItem('userId') as any,
    }).then(res => {
      // 格式化日期字段
      const formattedOrders = res?.data.map((order) => ({
        ...order,
        createTime: formatDate(order.createTime),
        delayTime: formatDate(order.delayTime),
      }));

      setOrderList(formattedOrders);
    });

  };

  useEffect(() => {
    fectchAllData();
  }, localStorage.getItem('userId') as any);


  /**
   * 设置时间日期格式化
   * @param dateTimeString
   */
  const formatDate = (dateTimeString: any) => {
    const date = new Date(dateTimeString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
      .getDate()
      .toString()
      .padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };


  function handleCancelOrder(id: string | undefined) {
    cancelOrderUsingGET({
      orderId: id ? BigInt(id) : undefined,
    }).then(res => {
      if (res) {
        message.success('取消订单成功');
      } else {
        message.error('取消订单失败');
      }
      fectchAllData();
    });
  }

  function payOrder(orderSn: string | undefined, totalMoney: number | undefined, interfaceIfoName: string | undefined) {
    payUsingGET({
      traceNo: orderSn,
      totalAmount: totalMoney,
      subject: interfaceIfoName,
    }).then((res) => {
      message.success('正在跳转第三方支付');
      const div = document.createElement('div');
      div.innerHTML = res;
      document.body.appendChild(div);
      document.forms[0].setAttribute('target', '_blank');
      document.forms[0].submit();
    });
  }

  return (
    <PageContainer style={{ position: 'relative', height: '100%', width: '100%' }}>
      <Table dataSource={orderList}>
        <Column title="订单号" dataIndex="orderSn" key="orderSn" />
        <Column title="阿里订单号" dataIndex="alipayTradeNo" key="alipayTradeNo" />
        <Column title="接口名字" dataIndex="interfaceIfoName" key="interfaceIfoName" />
        <Column title="接口单价" dataIndex="price" key="price" />
        <Column title="购买次数" dataIndex="buyCount" key="buyCount" />
        <Column title="付款金额" dataIndex="totalMoney" key="totalMoney" />
        <Column title="创建时间" dataIndex="createTime" key="createTime" />
        <Column title="过期时间" dataIndex="delayTime" key="delayTime" />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: API.OrderApi) => (
            <Space size="middle">
              {record.status === 0 && (
                <div>
                  <a href="#" onClick={() => handleCancelOrder(String(record.id))}>取消订单</a>
                  <br />
                  <Button
                    onClick={() => payOrder(record.orderSn, record.totalMoney, record.interfaceIfoName)}
                    style={{ background: 'blue', color: 'white' }}>支付订单</Button>
                </div>
              )}
              {record.status === 1 && (
                <span style={{ color: 'blue' }}>支付成功</span>
              )}
              {record.status === 3 && (
                <span style={{ color: 'red' }}>支付失败</span>
              )}
              {record.status === 2 && (
                <span style={{ color: 'pink' }}>已取消订单</span>
              )}
              {record.status === 4 && (
                <span style={{ color: 'red' }}>订单已过期</span>
              )}

            </Space>
          )}
        />
      </Table>
    </PageContainer>

  );
};

export default OrderList;
