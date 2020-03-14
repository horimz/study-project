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
import { Url } from '../models/Url';
import { responseFormat } from './response/responseFormat';

@controller('/api')
class UrlController {
  @get('/urls')
  @use(authenticateToken)
  async getAllUrls(req: Request, res: Response): Promise<any> {
    try {
      const urls = await Url.findAllUrls(req.user._id);

      if (!urls) {
        return res.status(404).send();
      }

      res.send(responseFormat({ urls }));
    } catch (e) {
      res.status(500).send(e);
    }
  }

  @get('/urls/:id')
  @use(authenticateToken)
  async getUrlsInFolder(req: Request, res: Response): Promise<any> {
    const { id: parentFolderId } = req.params;

    try {
      const urls = await Url.findAllUrlsInFolder(req.user._id, parentFolderId);

      if (!urls) {
        return res.status(404).send();
      }

      res.send(responseFormat({ urls }));
    } catch (e) {
      res.status(500).send(e);
    }
  }

  @post('/urls')
  @bodyValidator('transactionTime', 'content')
  @use(authenticateToken)
  async createUrl(req: Request, res: Response): Promise<void> {
    const { url, alias, description, parentFolderId } = req.body.content;

    try {
      const newUrl = new Url({
        url,
        alias,
        description,
        owner: req.user._id,
        parentFolderId
      });

      await newUrl.save();

      res.send(responseFormat(newUrl));
    } catch (e) {
      res.status(500).send(e);
    }
  }

  @patch('/urls')
  @bodyValidator('transactionTime', 'content')
  @use(authenticateToken)
  async updateUrl(req: Request, res: Response): Promise<any> {
    const {
      _id,
      url: updatedUrl,
      alias: updatedAlias,
      description: updatedDescription
    } = req.body.content;

    try {
      const url = await Url.findOne({
        _id,
        owner: req.user._id
      });

      if (!url) {
        return res.status(404).send();
      }

      url.url = updatedUrl;
      url.alias = updatedAlias;
      url.description = updatedDescription;

      await url.save();

      res.send(responseFormat(url));
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }

  @del('/urls/:id')
  @use(authenticateToken)
  async deleteUrl(req: Request, res: Response): Promise<any> {
    const { id: _id } = req.params;

    try {
      const url = await Url.findOne({ _id, owner: req.user._id });

      if (!url) {
        return res.status(404).send();
      }

      await url.remove();

      res.send(responseFormat(url));
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

export { UrlController };
