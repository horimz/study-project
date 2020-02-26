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
import { Folder, FolderTypes } from '../models/Folder';

@controller('/api')
export class LoginController {
  // Send user information based on token
  @get('/user')
  @use(authenticateToken)
  getLogin(req: Request, res: Response): void {
    res.send(responseFormat(req.user.toJSON()));
  }

  // Create new user
  @post('/user')
  @bodyValidator('transactionTime', 'content')
  async postUser(req: Request, res: Response): Promise<void> {
    try {
      // Create new user
      const user = new User(req.body.content);
      await user.save();

      // Create root folder
      const rootFolder = new Folder({
        folderName: 'Root',
        type: FolderTypes.root,
        owner: user._id
      });
      await rootFolder.save();

      // TODO: send welcome mail

      // Generate json web token
      if (!user.generateAuthToken) throw new Error();
      const token = await user.generateAuthToken();

      // Send response
      res.status(201).send(responseFormat({ user: user.toJSON(), token }));
    } catch (e) {
      res.status(400).send(e);
    }
  }

  // Update user information
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
      // Find user
      const user = await User.findOne({ _id: req.user._id });
      if (!user) return res.status(404).send();

      // Update user information
      user.username = username;
      user.description = description;

      // Save updated user
      await user.save();

      res.send();
    } catch (e) {
      res.status(500).send(e);
    }
  }

  // Delete user account
  @del('/user')
  @use(authenticateToken)
  async deleteUser(req: Request, res: Response): Promise<any> {
    try {
      // Find user
      const user = await User.findOne({ _id: req.user._id });
      if (!user) return res.status(404).send();

      // Delete user
      user.remove();

      res.send();
    } catch (e) {
      res.status(500).send(e);
    }
  }

  // Send user information and generate token after when user credentials are verified
  @post('/login')
  @bodyValidator('transactionTime', 'content')
  async postLogin(req: Request, res: Response): Promise<void> {
    const {
      transactionTime,
      content: { email, password }
    } = req.body;

    try {
      // Find user based on credentials
      const user: IUser = await User.findByCredentials(email, password);

      // Generate json web token
      if (!user.generateAuthToken) throw new Error();
      const token = await user.generateAuthToken();

      // Send response
      res.send(responseFormat({ user, token }));
    } catch (e) {
      res.status(400).send(e);
    }
  }

  // Remove token from user
  @post('/logout')
  @bodyValidator('transactionTime')
  @use(authenticateToken)
  async postLogout(req: Request, res: Response): Promise<any> {
    try {
      const { tokens } = req.user;
      if (!tokens) throw new Error();

      // Remove "one" token send from device
      req.user.tokens = tokens.filter((token: IToken) => {
        return token.token != req.token;
      });

      // Save updated user
      await req.user.save();

      res.send();
    } catch (e) {
      res.status(500).send();
    }
  }
}
