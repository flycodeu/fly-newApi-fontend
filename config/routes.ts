export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/settings', component: './User/Settings' },
    ],
  },
  { path: '/', icon: 'dollarOutlined', name: '接口市场', component: './InterfaceInfo' },
  { path: '/profile', icon: 'lockOutlined', name: '开放平台', component: './User/Profile' },

  // {
  //   path: '/my',
  //   name: '我的接口',
  //   icon: 'crown',
  //   routes: [
  // { path: '/my/projects', name: '我的接口', component: './User/MyInterfaceInfo' },
  // { path: '/my/createProject', name: '创建接口', component: './User/MyProject' },
  //   ],
  // },
  { path: '/RecommendAPI', icon: 'starOutlined', name: '推荐API', component: './Recommend' },


  {
    path: '/interface_info/:id',
    icon: 'smile',
    component: './InterfaceDetail/index',
    hideInMenu: true,
  },

  {
    path: '/myOrderList',
    icon: 'smile',
    name: '我的订单',
    component: './User/OrderList',
  },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: '管理页',
    routes: [
      { path: '/admin/userList', name: '用户列表', component: './Admin/UserInfo' },
      { path: '/admin/interfaceList', name: '接口列表', component: './Admin/InterfaceInfo' },
      { path: '/admin/userInterfaceList', name: '用户接口列表', component: './Admin/UserInterfaceInfo' },
      { path: '/admin/analysisTop', name: '热门接口', component: './Admin/Analysis/AnalysisTopInvoke' },
      {
        path: '/admin/analysisRegisterMonth',
        icon: 'fundOutlined ',
        name: '每月用户注册数',
        component: './Admin/Analysis/AnalysisUserRegister',
      },
      { path: '/admin/order', name: '所有订单', component: './Admin/Order' },
    ],
  },
  { icon: 'table', path: '/list', component: './TableList' },
  { path: '*', layout: false, component: './404' },
];
