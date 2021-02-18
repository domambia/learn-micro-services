/** @format */

import request from 'supertest';
import { app } from './../../app';

it('returns a 400 with missing either email or password', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@email.com' })
    .expect(400);
  await request(app)
    .post('/api/users/signin')
    .send({ password: 'password' })
    .expect(400);
});

it('sets a cookie after sucessful signin', async () => {
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

/**Unique */
it('fails when an email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@email.com',
      password: 'password',
    })
    .expect(201);
  // signin
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@email.com',
      password: 'passw@rd',
    })
    .expect(400);
});

it('responds with a cookie when supplied with correct credentials', async () => {
  // create user
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@email.com',
      password: 'password',
    })
    .expect(201);
  // signin
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@email.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
