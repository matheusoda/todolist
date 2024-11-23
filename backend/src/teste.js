const request = require('supertest');
const app = require('./app'); // exporte o Express do seu app

describe('Task Endpoints', () => {
  it('should insert tasks', async () => {
    const response = await request(app)
      .post('/insert-tasks')
      .send([{ description: 'Test task', responsable: 'John', status: 'todo' }]);
    expect(response.statusCode).toBe(201);
  });

  it('should fetch tasks', async () => {
    const response = await request(app).get('/get-tasks');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
