import Footer from '@/components/Footer';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormText,
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { Alert, Carousel, Col, Image, message, Row, Tabs } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
import {
  getLoginUserTokenUsingGET,
  getLoginUserUsingGET,
  loginAccountUsingPOST,
  loginPhoneUsingPOST,
  sendCodeUsingGET,
} from '@/services/fly/userController';
import FlyBackPic from '../../../../public/FlyBackPic.jpg';
import { Link } from '@@/exports';
import { currentUser } from '@/services/ant-design-pro/api';
import { addUserInterfaceInToTableUsingGET } from '@/services/fly/userInterfaceInfoController';

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

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const [phoneNum, setPhoneNum] = useState('');
  const token = localStorage.getItem('token');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage: FlyBackPic,
      backgroundSize: '100% 100%',
    };
  });
  const fetchUserInfo = async () => {
    const userInfo = await getLoginUserUsingGET();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s: any) => ({
          ...s,
          currentUser: userInfo,
        }));
      });

      // const userInfo = await initialState?.currentUser?.();
      // if (userInfo) {
      //   flushSync(() => {
      //     setInitialState((s) => ({
      //       ...s,
      //       currentUser: userInfo,
      //     }));
      //   });
      // }
    }
  };
  const handleSubmit = async (values: API.UserLoginRequest | API.LoginPhoneVo) => {
    try {
      let res;
      if (type === 'account') {
        // 登录
        res = await loginAccountUsingPOST(values as API.UserLoginRequest);
      } else {
        res = await loginPhoneUsingPOST(values as API.LoginPhoneVo);
        if (!res) {
          message.error('failed');
        }
      }
      localStorage.setItem('token', '' + res.data);

      if (res.code === 0) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        location.reload();
        return;
      } else {
        message.error(res.message);
      }
      /*      console.log(res);
            // 如果失败去设置用户错误信息
            setUserLoginState(res);*/
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;
  const contentStyle: React.CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div>
        <div
          style={{
            backgroundColor: 'white',
            height: 'calc(100vh - 100px)',
            margin: 0,
          }}
        >
          <Row>
            <Col span={14}>
              <div
                style={{
                  paddingLeft: '140px',
                  padding: '120px, 0',
                  paddingTop: '100px',
                }}
              >
                <Carousel>
                  <Image style={contentStyle} src={FlyBackPic} height={500} width={600} />
                </Carousel>
              </div>
            </Col>
            <Col span={8}>
              <div
                style={{
                  flex: '1',
                  padding: '132px 0',
                }}>
                <LoginForm
                  contentStyle={{
                    minWidth: 280,
                    maxWidth: '75vw',
                    minHeight: 100,
                    maxHeight: '90vw',
                  }}
                  logo={<img alt="logo" src="/logo.svg" />}
                  title="Fly API"
                  subTitle={'Fly API 定制化API接口大全 '}
                  initialValues={{
                    autoLogin: true,
                  }}
                  // actions={['其他登录方式 :', <ActionIcons key="icons" />]}
                  onFinish={async (values) => {
                    await handleSubmit(values as API.UserVO);
                  }}
                >
                  <Tabs
                    activeKey={type}
                    onChange={setType}
                    centered
                    items={[
                      {
                        key: 'account',
                        label: '账户密码登录',
                      },
                      {
                        key: 'mobile',
                        label: '手机号登录',
                      },
                      {
                        key: 'email',
                        label: '邮箱登录',
                      },
                    ]}
                  />

                  {status === 'error' && loginType === 'account' && (
                    <LoginMessage content={'错误的用户名和密码(admin/ant.design)'} />
                  )}
                  {type === 'account' && (
                    <>
                      <ProFormText
                        name="userAccount"
                        fieldProps={{
                          size: 'large',
                          prefix: <UserOutlined />,
                        }}
                        rules={[
                          {
                            required: true,
                            message: '请输入用户账号',
                          },
                        ]}
                      />
                      <ProFormText.Password
                        name="userPassword"
                        fieldProps={{
                          size: 'large',
                          prefix: <LockOutlined />,
                        }}
                        rules={[
                          {
                            required: true,
                            message: '密码是必填项！',
                          },
                        ]}
                      />
                    </>
                  )}

                  {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
                  {type === 'mobile' && (
                    <>
                      <ProFormText
                        fieldProps={{
                          size: 'large',
                          prefix: <MobileOutlined />,
                        }}
                        name="phoneNum"
                        placeholder={'请输入手机号！'}
                        rules={[
                          {
                            required: true,
                            message: '手机号是必填项！',
                          },
                          {
                            pattern: /^1\d{10}$/,
                            message: '不合法的手机号！',
                          },

                        ]}
                        onChange={(e: any) => setPhoneNum(e.target.value)}
                      />
                      <ProFormCaptcha
                        fieldProps={{
                          size: 'large',
                          prefix: <LockOutlined />,
                        }}
                        captchaProps={{
                          size: 'large',
                        }}
                        placeholder={'请输入验证码！'}
                        captchaTextRender={(timing, count) => {
                          if (timing) {
                            return `${count} ${'秒后重新获取'}`;
                          }
                          return '获取验证码';
                        }}
                        name="code"
                        rules={[
                          {
                            required: true,
                            message: '验证码是必填项！',
                          },
                        ]}
                        onGetCaptcha={async () => {
                          console.log(phoneNum);
                          const result = await sendCodeUsingGET({ phoneNum: phoneNum });
                          if (!result) {
                            return;
                          }
                          message.success('验证码为 ' + result.data);
                        }}
                      />
                    </>
                  )}


                  {/*{type === 'email' && (*/}
                  {/*  <>*/}
                  {/*    <ProFormText*/}
                  {/*      fieldProps={{*/}
                  {/*        size: 'large',*/}
                  {/*        prefix: <MobileOutlined />,*/}
                  {/*      }}*/}
                  {/*      name="phoneNum"*/}
                  {/*      placeholder={'请输入邮箱号！'}*/}
                  {/*      rules={[*/}
                  {/*        {*/}
                  {/*          required: true,*/}
                  {/*          message: '邮箱是必填项！',*/}
                  {/*        },*/}
                  {/*        {*/}
                  {/*          pattern: /^1\d{10}$/,*/}
                  {/*          message: '不合法的邮箱！',*/}
                  {/*        },*/}

                  {/*      ]}*/}
                  {/*      onChange={(e: any) => setPhoneNum(e.target.value)}*/}
                  {/*    />*/}
                  {/*    <ProFormCaptcha*/}
                  {/*      fieldProps={{*/}
                  {/*        size: 'large',*/}
                  {/*        prefix: <LockOutlined />,*/}
                  {/*      }}*/}
                  {/*      captchaProps={{*/}
                  {/*        size: 'large',*/}
                  {/*      }}*/}
                  {/*      placeholder={'请输入验证码！'}*/}
                  {/*      captchaTextRender={(timing, count) => {*/}
                  {/*        if (timing) {*/}
                  {/*          return `${count} ${'秒后重新获取'}`;*/}
                  {/*        }*/}
                  {/*        return '获取验证码';*/}
                  {/*      }}*/}
                  {/*      name="code"*/}
                  {/*      rules={[*/}
                  {/*        {*/}
                  {/*          required: true,*/}
                  {/*          message: '验证码是必填项！',*/}
                  {/*        },*/}
                  {/*      ]}*/}
                  {/*      onGetCaptcha={async () => {*/}
                  {/*        console.log(phoneNum);*/}
                  {/*        const result = await sendCodeUsingGET({ phoneNum: phoneNum });*/}
                  {/*        if (!result) {*/}
                  {/*          return;*/}
                  {/*        }*/}
                  {/*        message.success('验证码为 ' + result.data);*/}
                  {/*      }}*/}
                  {/*    />*/}
                  {/*  </>*/}
                  {/*)}*/}
                  <div
                    style={{
                      marginBottom: 70,
                    }}
                  >
                    <Link
                      style={{
                        float: 'left',
                      }}
                      to="/user/register">
                      账号注册
                    </Link>
                    <Link
                      style={{
                        float: 'right',
                      }}
                      to="/user/forget"
                    >
                      忘记密码 ?
                    </Link>
                  </div>
                </LoginForm>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
