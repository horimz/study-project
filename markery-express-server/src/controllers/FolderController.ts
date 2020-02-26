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
export class FolderController {
  // Send current users root folder id
  @get('/folder/:id')
  @use(authenticateToken)
  async getFolder(req: Request, res: Response): Promise<void> {
    const { id: userId } = req.params;

    try {
      // Find root folder
      const folder = await Folder.findRootFolder(userId);

      // Send response
      res.send(responseFormat({ rootFolderId: folder._id }));
    } catch (e) {
      res.status(500).send(e);
    }
  }

  // Send all sub folders in a folder
  @get('/folders/:id')
  @use(authenticateToken)
  async getFolders(req: Request, res: Response): Promise<void> {
    const { id: parentFolderId } = req.params;

    try {
      // Find all folders under "parent folder"
      const folders = await Folder.findAllFolders(parentFolderId);

      // Send response
      res.send(responseFormat({ folders }));
    } catch (e) {
      res.status(500).send(e);
    }
  }

  // Create new folder
  @post('/folder')
  @bodyValidator('transactionTime', 'content')
  @use(authenticateToken)
  async postFolder(req: Request, res: Response): Promise<void> {
    const { folderName, parentFolderId } = req.body.content;

    try {
      // Create new folder
      const folder = new Folder({
        folderName,
        parentFolderId,
        type: FolderTypes.normal
      });
      await folder.save();

      // Send response
      res.send(
        responseFormat({ _id: folder._id, folderName: folder.folderName })
      );
    } catch (e) {
      res.status(500).send(e);
    }
  }

  // Update folder
  @patch('/folder')
  @bodyValidator('transactionTime', 'content')
  @use(authenticateToken)
  async patchSubFolder(req: Request, res: Response): Promise<any> {
    const {
      transactionTime,
      content: { _id, folderName }
    } = req.body;

    try {
      // Find folder to update
      const folder = await Folder.findOne({ _id });
      if (!folder) return res.status(404).send();

      // Update folder
      folder.folderName = folderName;

      // Save updated folder
      await folder.save();

      res.send();
    } catch (e) {
      res.status(500).send(e);
    }
  }

  // Delete folder
  @del('/folder/:id')
  @use(authenticateToken)
  async deleteFolder(req: Request, res: Response): Promise<any> {
    const { id: folderId } = req.params;

    try {
      // Find folder to delete
      const folder = await Folder.findOne({ _id: folderId });
      if (!folder)
        return res.status(404).send({ error: 'Failed to find folder.' });

      // Remove folder from database
      await folder.remove();

      res.send();
    } catch (e) {
      res.status(500).send(e);
    }
  }
}
