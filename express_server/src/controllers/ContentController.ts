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
import { Folder } from '../models/Folder';
import { Url } from '../models/Url';

@controller('/api')
export class ContentController {
  @post('/contents')
  @bodyValidator('folders', 'urls')
  @use(authenticateToken)
  async postSubFolder(req: Request, res: Response): Promise<void> {
    const { folders, urls } = req.body;

    try {
      Folder.deleteFolders(folders);
      Url.deleteUrls(urls);
      res.send();
    } catch (e) {
      res.status(500).send({ error: 'Failed to delete contets.' });
    }
  }
}
