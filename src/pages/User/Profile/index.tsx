import { Button, Card, Divider, Form, Input, message, Radio } from 'antd';


import React, { useEffect, useState } from 'react';
import { history } from '@umijs/max';
import {
  getAkSkUserUsingPOST,
  getLoginUserUsingGET,
  updateAkSkUsingPOST,
  updateUserUsingPOST,
} from '@/services/fly/userController';
import { Text } from 'antd-mobile-alita';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

;

/**
 * 设置页面
 * @constructor
 */

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const Settings: React.FC = () => {
  const [user, setUser] = useState<API.UserAKSKVo>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false); // 添加isRequestSent状态

  const onFinish = async (values: any) => {
    if (isRequestSent) {
      return; // 如果已经发送过请求，直接返回，不再发送新的请求
    }

    try {
      const res = await getAkSkUserUsingPOST({
        token: localStorage.getItem('token') as string,
      });
      if (res.data) {
        setUser(res.data);
        setIsSuccess(true);
        setShowAk(true);
        setShowSk(true);
        setIsRequestSent(true); // 设置isRequestSent为true，表示已经发送过请求
      } else {

        history.push("/user/login")
        message.error('error');
      }
      // setTimeout(() => {
      //   history.push('/');
      //   window.location.reload();
      // }, 1000);
    } catch (e: any) {
      message.error(e.message);
    }
    console.log('ok');
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     message.success('修改成功');
  //     setIsSuccess(false);
  //   }
  // }, [isSuccess]);


  const [showAk, setShowAk] = useState(false);
  const toggleAkVisibility = () => {
    setShowAk(!showAk);
  };

  const renderAk = () => {
    if (showAk) {
      return user?.accessKey;
    } else {
      // 当 showSk 为 false 时，返回由相同长度的星号字符串组成的密钥
      return '*****'.repeat(10); // 假设这里使用 10 个星号，根据需求可以修改星号的个数
    }
  };

  const [showSk, setShowSk] = useState(false);
  const toggleSkVisibility = () => {
    setShowSk(!showSk);
  };

  const renderSk = () => {
    if (showSk) {
      return user?.secretKey;
    } else {
      // 当 showSk 为 false 时，返回由相同长度的星号字符串组成的密钥
      return '*****'.repeat(10); // 假设这里使用 10 个星号，根据需求可以修改星号的个数
    }
  };

  const updateAkSkByToken = async () => {
    const res = updateAkSkUsingPOST({
      token: localStorage.getItem('token') as string,
    });

    setIsRequestSent(false);
    if (!res) {
      message.error('更新失败，稍后再试');
    }
    message.success('生成成功');
  };

  const content = `
  <h3>1. 配置环境</h3>
  <pre>
  <code>
  1. JDK: Java Development Kit 1.8.111及以上版本
  2. 配置Maven

</code>
</pre>
  <h3>2. 引入依赖</h3>
  <pre>
  <code>
&lt;dependency&gt;
  &lt;groupId&gt;io.github.flybase1&lt;/groupId&gt;
  &lt;artifactId&gt;flyapi-client-sdk&lt;/artifactId&gt;
  &lt;version&gt;0.0.2&lt;/version&gt;
&lt;/dependency&gt;
</code>
</pre>

	<h3>3. 示例：输入自己的密钥信息(yml格式)：</h3>
	<pre>
	  <code>
flyapi:
  client:
    secret-key: abc
    access-key: abc
</code>
	</pre>
		<h3>4. 使用客户端，调用接口：</h3>
<pre>
	  <code>
    @Resource
    private FlyApiClient flyApiClient;

    @GetMapping("/test")
    public void test(){
        //调用可用接口
        String result = flyApiClient.getNameByPostWithJson();

    }
    </code>
	</pre>
	`;

  return (
    <div>
      <Card bordered={true} title={'开发者密钥(调用接口凭证)'}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="AccessKey"
            initialValue={user?.accessKey}
            required={false}
          >
            {renderAk()}
            {showAk ? (
              <EyeInvisibleOutlined onClick={toggleAkVisibility}  />
            ) : (
              <EyeOutlined onClick={toggleAkVisibility} />
            )}
            {/*{user?.accessKey}*/}
          </Form.Item>
          <Form.Item
            label="SecretKey"
            initialValue={user?.secretKey}
            required={false}
          >
            {renderSk()}
            {showSk ? (
              <EyeInvisibleOutlined onClick={toggleSkVisibility} />
            ) : (
              <EyeOutlined onClick={toggleSkVisibility} />
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={onFinish}>
              查看密钥
            </Button>

            <span style={{ marginRight: 200 }} />
            <Button type="primary"
                    onClick={() => updateAkSkByToken()}>
              生成新密钥
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider />
      <Card bordered={true} title={'开发者SDK(可以引入本地自己二次使用接口)'}>
        <div className="dg-html">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </Card>
    </div>
  );
};
export default Settings;
