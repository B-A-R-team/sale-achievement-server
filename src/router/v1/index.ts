/**
 * router/v1/index.ts v1入口，注册v1版本的路由
 * @author 徐梦宇
 */

import Router from '@koa/router';
import { stateCode } from '../../util/constant';
import response from '../../util/response';
import courseRouter from './course';

const router = new Router({
  prefix: 'v1',
});

router.get('/', async (ctx) => {
  ctx.body = response(
    stateCode.SUCCESS,
    null,
    'Welcome Use Sale Achievement Api V1'
  );
});

router.use('/', courseRouter);

export default router.routes();
