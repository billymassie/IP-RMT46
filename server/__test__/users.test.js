const app = require('../app');
const req = require('supertest');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

const userData = { email: 'admin@mail.com', password: 'admin' };
describe('POST /users/register', () => {
  describe('success', () => {
    test('should return 200', async () => {
      let res = await req(app).post('/users/register').send(userData);
      expect(res.status).toBe(200);
    });
  });
  describe('failed', () => {
    test('should return 400 bad request', async () => {
      let res = await req(app)
        .post('/users/register')
        .send({ email: '', password: '' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Email is required');
    });
    test('should return 400 bad request', async () => {
      let res = await req(app)
        .post('/users/register')
        .send({ email: 'testing@mail.com' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Password is required');
    });
    test('should return 400 bad request', async () => {
      let res = await req(app)
        .post('/users/register')
        .send({ email: '$%*$%&asdf', password: 'admin' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid email');
    });
  });
});

describe('POST /users/login', () => {
  describe('success', () => {
    test('should return 200', async () => {
      let res = await req(app).post('/users/login').send(userData);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('access_token', expect.any(String));
    });
  });
  describe('fail', () => {
    test('should return 400', async () => {
      let res = await req(app)
        .post('/users/login')
        .send({ email: '', password: '' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid email or password');
    });
    test('should return 400', async () => {
      let res = await req(app)
        .post('/users/login')
        .send({ email: 'admin@mail.com', password: '' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid email or password');
    });
    test.only('should return 400', async () => {
      let res = await req(app)
        .post('/users/login')
        .send({ email: '', password: 'admin' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid email or password');
    });
  });
});

beforeAll(async () => {
  await queryInterface.bulkDelete('Users', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
