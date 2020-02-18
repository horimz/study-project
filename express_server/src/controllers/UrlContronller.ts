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
export class UrlController {
  @post('/url/:id')
  @bodyValidator('url')
  @use(authenticateToken)
  async postSubFolder(req: Request, res: Response): Promise<void> {
    const { id: folderId } = req.params;

    try {
      const url = new Url({ ...req.body, owner: folderId });
      await url.save();

      const contents = await Folder.findAllContent(folderId);
      res.send(contents);
    } catch (e) {
      res.status(500).send({ error: 'Failed to add url.' });
    }
  }
}
