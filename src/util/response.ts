/**
 * response.ts 响应数据封装
 * @author 徐梦宇
 */

import { MESSAGE, stateCode } from './constant';

/**
 * 响应
 * @param code 响应状态
 * @param data 响应数据
 * @param message 响应信息
 */
export default function response<T>(code: number, data: T | T[], message = '') {
  return {
    code,
    message: message || MESSAGE.get(code),
    data,
  };
}

export function responseWithToken<T>(
  code: number,
  data: T | T[],
  token: string,
  message = ''
) {
  return {
    code,
    message: message || MESSAGE.get(code),
    data,
    token,
  };
}

/**
 * 成功的响应
 * @param data 响应数据
 */
export function responseSuccess<T>(data: T | T[]) {
  return response<T>(stateCode.SUCCESS, data);
}

/**
 * 携带token的成功响应
 * @param data 响应数据
 * @param token token
 */
export function responseSuccessWithToken<T>(data: T | T[], token: string) {
  return responseWithToken<T>(stateCode.SUCCESS, data, token);
}

/**
 * 失败的响应
 * @param message 相应信息
 */
export function responseError<T>(message: string) {
  return response<T | null>(stateCode.ERROR, null, message);
}
