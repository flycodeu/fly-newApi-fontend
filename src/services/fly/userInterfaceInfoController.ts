// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addUserInterfaceInfo POST /api/userInterfaceInfo/add */
export async function addUserInterfaceInfoUsingPOST(
  body: API.UserInterfaceInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/userInterfaceInfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** addUserInterfaceInToTable GET /api/userInterfaceInfo/add/table */
export async function addUserInterfaceInToTableUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addUserInterfaceInToTableUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/userInterfaceInfo/add/table', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** deleteUserInterfaceInfo POST /api/userInterfaceInfo/delete */
export async function deleteUserInterfaceInfoUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/userInterfaceInfo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserInterfaceInfoById GET /api/userInterfaceInfo/get */
export async function getUserInterfaceInfoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserInterfaceInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserInterfaceInfo_>('/api/userInterfaceInfo/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** invokeCount POST /api/userInterfaceInfo/get/interface */
export async function invokeCountUsingPOST(
  body: API.UserInterfaceInfoCount,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/userInterfaceInfo/get/interface', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getAllUserInterfaceInfoDetailByPage POST /api/userInterfaceInfo/getAll/datail/page */
export async function getAllUserInterfaceInfoDetailByPageUsingPOST(
  body: API.UserInterfaceInfoVoRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserInterfaceInfoVo_>(
    '/api/userInterfaceInfo/getAll/datail/page',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** getAllUserInterfaceInfoByList GET /api/userInterfaceInfo/getAll/List */
export async function getAllUserInterfaceInfoByListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllUserInterfaceInfoByListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListUserInterfaceInfo_>('/api/userInterfaceInfo/getAll/List', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getAllUserInterfaceInfoByPage POST /api/userInterfaceInfo/getAll/page */
export async function getAllUserInterfaceInfoByPageUsingPOST(
  body: API.UserInterfaceInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserInterfaceInfo_>('/api/userInterfaceInfo/getAll/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUserInterfaceInfo POST /api/userInterfaceInfo/update */
export async function updateUserInterfaceInfoUsingPOST(
  body: API.UserInterfaceInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/userInterfaceInfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
