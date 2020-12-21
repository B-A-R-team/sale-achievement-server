import { Context } from 'koa';

type CheckRoute = {
  path: RegExp | string;
  method: string | string[];
};

const notCheckApi: CheckRoute[] = [
  {
    path: /^\/api\/v1\/course*/,
    method: 'GET',
  },
  {
    path: /^\/api\/v1\/customer/,
    method: 'POST',
  },
];

const specialApi = ['/api/v1/register', '/api/v1/login'];

function isInApiArr(path: string, method: string) {
  return notCheckApi.some((route) => {
    if (route.path instanceof RegExp) {
      return route.path.test(path) && route.method === method;
    }
    return route.path === path && route.method === method;
  });
}

export default function checkApi(ctx: Context): boolean {
  if (isInApiArr(ctx.path, ctx.method)) {
    return true;
  }
  if (specialApi.includes(ctx.path)) {
    return true;
  }
  return false;
}
