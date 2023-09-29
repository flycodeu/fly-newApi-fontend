import { Button, Card, Form, Input, message, Radio } from 'antd';


import React, { useEffect, useState } from 'react';
import { history } from '@umijs/max';
import { getLoginUserUsingGET, updateUserUsingPOST } from '@/services/fly/userController';
import ProCard from '@ant-design/pro-card';

;

/**
 * 设置页面
 * @constructor
 */

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const Settings: React.FC = () => {
  const [user, setUser] = useState<API.UserVO>();
  const [isSuccess, setIsSuccess] = useState(false);

  const onFinish = async (values: any) => {
    try {
      await updateUserUsingPOST({
        id: user?.id,
        userName: user?.userName,
        userAvatar: user?.userAvatar,
        gender: user?.gender,
        phoneNum: user?.phoneNum,
        email: user?.email,
      });
      setIsSuccess(true);
      setTimeout(() => {
        history.push('/');
        window.location.reload();
      }, 1000);
    } catch (e: any) {
      message.error(e.message);
    }
    console.log('ok');
  };

  useEffect(() => {
    if (isSuccess) {
      message.success('修改成功');
      setIsSuccess(false);
    }
  }, [isSuccess]);


  const fetchData = async () => {
    try {
      const user = await getLoginUserUsingGET();
      setUser(user?.data);
    } catch (e: any) {
      // message.error('次数已经用完');
    }
  };
  /*  console.log(user);*/


  useEffect(() => {
    fetchData();
  }, []);

  return (
    /*style={{ display: 'flex', justifyContent: 'center' }}*/
    <div>
      <ProCard
        type="inner"
        bordered
        direction="column"
      >
        <Card bordered={true} title={'个人设置'} style={{ width: 600 }}>
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
              label="账号名"
              initialValue={user?.userAccount}
              required={false}
            >
              {user?.userAccount}
            </Form.Item>

            <Form.Item label="用户名">
              <Input value={user?.userName} onChange={(e) => setUser({ ...user, userName: e.target.value })} />
            </Form.Item>

            <Form.Item label="用户头像">
              <Input value={user?.userAvatar} onChange={(e) => setUser({ ...user, userAvatar: e.target.value })} />
            </Form.Item>

            <Form.Item label="性别">
              <Radio.Group value={user?.gender} onChange={(e) => setUser({ ...user, gender: e.target.value })}>
                <Radio value={0}>男</Radio>
                <Radio value={1}>女</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="用户手机号">
              <Input value={user?.phoneNum} onChange={(e) => setUser({ ...user, phoneNum: e.target.value })} />
            </Form.Item>

            <Form.Item label="用户邮箱">
              <Input value={user?.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            </Form.Item>


            {/*          <Form.Item label="手机号" name="phone">
            <Input />
          </Form.Item>*/}
            <Form.Item label="用户等级">
              <Input
                placeholder={user?.userRole == 'admin' ? '管理员' : '普通用户'}
                disabled={true}
                onChange={(e) => setUser({ ...user, userRole: e.target.value })}
              ></Input>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" onClick={onFinish}>
                更新
              </Button>

              <span style={{ marginRight: 200 }} />

              <Button type="primary" htmlType="submit" href="/">
                返回
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </ProCard>
    </div>
  );
};
export default Settings;
