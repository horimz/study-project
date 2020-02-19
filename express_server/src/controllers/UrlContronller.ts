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
  async postUrl(req: Request, res: Response): Promise<void> {
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

  @patch('/url/:id')
  @bodyValidator('url')
  @use(authenticateToken)
  async patchUrl(req: Request, res: Response): Promise<any> {
    const { id: parentFolderId } = req.params;
    const { _id, url: prevUrl, name, description } = req.body;

    try {
      const url = await Url.findOne({
        _id,
        owner: parentFolderId
      });

      if (!url)
        return res.status(404).send({ error: 'Failed to find url document.' });

      url.url = prevUrl;
      url.name = name;
      url.description = description;

      await url.save();

      const contents = await Folder.findAllContent(parentFolderId);
      res.send(contents);
    } catch (e) {
      res.status(500).send({ error: 'Failed to update folder.' });
    }
  }
}
