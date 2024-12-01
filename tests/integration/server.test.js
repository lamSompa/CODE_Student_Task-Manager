const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
  describe('POST /register', () => {
    it('should create a new user', async () => {
      const response = await request(app).post('/register').send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpass'
      });
      expect(response.statusCode).toBe(302); // Assuming redirect on success
    });

    it('should not create a user with an existing username', async () => {
      const response = await request(app).post('/register').send({
        username: 'testuser',
        email: 'testuser2@example.com',
        password: 'testpass'
      });
      expect(response.statusCode).toBe(400);
      expect(response.text).toContain('Username already exists.');
    });
  });

  describe('POST /login', () => {
    it('should log in a user', async () => {
      const response = await request(app).post('/login').send({
        username: 'testuser',
        password: 'testpass'
      });
      expect(response.statusCode).toBe(302); // Assuming redirect on success
    });

    it('should not log in with incorrect password', async () => {
      const response = await request(app).post('/login').send({
        username: 'testuser',
        password: 'wrongpass'
      });
      expect(response.statusCode).toBe(401);
      expect(response.text).toContain('Invalid credentials');
    });
  });

  describe('Task Operations', () => {
    let taskId;

    it('should create a new task', async () => {
      const response = await request(app).post('/tasks').send({
        title: 'New Task',
        description: 'Task description',
        badge: 'Normal'
      }).set('Cookie', 'session=valid-session-cookie');
      expect(response.statusCode).toBe(302);
      // Capture task ID from response if available
    });

    it('should retrieve tasks for authenticated user', async () => {
      const response = await request(app).get('/my-lists').set('Cookie', 'session=valid-session-cookie');
      expect(response.statusCode).toBe(200);
      // Check response body for tasks
    });

    it('should update a task', async () => {
      const response = await request(app).post(`/tasks/${taskId}/edit`).send({
        title: 'Updated Task',
        description: 'Updated description',
        badge: 'Urgent'
      }).set('Cookie', 'session=valid-session-cookie');
      expect(response.statusCode).toBe(302);
    });

    it('should delete a task', async () => {
      const response = await request(app).post(`/tasks/${taskId}/delete`).set('Cookie', 'session=valid-session-cookie');
      expect(response.statusCode).toBe(302);
    });
  });
});