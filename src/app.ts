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
import showRoutes from './util/showRoutes';
import jwt from 'koa-jwt';
import { JWT_SECRET } from './util/constant';
import checkApi from './util/checkToken';
import sslify from 'koa-sslify';

async function bootstrap(mode: string = '') {
  await connectDb();

  const app = new Koa();

  if (mode === 'production') {
    app.use(sslify());
  }

  app.use(cors());
  app.use(bodyParser());
  app.use(catchError());
  app.use(
    jwt({ secret: JWT_SECRET }).unless({
      custom: (ctx) => {
        return checkApi(ctx);
      },
    })
  );

  app.use(logger());
  app.use(router.routes()).use(router.allowedMethods());

  // 显示所有已注册的路由
  showRoutes(router);

  return app;
}

export default bootstrap;
