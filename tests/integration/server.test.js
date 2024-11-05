const request = require('supertest');
const app = require('../server'); // Adjust the path if necessary

describe('API Endpoints', () => {
  it('POST /register creates a new user', async () => {
    const response = await request(app).post('/register').send({
      username: 'testuser',
      password: 'testpass'
    });
    expect(response.statusCode).toBe(302); // Assuming redirect on success
  });

  it('POST /login logs in a user', async () => {
    const response = await request(app).post('/login').send({
      username: 'testuser',
      password: 'testpass'
    });
    expect(response.statusCode).toBe(302); // Assuming redirect on success
  });

  it('GET /my-lists retrieves tasks', async () => {
    const response = await request(app).get('/my-lists');
    expect(response.statusCode).toBe(200);
  });
});