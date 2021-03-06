import { Context } from 'koa';
import { responseError } from '../util/response';

export function catchError() {
  return async (ctx: Context, next: () => Promise<void>) => {
    try {
      await next();
    } catch (error) {
      ctx.body = responseError(error);
    }
  };
}
