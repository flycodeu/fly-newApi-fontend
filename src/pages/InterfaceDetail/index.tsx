import { useParams } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import {
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Tag, Tooltip,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { getInterfaceInfoByIdUsingGET, invokeInterfaceInfoUsingPOST } from '@/services/fly/interfaceController';
import { getLoginUserTokenUsingGET } from '@/services/fly/userController';
import VanillaJSONEditor from './VanillaJSONEditor';
import {
  addUserInterfaceInToTableUsingGET,
  invokeCountUsingGET,
  invokeCountUsingPOST,
} from '@/services/fly/userInterfaceInfoController';
import { createOrderUsingPOST } from '@/services/fly/orderController';
import { payUsingGET } from '@/services/fly/aliPayController';
import {history} from "@umijs/max";
/**
 * 主页
 * @constructor
 */

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [userId, setUserId] = useState<number>(0);
  const [interfaceId, setInterfaceId] = useState(Number);
  const [data, setData] = useState<API.InterfaceInfoNew>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const [count, setCount] = useState(Number);
  const [btndis, setBtndis] = useState<boolean>(false);
  const [showBuyModel, setShowBuyModel] = useState<boolean>(false);
  const params = useParams();
  const [requestParamsValue, setRequestParamsValue] = useState<string | undefined>(data?.requestParams);
  const param = new Object();
  const [content, setContent] = useState({
    json: param,
    text: undefined,
  });

  const userAccount = localStorage.getItem('userAccount') as string;
  const [buyCount, setBuyCount] = useState<number>(1);
  const [totalNum, setTotalNum] = useState<number>(0);
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

  const loadData = async () => {
    if (!params.id) {
      message.error('参数错误');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      setData(res?.data);
      setInterfaceId(Number(res?.data?.id));
    } catch (error: any) {
      message.error('请求失败,' + error.message);
    }
    setLoading(false);

    try {
      const user = await getLoginUserTokenUsingGET({
        token: localStorage.getItem('token') as string,
      });
      let userdata = user.data;
      setUserId(userdata?.id || 0);
    } catch (e: any) {
      message.error('用户不存在');
    }
    setLoading(false);

    try {
      const leftCount = await invokeCountUsingPOST({
        userId: userId,
        interfaceInfoId: interfaceId,
      });
      setCount(leftCount?.data as number);
    } catch (e: any) {
      message.error('次数以用完');
    }
  };


  useEffect(() => {
    loadData();
  }, []);

  /*
  * 将图片链接的文本转换为img格式
  * */
  const convertText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex);
    if (!matches) {
      return <>{text}</>;
    }
    const parts = text.split(urlRegex);
    return (
      <>
        {parts.map((part, i) => (
          <div key={i} style={{ display: 'block' }}>
            {part}
            {matches[i] && <img alt={'图片'} src={matches[i]} style={{ height: 200, width: 150 }} />}
          </div>
        ))}
      </>
    );
  };
  // const setDataInterface = async () => {
  //   try {
  //     await canAccessInvokeUsingPOST({
  //       userId: userId,
  //       interfaceInfoId: interfaceId,
  //     });
  //   } catch (e: any) {
  //     message.error('error');
  //   }
  // };
  //
  // useEffect(() => {
  //   setDataInterface();
  // }, [userId, interfaceId]);

  const fetchData = async () => {
    try {
      const leftCount = await invokeCountUsingPOST({
        userId: userId,
        interfaceInfoId: interfaceId,
      });

      setCount(leftCount?.data as number);
      if (leftCount?.data === 0) {
        message.error('次数已经用完');
      }
    } catch (e: any) {
      // message.error('次数已经用完');
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, interfaceId]);


  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPOST({
        id: params.id,
        token: localStorage.getItem('token') as string,
        ...values,
      });
      setInvokeRes(res.data);
      fetchData();
      message.success('测试成功');
    } catch (error: any) {
      message.error('请求失败' + error.message);
    }

    setInvokeLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // const handleButtonClick = () => {
  //   fetchData();
  // };

  function setInitCount() {
    addUserInterfaceInToTableUsingGET({
      userId: userId,
    }).then(res => {
      if (!res) {
        message.error('请勿重复领取次数');
        // setBtndis(true);
      }
      loadData();
    });
  }

  function handleBuCount() {
    setShowBuyModel(true);
  }

  function closeModal() {
    // 关闭弹窗
    setShowBuyModel(false);
  }

  const buyOrder = () => {
    const res = createOrderUsingPOST({
      userId: userId,
      interfaceInfoId: data?.id,
      buyCount: buyCount,
      totalMoney: totalNum,
      interfaceIfoName: data?.name,
    });
    if (!res) {
      message.error('购买错误');
    }
    fetchData();
    setShowBuyModel(false);
  };

  //当购买次数或单价变化时，计算并更新总金额
  useEffect(() => {
    const newTotalNum = buyCount * (data?.price || 0);
    setTotalNum(newTotalNum);
  }, [buyCount, data?.price]);


  const handlePayClick = async()=>{
    history.push("/myOrderList")
  }

  return (
    <PageContainer title="查看接口文档">
      <Card>
        {data ? (
          <Descriptions bordered={true} title={data.name} column={2}>
            {/*<Descriptions.Item label="接口状态"> <Badge status={data.status === 1 ? 'success' : 'error'}*/}
            {/*                                            text={data.status === 1 ? '正常' : '下线'} /></Descriptions.Item>*/}

            <Descriptions.Item label="接口状态">
              {data.status === 1 ? (
                <Tag color="success">正常</Tag>
              ) : data.status === 2 ? (
                <Tag color="processing">审核</Tag>
              ) : (
                <Tag color="error">下线</Tag>
              )}
            </Descriptions.Item>

            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item
              label="请求地址">{'http://' + data.ipaddress + ':' + data?.port + data.url}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{formatDate(data.createTime)}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{formatDate(data.updateTime)}</Descriptions.Item>
            <Descriptions.Item label="调用次数">{count}</Descriptions.Item>
            <Descriptions.Item label="调用方法名称">{data.methodName}</Descriptions.Item>
            <Descriptions.Item label={'购买次数'}><Button onClick={() => {
              handleBuCount();
            }}>购买</Button></Descriptions.Item>
            <Descriptions.Item label={'申请调用'}><Button
              onClick={() => setInitCount()} disabled={btndis}>激活次数</Button></Descriptions.Item>
            <Descriptions.Item label={'反馈问题'}><Button>反馈问题</Button></Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>

      <Card>
        <Descriptions bordered={true} title={'返回参数'} column={3}>
          <Descriptions.Item label={'code'}>返回状态码</Descriptions.Item>
          <Descriptions.Item label={'data'}>返回数据Json格式</Descriptions.Item>
          <Descriptions.Item label={'msg'}>返回消息</Descriptions.Item>
        </Descriptions>
      </Card>

      <Divider />
      <Card>

        <Form name="invoke" onFinish={onFinish} onFinishFailed={onFinishFailed} layout={'vertical'}>
          {/*initialValue={data?.requestParams}  value={requestParamsValue} onChange={handleRequestParamsChange} */}
          {data?.method === 'post' ?
            <Form.Item label="请求参数" name={'userRequestParams'}>
              {/*<div className="my-editor">*/}
              {/*  <VanillaJSONEditor*/}
              {/*    content={content}*/}
              {/*    onChange={setContent}*/}
              {/*  />*/}
              {/*</div>*/}
              <Input.TextArea rows={6} />
            </Form.Item> : null
          }
          {
            data?.method === 'get' ?
              <Row>
                <Col span={8}>
                  <Form.Item label="请求参数" initialValue={data?.requestParams} name={'userRequestParams'}>
                    <Input value={data.requestParams} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="参数值">
                    <Input />
                  </Form.Item>
                </Col>
              </Row> : null
          }

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {}
      <Card title={'返回结果'} loading={invokeLoading}>
        <Input.TextArea value={invokeRes} rows={8} />
      </Card>
      {/*value={typeof invokeRes === 'string' ? convertText(invokeRes) : invokeRes}*/}

      {/*<Card title={'剩余调用次数'}>{count}</Card>*/}

      <Modal
        visible={showBuyModel}
        onCancel={closeModal}
        footer={null}
      >
        {/* 弹窗内容 */}
        <Card>
          <Descriptions bordered={true} title={'支付'} column={1}>
            <Descriptions.Item label={'用户账号'}>{userAccount}</Descriptions.Item>
            <Descriptions.Item label={'接口id'}>{data?.id}</Descriptions.Item>
            <Descriptions.Item label={'接口单价'}>{data?.price}</Descriptions.Item>
            <Descriptions.Item
              label={'购买时间'}>{new Date().toLocaleDateString() + new Date().toLocaleTimeString()}</Descriptions.Item>
            <Descriptions.Item label={'支付状态'}>未支付</Descriptions.Item>
            <Descriptions.Item label={'购买次数'}>
              <InputNumber size="small" min={1} max={100000} defaultValue={1} value={buyCount} onChange={(value) => {
                setBuyCount(value);
              }} />
            </Descriptions.Item>
            <Descriptions.Item label={'总金额'}>{totalNum}</Descriptions.Item>
            <Descriptions.Item label="支付方式" labelStyle={{ fontSize: 15, marginTop: 8 }}><img
              src="https://gw.alipayobjects.com/mdn/member_frontWeb/afts/img/A*oRlnSYAsgYQAAAAAAAAAAABkARQnAQ"
              alt={''} /></Descriptions.Item>
          </Descriptions>

          <Divider />
          <div style={{ float: 'right', display: 'flex' }}>
            <Button style={{ marginRight: 15 }} onClick={() => {
              setShowBuyModel(false);
            }}>取消订单</Button>
            <Button type={'primary'} onClick={() => {
              buyOrder();
            }}>
              <Tooltip
                title={'需要支付：' + totalNum + ' 元'}>
                <span onClick={() => handlePayClick()}>创建订单</span>
              </Tooltip></Button>
          </div>
        </Card>
      </Modal>

    </PageContainer>
  );
};

export default Index;
