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
