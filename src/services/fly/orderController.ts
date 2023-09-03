// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** cancelOrder GET /api/order/cacel */
export async function cancelOrderUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cancelOrderUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/order/cacel', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** createOrder POST /api/order/create */
export async function createOrderUsingPOST(
  body: API.OrderRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/order/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteOrder GET /api/order/delete */
export async function deleteOrderUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteOrderUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/order/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getAllOrders GET /api/order/getAllOrders */
export async function getAllOrdersUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListOrderApi_>('/api/order/getAllOrders', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getOrderById GET /api/order/getOrderById */
export async function getOrderByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrderByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseOrderApi_>('/api/order/getOrderById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getOrderByUserId GET /api/order/getOrderByUserId */
export async function getOrderByUserIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrderByUserIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListOrderApi_>('/api/order/getOrderByUserId', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
