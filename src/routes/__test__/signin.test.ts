import request from 'supertest';
import { app } from '../../app';

it('receives 200 status if everything is ok', async () => {
  await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: 'Password1'
    })
    .expect(201);

  await request(app)
    .post('/signin')
    .send({
      email: 'test@test.com',
      password: 'Password1'
    })
    .expect(200);
});

it('fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post('/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: 'Password1'
    })
    .expect(201);

  await request(app)
    .post('/signin')
    .send({
      email: 'test@test.com',
      password: 'wrongpassword'
    })
    .expect(400);
});

