import { Request, Response } from 'express';
import {
  get,
  controller,
  post,
  bodyValidator,
  use,
  patch,
  del
} from './decorators';
import { authenticateToken } from './middlewares/authenticateToken';
import { responseFormat } from './response/responseFormat';
import { User, IUser, IToken } from '../models/User';

@controller('/api')
export class LoginController {
  @get('/user')
  @use(authenticateToken)
  getLogin(req: Request, res: Response): void {
    const { user } = req;
    res.send(responseFormat(user.toJSON()));
  }

  @post('/user')
  @bodyValidator('transactionTime', 'content')
  async postUser(req: Request, res: Response): Promise<void> {
    const {
      transactionTime,
      content: { email, username, description, password }
    } = req.body;

    try {
      const user = new User({ email, username, description, password });
      await user.save();
      // TODO: send welcome mail
      if (!user.generateAuthToken) throw new Error();
      const token = await user.generateAuthToken();
      res.status(201).send(responseFormat({ user: user.toJSON(), token }));
    } catch (e) {
      res.status(400).send(e);
    }
  }

  @patch('/user')
  @bodyValidator('transactionTime', 'content')
  @use(authenticateToken)
  async patchUser(req: Request, res: Response): Promise<any> {
    const {
      transactionTime,
      content: { username, description }
    } = req.body;
    if (!username) throw new Error();

    try {
      const user = await User.findOne({ _id: req.user._id });
      if (!user) return res.status(404).send();
      user.username = username;
      user.description = description;
      await user.save();
      res.send();
    } catch (e) {
      res.status(500).send(e);
    }
  }

  @del('/user')
  @use(authenticateToken)
  async deleteUser(req: Request, res: Response): Promise<any> {
    try {
      const user = await User.findOne({ _id: req.user._id });
      if (!user) return res.status(404).send();
      user.remove();
      res.send();
    } catch (e) {
      res.status(500).send(e);
    }
  }

  @post('/login')
  @bodyValidator('transactionTime', 'content')
  async postLogin(req: Request, res: Response): Promise<void> {
    const {
      transactionTime,
      content: { email, password }
    } = req.body;

    try {
      const user: IUser = await User.findByCredentials(email, password);
      if (!user.generateAuthToken) throw new Error();
      const token = await user.generateAuthToken();
      res.send(responseFormat({ user, token }));
    } catch (e) {
      res.status(400).send(e);
    }
  }

  @post('/logout')
  @bodyValidator('transactionTime')
  @use(authenticateToken)
  async postLogout(req: Request, res: Response): Promise<any> {
    try {
      const { tokens } = req.user;
      if (!tokens) throw new Error();
      req.user.tokens = tokens.filter((token: IToken) => {
        return token.token != req.token;
      });
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  }
}
