import request from 'supertest';
import { Listing } from '../src/models/Listing';
import dataSource from '../src/config/db';
import { app } from '../src/app';

beforeAll(async () => {
  await dataSource.initialize();
  await dataSource.synchronize(true); // Drop schema and sync
});

afterAll(async () => {
  await dataSource.destroy();
});

describe('Saved Listing Controller', () => {
  let userId: number;
  let listingId: number;
  let savedListingId: number;

  beforeAll(async () => {
    // Create a user
    const userRes = await request(app).post('/api/users').send({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password1',
    });
    userId = userRes.body.id;

    // Create a listing (assuming there's an endpoint for this)
    const listing = Listing.create({
      address: '1 Hibble St',
      suburb: 'West Ryde',
      state: 'NSW',
      postcode: 2114,
    });
    await listing.save();
    listingId = listing.id;
  });

  it('should create a saved listing', async () => {
    const res = await request(app).post(`/api/saved-listings`).send({ userId, listingId });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    savedListingId = res.body.id;
  });

  it('should get saved listings for a user', async () => {
    const res = await request(app).get(`/api/saved-listings/user/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should get users count for a listing', async () => {
    const res = await request(app).get(`/api/saved-listings/count/${listingId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('count', 1);
  });

  it('should delete a saved listing', async () => {
    const res = await request(app).delete(`/api/saved-listings/${savedListingId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Saved Listing deleted');
  });
});
