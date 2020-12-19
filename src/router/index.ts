/**
 * router/index.ts router入口，注册所有路由
 * @author 徐梦宇
 */

import Router from '@koa/router';
import { stateCode } from '../util/constant';
import response from '../util/response';
import v1 from './v1';

const router = new Router({
  prefix: '/api',
});

router.get('/', async (ctx) => {
  ctx.body = response(stateCode.SUCCESS, null, 'API');
});

router.use('/', v1);

export default router;
