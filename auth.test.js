
import request from 'supertest';
import mongoose from 'mongoose';
import app, { start } from '../src/server.js';

const testUri = process.env.TEST_MONGODB_URI;

const maybe = (desc, fn) => (testUri ? describe(desc, fn) : describe.skip(desc, fn));

maybe('Auth API', () => {
  let server;
  beforeAll(async () => {
    server = await start();
  });
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.close();
  });

  test('register & login', async () => {
    const email = `user_${Date.now()}@test.com`;

    const reg = await request(app)
      .post('/api/register')
      .send({ username: 'test', email, password: 'password' })
      .expect(201);
    expect(reg.body.token).toBeDefined();

    const login = await request(app)
      .post('/api/login')
      .send({ email, password: 'password' })
      .expect(200);
    expect(login.body.token).toBeDefined();
  });
});
