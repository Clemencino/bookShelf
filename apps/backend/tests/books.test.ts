import request from 'supertest'
import { app } from '../src/app'

describe('Books API', () => {

  it('GET /get_books', async () => {
    const response = await request(app).get('/get_books');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /get_book', async () => {
    const response = await request(app).get('/get_books');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  })
});
