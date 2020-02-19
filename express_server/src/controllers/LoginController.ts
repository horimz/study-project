import { Request, Response, Router } from 'express';
import { get, controller, post, bodyValidator, use } from './decorators';
import { authenticateToken } from './middlewares/authenticateToken';
import { User, IUser, IToken } from '../models/User';

@controller('/api')
export class LoginController {
  @get('/user')
  @use(authenticateToken)
  getLogin(req: Request, res: Response): void {
    const { user, token } = req;
    res.send({ user, token });
  }

  @post('/user')
  @bodyValidator('email', 'username', 'password')
  async postUser(req: Request, res: Response): Promise<void> {
    try {
      const user = new User(req.body);
      await user.save();
      // TODO: send welcome mail

      if (!user.generateAuthToken)
        throw new Error('Failed to generate auth token.');

      const token = await user.generateAuthToken();

      res.status(201).send({ user, token });
    } catch (e) {
      console.log('Failed to add user.');
      res.status(400).send(e);
    }
  }

  @post('/login')
  @bodyValidator('email', 'password')
  async postLogin(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const user: IUser = await User.findByCredentials(email, password);

      if (!user.generateAuthToken)
        throw new Error('Failed to generate auth token.');

      const token = await user.generateAuthToken();

      res.send({ user, token });
    } catch (e) {
      res.status(400).send(e);
    }
  }

  @post('/logout')
  @use(authenticateToken)
  async postLogout(req: Request, res: Response): Promise<any> {
    try {
      const { tokens } = req.user;

      if (!tokens) throw new Error('Failed to find token.');

      req.user.tokens = tokens.filter((token: IToken) => {
        return token.token != req.token;
      });

      await req.user.save();

      res.send('Logout was successful.');
    } catch (e) {
      res.status(500).send();
    }
  }
}
