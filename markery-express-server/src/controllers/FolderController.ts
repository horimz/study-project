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
import { Folder, FolderTypes } from '../models/Folder';

@controller('/api')
class FolderController {
  @get('/folders/root')
  @use(authenticateToken)
  async getRootFolderId(req: Request, res: Response): Promise<any> {
    try {
      const folder = await Folder.findRootFolder(req.user._id);

      if (!folder) {
        return res.status(404).send();
      }

      res.send(responseFormat({ rootFolderId: folder._id }));
    } catch (e) {
      res.status(500).send(e);
    }
  }

  @get('/folders')
  @use(authenticateToken)
  async getAllFolders(req: Request, res: Response): Promise<any> {
    try {
      const folders = await Folder.findAllFolders(req.user._id);

      if (!folders) {
        return res.status(404).send();
      }

      res.send(responseFormat({ folders }));
    } catch (e) {
      res.status(500).send(e);
    }
  }

  @get('/folders/:id')
  @use(authenticateToken)
  async getAllSubfoldersInFolderById(
    req: Request,
    res: Response
  ): Promise<any> {
    const { id: parentFolderId } = req.params;

    try {
      const folders = await Folder.findAllSubFoldersInFolder(
        req.user._id,
        parentFolderId
      );

      if (!folders) {
        return res
          .status(404)
          .send({ errorMessage: 'Bad request. Cannot find folder.' });
      }

      res.send(responseFormat({ folders }));
    } catch (e) {
      res.status(500).send(e);
    }
  }

  @post('/folders')
  @bodyValidator('transactionTime', 'content')
  @use(authenticateToken)
  async createFolder(req: Request, res: Response): Promise<void> {
    const { folderName, parentFolderId } = req.body.content;

    try {
      const folder = new Folder({
        folderName,
        parentFolderId,
        owner: req.user._id,
        type: FolderTypes.normal
      });

      await folder.save();

      res.send(responseFormat(folder));
    } catch (e) {
      res.status(500).send(e);
    }
  }

  @patch('/folders')
  @bodyValidator('transactionTime', 'content')
  @use(authenticateToken)
  async updateFolder(req: Request, res: Response): Promise<any> {
    const { _id, folderName } = req.body.content;

    try {
      // Find folder to update
      const folder = await Folder.findOne({ _id, owner: req.user._id });

      if (!folder) {
        return res.status(404).send();
      }

      // Update folder
      folder.folderName = folderName;

      await folder.save();

      res.send(responseFormat(folder));
    } catch (e) {
      res.status(500).send(e);
    }
  }

  @del('/folders/:id')
  @use(authenticateToken)
  async deleteFolder(req: Request, res: Response): Promise<any> {
    const { id: _id } = req.params;

    try {
      // Find folder to delete
      const folder = await Folder.findOne({
        _id,
        owner: req.user._id
      });

      if (!folder) {
        return res.status(404).send();
      }

      await folder.remove();

      res.send(responseFormat(folder));
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

export { FolderController };
