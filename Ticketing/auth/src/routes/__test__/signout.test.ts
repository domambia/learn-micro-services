/** @format */

import request from 'supertest';
import { app } from './../../app';

it('clears cookies after signing out', async () => {
  const resp = await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@email.com', password: 'password' })
    .expect(201);
  const response = await request(app)
    .post('/api/users/signout')
    .set({ Cookie: resp.get('Set-Cookie') })
    .send({})
    .expect(200);
});
