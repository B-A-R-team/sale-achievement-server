import fetch from 'node-fetch';
import { APP_ID, APP_SECRET } from '../config/sensitive';

/**
 * 请求微信api获取openid
 * @param code 用户微信登陆返回的code
 */
export default async function requestWechatApi(code: string) {
  const response = await fetch(
    'https://api.weixin.qq.com/sns/jscode2session?appid=' +
      APP_ID +
      '&secret=' +
      APP_SECRET +
      '&js_code=' +
      code +
      '&grant_type=authorization_code'
  );

  const wx_res = await response.json();

  if (wx_res.errcode) {
    console.log(wx_res);
    throw '请检查code是否有效';
  }

  return wx_res.openid;
}

/**
 * 请求微信access_token
 */
export async function requestWechatAccessToken() {
  const response = await fetch(
    'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' +
      APP_ID +
      '&secret=' +
      APP_SECRET
  );

  return await response.json();
}
