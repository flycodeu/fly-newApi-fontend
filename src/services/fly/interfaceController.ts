// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addInterfaceInfo POST /api/interface/add */
export async function addInterfaceInfoUsingPOST(
  body: API.InterfaceInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/interface/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteInterfaceInfo POST /api/interface/delete */
export async function deleteInterfaceInfoUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/interface/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** offLineInterfaceInfo POST /api/interface/downLine */
export async function offLineInterfaceInfoUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/interface/downLine', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getInterfaceInfoById GET /api/interface/get */
export async function getInterfaceInfoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInterfaceInfoNew_>('/api/interface/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getInterfaceInfoList GET /api/interface/interface/list */
export async function getInterfaceInfoListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListInterfaceInfoNew_>('/api/interface/interface/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getOnlineInterfaceInfoPage POST /api/interface/interface/onlinePage */
export async function getOnlineInterfaceInfoPageUsingPOST(
  body: API.InterfaceInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageInterfaceInfoNew_>('/api/interface/interface/onlinePage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getInterfaceInfoPage POST /api/interface/interface/page */
export async function getInterfaceInfoPageUsingPOST(
  body: API.InterfaceInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageInterfaceInfoNew_>('/api/interface/interface/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** invokeInterfaceInfo POST /api/interface/invoke */
export async function invokeInterfaceInfoUsingPOST(
  body: API.InterfaceInfoInvokeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject_>('/api/interface/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** onLineInterfaceInfo POST /api/interface/onLine */
export async function onLineInterfaceInfoUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/interface/onLine', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateInterfaceInfo POST /api/interface/update */
export async function updateInterfaceInfoUsingPOST(
  body: API.InterfaceInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/interface/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserInterfaceInfoByPage POST /api/interface/userInterface */
export async function getUserInterfaceInfoByPageUsingPOST(
  body: API.InterfaceInfoUserQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageInterfaceInfoNew_>('/api/interface/userInterface', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
