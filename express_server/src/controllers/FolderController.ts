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

@controller('/api')
export class FolderController {
  @get('/folder/:id')
  @use(authenticateToken)
  async getFolderContent(req: Request, res: Response): Promise<void> {
    const { id: folderId } = req.params;

    try {
      const contents = await Folder.findAllContent(folderId);
      res.send(contents);
    } catch (e) {
      res.status(500).send({ error: 'Failed to get folder content.' });
    }
  }

  @get('/folders')
  @use(authenticateToken)
  async getFolders(req: Request, res: Response): Promise<void> {
    const { _id: owner } = req.user;

    try {
      const folders = await Folder.findAllFolders(owner);
      res.send(folders);
    } catch (e) {
      res.status(500).send({ error: 'Failed to fetch folders.' });
    }
  }

  @post('/folder')
  @bodyValidator('folderName')
  @use(authenticateToken)
  async postFolder(req: Request, res: Response): Promise<void> {
    const { _id: owner } = req.user;
    const { folderName } = req.body;

    try {
      const folder = new Folder({ folderName, owner });
      await folder.save();

      const folders = await Folder.findAllFolders(owner);
      res.send(folders);
    } catch (e) {
      res.status(500).send({ error: 'Failed to add a folder.' });
    }
  }

  @post('/folder/:id')
  @bodyValidator('folderName')
  @use(authenticateToken)
  async postSubFolder(req: Request, res: Response): Promise<void> {
    const { _id: owner } = req.user;
    const { id: folderId } = req.params;
    const { folderName } = req.body;

    try {
      const folder = new Folder({ folderName, owner: folderId });
      await folder.save();

      const contents = await Folder.findAllContent(folderId);
      res.send(contents);
    } catch (e) {
      res.status(500).send({ error: 'Failed to add a sub folder.' });
    }
  }

  @patch('/folder/:id')
  @bodyValidator('folderName')
  @use(authenticateToken)
  async patchFolder(req: Request, res: Response): Promise<any> {
    const { _id: owner } = req.user;
    const { id: folderId } = req.params;
    const { folderName } = req.body;

    try {
      const folder = await Folder.findOne({ _id: folderId, owner });
      if (!folder)
        return res.status(404).send({ error: 'Failed to find folder.' });

      folder.folderName = folderName;
      await folder.save();

      const folders = await Folder.findAllFolders(owner);
      res.send(folders);
    } catch (e) {
      res.status(500).send({ error: 'Failed to update folder.' });
    }
  }

  @del('/folder/:id')
  @use(authenticateToken)
  async deleteFolder(req: Request, res: Response): Promise<any> {
    const { _id: owner } = req.user;
    const { id: folderId } = req.params;

    try {
      const folder = await Folder.findOne({ _id: folderId, owner });
      if (!folder)
        return res.status(404).send({ error: 'Failed to find folder.' });

      await folder.remove();

      const folders = await Folder.findAllFolders(owner);
      res.send(folders);
    } catch (e) {
      res.status(500).send({ error: 'Failed to delete folder.' });
    }
  }
}
