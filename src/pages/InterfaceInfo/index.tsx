import { PageContainer } from '@ant-design/pro-components';
import { BigIntDecimal } from '@rc-component/mini-decimal';
import { Badge, Card, Col, Divider, Input, List, message, Row, Spin ,Image} from 'antd';
import React, { useEffect, useState } from 'react';
import { getInterfaceInfoPageUsingPOST, getOnlineInterfaceInfoPageUsingPOST } from '@/services/fly/interfaceController';
import ProCard from '@ant-design/pro-card';
import {history} from "@umijs/max";
/**
 * 主页
 * @constructor
 */

const Index: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 10,
    sortField: 'createTime',
    sortOrder: 'desc',
  };
  const [searchParams, setSearchParams] = useState<API.InterfaceInfoQueryRequest>({
    ...initSearchParams,
  });

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfoNew[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [sum, setSum] = useState<BigIntDecimal>();
  const onSearch = (value: string) => console.log(value);
  const { Search } = Input;

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getOnlineInterfaceInfoPageUsingPOST(searchParams);
      setList(res.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
      // localStorage.setItem('total', res?.data?.total + '');
    } catch (error: any) {
      message.error('请求失败,' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [searchParams]);


  // const countNum = async () => {
  //   try {
  //     const countAll = await getAllInvokeCountUsingGET();
  //     console.log(countAll);
  //     // @ts-ignore
  //     setSum(countAll);
  //   } catch (e: any) {
  //     message.error('系统错误');
  //   }
  // };
  //
  // useEffect(() => {
  //   countNum();
  // }, []);

  function handleAdd(id: any) {
    const userId = localStorage.getItem('userId');

  }

  return (

    <div>
      <PageContainer title="在线接口平台">
        {/*<div>*/}
        {/*  <Search placeholder="找找你需要的API吧" enterButton bordered={true} allowClear={true} size={'large'}*/}
        {/*          onSearch={(value) => {*/}
        {/*            if (value) { // 仅当 value 有值时才传递 name 参数*/}
        {/*              setSearchParams({*/}
        {/*                ...initSearchParams,*/}
        {/*                name: value,*/}
        {/*              });*/}
        {/*            } else {*/}
        {/*              setSearchParams({ // 当 value 为空时，重置 name 参数*/}
        {/*                ...initSearchParams,*/}
        {/*              });*/}
        {/*            }*/}
        {/*          }} />*/}
        {/*</div>*/}
        {/*<Divider />*/}
        {/*<Row>*/}
        {/*  <Col span={1} />*/}
        {/*  <Col span={22}>*/}
        {/*    <List*/}
        {/*      header={*/}
        {/*        <List.Item actions={['调用']}>*/}
        {/*          <List.Item.Meta title={'接口名称'} />*/}
        {/*          <List.Item.Meta title={'接口说明'} />*/}
        {/*          <List.Item.Meta title={'免费调用次数'} />*/}
        {/*          <List.Item.Meta title={'接口状态'} />*/}
        {/*          <List.Item.Meta title={'调用价格'} />*/}
        {/*        </List.Item>*/}
        {/*      }*/}
        {/*      className="my-list"*/}
        {/*      loading={loading}*/}
        {/*      itemLayout="horizontal"*/}
        {/*      dataSource={list}*/}
        {/*      renderItem={(item) => {*/}
        {/*        const apiLink = `/interface_info/${item.id}`;*/}
        {/*        return (*/}
        {/*          <List.Item*/}
        {/*            actions={[*/}
        {/*              <a key={item.id} href={apiLink}>*/}
        {/*                查看*/}
        {/*              </a>,*/}
        {/*            ]}*/}
        {/*          >*/}
        {/*            <List.Item.Meta title={<a href={apiLink}>{item.name}</a>} />*/}
        {/*            <List.Item.Meta title={item.description} />*/}
        {/*            <List.Item.Meta title={'  '+item.invokeCount} />*/}
        {/*            <List.Item.Meta title={item.status === 0 ? '关闭' : '正常'} />*/}
        {/*            <List.Item.Meta title={'0.001' + '元/条'} />*/}
        {/*          </List.Item>*/}
        {/*        );*/}
        {/*      }}*/}
        {/*      pagination={{*/}
        {/*        // showTotal(total: number) {*/}
        {/*        //   return '总数' + total;*/}
        {/*        // },*/}
        {/*        // pageSize: 5,*/}
        {/*        // total,*/}
        {/*        // onChange(page, pageSize) {*/}
        {/*        //   loadData(page, pageSize);*/}
        {/*        // },*/}
        {/*        onChange: (page, pageSize) => {*/}
        {/*          setSearchParams({*/}
        {/*            ...searchParams,*/}
        {/*            current: page,*/}
        {/*            pageSize: pageSize,*/}
        {/*          });*/}
        {/*        },*/}
        {/*        current: searchParams.current,*/}
        {/*        pageSize: searchParams.pageSize,*/}
        {/*        total: total,*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  </Col>*/}
        {/*  <Col span={1} />*/}
        {/*</Row>*/}

      </PageContainer>


      <>
        <Card hoverable>
          <ProCard layout="center">
            <Search placeholder="找找你需要的API吧" enterButton bordered={true} allowClear={true} size={'large'}
                    onSearch={(value) => {
                      if (value) { // 仅当 value 有值时才传递 name 参数
                        setSearchParams({
                          ...initSearchParams,
                          name: value,
                        });
                      } else {
                        setSearchParams({ // 当 value 为空时，重置 name 参数
                          ...initSearchParams,
                        });
                      }
                    }} />
          </ProCard>
        </Card>
        <br/>
        <br/>
        <Spin spinning={loading}>
          <List
            pagination={{
              onChange: (page, pageSize) => {
                setSearchParams({
                  ...searchParams,
                  current: page,
                  pageSize: pageSize,
                });
              },
              current: searchParams.current,
              pageSize: searchParams.pageSize,
              total: total,
            }}
            grid={{
              gutter: 20,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 4,
              xl: 5,
              xxl: 6
            }}
            dataSource={list}
            renderItem={(item, index) => (
              <List.Item>
                <ProCard key={index} bordered hoverable direction="column" style={{height: 270}}>
                  <ProCard layout="center" onClick={() => {
                    history.push(`/interface_info/${item.id}`)
                  }}>
                    <Badge count={item.invokeCount} overflowCount={999999999} color='#eb4d4b'>
                      <Image style={{width: 80, borderRadius: 8, marginLeft: 10}}
                             src={item?.avatarUrl ?? "https://img.qimuu.icu/typory/logo.gif"}
                             fallback={"https://img.qimuu.icu/typory/logo.gif"}
                             alt={item.name}
                             preview={false}
                      />
                    </Badge>
                  </ProCard>
                  <ProCard onClick={() => {
                    history.push(`/interface_info/${item.id}`)
                  }} layout="center" style={{marginTop: -10, fontSize: 16}}>
                    {item.name}
                  </ProCard>
                  <ProCard onClick={() => {
                    history.push(`/interface_info/${item.id}`)
                  }} layout="center" style={{marginTop: -18, fontSize: 14}}>
                    {!item.description ? "暂无接口描述" : item.description.length > 15 ? item.description.slice(0, 15) + '...' : item.description}
                  </ProCard>
                </ProCard>
              </List.Item>
            )}
          />
        </Spin>
      </>
    </div>


  );
};

export default Index;
