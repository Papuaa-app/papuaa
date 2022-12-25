'use strict';

import app from '../core/index';
import request from 'supertest';
import { api } from '../core/config';

describe('/session/login', () => {

  const endpoint = `${api.prefix}/session/login`;

  test('Try login without credentials', async () => {
    const res = await request(app).post(endpoint);
    expect(res.statusCode).toBe(400);
  });

  test('Try login without email', async () => {
    const res = await request(app).post(endpoint).send({
      password: 'test1234',
    });
    expect(res.statusCode).toBe(400);
  });

  test('Try login without password', async () => {
    const res = await request(app).post(endpoint).send({
      email: 'test@test.com',
    });
    expect(res.statusCode).toBe(400);
  });

});