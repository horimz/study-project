import { Request, Response } from 'express';
import { get, controller } from './decorators';
import path from 'path';

@controller('')
export class RootController {
  @get('/*')
  getReactCode(req: Request, res: Response): void {
    // TODO: fix manifest syntax error
    res.sendFile(path.resolve(__dirname, '../../../client/build/index.html'));
  }
}
