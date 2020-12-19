/**
 * src/app.ts 项目入口
 * @author 徐梦宇
 */

import Koa from 'koa';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';
import router from './router';
import { logger } from './middleware/logger';
import { catchError } from './middleware/catchError';
import connectDb from './model';

async function bootstrap() {
  await connectDb();

  const app = new Koa();

  app.use(cors());
  app.use(bodyParser());

  app.use(logger());
  app.use(catchError());
  app.use(router.routes()).use(router.allowedMethods());

  return app;
}

export default bootstrap;
