/**
 * router/v1/index.ts v1入口，注册v1版本的路由
 * @author 徐梦宇
 * POST    api/v1/register
 */

import Router from '@koa/router';
import createService from '../../middleware/createService';
import { staffService } from '../../service';
import { stateCode } from '../../util/constant';
import requestWechatApi from '../../util/requestWechatApi';
import response, {
  responseError,
  responseSuccessWithToken,
} from '../../util/response';
import courseRouter from './course';
import customerRouter from './customer';
import staffRouter from './staff';

const router = new Router({
  prefix: 'v1',
});

const injectStaffService = createService(staffService);

router.get('/', async (ctx) => {
  ctx.body = response(
    stateCode.SUCCESS,
    null,
    'Welcome Use Sale Achievement Api V1'
  );
});

// api/v1/register
router.post('/register', async (ctx) => {
  const { nickname, code, avatar_url, staff_id } = ctx.request.body;

  const openid = await requestWechatApi(code);

  const result = await injectStaffService().registerInWx(
    openid,
    nickname,
    avatar_url,
    staff_id
  );

  if (!result) {
    ctx.body = responseError('注册失败');
    return;
  }

  ctx.body = responseSuccessWithToken(
    {
      id: result.staff.id,
      name: result.staff.name,
    },
    result.token
  );
});

router.post('/login', async (ctx) => {
  const { code } = ctx.request.body;

  const openid = await requestWechatApi(code);

  const result = await injectStaffService().getStaffByOpenid(openid);

  if (!result) {
    ctx.body = responseError('登录失败');
    return;
  }

  ctx.body = responseSuccessWithToken(
    {
      id: result.staff.id,
      name: result.staff.name,
    },
    result.token
  );
});

router.use('/', courseRouter, customerRouter, staffRouter);

export default router.routes();
