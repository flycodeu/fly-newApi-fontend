import Footer from '@/components/Footer';

import {
  AlipayCircleOutlined,
  LockOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';
import { userRegisterUsingPOST } from '@/services/fly/userController';

const ActionIcons = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    };
  });

  return (
    <>
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={langClassName} />
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={langClassName} />
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={langClassName} />
    </>
  );
};

// const Lang = () => {
//   const langClassName = useEmotionCss(({ token }) => {
//     return {
//       width: 42,
//       height: 42,
//       lineHeight: '42px',
//       position: 'fixed',
//       right: 16,
//       borderRadius: token.borderRadius,
//       ':hover': {
//         backgroundColor: token.colorBgTextHover,
//       },
//     };
//   });
//
//   return (
//     <div className={langClassName} data-lang>
//       {SelectLang && <SelectLang />}
//     </div>
//   );
// };

const Register: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        'url(\'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr\')',
      backgroundSize: '100% 100%',
    };
  });

  // const intl = useIntl();

  /*  const fetchUserInfo = async () => {
      const userInfo = await initialState?.fetchUserInfo?.();
      if (userInfo) {
        flushSync(() => {
          setInitialState((s) => ({
            ...s,
            currentUser: userInfo,
          }));
        });
      }
    };*/

  const handleSubmit = async (values: API.UserRegisterRequest) => {
    const { userAccount, userPassword, checkPassword } = values;
    // 校验
    if (userPassword !== checkPassword) {
      message.error('两次密码不一致');
    }
    try {
      // 注册
      const res = await userRegisterUsingPOST({ ...values });
      if (res.data) {
        const defaultSuccessMessage = '注册成功';
        message.success(defaultSuccessMessage);

        if (!history) return;
        history.push('/user/login');
        return;
      } else {
        throw new Error('error');
      }
      // 如果失败去设置用户错误信息
    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage + error.message);
    }
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>
      {/*<Lang />*/}
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          title="Fly API"
          subTitle={'欢迎各位前来'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '用户注册',
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'用户名: '}
                rules={[
                  {
                    required: true,
                    message: "请输入用户名!"
                  },
                ]}
              />

              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'密码: '}
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于6',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'再次输入密码: '}
                rules={[
                  {
                    required: true,
                    message: '请再次输入密码',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于6',
                  },
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
