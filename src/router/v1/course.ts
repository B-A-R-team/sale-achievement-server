/**
 * router/v1/course.ts 课程路由
 * @author 徐梦宇
 * @description
 * GET     api/v1/course
 * POST    api/v1/course
 * GET     api/v1/course/:id
 * PUT     api/v1/course/:id
 * DELETE  api/v1/course/:id
 */

import Router from '@koa/router';
import createService from '../../middleware/createService';
import courseService from '../../service/course';
import { responseSuccess } from '../../util/response';

const router = new Router({
  prefix: 'course',
});

const service = createService(courseService);

// api/v1/course
router
  .get('/', async (ctx) => {
    const courses = await service().getCourses();
    ctx.body = responseSuccess(courses);
  })
  .post('/', async (ctx) => {
    const result = await service().addCourse(ctx.request.body);
    ctx.body = responseSuccess(result.identifiers[0]);
  });

// api/v1/course/:id
router
  .get('/:id', async (ctx) => {
    const course = await service().getCourse(+ctx.params.id);
    ctx.body = responseSuccess(course);
  })
  .put('/:id', async (ctx) => {
    const result = await service().updateCourse(
      +ctx.params.id,
      ctx.request.body
    );
    ctx.body = responseSuccess(result);
  })
  .delete('/:id', async (ctx) => {
    const result = await service().deleteCourse(+ctx.params.id);
    ctx.body = responseSuccess(result);
  });

export default router.routes();
