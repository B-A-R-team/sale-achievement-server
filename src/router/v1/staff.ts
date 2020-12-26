/**
 * router/v1/staff.ts 员工路由
 * @author 徐梦宇
 * @description
 * GET     api/v1/staff
 * POST    api/v1/staff/register
 * POST    api/v1/staff/login
 * POST    api/v1/staff/accesstoken
 * GET     api/v1/staff/:id
 */

import Router from '@koa/router';
import createService from '../../middleware/createService';
import { staffService } from '../../service';
import {
  responseError,
  responseSuccess,
  responseSuccessWithToken,
} from '../../util/response';
import fetch from 'node-fetch';
import { APP_ID, APP_SECRET } from '../../config/sensitive';

const router = new Router({
  prefix: 'staff',
});

const service = createService(staffService);

// api/v1/staff
router.get('/', async (ctx) => {
  const staff = await service().getStaffs();
  ctx.body = responseSuccess(staff);
});

// api/v1/staff/register
router.post('/register', async (ctx) => {
  const result = await service().registerInWeb(ctx.request.body.name);
  ctx.body = responseSuccess(result.identifiers[0]);
});

// api/v1/staff/login
router.post('/login', async (ctx) => {
  const { id, password } = ctx.request.body;
  const result = await service().loginInWeb(id, password);
  if (result) {
    ctx.body = responseSuccessWithToken(result.staff, result.token);
  } else {
    ctx.body = responseError('登陆失败，请检查工号/密码');
  }
});

// api/v1/staff/accesstoken
router.post('/accesstoken', async (ctx) => {
  const response = await fetch(
    'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' +
      APP_ID +
      '&secret=' +
      APP_SECRET
  );

  const result = await response.json();

  ctx.body = responseSuccess(result);
});

// api/v1/staff/:id
router.get('/:id', async (ctx) => {
  ctx.body = responseSuccess(await service().getStaff(+ctx.params.id));
});

export default router.routes();
