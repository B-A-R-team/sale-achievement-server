/**
 * router/v1/staff.ts 员工路由
 * @author 徐梦宇
 * @description
 * POST    api/v1/staff
 * POST    api/v1/staff/register
 */

import Router from '@koa/router';
import createService from '../../middleware/createService';
import { staffService } from '../../service';
import { responseSuccess } from '../../util/response';

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

router.get('/:id', async (ctx) => {
  ctx.body = ctx.params;
});

export default router.routes();
