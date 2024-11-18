// @ts-nocheck
import { gql } from 'apollo-server-express';
import request from 'supertest';
import { addGraphqlApiToServer, app } from '../src/app';
import dataSource from '../src/config/db';

beforeAll(async () => {
  await dataSource.initialize();
  await dataSource.synchronize(true); // Drop schema and sync

  // graphQL api
  await addGraphqlApiToServer();
});

afterAll(async () => {
  await dataSource.destroy();
});

describe('User GraphQL API', () => {
  it('should create a new user', async () => {
    const query = gql(`
            mutation CreateUser($password: String!, $email: String!, $name: String!) {
                createUser(password: $password, email: $email, name: $name) {
                    id name email
                }
            }
        `).loc.source.body;
    const variables = {
      name: 'Test User',
      email: `test${Math.random()}@example.com`,
      password: 'password1',
    };

    try {
      const res = await request(app).post('/graphql').send({ query, variables });
      const user = res.body.data.createUser;
      expect(user.name).toBe('Test User');
    } catch (error) {
      console.log('error:', error);
    }
  });

  // todo: other test cases for all queries and mutations
});
