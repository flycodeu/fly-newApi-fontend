import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const defaultMessage = 'FlyCode 出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'FlyCode github',
          title: <GithubOutlined />,
          href: 'https://github.com/flybase1/fly-newApi-backend',
          blankTarget: true,
        },
        {
          key: '飞云AOI',
          title: '飞云API',
          href: 'https://github.com/flybase1/fly-newApi-backend',
          blankTarget: true,
        },
        {
          key: 'ICP备案号',
          title: 'ICP主体备案号 苏ICP备2023015652号',
          href: 'https://beian.miit.gov.cn/#/Integrated/index',
          blankTarget: true,
        },

        {
          key: '网站帮助',
          title: '',
          href: 'https://github.com/liyupi',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
