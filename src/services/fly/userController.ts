// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** loginAccount POST /api/user/account/login */
export async function loginAccountUsingPOST(
  body: API.UserLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/user/account/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** addUser POST /api/user/add */
export async function addUserUsingPOST(body: API.UserAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** sendCode GET /api/user/code */
export async function sendCodeUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sendCodeUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/user/code', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** deleteUser POST /api/user/deleteUser */
export async function deleteUserUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/deleteUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getLoginUser GET /api/user/get/login */
export async function getLoginUserUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO_>('/api/user/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getLoginUserToken GET /api/user/get/login/token */
export async function getLoginUserTokenUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLoginUserTokenUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO_>('/api/user/get/login/token', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getAkSkUser POST /api/user/getClient */
export async function getAkSkUserUsingPOST(body: API.UserAKSKVo, options?: { [key: string]: any }) {
  return request<API.BaseResponseUserAKSKVo_>('/api/user/getClient', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listPageUser POST /api/user/list/page/user */
export async function listPageUserUsingPOST(
  body: API.UserQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserVO_>('/api/user/list/page/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listUserVOByPage POST /api/user/list/page/vo */
export async function listUserVOByPageUsingPOST(
  body: API.UserQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserVO_>('/api/user/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** logout DELETE /api/user/logout */
export async function logoutUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.logoutUsingDELETEParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/logout', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** loginPhone POST /api/user/phone/login */
export async function loginPhoneUsingPOST(
  body: API.LoginPhoneVo,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/user/phone/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userRegister POST /api/user/register */
export async function userRegisterUsingPOST(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateAkSk POST /api/user/updateClient */
export async function updateAkSkUsingPOST(body: API.UserAKSKVo, options?: { [key: string]: any }) {
  return request<API.BaseResponseUserAKSKVo_>('/api/user/updateClient', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUser POST /api/user/updateUser */
export async function updateUserUsingPOST(
  body: API.UserUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/updateUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
