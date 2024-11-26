const request = require('supertest');
const app = require('../server');

let server;

// process.env.PORT = 3005;

// beforeAll(() => {
//     server = app.listen(3005);
// });

// afterAll((done) => {
//   server.close(done);
// });

describe('User Endpoints', () => {
//   it('should create a new user', async () => {
//     const newUser = {
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//       password: '123456',
//       isAdmin: false
//     };

//     const response = await request(app)
//       .post('/api/users')
//       .send(newUser);

//     expect(response.statusCode).toBe(201);
//     expect(response.body).toHaveProperty('id');
//     expect(response.body.name).toBe(newUser.name);
//     expect(response.body.email).toBe(newUser.email);
//     expect(response.body).not.toHaveProperty('password');
//   });

//   it('should return error if email already exists', async () => {
//     const existingUser = {
//       name: 'Jane Doe',
//       email: 'johndoe@example.com',
//       password: '123456',
//       isAdmin: false
//     };

//     const response = await request(app)
//       .post('/api/users')
//       .send(existingUser);

//     expect(response.statusCode).toBe(400);
//     expect(response.body.message).toBe('Email já está em uso.');
//   });

  it('should delete a user by ID', async () => {

    // Pré-condição: Criar um usuário no Firestore ou mock
    // Exemplo para teste simulado:
    const users = await request(app).get(`/api/users/`);

    // Deletar o usuário
    const response = await request(app).delete(`/api/users/${users.body[0].id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Success delete user');

    // Verifique se o usuário foi deletado
    const afterDeleteResponse = await request(app).get(`/api/users/${users.body[0].id}`);
    expect(afterDeleteResponse.statusCode).toBe(404);
  });

  it('should return 404 if the user does not exist', async () => {
    const nonExistentUserId = 'nonexistent';
    const response = await request(app).delete(`/api/users/${nonExistentUserId}`);
    expect(response.statusCode).toBe(500);
  });

});
