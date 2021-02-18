/** @format */

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from './../app';

declare global {
  namespace NodeJS {
    interface Global {
      getCookie(): Promise<string[]>;
    }
  }
}

let mongo: any;
beforeAll(async () => {
  /**Environmental Variables*/

  process.env.JWT_KEY = 'asasadasfaewer';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  });
});

beforeEach(async () => {
  /** DELETE all the collections available*/
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.getCookie = async () => {
  const email = 'test@test.com';
  const password = 'passwod';

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201);

  const cookie = response.get('Set-Cookie');
  return cookie;
};
