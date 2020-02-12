import { Request, Response } from 'express';
import { get, controller, post, bodyValidator } from './decorators';

@controller('')
export class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send('login route.');
  }

  @post('/login')
  @bodyValidator('username', 'password')
  postLogin(req: Request, res: Response): void {}

  @get('/logout')
  getLogout(req: Request, res: Response) {
    res.send('logout route.');
  }
}
