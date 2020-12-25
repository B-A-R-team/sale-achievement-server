/**
 * router/v1/customer.ts 顾客路由
 * @author 徐梦宇
 * @description
 * GET     api/v1/customer
 * POST    api/v1/customer
 * GET     api/v1/customer/:id
 */

import Router from '@koa/router';
import createService from '../../middleware/createService';
import { customerService } from '../../service';
import { responseSuccess } from '../../util/response';

const router = new Router({
  prefix: 'customer',
});

const service = createService(customerService);

// api/v1/customer
router
  .get('/', async (ctx) => {
    const customers = await service().getCustomers();
    ctx.body = responseSuccess(customers);
  })
  .post('/', async (ctx) => {
    const result = await service().addCustomer(ctx.request.body);
    ctx.body = responseSuccess(result.identifiers[0]);
  });

// api/v1/customer/:id
router.get('/:id', async (ctx) => {
  const customer = await service().getCustomer(+ctx.params.id);
  ctx.body = responseSuccess(customer);
});

export default router.routes();
