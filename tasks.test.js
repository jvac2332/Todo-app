
import request from 'supertest';
import mongoose from 'mongoose';
import app, { start } from '../src/server.js';

const testUri = process.env.TEST_MONGODB_URI;
const maybe = (desc, fn) => (testUri ? describe(desc, fn) : describe.skip(desc, fn));

maybe('Tasks API', () => {
  let server, token;
  beforeAll(async () => {
    server = await start();
    const email = `tasks_${Date.now()}@test.com`;
    const reg = await request(app)
      .post('/api/register')
      .send({ username: 'tasker', email, password: 'password' })
      .expect(201);
    token = reg.body.token;
  });
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.close();
  });

  test('CRUD flow', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'First Task', description: 'Hello' })
      .expect(201);

    const list = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(Array.isArray(list.body)).toBe(true);

    const updated = await request(app)
      .put(`/api/tasks/${created.body._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ completed: true, title: 'First Task (updated)' })
      .expect(200);
    expect(updated.body.completed).toBe(true);

    await request(app)
      .delete(`/api/tasks/${created.body._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });
});
