/**
 * constant.ts 常量
 * @author 徐梦宇
 */

/**
 * 状态码
 */
export enum stateCode {
  SUCCESS = 200,
  INVALID_PARAMS = 400,
  ERROR = 500,
}

/**
 * 状态码对应的信息
 */
export const MESSAGE = new Map([
  [200, 'success'],
  [400, 'invalid params'],
  [500, 'error'],
]);

export const DEFAULT_PASSWORD = '123456';
export const JWT_SECRET = 'xmysym';

export const APP_ID = 'wx3ba05dd7c58bfca3';
export const APP_SECRET = 'b06917c4b2e1f2040c398137542e5638';
