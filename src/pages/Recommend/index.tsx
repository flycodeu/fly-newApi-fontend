import React from 'react';
import { Card, Col, Divider, List, Row } from 'antd';
import ListItem from 'antd-mobile-alita/es/list/ListItem';
import { PageContainer } from '@ant-design/pro-components';

/**
 * 主页
 * @constructor
 */

const Index: React.FC = () => {
  return (
    <div>
      <Divider />
      <PageContainer title={"本站使用到的第三方API"}>
      <Row gutter={16}>
        <Col className="gutter-row" span={8}>
          <Card title="飞云智能BI(关联项目)" bordered={false} style={{ width: 300 }}>
            <p>可以通过AI快速对表格进行分析，展示图表以及结论</p>
            <a href={'http://124.71.207.114/'} target="_blank" rel="noopener noreferrer">飞云BI</a>
          </Card>
        </Col>

        <Col className="gutter-row" span={8}>
          <Card title="教书先生API" bordered={false} style={{ width: 300 }}>
            <p>稳定、快速、免费的 API 接口服务</p>
            <a href={'https://api.oioweb.cn/'} target="_blank" rel="noopener noreferrer">https://api.oioweb.cn/</a>
          </Card>
        </Col>
        <Col className="gutter-row" span={8}>

          <Card title="夏柔 - 分享的API永不收费" bordered={false} style={{ width: 300 }}>
            <p>夏柔 - 分享的API永不收费</p>
            <a href={'https://api.aa1.cn/'} target="_blank" rel="noopener noreferrer">https://api.aa1.cn/</a>
          </Card>
        </Col>

        <Divider/>
        <Col className="gutter-row" span={8}>
          <Card title="博天API" bordered={false} style={{ width: 300 }}>
            <p>高速稳定免费APi接口调用平台</p>
            <a href={'https://api.btstu.cn/'} target="_blank" rel="noopener noreferrer">https://api.btstu.cn/</a>
          </Card>
        </Col>
      </Row>
      </PageContainer>

    </div>
  );
};

export default Index;
