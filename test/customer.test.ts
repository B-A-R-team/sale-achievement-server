/**
 * test/customer.test.ts 顾客接口测试
 * @author 徐梦宇
 */

import { expect } from 'chai';
import { Server } from 'http';
import request from 'supertest';
import { getConnection } from 'typeorm';
import bootstrap from '../src/app';

describe('# 课程API测试', async () => {
  let server: Server;

  before(async () => {
    server = (await bootstrap()).listen(3000);
  });

  after(async () => {
    await getConnection().close();
    server.close();
  });

  let testCustomerId: number;

  it.skip('# POST 添加顾客', async () => {
    const res = await request(server).post('/api/v1/course').send({
      name: '测试顾客',
      phone: '15315315314',
      school: '这不是个学校',
      age: 13,
      grade: '初一',
      course_id: 1,
      is_paid: true,
      money: 100,
      staff_id: '202000001'
    });
    testCustomerId = res.body.data.id;
    expect(res.body.code).to.be.equal(200);
  });
});
