import express, { Request, Response} from 'express';
import { User } from '../models/user';
import { handle } from '../requests/signupRequest';
import { newUser } from '../services/User';
const router = express.Router();

/**
 * User would be able to sign up using email & password
 * 
 * email must be valid & unique
 * password must contain at least one number, one lowercase and one uppercase letter
 * 
 * if user is created, send status 201
 * else
 * return res.sendStatus(400);
 */
router.post('/signup', handle, async (req: Request, res: Response) => {
  try {
    await newUser({
      email : req.body.email,
      password : req.body.password
    })
    res.sendStatus(201);
  }
  catch(error){
    res.sendStatus(400);
  }
});


/**
 * User would be able to sign in using email & password
 * 
 * return JWT token if user is found
 */
router.post('/signin', async (req: Request, res: Response) => {

});

/**
 * When a user visits this endpoint, we need to deduct one minute from their account.
 * 
 * User might hit this endpoint concurrently, so we need to ensure that he always has a minute to do so.
 * 
 * if user has minutes (user.minutes)
 * return res.send('Hello World!'); 
 * else
 * return res.sendStatus(400);
*/
router.get('/purchase', async(req: Request, res: Response) => {
  // your code
  const user = await User.findOne({email: 'test@email.com'});
  if(user){
    if(user.minutes < 1) {
      res.sendStatus(400)
    }
    else {
      await User.findOneAndUpdate(
        {email: 'test@email.com'},
        {minutes : user.minutes - 1}
      )
      res.send('Hello World!');
    }
  }
  res.sendStatus(400);

});


export { router as routes };
