/**
 * test/customer.test.ts 顾客接口测试
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

  let testCustomerId: number;

  it.skip('# POST 添加顾客', async () => {
    const res = await request(server)
      .post('/api/v1/course')
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: '测试顾客x',
        phone: '12345678945',
        wechat: 'xxx',
        school: '第一一一中学',
        age: '19',
        grade: '高一',
        course_id: '2',
        is_paid: 'true',
        money: '800',
        staff_id: '202000002',
      });
    testCustomerId = res.body.data.id;
    expect(res.body.code).to.be.equal(200);
  });
});
