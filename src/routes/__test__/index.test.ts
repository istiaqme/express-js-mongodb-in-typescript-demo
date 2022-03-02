import request from 'supertest';
import { app } from '../../app';
import { User } from '../../models/user';

it('checks if user can only purchase once', async () => {
  const user = new User({email: 'test@email.com', minutes: 1});
  await user.save();

  await Promise.all([
    request(app)
      .get('/purchase')
      .expect(200)
    ,
    request(app)
      .get('/purchase')
      .expect(400)
    ]
  )
});