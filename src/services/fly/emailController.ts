// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** sendMail GET /api/email/sendEmail */
export async function sendMailUsingGET(options?: { [key: string]: any }) {
  return request<string>('/api/email/sendEmail', {
    method: 'GET',
    ...(options || {}),
  });
}
