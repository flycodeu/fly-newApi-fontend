// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getUserRegisterOrderByMonth GET /api/analysis/registerCount */
export async function getUserRegisterOrderByMonthUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListMapStringObject_>('/api/analysis/registerCount', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getTopInvokeInterfaceInfoVo GET /api/analysis/top */
export async function getTopInvokeInterfaceInfoVoUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTopInvokeInterfaceInfoVoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListInterfaceInfoVo_>('/api/analysis/top', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
