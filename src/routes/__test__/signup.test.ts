import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: 'Password1'
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/signup')
    .send({
      email: 'alskdflaskjfd',
      password: 'Password1'
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/signup')
    .send({
      email: 'alskdflaskjfd',
      password: 'p'
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com'
    })
    .expect(400);

  await request(app)
    .post('/signup')
    .send({
      password: 'Password1'
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: 'Password1'
    })
    .expect(201);

  await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: 'Password1'
    })
    .expect(400);
});

