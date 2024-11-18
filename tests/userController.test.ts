import request from 'supertest';
import dataSource from '../src/config/db';
import { app } from '../src/app';

beforeAll(async () => {
  await dataSource.initialize();
  await dataSource.synchronize(true); // Drop schema and sync
});

afterAll(async () => {
  await dataSource.destroy();
});

describe('User API Endpoints', () => {
  let userId: number;
  it('should create a new user', async () => {
    const res = await request(app).post('/api/users').send({
      name: 'Sammy1',
      email: 'sammy1@a.com',
      password: 'password1',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    userId = res.body.id;
  });

  it('should get a user by id', async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', userId);
  });

  it('should update a user', async () => {
    const res = await request(app).put(`/api/users/${userId}`).send({ name: 'Sammy2' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User updated successfully.');
  });

  it('should delete a user', async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User deleted successfully.');
  });
});
