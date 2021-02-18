/** @format */

import request from 'supertest';
import { app } from './../../app';

it('returns a 201 on sucessful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@email.com',
      password: 'password',
    })
    .expect(201);
});

it('returns a 400 with an invalid email or password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test.com',
      password: 'password',
    })
    .expect(400);
});

it('returns a 400 with an invalid password of not between 4 and 20 characters', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@email.com',
      password: 'pas',
    })
    .expect(400);
});

it('returns a 400 with missing either email or password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@email.com' })
    .expect(400);
  await request(app)
    .post('/api/users/signup')
    .send({ password: 'password' })
    .expect(400);
});

it('disallows duplicate email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@email.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@email.com',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie after sucessful signup', async () => {
  //response simillar to Response form express
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@email.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
