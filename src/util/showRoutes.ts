import Router from '@koa/router';

/**
 * 显示所有已注册的路由
 * @param router 路由
 */
export default function showRoutes(router: Router) {
  router.stack.forEach((item) => {
    const method = item.methods.filter((item) => item !== 'HEAD');
    console.log(`${method}\t${item.path}`);
  });
}
