import { expect } from 'chai';
import { Server } from 'http';
import request from 'supertest';
import { getConnection } from 'typeorm';
import bootstrap from '../src/app';

describe('# [test app]', async () => {
  let server: Server;

  before(async () => {
    server = (await bootstrap()).listen(3000);
  });

  after(async () => {
    await getConnection().close();
    server.close();
  });

  it('# GET api/v1', async () => {
    const res = await request(server).get('/api/v1');
    expect(res.body.code).to.be.equal(200);
  });
});
