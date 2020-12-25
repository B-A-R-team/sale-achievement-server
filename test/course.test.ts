/**
 * test/course.test.ts 课程接口测试
 * @author 徐梦宇
 */

import { expect } from 'chai';
import { Server } from 'http';
import request from 'supertest';
import { getConnection } from 'typeorm';
import bootstrap from '../src/app';
import generateToken from '../src/util/generateToken';

describe('# 课程API测试', async () => {
  let server: Server;
  let token: string;

  before(async () => {
    server = (await bootstrap()).listen(3000);
    token = generateToken('202000000');
  });

  after(async () => {
    await getConnection().close();
    server.close();
  });

  it('# GET 查询所有课程', async () => {
    const res = await request(server).get('/api/v1/course');
    expect(res.body.code).to.be.equal(200);
  });

  it('# GET 查询某门课程', async () => {
    const res = await request(server).get('/api/v1/course/1');
    expect(res.body.code).to.be.equal(200);
  });

  let testCourseId: number;

  it('# POST 添加课程', async () => {
    const res = await request(server)
      .post('/api/v1/course')
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: '测试课程a',
        teacher: '测试教师a',
        price: 1,
      });
    testCourseId = res.body.data.id;
    expect(res.body.code).to.be.equal(200);
  });

  it('# PUT 修改课程', async () => {
    const res = await request(server)
      .put(`/api/v1/course/${testCourseId}`)
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: '测试课程b',
        teacher: '测试教师b',
        price: 1,
      });
    expect(res.body.code).to.be.equal(200);
  });

  it('# DELETE 删除课程', async () => {
    const res = await request(server)
      .delete(`/api/v1/course/${testCourseId}`)
      .set('Authorization', 'Bearer ' + token);

    expect(res.body.code).to.be.equal(200);
  });
});
