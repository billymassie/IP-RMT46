const app = require('../app');
const req = require('supertest');
const { sequelize, User } = require('../models');
const { signToken } = require('../helpers/jsonwebtoken');
const { queryInterface } = sequelize;

const movieData = {
  title: 'Poor Things',
  posterUrl:
    'https://image.tmdb.org/t/p/original/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
  backdropUrl:
    'https://image.tmdb.org/t/p/original/bQS43HSLZzMjZkcHJz4fGc7fNdz.jpg',
  overview:
    'Brought back to life by an unorthodox scientist, a young woman runs off with a debauched lawyer on a whirlwind adventure across the continents. Free from the prejudices of her times, she grows steadfast in her purpose to stand for equality and liberation.',
  tmdbId: 792307,
};

describe('GET /users/list', () => {
  describe('success', () => {
    test('should return 200', async () => {
      let res = await req(app)
        .get('/users/list')
        .set('Authorization', `Bearer ${firstUserToken}`);
      expect(res.status).toBe(200);
    });
  });
});
describe('GET /movies', () => {
  describe('success', () => {
    test('should return 200', async () => {
      let res = await req(app)
        .get('/movies')
        .set('Authorization', `Bearer ${firstUserToken}`);
      expect(res.status).toBe(200);
    });
  });
});
describe('POST /movies', () => {
  describe('success', () => {
    test('should return 200', async () => {
      let res = await req(app)
        .post('/movies')
        .send(movieData)
        .set('Authorization', `Bearer ${firstUserToken}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'movie has been added');
    });
  });
  describe('failed', () => {
    test('should return 400', async () => {
      let res = await req(app)
        .post('/movies')
        .send({
          title: '',
          posterUrl: '',
          backdropUrl: '',
          overview: '',
          tmdbId: '',
        })
        .set('Authorization', `Bearer ${firstUserToken}`);
      expect(res.status).toBe(500);
    });
  });
});
describe('GET /users/my-movies', () => {
  describe('success', () => {
    test('should return 200', async () => {
      let res = await req(app)
        .get('/users/my-movies')
        .set('Authorization', `Bearer ${firstUserToken}`);
      expect(res.status).toBe(200);
    });
  });
  describe('failed', () => {
    test('should return 401', async () => {
      let res = await req(app)
        .get('/users/my-movies')
        .set('Authorization', `Bearer `);
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Unauthenticated');
    });
  });
});
describe('PUT /users/my-movies/:id', () => {
  describe('success', () => {
    test('should return 200', async () => {
      let res = await req(app)
        .put('/users/my-movies/1')
        .send({ UserId: 2 })
        .set('Authorization', `Bearer ${firstUserToken}`);
      expect(res.status).toBe(200);
    });
  });
  describe('failed', () => {
    test('should return 404', async () => {
      let res = await req(app)
        .put('/users/my-movies/4')
        .send({ UserId: 2 })
        .set('Authorization', `Bearer ${firstUserToken}`);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Data Not Found');
    });
    test('should return 404', async () => {
      let res = await req(app)
        .put('/users/my-movies/1')
        .send({ UserId: 9 })
        .set('Authorization', `Bearer ${firstUserToken}`);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Data Not Found');
    });
  });
});
describe('DELETE /users/my-movies/:id', () => {
  describe('success', () => {
    test('should return 200', async () => {
      let res = await req(app)
        .delete('/users/my-movies/1')
        .set('Authorization', `Bearer ${secondUserToken}`);
      expect(res.status).toBe(200);
    });
  });
  describe('failed', () => {
    test('should return 404', async () => {
      let res = await req(app)
        .delete('/users/my-movies/6')
        .set('Authorization', `Bearer ${secondUserToken}`);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Data Not Found');
    });
    test('should return 401', async () => {
      let res = await req(app)
        .delete('/users/my-movies/1')
        .set('Authorization', `Bearer `);
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Unauthenticated');
    });
  });
});

let firstUserToken = '';
let secondUserToken = '';
beforeAll(async () => {
  await queryInterface.bulkDelete('Users', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await User.create({
    email: 'admin2@mail.com',
    password: 'admin',
  });
  await User.create({
    email: 'admin3@mail.com',
    password: 'admin',
  });
  firstUserToken = signToken({
    id: 1,
  });
  secondUserToken = signToken({
    id: 2,
  });
});
