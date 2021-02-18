/** @format */

import request from 'supertest';
import { app } from './../../app';

it('responds with details about the current user', async () => {
  const cookie = await global.getCookie();
  const response = await request(app)
    .post('/api/users/signout')
    .set('Cookie', cookie)
    .send({})
    .expect(200);
  //   expect(response.body.currentUser).toEqual('test@test.com');
});
